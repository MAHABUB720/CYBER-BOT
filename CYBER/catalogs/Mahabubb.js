const { readdirSync, readFileSync, writeFileSync } = require("fs-extra");
const { join, resolve } = require('path')
const { execSync } = require('child_process');
const axios = require('axios')
const config = require("../../Mahabub.json");
const chalk = require("chalk");
const listPackage = JSON.parse(readFileSync('../../package.json')).dependencies;
const packages = JSON.parse(readFileSync('../../package.json'));
const fs = require("fs");
const login = require('../system/login/index.js');
const moment = require("moment-timezone");
const logger = require("./Mahabubc.js");
const gradient = require("gradient-string");
const process = require("process");
const listbuiltinModules = require("module").builtinModules;
const cnslEvent = require("../configs/console.json");

global.client = new Object({
  commands: new Map(),
  events: new Map(),
  cooldowns: new Map(),
  eventRegistered: new Array(),
  handleSchedule: new Array(),
  handleReaction: new Array(),
  handleReply: new Array(),
  mainPath: process.cwd(),
  configPath: new String(),
  apiryukoPath: new String(),
  ryukoPath: new String(),
  premiumListsPath: new String(),
  approvedListsPath: new String(),
  getTime: function(option) {
    switch (option) {
      case "seconds":
        return `${moment.tz("Asia/Dhaka").format("ss")}`;
      case "minutes":
        return `${moment.tz("Asia/Dhaka").format("mm")}`;
      case "hours":
        return `${moment.tz("Asia/Dhaka").format("HH")}`;
      case "date":
        return `${moment.tz("Asia/Dhaka").format("DD")}`;
      case "month":
        return `${moment.tz("Asia/Dhaka").format("MM")}`;
      case "year":
        return `${moment.tz("Asia/Dhaka").format("YYYY")}`;
      case "fullHour":
        return `${moment.tz("Asia/Dhaka").format("HH:mm:ss")}`;
      case "fullYear":
        return `${moment.tz("Asia/Dhaka").format("DD/MM/YYYY")}`;
      case "fullTime":
        return `${moment.tz("Asia/Dhaka").format("HH:mm:ss DD/MM/YYYY")}`;
    }
  },
  timeStart: Date.now()
});
global.data = new Object({
  threadInfo: new Map(),
  threadData: new Map(),
  userName: new Map(),
  userBanned: new Map(),
  threadBanned: new Map(),
  commandBanned: new Map(),
  threadAllowNSFW: new Array(),
  allUserID: new Array(),
  allCurrenciesID: new Array(),
  allThreadID: new Array(),
});
global.utils = require("./Mahabubd.js");
global.loading = require("./Mahabubc.js");
global.nodemodule = new Object();
global.config = new Object();
global.ryuko = new Object();
global.apiryuko = new Object();
global.premium = new Object();
global.approved = new Object();
global.configModule = new Object();
global.moduleData = new Array();
global.language = new Object();
global.account = new Object();

const cheerful = gradient.fruit
const crayon = gradient('yellow', 'lime', 'green');
const sky = gradient('#3446eb', '#3455eb', '#3474eb');
const BLUE = ('#3467eb');
const errorMessages = [];
if (errorMessages.length > 0) {
  console.log("commands with errors : ");
  errorMessages.forEach(({ command, error }) => {
    console.log(`${command}: ${error}`);
  });
}

