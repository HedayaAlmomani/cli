const fs = require("fs");
const path = require("path");
const process = require("process");
const { createFilterSectionFile, replaceTextInFile } = require("./functions");
const parentFolder = path.dirname(__dirname);
const templateFolder = path.join(parentFolder, "template");
const targetFolder = path.join(process.cwd(), "MyProject");

// Copy the template folder to the target location
function copyTemplateFolder(templateDir, targetDir) {
  fs.mkdirSync(targetDir, { recursive: true });
  const items = fs.readdirSync(templateDir);

  items.forEach((item) => {
    const itemPath = path.join(templateDir, item);
    const targetPath = path.join(targetDir, item);

    if (fs.lstatSync(itemPath).isDirectory()) {
      copyTemplateFolder(itemPath, targetPath);
    } else {
      fs.copyFileSync(itemPath, targetPath);
    }
  });
}

const tableParameters = JSON.parse(
  fs.readFileSync(
    path.join(parentFolder, "configs", "tableParameters.json"),
    "utf8"
  )
);

const myFunctions = ` {
      ${tableParameters
        .map((param) => {
          if (param.isChip) {
            return `${param.parameterName}: <ArenaDefaultChip type={statusColors[item?.${param.backendKey} as string]}>{Utils.formatFirstLetterToUpperCase(item.${param.backendKey})}</ArenaDefaultChip>`;
          } else if (param.isDate) {
            return `${param.parameterName}: Utils.dateFormatter(item.${param.backendKey}, 'DD MMM YYYY')`;
          } else {
            return `${param.parameterName}: Utils.formatFirstLetterToUpperCase(item.${param.backendKey})`;
          }
        })
        .join(",\n")}
    }
`;

try {
  createFilterSectionFile();
  copyTemplateFolder(templateFolder, targetFolder);

  // Replace "MY_PARAMETER" with the specified HTML snippet
  console.log({targetFolder});
  
  const filePath = path.join(
    targetFolder,
    "components",
    "TableSection",
    "index.tsx"
  );
  replaceTextInFile(filePath, '"MY_PARAMETER"', myFunctions);

  console.log(`Template copied to ${targetFolder}`);
} catch (error) {
  console.error("Error processing template:", error);
}
