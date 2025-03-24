//#ENJOY BRO😍
const fs = require("fs-extra");
if (fs.existsSync(".env"))
  require("dotenv").config({ path: __dirname + "/.env" });
global.audio = "";
global.video = "";
global.port = process.env.PORT;
global.appUrl = process.env.APP_URL || "";
global.email = "Kermd237@gmail.com";
global.location = "Douala, Cameroun";
global.mongodb = process.env.MONGODB_URL || "mongodb+srv://Rayan:<Emmanuel237>@cluster0.8twd0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
global.allowJids = process.env.ALLOW_JID || "null";
global.blockJids = process.env.BLOCK_JID || "null";
global.DATABASE_URL = process.env.DATABASE_URL || "";
global.timezone = process.env.TZ || process.env.TIME_ZONE || "Africa/Douala";
global.github = process.env.GITHUB || "https://github.com/Kgtech-cmr/KERM-XMD";
global.gurl = process.env.GURL || "https://whatsapp.com/channel/0029Vafn6hc7DAX3fzsKtn45";
global.website = process.env.GURL || "https://whatsapp.com/channel/0029Vafn6hc7DAX3fzsKtn45";
global.THUMB_IMAGE = process.env.THUMB_IMAGE || process.env.IMAGE || "https://files.catbox.moe/gqcoxn.jpeg";
global.devs = "https://wa.me/237650564445 , https://wa.me/237656520674";
global.sudo = process.env.SUDO || "8801818512416";
global.owner = process.env.OWNER_NUMBER || "8801818512416";
global.style = process.env.STYLE || "3";
global.gdbye = process.env.GOODBYE || "false";
global.wlcm = process.env.WELCOME || "false";
global.warncount = process.env.WARN_COUNT || 3;
global.disablepm = process.env.DISABLE_PM || "false";
global.disablegroup = process.env.DISABLE_GROUPS || "false",
global.MsgsInLog = process.env.MSGS_IN_LOG || "false";
global.userImages = process.env.USER_IMAGES || "https://files.catbox.moe/gqcoxn.jpeg";
global.waPresence = process.env.WAPRESENCE || "available";
global.readcmds = process.env.READ_COMMAND || "true";
global.readmessage = process.env.READ_MESSAGE || "false";
global.readmessagefrom = process.env.READ_MESSAGE_FROM || "";
global.read_status = process.env.AUTO_READ_STATUS || "true";
global.save_status = process.env.AUTO_SAVE_STATUS || "false";
global.save_status_from = process.env.SAVE_STATUS_FROM || "";
global.read_status_from = process.env.READ_STATUS_FROM || "";

global.api_smd = "https://api-smd-1.vercel.app";
global.scan = "https://kgtech-v2-session.onrender.com";

