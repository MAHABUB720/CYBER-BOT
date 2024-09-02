module.exports.config = {
	name: "join",
	eventType: ["log:subscribe"],
	version: "1.0.1",
	credits: "Nayan",
	description: "join and welcome notification",
	dependencies: {
		"jimp": ""
	}
};
module.exports.run = async function({ api, event }) {

	const request = require("request");
	const { threadID } = event;
	if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
		api.changeNickname(`[ ${global.config.PREFIX} ] • ➠${(!global.config.BOTNAME) ? "bot" : global.config.BOTNAME}`, threadID, api.getCurrentUserID());
		const fs = require("fs");
		return api.sendMessage("${global.config.BOTNAME} CONNECTED SUCCESSFULLY..!", event.threadID, () => api.sendMessage({body:`╭•┄┅═══❁🌺❁═══┅┄•╮\n   আসসালামু আলাইকুম-!!🖤💫\n╰•┄┅═══❁🌺❁═══┅┄•╯

________________________
𝐓𝐡𝐚𝐧𝐤 𝐲𝐨𝐮 𝐬𝐨 𝐦𝐮𝐜𝐡 𝐟𝐨𝐫 𝐚dd𝐢𝐧𝐠 𝐦𝐞 𝐭𝐨 𝐲𝐨𝐮𝐫 𝐢-𝐠𝐫𝐨𝐮𝐩-🖤🤗\n\n𝐈 𝐰𝐢𝐥𝐥 𝐚𝐥𝐰𝐚𝐲𝐬 𝐬𝐞𝐫𝐯𝐞 𝐲𝐨𝐮 𝐢𝐧𝐚𝐡𝐚𝐥𝐥𝐚𝐡 🌺❤️-!!
________________________\n\n𝐓𝐨 𝐯𝐢𝐞𝐰 𝐚𝐧𝐲 𝐜𝐨𝐦𝐦𝐚𝐧d

${global.config.PREFIX}Help\n${global.config.PREFIX} Manu

𝐁𝐎𝐓 𝐍𝐀𝐌𝐄 : ${global.config.BOTNAME}
𝐁𝐎𝐓 𝐀𝐃𝐌𝐈𝐍 : 𝗠𝗮𝗵𝗮𝗯𝘂𝗯 𝗥𝗮𝗵𝗺𝗮𝗻
\n\n⋆✦⋆⎯⎯⎯⎯⎯⎯⎯⎯⎯⋆✦⋆`, attachment: fs.createReadStream(__dirname + "/cache/joinGif/Blue Gradient Modern Youtube Intro_20240828_201240_0001.gif")} ,threadID));
	}
	else {
		try {
    const request = require("request");
			const fs = global.nodemodule["fs-extra"];
			let { threadName, participantIDs } = await api.getThreadInfo(threadID);

			const threadData = global.data.threadData.get(parseInt(threadID)) || {};
			
			var mentions = [], nameArray = [], memLength = [], i = 0;
			
    let addedParticipants1 = event.logMessageData.addedParticipants;
        for (let newParticipant of addedParticipants1) {
   let userID = newParticipant.userFbId
api.getUserInfo(parseInt(userID), (err, data) => {
      if(err){ return console.log(err)}
     var obj = Object.keys(data);
    var userName = data[obj].name.replace("@", "");     	if (userID !== api.getCurrentUserID()) {  
    
				nameArray.push(userName);
				mentions.push({ tag: userName, id: userID, fromIndex: 0 });
      
				memLength.push(participantIDs.length - i++);
memLength.sort((a, b) => a - b);
			
			(typeof threadData.customJoin == "undefined") ? msg = "╭•┄┅═══❁🌺❁═══┅┄•╮\n   আসসালামু আলাইকুম-!!🖤\n╰•┄┅═══❁🌺❁═══┅┄•╯ \n\n    ✨🆆🅴🅻🅻 🅲🅾🅼🅴✨\n\n                ❥𝐍𝐄𝐖~\n\n        ~🇲‌🇪‌🇲‌🇧‌🇪‌🇷‌~\n\n        [   {name} ]\n\n༆-✿ আপনাকে আমাদের࿐\n\n{threadName}\n\n🌺✨!!—এর পক্ষ-থেকে-!!✨🌺\n\n❤️🫰_ভালোবাস_অভিরাম_🫰❤️\n\n༆-✿আপনি_এই_গ্রুপের {soThanhVien} নং মেম্বার࿐\n\n╭•┄┅═══❁🌺❁═══┅┄•╮\n  🌸   𝙸𝙼 ${global.config.BOTNAME}  🌸\n╰•┄┅═══❁🌺❁═══┅┄•╯" : msg = threadData.customJoin;
			msg = msg
			.replace(/\{uName}/g, nameArray.join(', '))
			.replace(/\{type}/g, (memLength.length > 1) ?  'you' : 'Friend')
			.replace(/\{soThanhVien}/g, memLength.join(', '))
			.replace(/\{threadName}/g, threadName);			

      var link = [
"https://i.imgur.com/AqGijwT.gif","https://i.imgur.com/e6rhg4i.gif","https://i.imgur.com/Gs4RUmO.gif"
      ];
				var callback = () => api.sendMessage({ body: msg, attachment: fs.createReadStream(__dirname + "/cache/Nayan.jpg"), mentions }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/Nayan.jpg"));
    return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname + "/cache/Nayan.jpg")).on("close", () => callback());       
      	    }
})
        }
    }catch (err) {
            return console.log("ERROR: "+err);
    }
	}
}
