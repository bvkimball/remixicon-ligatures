const { makeFonts, makeCssFile } = require(".");

const main = async () => {
  console.log("Building Font");
  const { outlined, filled } = await makeFonts();

  console.log("Writing Template CSS");
  await makeCssFile({ outlined, filled });
};

main();
