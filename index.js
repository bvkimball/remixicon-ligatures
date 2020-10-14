const fs = require("fs");
const path = require("path");
const util = require("util");
const hbs = require("handlebars");
const IconFontBuildr = require("icon-font-buildr");

const read = util.promisify(fs.readFile);
const write = util.promisify(fs.writeFile);

const snake = (str) => str.replace(/-/gi, "_");
const spaced = (str) => str.replace(/-/gi, "_");

const getAllIconName = (dirPath, arrayOfFiles) => {
  files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  files.forEach((file) => {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllIconName(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(file.replace(".svg", ""));
    }
  });

  return arrayOfFiles;
};

async function makeVariant(variantName, normalize, customMatch = () => false) {
  const remixSvgRoot = path.join(
    __dirname,
    "node_modules",
    "remixicon",
    "icons"
  );
  const iconNames = getAllIconName(remixSvgRoot).filter(customMatch);
  const icons = iconNames.map((icon) => ({
    // Advanced way to define an icon
    icon,
    // name: spaced(icon), // Custom icon name
    ligatures: [snake(normalize(icon))],
  }));
  const builder = new IconFontBuildr({
    sources: [
      // Where to get the icons, both remote and local sources are supported. `[icon]` will be replace with the name of your icon
      path.join(remixSvgRoot, "Buildings", "[icon].svg"),
      path.join(remixSvgRoot, "Business", "[icon].svg"),
      path.join(remixSvgRoot, "Communication", "[icon].svg"),
      path.join(remixSvgRoot, "Design", "[icon].svg"),
      path.join(remixSvgRoot, "Development", "[icon].svg"),
      path.join(remixSvgRoot, "Device", "[icon].svg"),
      path.join(remixSvgRoot, "Document", "[icon].svg"),
      path.join(remixSvgRoot, "Editor", "[icon].svg"),
      path.join(remixSvgRoot, "Finance", "[icon].svg"),
      path.join(remixSvgRoot, "Health", "[icon].svg"),
      path.join(remixSvgRoot, "Logos", "[icon].svg"),
      path.join(remixSvgRoot, "Map", "[icon].svg"),
      path.join(remixSvgRoot, "Media", "[icon].svg"),
      path.join(remixSvgRoot, "Others", "[icon].svg"),
      path.join(remixSvgRoot, "System", "[icon].svg"),
      path.join(remixSvgRoot, "User", "[icon].svg"),
      path.join(remixSvgRoot, "Weather", "[icon].svg"),
      // path.join(__dirname, "icons", "[icon].svg"),
      // "https://fonts.gstatic.com/s/i/materialicons/[icon]/v5/24px.svg",
      // "https://fonts.gstatic.com/s/i/materialicons/[icon]/v4/24px.svg",
      // "https://fonts.gstatic.com/s/i/materialicons/[icon]/v3/24px.svg",
      // "https://raw.githubusercontent.com/Templarian/MaterialDesign/master/svg/[icon].svg",
    ],
    icons: [...icons],
    output: {
      codepoints: true,
      ligatures: true,
      // codepoints: true, // Enable support for codepoints
      // ligatures: false, // Disable support for ligatures
      // icons: path.join ( __dirname, 'builder-icons' ), // Where to save the icons, if not provided they won't be stored permanently
      fonts: path.join(__dirname, "fonts"), // Where to save the fonts
      fontName: `${variantName}`, // The name of the font to generate
      formats: [
        // Font formats to output
        "eot",
        "ttf",
        "woff",
        "woff2",
      ],
    },
  });

  await builder.build();

  const codepoints = builder.getIconsCodepoints(); // Get a map of icon names to codepoints, useful for generating HTML/CSS/SCSS etc.
  const ligatures = builder.getIconsLigatures(); // Get a map of icon names to ligatures, useful for generating HTML/CSS/SCSS etc.

  return { codepoints, ligatures };
}

const makeCssFile = async (fonts) => {
  const tempfile = await read(path.join(__dirname, "template.css"), "utf8");
  const template = hbs.compile(tempfile);
  const now = Date.now();
  await write(
    path.join(__dirname, "fonts", "remixicon.css"),
    template({ ...fonts, now })
  );
};

const makeFonts = async () => {
  const outlined = await makeVariant(
    "RemixOutlined",
    (it) => it.replace("-line", ""),
    (it) => !it.includes("-fill")
  );
  const filled = await makeVariant(
    "RemixFilled",
    (it) => it.replace("-fill", ""),
    (it) => it.includes("-fill")
  );
  return { outlined, filled };
};

module.exports = { makeVariant, makeFonts, makeCssFile };
