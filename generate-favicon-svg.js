const fs = require("fs");
const path = require("path");

// SVG content for the favicon and touch icon
const createSVG = (size) => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <!-- Golden background -->
  <rect width="${size}" height="${size}" fill="#FFD700"/>
  
  <!-- Dark background circle -->
  <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2.2}" fill="#000000"/>
  
  <!-- 360 text -->
  <text 
    x="${size / 2}" 
    y="${size / 2}" 
    font-size="${size * 0.4}" 
    font-weight="bold" 
    fill="#FFD700" 
    text-anchor="middle" 
    dominant-baseline="central" 
    font-family="Arial, Helvetica, sans-serif"
    letter-spacing="${size * 0.02}"
  >360</text>
  
  <!-- Decorative ring -->
  <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2.1}" fill="none" stroke="#FFD700" stroke-width="${size * 0.04}"/>
</svg>`;

const publicDir = path.join(__dirname, "public");
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Create favicon.svg (32x32)
try {
  fs.writeFileSync(path.join(publicDir, "favicon.svg"), createSVG(32));
  console.log("✅ favicon.svg created (32x32)");
} catch (error) {
  console.error("❌ Error creating favicon.svg:", error);
}

// Create apple-touch-icon.svg (192x192)
try {
  fs.writeFileSync(
    path.join(publicDir, "apple-touch-icon.svg"),
    createSVG(192),
  );
  console.log("✅ apple-touch-icon.svg created (192x192)");
} catch (error) {
  console.error("❌ Error creating apple-touch-icon.svg:", error);
}

console.log("\n✨ Favicon generation complete!");
console.log("\nFor production use (optional but recommended):");
console.log("1. Go to: https://favicon.io/");
console.log('2. Upload the SVG files or generate from text "360"');
console.log("3. Download the complete favicon package");
console.log(
  "4. Replace favicon.ico, apple-touch-icon.png, and favicon-16x16.png",
);
console.log("\nCurrent files will work for development and Vercel deployment!");
