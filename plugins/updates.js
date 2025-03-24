let {
   smd,
   smdBuffer,
   tlang,
   sleep
 } = require(global.lib_dir || "../lib");
 let fs = require("fs");
 var sifat = ["Fine", "Unfriendly", "Cute", "Sigma", "Chapri", "Nibba/nibbi", "Annoying", "Dilapidated", "Angry person", "Polite", "Burden", "Great", "Cringe", "Liar"];
 var hoby = ["Cooking", "Dancing", "Playing", "Gaming", "Painting", "Helping Others", "Watching anime", "Reading", "Riding Bike", "Singing", "Chatting", "Sharing Memes", "Drawing", "Eating Parents Money", "Playing Truth or Dare", "Staying Alone"];
 var cakep = ["Yes", "No", "Very Ugly", "Very Handsome"];
 var wetak = ["Caring", "Generous", "Angry person", "Sorry", "Submissive", "Fine", "Im sorry", "Kind Hearted", "Patient", "UwU", "Top", "Helpful"];
 var checkme = {};

 smd({
   cmdname: "checkme",
   alias: ["aboutme"],
   desc: "Check random information about your character!",
   category: "updates",
   filename: __filename
 }, async (message, args) => {
   try {
     let userId = message.sender;
     if (message.isCreator) {
       userId = message.reply_message ? message.reply_message.sender : message.mentionedJid[0] ? message.mentionedJid[0] : userId;
     }
     let response = !/fresh|reset|new|why|update/g.test(args) && checkme[userId] ? checkme[userId] : "*ABOUT @" + userId.split("@")[0] + "*\n  \n*Name :* " + (await message.bot.getName(userId)).split("\n").join("  ") + "\n*Characteristic :* " + sifat[Math.floor(Math.random() * sifat.length)] + "\n*Hobby :* " + hoby[Math.floor(Math.random() * hoby.length)] + "\n*Simp :* " + Math.floor(Math.random() * 101) + "%\n*Great :* " + Math.floor(Math.random() * 101) + "%\n*Handsome :* " + cakep[Math.floor(Math.random() * cakep.length)] + "\n*Character :* " + wetak[Math.floor(Math.random() * wetak.length)] + "\n*Good Morals :* " + Math.floor(Math.random() * 101) + "%\n*Bad Morals :* " + Math.floor(Math.random() * 101) + "%\n*Intelligence :* " + Math.floor(Math.random() * 101) + "%\n*Courage :* " + Math.floor(Math.random() * 101) + "%\n*Afraid :* " + Math.floor(Math.random() * 101) + "%\n  \n *aLL BOUT YOU*";
     checkme[userId] = response;
     message.bot.sendUi(message.from, {
       caption: response,
       mentions: [userId]
     }, {
       quoted: message
     }, "image", await message.getpp(userId), true);
   } catch (error) {
     message.error(error + "\n\nCommand: aboutme", error, false);
   }
 });

 smd({
   pattern: "cleartmp",
   type: "updates",
   info: "Clear temporary files cache"
 }, async message => {
   try {
     const tempFolder = "./temp";
     if (fs.existsSync(tempFolder)) {
       fs.readdirSync(tempFolder).forEach(file => fs.rmSync(tempFolder + "/" + file));
     }
     await message.reply("_The *temp* folder has been cleaned_");
   } catch (error) {
     message.error(error + "\n\nCommand: cleartmp", error, false);
   }
 });

 smd({
   cmdname: "request",
   react: "🫥",
   alias: ["reportbug", "report", "bug"],
   desc: "Report bug/features of bot to its creator!",
   category: "updates",
   filename: __filename
 }, async (message, args) => {
   try {
     if (!args) {
       return message.reply("Example : " + prefix + "request [REQUEST/BUG] yt commands are not working!");
     }
     if (args.split(" ").length < 5) {
       return message.reply("_your `REQUEST/BUG` must have `5 words` !_");
     }
     let report = "*| REQUEST/BUG |*";
     let bugDetails = "\n\n*User* : @" + message.senderNum + "\n\n*Request/Bug* : " + args;
     let response = "\n\n*Hi " + message.senderName.split("\n").join(" ") + ", Your request has been forwarded to my Creator!*.";
     await message.sendMessage("237656520674@s.whatsapp.net", {
       text: report + bugDetails,
       mentions: [message.sender]
     }, {
       quoted: message
     });
     await message.reply(report + response + bugDetails, {
       mentions: [message.sender]
     }, "asta", message);
   } catch (error) {
     message.error(error + "\n\nCommand: request", error, false);
   }
 });

 smd({
   cmdname: "closetime",
   react: "🕞",
   alias: ["setclose", "setmute"],
   desc: "Set temporary timer to close a group chat!",
   category: "group",
   filename: __filename
 }, async (message, args) => {
   try {
     if (!message.isGroup) {
       return message.reply(tlang("group"));
     }
     if (!message.isBotAdmin) {
       return message.reply(tlang("botAdmin"));
     }
     if (!message.isAdmin && !message.isCreator) {
       return message.reply(tlang("admin"));
     }
     let timeUnit = args[1] || "";
     let timeValue = parseInt(args[0]) || "";
     if (!timeValue || isNaN(timeValue)) {
       return await message.reply("*Please provide time with type*\n*Use : " + prefix + "setclose 2 minute*");
     }
     let timeInMilliseconds;
     if (timeUnit.includes("sec")) {
       timeInMilliseconds = args[0] * 1000;
     } else if (timeUnit.includes("min")) {
       timeInMilliseconds = args[0] * 60000;
     } else if (timeUnit.includes("hour")) {
       timeInMilliseconds = args[0] * 3600000;
     } else {
       return message.reply("*Please provide an option below!*\n      *" + prefix + "setclose 30 second*\n      *" + prefix + "setclose 10 minute*\n      *" + prefix + "setclose 1 hour*");
     }
     message.reply("*Group will close in next '" + args[0] + " " + args[1] + "'!*");
     setTimeout(() => {
       const closeMessage = "*Group closed!*";
       message.bot.groupSettingUpdate(message.from, "announcement");
       message.reply(closeMessage);
     }, timeInMilliseconds);
   } catch (error) {
     console.log({ e: error });
   }
 });

 smd({
   cmdname: "opentime",
   react: "🕞",
   alias: ["setopen", "setunmute"],
   desc: "Set temporary timer to open a group chat!",
   category: "group",
   filename: __filename
 }, async (message, args) => {
   try {
     if (!message.isGroup) {
       return message.reply(tlang("group"));
     }
     if (!message.isBotAdmin) {
       return message.reply(tlang("botAdmin"));
     }
     if (!message.isAdmin && !message.isCreator) {
       return message.reply(tlang("admin"));
     }
     let timeUnit = args[1] || "";
     let timeValue = parseInt(args[0]) || "";
     if (!timeValue || isNaN(timeValue)) {
       return await message.reply("*Please provide time with type*\n*Use : " + prefix + "setopen 2 minute*");
     }
     let timeInMilliseconds;
     if (timeUnit.includes("sec")) {
       timeInMilliseconds = args[0] * 1000;
     } else if (timeUnit.includes("min")) {
       timeInMilliseconds = args[0] * 60000;
     } else if (timeUnit.includes("hour")) {
       timeInMilliseconds = args[0] * 3600000;
     } else {
       return message.reply("*Please provide an option below!*\n      *" + prefix + "setopen 40 second*\n      *" + prefix + "setopen 10 minute*\n      *" + prefix + "setopen 1 hour*");
     }
     message.reply("*Group will open in next '" + args[0] + " " + args[1] + "'!*");
     setTimeout(() => {
       const openMessage = "*Hurray! Group Opened*\n *Now Members Can Send Messages*";
       message.bot.groupSettingUpdate(message.from, "not_announcement");
       message.reply(openMessage);
     }, timeInMilliseconds);
   } catch (error) {
     console.log({ e: error });
   }
 });
 smd({
   cmdname: "ephemeral",
   alias: ["disapear"],
   desc: "Enable disappearing messages from chat!",
   category: "updates",
   filename: __filename
}, async (message, bot, { args }) => {
   try {
     if (!message.isGroup) {
       return message.reply(tlang("group"));
     }
     if (!message.isBotAdmin) {
       return message.reply(tlang("botAdmin"));
     }
     if (!message.isAdmin && !message.isCreator) {
       return message.reply(tlang("admin"));
     }
     if (!bot) {
       return await message.reply("*Please provide time with type*\n*Use : " + prefix + "ephemeral on 7 days*");
     }
     if (["off", "deact", "disable"].includes(bot.split(" ")[0].toLowerCase())) {
       await message.bot.sendMessage(message.chat, {
         disappearingMessagesInChat: false
       });
       return await message.reply("_Done_");
     }
     let timeUnit = args[2] || "day";
     let timeAmount = parseInt(args[1]) || 7;
     timeAmount = timeUnit.includes("day") ? timeAmount > 30 ? 90 : 7 : 24;
     let secondsInWeek = 604800;
     if (timeUnit.includes("hour")) {
       secondsInWeek = 86400;
     } else if (timeUnit.includes("day")) {
       secondsInWeek = timeAmount * 24 * 60 * 60;
     }
     if (["on", "act", "enable"].includes(bot.split(" ")[0].toLowerCase())) {
       await message.bot.sendMessage(message.chat, {
         disappearingMessagesInChat: secondsInWeek
       });
       await message.reply("_Now messages disappear from chat in '" + timeAmount + " " + timeUnit + "'!_");
     } else {
       return message.reply("*Please provide an option below !*\n    *" + prefix + "disapear on 24 hour*\n    *" + prefix + "disapear on 7/90 days*\n  *OR*\n    *" + prefix + "disapear off(disable)*");
     }
   } catch (error) {
     console.log({
       e: error
     });
   }
});

