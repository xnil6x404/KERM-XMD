const {
  smd,
  tlang,
  prefix,
  Config,
  sleep,
  astroJson,
  smdBuffer
} = require("../lib");

const axios = require("axios");

smd({
  cmdname: "stickersearch",
  alias: ["sticsearch"],
  category: "search",
  use: "[text]",
  info: "Searches Stickers"
}, async (message, searchTerm) => {
  try {
    const { generateSticker } = require("../lib");
    if (!searchTerm) {
      return message.reply("Sorry you did not give any search term!");
    }

    const response = await axios.get(`https://g.tenor.com/v1/search?q=${encodeURIComponent(searchTerm)}&key=LIVDSRZULELA&limit=8`).catch(() => {});
    if (!response.data || !response.data.results || !response.data.results[0]) {
      return message.reply("*Could not find!*");
    }

    const resultsLimit = response.data.results.length > 5 ? 5 : response.data.results.length;
    for (let i = 0; i < resultsLimit; i++) {
      const mediaUrl = response.data.results[i]?.media[0]?.mp4?.url;
      const stickerBuffer = await smdBuffer(mediaUrl);
      
      const stickerOptions = {
        pack: Config.packname,
        author: Config.author,
        type: "full",
        quality: 1
      };

      if (stickerBuffer) {
        generateSticker(message, stickerBuffer, stickerOptions);
      }
    }
  } catch (error) {
    message.error(error + "\n\nCommand: stickersearch", error, "*Could not find*");
  }
});