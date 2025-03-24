const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');
const util = require('util');
const { cmd } = require("../lib/plugins");

// Supported media types
let mediaTypes = ["videoMessage", "imageMessage"];

// Function to create a URL using the catbox.moe API
async function createUrl(filePath) {
  try {
    let formData = new FormData();
    formData.append('reqtype', 'fileupload');
    formData.append('fileToUpload', fs.createReadStream(filePath));
    
    // Call the catbox.moe API
    let response = await axios.post(
      'https://catbox.moe/user/api.php',
      formData,
      { headers: { ...formData.getHeaders() } }
    );
    
    let uploadedUrl = response.data.trim();
    if (!uploadedUrl.startsWith('http')) {
      throw new Error("Réponse invalide de l'API catbox.moe");
    }
    return uploadedUrl;
  } catch (error) {
    console.error("Erreur lors de la création de l'URL :", error);
    return null;
  }
}

// Command to convert an image or video to a URL
cmd({
  pattern: "url",
  alias: ["createurl"],
  category: "general",
  filename: __filename,
  desc: "Convertit une image ou une vidéo en URL.",
  use: "<video | image>",
  react: "🔗"
}, async (message) => {
  try {
    // Determine if the current message is a media message or if we need to use the replied message
    let mediaMessage = mediaTypes.includes(message.mtype) ? message : message.reply_message;
    
    if (!mediaMessage || !mediaTypes.includes(mediaMessage?.mtype)) {
      return message.reply("*_Merci de répondre à une image ou vidéo !_*");
    }

    // Download and save the media file temporarily
    let filePath = await message.bot.downloadAndSaveMediaMessage(mediaMessage);

    // Create a URL using the API
    let mediaUrl = await createUrl(filePath);

    if (!mediaUrl) {
      return message.reply("*_Échec de la création de l'URL !_*");
    }

    // Attempt to delete the temporary file
    try {
      fs.unlinkSync(filePath);
    } catch (error) {
      // Ignore any errors while deleting the file
    }

    // Send the URL in the chat
    await message.send(util.format(mediaUrl), {}, "asta", mediaMessage);
  } catch (error) {
    await message.error(error + "\n\nCommande URL échouée", error);
  }
});