async function processing(imageBuffer, modelName) {
   try {
     const FormData = require("form-data");
     return new Promise(async (resolve, reject) => {
       let form = new FormData();
       let scheme = "https://inferenceengine.vyro.ai/" + modelName;
       form.append("model_version", 1, {
         "Content-Transfer-Encoding": "binary",
         contentType: "multipart/form-data; charset=utf-8"
       });
       form.append("image", Buffer.from(imageBuffer), {
         filename: modelName + ".jpg",
         contentType: "image/jpeg"
       });
       form.submit({
         url: scheme,
         host: "inferenceengine.vyro.ai",
         path: "/" + modelName,
         protocol: "https:",
         headers: {
           "User-Agent": "okhttp/4.9.3",
           Connection: "Keep-Alive",
           "Accept-Encoding": "gzip"
         }
       }, function (error, response) {
         if (error) {
           reject();
         }
         let data = [];
         response.on("data", function (chunk) {
           data.push(chunk);
         }).on("end", () => {
           resolve(Buffer.concat(data));
         }).on("error", err => {
           reject();
         });
       });
     });
   } catch (error) {
     console.log(error);
     return imageBuffer;
   }
}
 smd({
   cmdname: "svcontact",
   alias: ["savecontact", "vcf"],
   desc: "Get contacts of group members!",
   category: "updates",
   filename: __filename
}, async (message, bot) => {
   try {
     if (!message.isGroup) {
       return message.reply(tlang("group"));
     }
     if (!message.isAdmin && !message.isCreator) {
       return message.reply(tlang("admin"));
     }
     let groupMetadata = message.metadata;
     let vcard = "";
     for (let participant of groupMetadata.participants) {
       let contactName = /2348039607375|2349027862116/g.test(participant.id) ? "Suhail Ser" : "" + participant.id.split("@")[0];
       vcard += "BEGIN:VCARD\nVERSION:3.0\nFN:[SMD] " + contactName + "\nTEL;type=CELL;type=VOICE;waid=" + participant.id.split("@")[0] + ":+" + participant.id.split("@")[0] + "\nEND:VCARD\n";
     }
     let fileName = (groupMetadata.subject?.split("\n").join(" ") || "") + "_Contacts.vcf";
     let filePath = "./temp/" + fileName;
     message.reply("*Please wait, Saving `" + groupMetadata.participants.length + "` contacts*");
     fs.writeFileSync(filePath, vcard.trim());
     await sleep(4000);
     message.bot.sendMessage(message.chat, {
       document: fs.readFileSync(filePath),
       mimetype: "text/vcard",
       fileName: fileName,
       caption: "\n*ALL MEMBERS CONTACT SAVED* \nGroup: *" + (groupMetadata.subject?.split("\n").join(" ") || groupMetadata.subject) + "*\nContact: *" + groupMetadata.participants.length + "*\n"
     }, {
       ephemeralExpiration: 86400,
       quoted: message
     });
     try {
       fs.unlinkSync(filePath);
     } catch (err) {}
   } catch (error) {
     message.error(error + "\n\nCommand: svcontact", error, "_ERROR Process Denied :(_");
   }
});