const fs = require("fs").promises;
const path = require("path");
const process = require("process");
const { copyTemplateFolder, createFormStructures } = require("./helper");
const { formTemplate } = require("./constant");

const parentFolder = path.dirname(__dirname);
const templateFolder = path.join(parentFolder, "template");
const targetFolder = path.join(process.cwd(), "MyProject");
const formsFolder = path.join(targetFolder, "Forms");

// Configuration array
const configs = [
  { folderName: "form1", content: formTemplate },
  { folderName: "form2", content: formTemplate },
];

async function main() {
  try {
    await copyTemplateFolder(templateFolder, targetFolder);
    await createFormStructures(configs, formsFolder);
  } catch (error) {
    console.error("Error processing template:", error);
  }
}

main();