var apiryukoValue;
try {
  global.client.apiryukoPath = join(global.client.mainPath, "../configs/api.json");
  apiryukoValue = require(global.client.apiryukoPath);
} catch (e) {
  return;
}
try {
  for (const apiKeys in apiryukoValue) global.apiryuko[apiKeys] = apiryukoValue[apiKeys];
} catch (e) {
  return;
}
var ryukoValue;
try {
  global.client.ryukoPath = join(global.client.mainPath, "../configs/Mahabub.json");
  ryukoValue = require(global.client.ryukoPath);
} catch (e) {
  return;
}
try {
  for (const Keys in ryukoValue) global.ryuko[Keys] = ryukoValue[Keys];
} catch (e) {
  return;
}
var configValue;
try {
  global.client.configPath = join(global.client.mainPath, "../../Mahabub.json");
  configValue = require(global.client.configPath);
  logger.loader(`𝐝𝐞𝐩𝐥𝐨𝐲𝐢𝐧𝐠 ${chalk.blueBright('𝐌𝐀𝐇𝐀𝐁𝐔𝐁')} 𝐟𝐢𝐥𝐞`);
} catch (e) {
  return logger.loader(`⚠️𝐜𝐚𝐧'𝐭 𝐫𝐞𝐚𝐝 ${chalk.blueBright('𝐌𝐀𝐇𝐀𝐁𝐔𝐁')} 𝐟𝐢𝐥𝐞`, "𝐞𝐫𝐫𝐨𝐫");
}
try {
  for (const key in configValue) global.config[key] = configValue[key];
  logger.loader(`𝐝𝐞𝐩𝐥𝐨𝐲𝐞𝐝 ${chalk.blueBright('𝐌𝐀𝐇𝐀𝐁𝐔𝐁')} 𝐟𝐢𝐥𝐞`);
} catch (e) {
  return logger.loader(`⚠️𝐜𝐚𝐧'𝐭 𝐝𝐞𝐩𝐥𝐨𝐲 ${chalk.blueBright('𝐌𝐀𝐇𝐀𝐁𝐔𝐁')} 𝐟𝐢𝐥𝐞`, "error")
}

var approvedListsValue;
try {
  global.client.approvedListsPath = join(global.client.mainPath, "../botdata/approvedlists.json");
  approvedListsValue = require(global.client.approvedListsPath);
  if (config.approval) {
  logger.loader(`𝐝𝐞𝐩𝐥𝐨𝐲𝐢𝐧𝐠 ${chalk.blueBright(`𝐚𝐩𝐩𝐫𝐨𝐯𝐞𝐝 𝐝𝐚𝐭𝐚𝐛𝐚𝐬𝐞`)}`);
  } else {
    logger(`${chalk.blueBright(`⚠️𝐚𝐩𝐩𝐫𝐨𝐯𝐚𝐥`)} 𝐬𝐲𝐬𝐭𝐞𝐦 𝐢𝐬 𝐭𝐮𝐫𝐧𝐞𝐝 𝐨𝐟𝐟`, '𝐰𝐚𝐫𝐧');
  }
} catch (e) {
  return logger(`⚠️𝐜𝐚𝐧'𝐭 𝐫𝐞𝐚𝐝 𝐚𝐩𝐩𝐫𝐨𝐯𝐞𝐝 𝐝𝐚𝐭𝐚𝐛𝐚𝐬𝐞`, '𝐞𝐫𝐫𝐨𝐫');
}
try {
  for (const approvedListsKeys in approvedListsValue) global.approved[approvedListsKeys] = approvedListsValue[approvedListsKeys];
  if (config.approval) {
    logger.loader(`𝐝𝐞𝐩𝐥𝐨𝐲𝐢𝐧𝐠 ${chalk.blueBright(`𝐚𝐩𝐩𝐫𝐨𝐯𝐞𝐝 𝐝𝐚𝐭𝐚𝐛𝐚𝐬𝐞`)}`)
  }
} catch (e) {
  return logger(`⚠️𝐜𝐚𝐧'𝐭 𝐝𝐞𝐩𝐥𝐨𝐲 𝐚𝐩𝐩𝐫𝐨𝐯𝐞𝐝 𝐠𝐫𝐨𝐮𝐩𝐬 𝐝𝐚𝐭𝐚𝐛𝐚𝐬𝐞`, '𝐞𝐫𝐫𝐨𝐫')
}

