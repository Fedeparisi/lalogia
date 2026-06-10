import fs from "fs";
import path from "path";
import sharp from "sharp";

const publicDir = path.join(process.cwd(), "public");
const files = fs.readdirSync(publicDir);

async function compressImages() {
  for (const file of files) {
    if (file.endsWith(".png")) {
      const filePath = path.join(publicDir, file);
      const webpPath = path.join(publicDir, file.replace(".png", ".webp"));
      
      console.log(`Compressing ${file}...`);
      await sharp(filePath)
        .resize({ width: 800, withoutEnlargement: true }) // resize to max 800px width
        .webp({ quality: 75 })
        .toFile(webpPath);
        
      // Delete the original png to save space
      fs.unlinkSync(filePath);
      console.log(`Saved ${webpPath} and deleted original.`);
    }
  }
}

compressImages().catch(console.error);