global.SESSION_ID =
  process.env.SESSION_ID ||
  "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZUw5REZmMXN6M2Q0bE1BM1IweWNSNmc0RlpIWVFEaVVrb0ROdXNtS3RVVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK3F5NUk3SnVHRlhqbDZtQUF6QkpMaXh5bWZMc3o3OGZNTFFjRnRFejd3VT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVSGdxd0U5Y2tCZWhldFhTSks1MEgreUNZRHV4WjhJYlBjK2YxSFpSb1Z3PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxSVNKbkFkd1U1VmlyYjBvSUk1S1NwRUxoUXlkaUhyOEs2cU9XYVg1RHlBPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVFRUlXYlN1Qkp5eXdKMTN6WnF2N0trdUdyMkZHeHR0UjdzR1U1SW95M1E9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InpIUEMvRC9rYzZ3dVBYUWtVU1J6N1I5WmYyb3Zpbk1jUWZGWVM4K2NKVTQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNElXWE1PVmN6NlVTSklBSmp6cnNKSU11dnpQVmRHQ0VTOE9HTlFQRFhGWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWTVMUmtVMVhZYlk4SHlWK3I1SXpXNU8yNGtTamU2UjdxdUx2dU5VNTB3ST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Iit5K2ZWL04weSt2VWF0TldUbUNwbmpHTEdKMEZhdjNtUlQzeWd5cDdEVGhPUThXQjVTUGpRZ096a3JLK1U2Nk5GK3o2NGlxMVJPUFJuakhBZ3FJdWlRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTg0LCJhZHZTZWNyZXRLZXkiOiJRejlLcWt0enNONXRUZXFBMmxBS2dGOEs2YjZId3dDd0pBVkU0OXlCOURFPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6Ijg4MDE3ODA2NDEzNzRAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiRjJBMkIxNEE1MEUwQ0YyMkE2NkY0OURCNzk0NEQ5QjgifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0MjgzMjAxOX0seyJrZXkiOnsicmVtb3RlSmlkIjoiODgwMTc4MDY0MTM3NEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJERkFEQTRBQjE0MkE0MzE2MzgwQjc2QzhFMTU3RTVGRCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQyODMyMDE5fSx7ImtleSI6eyJyZW1vdGVKaWQiOiI4ODAxNzgwNjQxMzc0QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjBBQjA3MURCNkZDODVEOTUyNEUzMTZFMDk0Q0VFNUJBIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDI4MzIwMjJ9LHsia2V5Ijp7InJlbW90ZUppZCI6Ijg4MDE3ODA2NDEzNzRAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiREU0NDRBRjU5NjgzMjQwOENCODg2REI5MUZCNUZEMjAifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0MjgzMjAyMn1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiYWd6ZGZna2VSa2VPczFHS3p4SHg5USIsInBob25lSWQiOiIwNGZmYzVhZC01ZTQ2LTRiMWItOTZjOC1jNDFiOTMxYzIwNmYiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0RZYzkvNlJqYnBBdFNGZXJYNllFdWpveFpjPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InBvaHBDb2lnOXV3VXBkejZhNTlhUDNWdmtFcz0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiIzVEM5TExNWiIsIm1lIjp7ImlkIjoiODgwMTc4MDY0MTM3NDo0QHMud2hhdHNhcHAubmV0IiwibmFtZSI6InNoYXdvbnhuaWwxNDMifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0l5WnJjb0JFSU9EaHI4R0dBUWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Ik50WHN1NTZXbG9Ua0xDdW9uS2RscWJPUkNXNFZ6WUpmc2Z4Z1E2Q2lla3c9IiwiYWNjb3VudFNpZ25hdHVyZSI6ImM0dDVTNjVrK2tzUHZKTlR5eEVTRGkzUkFUYmQyQWovNThDd3dSRkNCU2pRNlcyRjJTMWZqbFVqWll6S2RicWJ6WS9DMlpoVkpBUHJnRG95VVpTaUJ3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJpNTBySkkwYXVhZGRET2wyeVp1aEQvelk5SVJXa29FeGdiSzM2MnVuVnlwTHNvdGZjRkFzZDBVdndVK0ovWWMyUFpXV2RWWmJydE9NVmNnQ1BhOUppQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6Ijg4MDE3ODA2NDEzNzQ6NEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJUYlY3THVlbHBhRTVDd3JxSnluWmFtemtRbHVGYzJDWDdIOFlFT2dvbnBNIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQyODMyMDE4LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUtHOCJ9"
module.exports = {
  menu: process.env.MENU || "1",
  HANDLERS: process.env.PREFIX || ".",
  BRANCH: process.env.BRANCH || "main",
  VERSION: process.env.VERSION || "2.1.0",
  caption: process.env.CAPTION || "`BRAND PRODUCT OF ☞⌜ KG TECH⌝☜`",
  author: process.env.PACK_AUTHER || "KG TECH",
  packname: process.env.PACK_NAME || "𝗞𝗘𝗥𝗠-𝗫𝗠𝗗",
  botname: process.env.BOT_NAME || "𝗞𝗘𝗥𝗠-𝗫𝗠𝗗",
  ownername: process.env.OWNER_NAME || "☞⌜ KG TECH⌝☜",
  errorChat: process.env.ERROR_CHAT || "",
  KOYEB_API: process.env.KOYEB_API || "false",
  REMOVE_BG_KEY: process.env.REMOVE_BG_KEY || "",
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || "",
  HEROKU_API_KEY: process.env.HEROKU_API_KEY || "",
  HEROKU_APP_NAME: process.env.HEROKU_APP_NAME || "",
  antilink_values: process.env.ANTILINK_VALUES || "all",
  HEROKU: process.env.HEROKU_APP_NAME && process.env.HEROKU_API_KEY,
  aitts_Voice_Id: process.env.AITTS_ID || "37",
  ELEVENLAB_API_KEY: process.env.ELEVENLAB_API_KEY || "...d336",
  WORKTYPE: process.env.WORKTYPE || process.env.MODE || "public",
  LANG: (process.env.THEME || "KERM").toUpperCase(),
};
global.rank = "updated";
global.isMongodb = false;
let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(`Update'${__filename}'`);
  delete require.cache[file];
  require(file);
});
