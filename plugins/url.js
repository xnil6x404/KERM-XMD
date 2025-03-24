const axios = require('axios'),
  FormData = require('form-data'),
  fs = require('fs'),
  os = require('os'),
  path = require('path'),
  mime = require('mime-types'),
 { plugins, smd, Config } = require("../lib");

smd(
  {
    pattern: 'tourl',
    alias: ['imgtourl', 'imgurl', 'url'],
    react: '🔗',
    desc: 'Convert media to URL using catbox.moe API.',
    category: 'general',
    use: '.maid',
    filename: __filename,
  },
  async (
    message,
    text,
    { from, quoted, reply }
  ) => {
    try {
      let mediaMessage = quoted ? quoted : text,
        mimeType = (mediaMessage.msg || mediaMessage).mimetype || ''
      
      if (!mimeType) {
        throw '❌ *Error: Please reply to a media message.*'
      }

      let mediaBuffer = await mediaMessage.download()
      const fileExtension = mime.extension(mimeType) || ''
      let tempFilePath = path.join(
        os.tmpdir(),
        'catboxupload_' + Date.now() + (fileExtension ? '.' + fileExtension : '')
      )
      
      fs.writeFileSync(tempFilePath, mediaBuffer)

      let formData = new FormData()
      formData.append('reqtype', 'fileupload')
      formData.append('fileToUpload', fs.createReadStream(tempFilePath))

      let response = await axios.post(
        'https://catbox.moe/user/api.php',
        formData,
        { headers: { ...formData.getHeaders() } }
      ),
      uploadedUrl = response.data.trim()

      if (!uploadedUrl.startsWith('http')) {
        throw '❌ *Error: Invalid response from catbox.moe API.*'
      }

      fs.unlinkSync(tempFilePath)
      
      // Beautifying the response message
      reply(
        `✨ *Upload Successful!* ✨\n\n` +
        `✅ *File Size:* ${mediaBuffer.length} Byte(s)\n` +
        `📤 *URL:* [Click here](${uploadedUrl})\n\n` +
        `> *Uploaded by Kᴇʀᴍ Xmd*\n`
      )
    } catch (error) {
      reply('❌ *An error occurred:*\n' + error)
      console.error(error)
    }
  }
)