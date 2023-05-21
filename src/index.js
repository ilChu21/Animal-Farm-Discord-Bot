import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
import { Client, IntentsBitField, ActivityType } from 'discord.js';
// import TelegramBot from 'node-telegram-bot-api';
import { scheduleJob } from 'node-schedule';
import { createProvider } from '../providers/providers.js';
import { channels } from '../utils/channels.js';
import { getNowUtc } from '../utils/utc.js';
import { numForCur } from '../utils/format.js';
import {
  DISCORD_TOKEN,
  // TELEGRAM_API_KEY,
  PRICES_CATEGORY_ID,
  // ANNOUNCEMENTS_CHANNEL_ID,
} from '../utils/env_vars.js';

const client = new Client({ intents: [IntentsBitField.Flags.Guilds] });
// const token = TELEGRAM_API_KEY;
// const bot = new TelegramBot(token, { polling: true });

client.on('ready', (c) => {
  console.log(`✅ ${c.user.username} Discord bot is online.`);

  client.user.setActivity({
    name: 'Future Piggy Plinko',
    type: ActivityType.Playing,
  });
});

// console.log('✅ Einstein Telegram bot online.');

// bot.on('message', (message) => {
//   let text = message.text;
//   if (!text.toLowerCase().includes('drip')) {
//     const channel = client.channels.cache.get(ANNOUNCEMENTS_CHANNEL_ID);
//     const entities = message.entities;
//     const edits = [];

//     for (const entity in entities) {
//       const url = entities[entity].url;
//       if (url && !text.includes(url)) {
//         const offsetStart = entities[entity].offset;
//         const offsetEnd = offsetStart + entities[entity].length;
//         const foundText = text.substring(offsetStart, offsetEnd);
//         const cleanText = foundText.replace(/[ \n]+$/g, '');
//         const newText = `${cleanText}:\n${url}`;
//         edits.push({ foundText, newText });
//       }
//     }

//     for (const edit of edits) {
//       const { foundText, newText } = edit;

//       text = text.replace(foundText, `${newText}\n\n`);
//     }

//     channel.send(`${text}\nhttps://t.me/forexsharkcalls/${message.message_id}`);
//   } else {
//     console.log('found drip');
//   }
// });

scheduleJob('*/5 * * * *', async () => {
  try {
    const currentUTCTime = getNowUtc();
    const provider = createProvider();

    client.channels.cache
      .get(PRICES_CATEGORY_ID)
      .setName(`▬【💲PRICES-${currentUTCTime} UTC💲】▬`);

    for (const channel of channels) {
      const price = await channel.fn(provider);
      const formattedPrice = numForCur.format(price);

      client.channels.cache
        .get(channel.id)
        .setName(`${channel.prefix}: ${formattedPrice}`);
    }
  } catch (error) {
    console.error(error);
  }
});

client.login(DISCORD_TOKEN);
