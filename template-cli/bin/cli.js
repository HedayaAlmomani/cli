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

// Function to Handle Table Data from backend
function generateFunctionDefinitions(tableParameters) {
  return tableParameters
    .map((param) => {
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
      return `${param.parameterName}: ${value}`;
    })
    .join(",\n");
}

// Function to generate empty parameters for filter 
function generateObjectString(paramsArray) {
  let objectString = "{\n";

  paramsArray.forEach((param, index) => {
    objectString += `  ${param.parameterName}: "",\n`;
  });

  objectString += `  searchKey: "",\n`;

  objectString += "}";

  return objectString;
}

// Function to handle HeadCells from filter parameters
function transformArray(paramsArray) {
  const filteredArray = paramsArray.filter(
    (param) => param.parameterName !== "searchKey"
  );

  const transformedArray = filteredArray.map((param) => ({
    id: param.backendKey,
    label: param.label || param.parameterName,
    sortable: true,
  }));

  // Add the Actions Column at the end
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
    await replaceTextInFile(filePath, '"headCellsData"', headCells);

    console.log(`Template copied to ${targetFolder}`);
  } catch (error) {
    console.error("Error processing template:", error);
  }
}

main();
