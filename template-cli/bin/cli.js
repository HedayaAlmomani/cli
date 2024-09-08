const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const { createFilterSectionFile, replaceTextInFile } = require('./functions');

const parentFolder = path.dirname(__dirname);
const templateFolder = path.join(parentFolder, 'template');
const targetFolder = path.join(process.cwd(), 'MyProject');

// Function to copy the template folder to the target location
async function copyTemplateFolder(templateDir, targetDir) {
  await fs.mkdir(targetDir, { recursive: true });
  const items = await fs.readdir(templateDir);

  await Promise.all(items.map(async (item) => {
    const itemPath = path.join(templateDir, item);
    const targetPath = path.join(targetDir, item);
    const stats = await fs.stat(itemPath);

    if (stats.isDirectory()) {
      await copyTemplateFolder(itemPath, targetPath);
    } else {
      await fs.copyFile(itemPath, targetPath);
    }
  }));
}

// Function to generate function definitions based on table parameters
function generateFunctionDefinitions(tableParameters) {
  return tableParameters
    .map(param => {
      // Determine the value to use based on the parameter type
      let value;
      if (param.isChip) {
        value = `<ArenaDefaultChip 
                   type={statusColors[item?.${param.backendKey} as string] || "blue"}>
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
    .join(',\n');
}


async function main() {
  try {
    const tableParametersPath = path.join(parentFolder, 'configs', 'tableParameters.json');
    const tableParameters = JSON.parse(await fs.readFile(tableParametersPath, 'utf8'));

    const myFunctions = `{
      ${generateFunctionDefinitions(tableParameters)}
    }`;

    await createFilterSectionFile();
    await copyTemplateFolder(templateFolder, targetFolder);

    // Replace "MY_PARAMETER" with the specified HTML snippet
    
    const filePath = path.join(targetFolder, 'components', 'TableSection', 'index.tsx');
    await replaceTextInFile(filePath, '"MY_PARAMETER"', myFunctions);

    console.log(`Template copied to ${targetFolder}`);
  } catch (error) {
    console.error('Error processing template:', error);
  }
}

main();
