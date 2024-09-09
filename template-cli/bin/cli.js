const fs = require("fs").promises;
const path = require("path");
const process = require("process");
const { createFilterSectionFile, replaceTextInFile } = require("./functions");
const filterParameters = require("../configs/filterParameter.json");
const serviceInfo = require("../configs/serviceInfo.json");

const parentFolder = path.dirname(__dirname);
const templateFolder = path.join(parentFolder, "template");
const targetFolder = path.join(process.cwd(), "MyProject");

// Function to copy the template folder to the target location
async function copyTemplateFolder(templateDir, targetDir) {
  await fs.mkdir(targetDir, { recursive: true });
  const items = await fs.readdir(templateDir);

  await Promise.all(
    items.map(async (item) => {
      const itemPath = path.join(templateDir, item);
      const targetPath = path.join(targetDir, item);
      const stats = await fs.stat(itemPath);

      if (stats.isDirectory()) {
        await copyTemplateFolder(itemPath, targetPath);
      } else {
        await fs.copyFile(itemPath, targetPath);
      }
    })
  );
}

// Function to generate function definitions based on table parameters
function generateFunctionDefinitions(tableParameters) {
  return tableParameters
    .map((param) => {
      // Determine the value to use based on the parameter type
      let value;
      if (param.isChip) {
        value = `<ArenaDefaultChip 
                   type={statusColors[item?.${param.backendKey} as keyof typeof statusColors] || "blue"}>
                   {Utils.formatFirstLetterToUpperCase(item.${param.backendKey})}
                 </ArenaDefaultChip>`;
      } else if (param.isDate) {
        value = `Utils.dateFormatter(item.${param.backendKey}, 'DD MMM YYYY')`;
      } else {
        value = `item.${param.backendKey}`;
      }

      // Return the formatted parameter definition
      return `${param.parameterName}: ${value}`;
    })
    .join(",\n");
}
// handle the filter
function generateObjectString(paramsArray) {
  // Create the initial string with the opening curly brace
  let objectString = "{\n";

  // Iterate over the params array to build the object string
  paramsArray.forEach((param, index) => {
    objectString += `  ${param.parameterName}: "",\n`;
  });

  // Add a custom `searchKey` key-value pair
  objectString += `  searchKey: "",\n`;

  // Close the object string with the closing curly brace
  objectString += "}";

  return objectString;
}
// handle the colom of the table
function transformArray(paramsArray) {
  // Filter out the object with parameterName 'searchKey'
  const filteredArray = paramsArray.filter(
    (param) => param.parameterName !== "searchKey"
  );

  // Transform the filtered array into the desired format
  const transformedArray = filteredArray.map((param) => ({
    id: param.backendKey,
    label: param.label || param.parameterName, // Use label if available, fallback to parameterName
    sortable: true,
  }));

  // Add the Actions object at the end
  transformedArray.push({
    id: "actions",
    label: "Actions",
    sortable: false,
  });

  return transformedArray;
}
async function main() {
  try {
    const tableParametersPath = path.join(
      parentFolder,
      "configs",
      "tableParameters.json"
    );
    const tableParameters = JSON.parse(
      await fs.readFile(tableParametersPath, "utf8")
    );

    const myFunctions = `{
      ${generateFunctionDefinitions(tableParameters)}
    }`;

    await createFilterSectionFile();
    await copyTemplateFolder(templateFolder, targetFolder);

    // Replace "MY_PARAMETER" with the specified HTML snippet

    const filePath = path.join(
      targetFolder,
      "components",
      "TableSection",
      "index.tsx"
    );
    const servicePath = path.join(targetFolder, "services", "index.tsx");
    await replaceTextInFile(filePath, '"MY_PARAMETER"', myFunctions);
    await replaceTextInFile(servicePath, '"servicesInfo"',JSON.stringify(serviceInfo) );
    const filterEmptyData = generateObjectString(filterParameters);
    const headCells = JSON.stringify(transformArray(tableParameters));

    await replaceTextInFile(
      filePath,
      '"filterSearchParameters"',
      filterEmptyData
    );
    await replaceTextInFile(filePath, '"headCellsFinanceRequests"', headCells);

    console.log(`Template copied to ${targetFolder}`);
  } catch (error) {
    console.error("Error processing template:", error);
  }
}

main();