var premiumListsValue;
try {
  global.client.premiumListsPath = join(global.client.mainPath, "../botdata/premiumlists.json");
  premiumListsValue = require(global.client.premiumListsPath);
  if (config.premium) {
  logger.loader(`𝐝𝐞𝐩𝐥𝐨𝐲𝐢𝐧𝐠 ${chalk.blueBright(`𝐩𝐫𝐞𝐦𝐢𝐮𝐦 𝐝𝐚𝐭𝐚𝐛𝐚𝐬𝐞`)}`);
  } else {
    logger(`${chalk.blueBright(`𝐩𝐫𝐞𝐦𝐢𝐮𝐦`)} 𝐬𝐲𝐬𝐭𝐞𝐦 𝐰𝐚𝐬 𝐭𝐮𝐫𝐧𝐞𝐝 𝐨𝐟𝐟`, '𝐰𝐚𝐫𝐧');
  }
} catch (e) {
  return logger(`⚠️𝐜𝐚𝐧'𝐭 𝐫𝐞𝐚𝐝 𝐩𝐫𝐞𝐦𝐢𝐮𝐦 𝐝𝐚𝐭𝐚𝐛𝐚𝐬𝐞`, '𝐞𝐫𝐫𝐨𝐫')
}
try {
  for (const premiumLists in premiumListsValue) global.premium[premiumLists] = premiumListsValue[premiumLists];
  if (config.premium) {
    logger.loader(`𝐝𝐞𝐩𝐥𝐨𝐲𝐞𝐝 ${chalk.blueBright(`𝐩𝐫𝐞𝐦𝐢𝐮𝐦 𝐝𝐚𝐭𝐚𝐛𝐚𝐬𝐞`)}`);
  }
} catch (e) {
  return logger(`⚠️𝐜𝐚𝐧𝐭'𝐭 𝐝𝐞𝐩𝐥𝐨𝐲 𝐩𝐫𝐞𝐦𝐢𝐮𝐦 𝐝𝐚𝐭𝐚𝐛𝐚𝐬𝐞`, '𝐞𝐫𝐫𝐨𝐫');
}


const { Sequelize, sequelize } = require("../system/database/index.js");
for (const property in listPackage) {
  try {
    global.nodemodule[property] = require(property)
  } catch (e) { }
}
const langFile = (readFileSync(`${__dirname}/languages/${global.config.language || "en"}.lang`, {
  encoding: 'utf-8'
})).split(/\r?\n|\r/);
const langData = langFile.filter(item => item.indexOf('#') != 0 && item != '');
for (const item of langData) {
  const getSeparator = item.indexOf('=');
  const itemKey = item.slice(0, getSeparator);
  const itemValue = item.slice(getSeparator + 1, item.length);
  const head = itemKey.slice(0, itemKey.indexOf('.'));
  const key = itemKey.replace(head + '.', '');
  const value = itemValue.replace(/\\n/gi, '\n');
  if (typeof global.language[head] == "undefined") global.language[head] = new Object();
  global.language[head][key] = value;
}
global.getText = function(...args) {
  const langText = global.language;
  if (!langText.hasOwnProperty(args[0])) {
    throw new Error(`${__filename} - not found key language : ${args[0]}`);
  }
  var text = langText[args[0]][args[1]];
  if (typeof text === 'undefined') {
    throw new Error(`${__filename} - not found key text : ${args[1]}`);
  }
  for (var i = args.length - 1; i > 0; i--) {
    const regEx = RegExp(`%${i}`, 'g');
    text = text.replace(regEx, args[i + 1]);
  }
  return text;
};

