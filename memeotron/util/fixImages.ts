// this script renamed all images in /images.
// no longer needed, do not run.

const fs = require("fs");
const path = require("path");

interface ImageData {
  imageName: string;
  filePath: string;
  tags: string[];
  expression: string[];
  distinctFeatures: string[];
  distinctBody: string[];
  matchingWeight: {
    tags: number;
    expression: number;
    distinctFeatures: number;
    distinctBody: number;
  };
}

// Read the JSON file
const jsonData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "images.json"), "utf-8")
) as ImageData[];

// Get list of files in the images directory
const imagesDir = path.join(__dirname, "..", "images");
const files = fs.readdirSync(imagesDir);

// Sort files to match JSON order (they should already be in the same order)
files.sort();

// Rename files
jsonData.forEach((imageData, index) => {
  if (index >= files.length) {
    console.log(`Warning: More entries in JSON than files in directory`);
    return;
  }

  const oldPath = path.join(imagesDir, files[index]);
  const newFileName = path.basename(imageData.filePath);
  const newPath = path.join(imagesDir, newFileName);

  try {
    fs.renameSync(oldPath, newPath);
    console.log(`Renamed: ${files[index]} -> ${newFileName}`);
  } catch (error) {
    console.error(`Error renaming ${files[index]}: ${error}`);
  }
});

console.log("File renaming complete!");
