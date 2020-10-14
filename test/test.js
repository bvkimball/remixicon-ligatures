/* IMPORT */

import test from "ava";
import fs from "fs";
import path from "path";
import util from "util";
// import * as del from "del";
import hbs from "handlebars";
import testURL from "test-url";
import { makeFonts, makeCssFile } from "../index";

const read = util.promisify(fs.readFile);
const write = util.promisify(fs.writeFile);

/* ICON FONT BUILDER */

test("creates the icon font", async (t) => {
  console.log("Building Font");
  const { outlined, filled } = await makeFonts();
  console.log("Writing Template CSS");
  await makeCssFile({ outlined, filled });

  console.log("Writing Template HTML");
  const tempfile = await read(path.join(__dirname, "test.hbs"), "utf8");
  const template = hbs.compile(tempfile);
  await write(
    path.join(__dirname, "test.html"),
    template({ outlined, filled })
  );

  console.log("Check if the page looks alright, close it to continue...");
  await testURL(`file://${encodeURI(__dirname)}/test.html`);

  // del.sync(builder.config.output.icons);
  // del.sync(builder.config.output.fonts);
});
