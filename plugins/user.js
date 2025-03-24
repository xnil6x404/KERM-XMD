const {
    tlang,
    getAdmin,
    prefix,
    Config,
    sck,
    sck1,
    fetchJson,
    getBuffer,
    runtime,
    smd,
  } = require('../lib'),
  { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter'),
  fs = require('fs'),
  axios = require('axios'),
  fetch = require('node-fetch'),
  cmd = smd;

cmd(
  {
    pattern: 'jid',
    desc: 'Get JID of all users in a group.',
    category: 'user',
    filename: __filename,
    use: '<@user>',
  },
  async ({ jid, reply, quoted }) => {
    if (quoted) {
      return reply(quoted.sender);
    } else {
      return reply(jid);
    }
  }
);

cmd(
  {
    pattern: 'getpp',
    desc: 'Get profile picture for a given user.',
    category: 'user',
    filename: __filename,
  },
  async (message) => {
    try {
      let userJid = message.reply_message
        ? message.reply_message.sender
        : message.mentionedJid[0]
        ? message.mentionedJid[0]
        : message.from;
      let profilePic;
      try {
        profilePic = await message.bot.profilePictureUrl(userJid, 'image');
      } catch (error) {
        return message.reply('```Profile Pic Not Fetched```');
      }
      return await message.bot.sendMessage(
        message.chat,
        {
          image: { url: profilePic },
          caption: '  *---Profile Pic Is Here---*\n' + Config.caption,
        },
        { quoted: message }
      );
    } catch (error) {
      await message.error(error + '\n\nCommand: getpp', error);
    }
  }
);

cmd(
  {
    pattern: 'whois',
    desc: 'Get information about a user based on replied sticker.',
    category: 'user',
    use: '<reply to any person>',
    filename: __filename,
  },
  async (message) => {
    try {
      let userJid = message.reply_message
        ? message.reply_message.sender
        : message.mentionedJid[0]
        ? message.mentionedJid[0]
        : false;
      if (!userJid && message.isGroup) {
        const groupProfilePic = 
          (await message.bot
            .profilePictureUrl(message.chat, 'image')
            .catch(
              () => 'https://telegra.ph/file/29a8c892a1d18fdb26028.jpg'
            )) || THUMB_IMAGE;
        const groupMetadata = message.metadata;
        const adminList = message.admins
          .map(
            (admin, index) =>
              '  ' + (index + 1) + '. wa.me/' + admin.id.split('@')[0]
          )
          .join('\n');
        const groupOwner =
          groupMetadata.owner ||
          message.admins.find((admin) => admin.admin === 'superadmin')
            ?.id ||
          false;
        let groupInfo =
          '\n      *\u300C GROUP INFORMATION \u300D*\n*\u25A2 NAME :* \n   \u2022 ' +
          groupMetadata.subject +
          '\n*\u25A2 Members :*\n   \u2022 ' +
          groupMetadata.participants.length +
          '\n*\u25A2 Group Owner :*\n   \u2022 ' +
          (groupOwner ? 'wa.me/' + groupOwner.split('@')[0] : 'notFound') +
          '\n*\u25A2 Admins :*\n' +
          adminList +
          '\n*\u25A2 Description :*\n   \u2022 ' +
          (groupMetadata.desc?.toString() || '_not set_') +
          '\n   ';
        return await message.reply(groupProfilePic, { caption: groupInfo }, 'image');
      } else {
        if (!userJid) {
          return message.reply('*_Please reply to a person!_*');
        }
        try {
          var statusInfo = await message.bot.fetchStatus(userJid),
            status = statusInfo.status,
            setAt = statusInfo.setAt.toString(),
            statusDate = setAt.split(' ');
          statusDate.length > 3 && (setAt = statusDate.slice(0, 5).join(' '));
        } catch {
          var status = 'undefined',
            setAt = '';
        }
        var userId = userJid.split('@')[0];
        let userPic;
        try {
          userPic = await message.bot.profilePictureUrl(userJid, 'image');
        } catch (error) {
          userPic = 'https://telegra.ph/file/29a8c892a1d18fdb26028.jpg';
        }
        var userName = await message.bot.getName(userJid);
        return await message.bot.sendMessage(
          message.jid,
          {
            image: { url: userPic },
            caption:
              "\n\u2554\u2550\u2550\u2550\u2550\u25C7\n\u2551 *\u300EPerson's  Information\u300F*\n\u2551 \n\u2551 *\uD83C\uDF6BName :* " +
              userName +
              '\n\u2551 *\uD83D\uDC64Num :* ' +
              userId +
              '\n\u2551 *\uD83C\uDF90Bio    :*  ' +
              status +
              '\n\u2551 *\uD83C\uDF1FSetAt :* ' +
              setAt +
              '\n\u2551    *Keep Calm Dude\uD83E\uDD73*    \u25C7\n\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\n',
          },
          { quoted: message }
        );
      }
    } catch (error) {
      await message.error(error + '\n\nCommand: whois', error);
    }
  }
);
cmd(
  {
    pattern: 'wa',
    desc: 'Makes wa.me link of quoted or mentioned user.',
    category: 'user',
    filename: __filename,
  },
  async ({ reply_message, mentionedJid, reply, error }) => {
    try {
      let userJid = reply_message
        ? reply_message.sender
        : mentionedJid[0]
        ? mentionedJid[0]
        : false;
      
      await reply(
        !userJid
          ? '*Please Reply Or Mention A User*'
          : 'https://wa.me/' + userJid.split('@')[0]
      );
    } catch (err) {
      await error(err + '\n\ncommand : wa', err, false);
    }
  }
);

cmd(
  {
    pattern: 'me',
    desc: 'Makes wa.me link for user.',
    category: 'user',
    filename: __filename,
  },
  async ({ sender, reply }) => {
    try {
      return await reply(
        'https://wa.me/' + sender.split('@')[0]
      );
    } catch (err) {
      console.error(err);
    }
  }
);