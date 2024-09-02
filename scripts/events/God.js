module.exports.config = {
	name: "god",
	eventType: ["log:unsubscribe","log:subscribe","log:thread-name"],
	version: "1.0.0",
	credits: "Mirai Team",
	description: "Record bot activity notifications!",
    envConfig: {
        enable: true
    }
};

module.exports.run = async function({ api, event, Threads }) {
    const logger = require("../../CYBER/Mahabubb.js");
    if (!global.configModule[this.config.name].enable) return;
    var formReport =  "= Time =" +
                        "\n\n»  Group ID: " + event.threadID +
                        "\n» Action: {task}" +
                        "\n» Uid : " + event.author +
                        "\n» " + Date.now() +" «",
        task = "";
    switch (event.logMessageType) {
        case "log:thread-name": {
            const oldName = (await Threads.getData(event.threadID)).name || "ভুলে গিয়েছি 🙂🙏",
                    newName = event.logMessageData.name || "মনে নাই🌚👾";
            task = "User changes group name from: '" + oldName + "' Lekin New Naam '" + newName + "'hai";
            await Threads.setData(event.threadID, {name: newName});
            break;
        }
        case "log:subscribe": {
            if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) task = "আমাকে একটা নতুন গ্ৰুপে এড করা হয়েছে 🤗";
            break;
        }
        case "log:unsubscribe": {
            if (event.logMessageData.leftParticipantFbId== api.getCurrentUserID()) task = " দেখো সোনা আমাকে গ্ৰুপ থেকে kick দিয়েছে 😭💔"
            break;
        }
        default: 
            break;
    }

    if (task.length == 0) return;

    formReport = formReport
    .replace(/\{task}/g, task);
  var god = "100014754734049";

    return api.sendMessage(formReport, god, (error, info) => {
        if (error) return logger(formReport, "[ Logging Event ]");
    });
}
