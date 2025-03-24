const { cmd } = require("../lib/plugins");
const axios = require('axios');
const fs = require('fs');
const os = require('os');
const path = require('path');
const FormData = require('form-data');
const mime = require('mime-types');

cmd(
  {
    pattern: 'url',
    alias: ['imgtourl', 'imgurl', 'tourl'],
    react: '🔗',
    desc: 'Convert media to URL using catbox.moe API.',
    category: 'general',
    filename: __filename,
  },
  async (message, text, { from, quoted }) => {
    try {
      // Utilise le message cité s'il existe, sinon le texte
      let mediaMessage = quoted ? quoted : text;

      // Affiche la structure du mediaMessage pour aider au débogage
      console.log("mediaMessage:", JSON.stringify(mediaMessage, null, 2));

      // Vérifie plusieurs chemins pour récupérer le mimetype
      let mimeType = (mediaMessage.msg || mediaMessage).mimetype;
      if (!mimeType && mediaMessage.message && mediaMessage.message.imageMessage) {
        mimeType = mediaMessage.message.imageMessage.mimetype;
      }
      if (!mimeType && mediaMessage.message && mediaMessage.message.videoMessage) {
        mimeType = mediaMessage.message.videoMessage.mimetype;
      }

      // Si le mimetype n'est toujours pas trouvé, on affiche un message détaillé
      if (!mimeType) {
        console.error("Mime type introuvable. Vérifie la structure du message cité ci-dessus.");
        return await message.reply(
          "❌ *Error: Please reply to a media message.*\n" +
          "Il semble que le message auquel vous répondez ne contienne pas de média ou que la structure ne corresponde pas. Consultez la console pour plus de détails."
        );
      }

      // Téléchargement du média
      let mediaBuffer = await mediaMessage.download();
      if (!mediaBuffer) {
        console.error("Erreur lors du téléchargement du média.");
        return await message.reply("❌ *Error: Unable to download the media message.*");
      }
      
      const fileExtension = mime.extension(mimeType) || '';
      let tempFilePath = path.join(
        os.tmpdir(),
        'catboxupload_' + Date.now() + (fileExtension ? '.' + fileExtension : '')
      );
      
      fs.writeFileSync(tempFilePath, mediaBuffer);

      // Prépare le formulaire pour l'upload
      let formData = new FormData();
      formData.append('reqtype', 'fileupload');
      formData.append('fileToUpload', fs.createReadStream(tempFilePath));

      let response = await axios.post(
        'https://catbox.moe/user/api.php',
        formData,
        { headers: { ...formData.getHeaders() } }
      );
      let uploadedUrl = response.data.trim();

      if (!uploadedUrl.startsWith('http')) {
        console.error("Réponse invalide de l'API catbox.moe:", response.data);
        return await message.reply('❌ *Error: Invalid response from catbox.moe API.*');
      }

      fs.unlinkSync(tempFilePath);
      
      // Envoi de la réponse finale
      return await message.reply(
        `✨ *Upload Successful!* ✨\n\n` +
        `✅ *File Size:* ${mediaBuffer.length} Byte(s)\n` +
        `📤 *URL:* [Click here](${uploadedUrl})\n\n` +
        `> *Uploaded by Kᴇʀᴍ Xmd*\n`
      );
    } catch (error) {
      console.error("Error in url command:", error);
      return await message.reply('❌ *An error occurred:*\n' + error);
    }
  }
);