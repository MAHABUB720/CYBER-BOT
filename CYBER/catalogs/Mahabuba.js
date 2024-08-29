console.clear();
const { spawn } = require("child_process");
const express = require("express");
const app = express();
const chalk = require('chalk');
const logger = require("./Mahabubc.js");
const path = require('path');
const PORT = process.env.PORT || 8080 || 9000 || 5555 || 5050 || 5000 || 3003 || 2000 || 1029 || 1010;
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/website/cyber.html'));
});
console.clear();
function startBot(message) {
    (message) ? logger(message, "𝐒𝐭𝐚𝐫𝐭𝐢𝐧𝐠") : "";
  console.log(chalk.blue('• 𝐌𝐀𝐇𝐀𝐁𝐔𝐁_𝐁𝐎𝐓 𝐒𝐘𝐒𝐓𝐄𝐌 •'));
  logger.loader(`𝐃𝐞𝐩𝐥𝐨𝐲𝐢𝐧𝐠 𝐚𝐩𝐩 𝐨𝐧 𝐩𝐨𝐫𝐭 ${chalk.blueBright(PORT)}`);
  app.listen(logger.loader(`𝐚𝐩𝐩 𝐝𝐞𝐩𝐥𝐨𝐲𝐞𝐝 𝐨𝐧 𝐩𝐨𝐫𝐭 ${chalk.blueBright(PORT)}`));
  const child = spawn("node", ["--trace-warnings", "--async-stack-traces", "Mahabubb.js"], {
        cwd: __dirname,
        stdio: "inherit",
        shell: true
    });
  child.on("close", (codeExit) => {
        if (codeExit != 0 || global.countRestart && global.countRestart < 5) {
            startBot();
            global.countRestart += 1;
            return;
        } else return;
    });

  child.on("error", function(error) {
    logger("𝐚𝐧 𝐞𝐫𝐫𝐨𝐫 𝐨𝐜𝐜𝐮𝐫𝐫𝐞𝐝 : " + JSON.stringify(error), "error");
  });
};
startBot();
