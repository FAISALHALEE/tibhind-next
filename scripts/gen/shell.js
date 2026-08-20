const fs = require("fs");
const path = require("path");

const HOME = path.join(__dirname, "..", "..", "data", "pages", "home.json");

const home = JSON.parse(fs.readFileSync(HOME, "utf8"));
const body = home.body;

const startIdx = body.indexOf('<div class="ticker"');
if (startIdx === -1) throw new Error("ticker not found");
const headerEnd = body.indexOf("</header>");
if (headerEnd === -1) throw new Error("header not found");
const footerStart = body.indexOf('<footer class="foot">');
if (footerStart === -1) throw new Error("footer not found");
const footerEnd = body.indexOf("</footer>");
if (footerEnd === -1) throw new Error("footer end not found");
const stickyStart = body.indexOf('<nav class="sticky"');
if (stickyStart === -1) throw new Error("sticky nav not found");

const SHELL_START = body.slice(startIdx, headerEnd + "</header>".length);
const SHELL_END = body.slice(footerStart, footerEnd + "</footer>".length);
const SHELL_TAIL = body.slice(stickyStart).trim();

module.exports = { SHELL_START, SHELL_END, SHELL_TAIL, home };