try {
  if (!global.config.BOTNAME) {
    logger.error(`⚠️𝐩𝐥𝐞𝐚𝐬𝐞 𝐞𝐧𝐭𝐞𝐫 𝐲𝐨𝐮𝐫 𝐛𝐨𝐭 𝐧𝐚𝐦𝐞 𝐢𝐧 ${chalk.blueBright('Mahabub.json')} 𝐟𝐢𝐥𝐞`);
    process.exit(0);
  }
  if (!global.config.PREFIX) {
    logger.error(`⚠️𝐩𝐥𝐞𝐚𝐬𝐞 𝐞𝐧𝐭𝐞𝐫 𝐲𝐨𝐮𝐫 𝐛𝐨𝐭 𝐩𝐫𝐞𝐟𝐢𝐱 𝐢𝐧 ${chalk.blueBright('Mahabub.json')} 𝐟𝐢𝐥𝐞`)
  }
  if (global.config.author != "𝐌𝐚𝐡𝐚𝐛𝐮𝐛 𝐑𝐚𝐡𝐦𝐚𝐧") {
    logger.error(`⚠️ 𝐃𝐞𝐭𝐞𝐜𝐭𝐞𝐝 : 𝐚𝐮𝐭𝐡𝐨𝐫 𝐧𝐚𝐦𝐞 𝐰𝐚𝐬 𝐜𝐡𝐚𝐧𝐠𝐞𝐝 𝐚𝐭 ${chalk.blueBright('Mahabub.json')}`);
    process.exit(0);
  }
  if (packages.author != "𝐌𝐚𝐡𝐚𝐛𝐮𝐛 𝐑𝐚𝐡𝐦𝐚𝐧") {
    logger.error(`⚠️ 𝐃𝐞𝐭𝐞𝐜𝐭𝐞𝐝 : 𝐚𝐮𝐭𝐡𝐨𝐫 𝐧𝐚𝐦𝐞 𝐰𝐚𝐬 𝐜𝐡𝐚𝐧𝐠𝐞𝐝 𝐚𝐭 ${chalk.blueBright('package.json')}`);
    process.exit(0);
  }
  if (packages.name != "𝐌𝐇_𝐁𝐎𝐓") {
    logger.error(`⚠️ 𝐃𝐞𝐭𝐞𝐜𝐭𝐞𝐝 : 𝐩𝐫𝐨𝐣𝐞𝐜𝐭 𝐧𝐚𝐦𝐞 𝐰𝐚𝐬 𝐜𝐡𝐚𝐧𝐠𝐞𝐝 𝐚𝐭 ${chalk.blueBright('package.json')}`);
    process.exit(0);
  }
} catch (error) {
  return;
}

try {
  var appStateFile = resolve(join(global.client.mainPath, "../../Mahabubstate.json"));
  var appState = ((process.env.REPL_OWNER || process.env.PROCESSOR_IDENTIFIER) && (fs.readFileSync(appStateFile, 'utf8'))[0] != "[" && ryuko.encryptSt) ? JSON.parse(global.utils.decryptState(fs.readFileSync(appStateFile, 'utf8'), (process.env.REPL_OWNER || process.env.PROCESSOR_IDENTIFIER))) : require(appStateFile);
  logger.loader(`𝐝𝐞𝐩𝐥𝐨𝐲𝐞𝐝 ${chalk.blueBright('Mahabubstate')} 𝐟𝐢𝐥𝐞`)
} catch (e) {
  return logger.error(`𝐜𝐚𝐧'𝐭 𝐫𝐞𝐚𝐝 ${chalk.blueBright('Mahabubstate')} 𝐟𝐢𝐥𝐞`)
}

