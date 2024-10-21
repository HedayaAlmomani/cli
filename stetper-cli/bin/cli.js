const fs = require("fs").promises;
const path = require("path");
const process = require("process");
const { copyTemplateFolder } = require("./helper");

const parentFolder = path.dirname(__dirname);
const templateFolder = path.join(parentFolder, "template");
const targetFolder = path.join(process.cwd(), "MyProject");


async function main() {
  try {
    await copyTemplateFolder(templateFolder, targetFolder);
  } catch (error) {
    console.error("Error processing template:", error);
  }
}

main();
