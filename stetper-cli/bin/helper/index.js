const fs = require("fs").promises;
const path = require("path");

async function copyTemplateFolder(templateDir, targetDir) {
  try {
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
  } catch (error) {
    console.error(`Error copying template folder: ${error.message}`);
    throw error;
  }
}
module.exports = {
  copyTemplateFolder,
};