function onBot({ models: botModel }) {
  const loginData = {};
  loginData.appState = appState;
  login(loginData, async (loginError, loginApiData) => {
    if (loginError) {
        console.log(loginError)
        return process.exit(0)
      }
    loginApiData.setOptions(global.ryuko.loginoptions);
    const fbstate = loginApiData.getAppState();
    let d = loginApiData.getAppState();
    d = JSON.stringify(d, null, '\x09');
    if ((process.env.REPL_OWNER || process.env.PROCESSOR_IDENTIFIER) && global.ryuko.encryptSt) {
      d = await global.utils.encryptState(d, process.env.REPL_OWNER || process.env.PROCESSOR_IDENTIFIER);
      writeFileSync(appStateFile, d)
    } else {
      writeFileSync(appStateFile, d)
    }
    global.client.api = loginApiData
    global.ryuko.version = config.version,
      (async () => {
        const commandsPath = `../../scripts/commands`;
        const listCommand = readdirSync(commandsPath).filter(command => command.endsWith('.js') && !command.includes('example') && !global.config.disabledcmds.includes(command));
  console.clear();
  console.log(chalk[`${cnslEvent.logger.colors.cmdStarter}`](`${cnslEvent.logger.strings.cmdStarter}`));
        for (const command of listCommand) {
          try {
            const module = require(`${commandsPath}/${command}`);
            const { config } = module;

            if (!config?.category) {
              try {
                throw new Error(` • 𝐇𝐀𝐘 𝐌𝐀𝐇𝐀𝐁𝐔𝐁 •  ${command} 𝐜𝐚𝐭𝐞𝐠𝐨𝐫𝐲 𝐢𝐬 𝐧𝐨𝐭 𝐢𝐧 𝐭𝐡𝐞 𝐜𝐨𝐫𝐫𝐞𝐜𝐭 𝐟𝐨𝐫𝐦𝐚𝐭 𝐨𝐫 𝐞𝐦𝐩𝐭𝐲⚠️`);
              } catch (error) {
                console.log(chalk.red(error.message));
                continue;
              }
            }
            const configures = require(`../../Mahabub.json`);
            if (configures.premium) {
              if (!config?.hasOwnProperty('premium')) {
                console.log(`• 𝐇𝐀𝐘 𝐌𝐀𝐇𝐀𝐁𝐔𝐁 • `, chalk.hex("#ff0000")(command) + ` 𝐝𝐨𝐞𝐬 𝐧𝐨𝐭 𝐡𝐚𝐯𝐞 𝐭𝐡𝐞 "𝐩𝐫𝐞𝐦𝐢𝐮𝐦" 𝐩𝐫𝐨𝐩𝐞𝐫𝐭𝐲.⚠️`);
                continue;
              }
            }
            if (!config?.hasOwnProperty('prefix')) {
              console.log(`• 𝐇𝐀𝐘 𝐌𝐀𝐇𝐀𝐁𝐔𝐁 • `, chalk.hex("#ff0000")(command) + ` 𝐝𝐨𝐞𝐬 𝐧𝐨𝐭 𝐡𝐚𝐯𝐞 𝐭𝐡𝐞 𝐭𝐡𝐞 "𝐩𝐫𝐞𝐟𝐢𝐱" 𝐩𝐫𝐨𝐩𝐞𝐫𝐭𝐲.⚠️`);
              continue;
            }

            if (global.client.commands.has(config.name || '')) {
              console.log(chalk.red(`• 𝐇𝐀𝐘 𝐌𝐀𝐇𝐀𝐁𝐔𝐁 •  ${chalk.hex("#FFFF00")(command)} 𝐦𝐨𝐝𝐮𝐥𝐞 𝐢𝐬 𝐚𝐥𝐫𝐚𝐝𝐲 𝐝𝐞𝐩𝐥𝐨𝐲𝐞𝐝.`));
              continue;
            }
            const { dependencies, envConfig } = config;
            if (dependencies) {
              Object.entries(dependencies).forEach(([reqDependency, dependencyVersion]) => {
                if (listPackage[reqDependency]) return;
                try {
                  execSync(`npm install --save ${reqDependency}${dependencyVersion ? `@${dependencyVersion}` : ''}`, {
                    stdio: 'inherit',
                    env: process.env,
                    shell: true,
                    cwd: join('../../node_modules')
                  });
                  require.cache = {};
                } catch (error) {
                  const errorMessage = `failed to install package ${reqDependency}\n`;
                  global.loading.err(chalk.hex('#ff7100')(errorMessage), 'command');
                }
              });
            }

            if (envConfig) {
              const moduleName = config.name;
              global.configModule[moduleName] = global.configModule[moduleName] || {};
              global.ryuko[moduleName] = global.ryuko[moduleName] || {};
              for (const envConfigKey in envConfig) {
                global.configModule[moduleName][envConfigKey] = global.ryuko[moduleName][envConfigKey] ?? envConfig[envConfigKey];
                global.ryuko[moduleName][envConfigKey] = global.ryuko[moduleName][envConfigKey] ?? envConfig[envConfigKey];
              }
              var ryukoPath = require('../configs/Mahabub.json');
              ryukoPath[moduleName] = envConfig;
              writeFileSync(global.client.ryukoPath, JSON.stringify(ryukoPath, null, 4), 'utf-8');
            }


            if (module.onLoad) {
              const moduleData = {};
              moduleData.api = loginApiData;
              moduleData.models = botModel;
              try {
                module.onLoad(moduleData);
              } catch (error) {
                const errorMessage = "unable to load the onLoad function of the module."
                throw new Error(errorMessage, 'error');
              }
            }

            if (module.handleEvent) global.client.eventRegistered.push(config.name);
            global.client.commands.set(config.name, module);
            try {
              global.loading(`${crayon(``)}𝐒𝐮𝐜𝐜𝐞𝐬𝐬𝐟𝐮𝐥𝐥𝐲 𝐝𝐞𝐩𝐥𝐨𝐲𝐞𝐝 ${chalk.blueBright(config.name)}`, `${cnslEvent.logger.strings.cmdLoader}`);
            } catch (err) {
              console.error("𝐚𝐧 𝐞𝐫𝐫𝐨𝐫 𝐨𝐜𝐜𝐮𝐫𝐫𝐞𝐝 𝐰𝐡𝐢𝐥𝐞 𝐝𝐞𝐩𝐥𝐨𝐲𝐢𝐧𝐠 𝐭𝐡𝐞 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 : ", err);
            }

            console.err
          } catch (error) {
            global.loading.err(`${chalk.hex('#ff7100')(``)}𝐟𝐚𝐢𝐥𝐝 𝐭𝐨 𝐝𝐞𝐩𝐥𝐨𝐲 ${chalk.hex("#FFFF00")(command)} ` + error + '\n', "command");
          }
        }
      })(),

      (async () => {
        const events = readdirSync(join(global.client.mainPath, '../../scripts/events')).filter(ev => ev.endsWith('.js') && !global.config.disabledevents.includes(ev));
        console.log(`\n` + chalk[`${cnslEvent.logger.colors.evntStarter}`](`${cnslEvent.logger.strings.evntStarter}`));
        for (const ev of events) {
          try {
            const event = require(join(global.client.mainPath, '../../scripts/events', ev));
            const { config, onLoad, run } = event;
            if (!config || !config.name || !run) {
              global.loading.err(`${chalk.hex('#ff7100')(``)} ${chalk.hex("#FFFF00")(ev)} 𝐦𝐨𝐝𝐮𝐥𝐞 𝐢𝐬 𝐧𝐨𝐭 𝐢𝐧 𝐭𝐡𝐞 𝐜𝐨𝐫𝐫𝐞𝐜𝐭 𝐟𝐨𝐫𝐦𝐚𝐭. `, "• 𝐌𝐀𝐇𝐀𝐁𝐔𝐁 𝐄𝐕𝐄𝐍𝐓 •");
              continue;
            }


            if (errorMessages.length > 0) {
              console.log("𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐬 𝐰𝐢𝐭𝐡 𝐞𝐫𝐫𝐨𝐫𝐬 :");
              errorMessages.forEach(({ command, error }) => {
                console.log(`${command}: ${error}`);
              });
            }

            if (global.client.events.has(config.name)) {
              global.loading.err(`${chalk.hex('#ff7100')(``)} ${chalk.hex("#FFFF00")(ev)} 𝐦𝐨𝐝𝐮𝐥𝐞 𝐢𝐬 𝐚𝐥𝐫𝐚𝐝𝐲 𝐝𝐞𝐩𝐥𝐨𝐲𝐞𝐝.`, "• 𝐌𝐀𝐇𝐀𝐁𝐔𝐁 𝐄𝐕𝐄𝐍𝐓 •");
              continue;
            }
            if (config.dependencies) {
              const missingDeps = Object.keys(config.dependencies).filter(dep => !global.nodemodule[dep]);
              if (missingDeps.length) {
                const depsToInstall = missingDeps.map(dep => `${dep}${config.dependencies[dep] ? '@' + config.dependencies[dep] : ''}`).join(' ');
                execSync(`npm install --no-package-lock --no-save ${depsToInstall}`, {
                  stdio: 'inherit',
                  env: process.env,
                  shell: true,
                  cwd: join('../../node_modules')
                });
                Object.keys(require.cache).forEach(key => delete require.cache[key]);
              }
            }
            if (config.envConfig) {
              const configModule = global.configModule[config.name] || (global.configModule[config.name] = {});
              const configData = global.ryuko[config.name] || (global.ryuko[config.name] = {});
              for (const evt in config.envConfig) {
                configModule[evt] = configData[evt] = config.envConfig[evt] || '';
              }
              writeFileSync(global.client.ryukoPath, JSON.stringify({
                ...require(global.client.ryukoPath),
                [config.name]: config.envConfig
              }, null, 2));
            }
            if (onLoad) {
              const eventData = {};
              eventData.api = loginApiData, eventData.models = botModel;
              await onLoad(eventData);
            }
            global.client.events.set(config.name, event);
            global.loading(`${crayon(``)}𝐒𝐮𝐜𝐜𝐞𝐬𝐬𝐟𝐮𝐥𝐥𝐲 𝐝𝐞𝐩𝐥𝐨𝐲𝐞𝐝 ${chalk.blueBright(config.name)}`, "• 𝐌𝐀𝐇𝐀𝐁𝐔𝐁 𝐄𝐕𝐄𝐍𝐓 •");
          }
          catch (err) {
            global.loading.err(`${chalk.hex("#ff0000")('')}${chalk.blueBright(ev)} 𝐟𝐚𝐢𝐥𝐝 𝐰𝐢𝐭𝐡 𝐞𝐫𝐫𝐨𝐫 : ${err.message}` + `\n`, "event");
          }



        }
      })();
    console.log(chalk.blue(`\n` + `• 𝐌𝐀𝐇𝐀𝐁𝐔𝐁_𝐁𝐎𝐓 𝐃𝐀𝐓𝐀 •`));
    global.loading(`${crayon(``)}deployed ${chalk.blueBright(`${global.client.commands.size}`)} commands and ${chalk.blueBright(`${global.client.events.size}`)} events`, "• 𝐌𝐀𝐇𝐀𝐁𝐔𝐁 𝐃𝐀𝐓𝐀 •");
    global.loading(`${crayon(``)}𝐝𝐞𝐩𝐥𝐨𝐲𝐞𝐝 𝐭𝐢𝐦𝐞 : ${chalk.blueBright(((Date.now() - global.client.timeStart) / 1000).toFixed() + 's')}`, "• 𝐌𝐀𝐇𝐀𝐁𝐔𝐁 𝐃𝐀𝐓𝐀 •");
    const listenerData = {};
    listenerData.api = loginApiData;
    listenerData.models = botModel;
    const listener = require('../system/listen.js')(listenerData);
    global.custom = require('../../Mahabub.js')({ api: loginApiData });
    global.handleListen = loginApiData.listenMqtt(async (error, message) => {
      if (error) {
        logger.error(error);
        return process.exit(0);
      }
      if (['presence', 'typ', 'read_receipt'].some(data => data === message.type)) return;
      return listener(message);
    });
  });
}
(async () => {
  try {
    await sequelize.authenticate();
    const authentication = {};
    const chalk = require('chalk');
    authentication.Sequelize = Sequelize;
    authentication.sequelize = sequelize;
    const models = require('../system/database/model.js')(authentication);
    logger(`deployed ${chalk.blueBright('database')} system`, "• 𝐌𝐀𝐇𝐀𝐁𝐔𝐁 𝐃𝐀𝐓𝐀𝐁𝐀𝐒𝐄   •");
    logger(`𝐝𝐞𝐩𝐥𝐨𝐲𝐢𝐧𝐠 ${chalk.blueBright('login')} 𝐬𝐲𝐬𝐭𝐞𝐦`, "• 𝐌𝐀𝐇𝐀𝐁𝐔𝐁 𝐋𝐎𝐆𝐈𝐍 	    •")
    const botData = {};
    botData.models = models;
    onBot(botData);
  } catch (error) { logger(`⚠️𝐜𝐚𝐧'𝐭 𝐝𝐞𝐩𝐥𝐨𝐲 ${chalk.blueBright('database')} 𝐬𝐲𝐬𝐭𝐞𝐦`, "•𝐌𝐀𝐇𝐀𝐁𝐔𝐁 𝐅𝐀𝐈𝐋𝐃    •") }
})();
