import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
import { Client, IntentsBitField, ActivityType } from 'discord.js';
import { scheduleJob } from 'node-schedule';
import { createProvider } from '../providers/providers.js';
import { getBnbPrice, getAfpPrice, getAfdPrice } from '../functions/prices.js';

const client = new Client({ intents: [IntentsBitField.Flags.Guilds] });

// Environment variables
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const PRICES_CATEGORY_ID = process.env.PRICES_CATEGORY_ID;
const BNB_CHANNEL_ID = process.env.BNB_CHANNEL_ID;
const AFP_CHANNEL_ID = process.env.AFP_CHANNEL_ID;
const AFD_CHANNEL_ID = process.env.AFD_CHANNEL_ID;

const numForCur = Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

client.on('ready', (c) => {
  console.log(`✅ ${c.user.username} bot is online.`);

  client.user.setActivity({
    name: 'YouTube',
    type: ActivityType.Streaming,
    url: 'https://www.youtube.com/watch?v=YhjgtvZ6SZg',
  });
});

scheduleJob('*/5 * * * *', async () => {
  try {
    const now = new Date();
    const currentHour = now.getUTCHours().toString().padStart(2, '0');
    const currentMinute = now.getUTCMinutes().toString().padStart(2, '0');
    const currentUTCTime = `${currentHour}:${currentMinute}`;

    const provider = createProvider();

    client.channels.cache
      .get(PRICES_CATEGORY_ID)
      .setName(`▬【💲PRICES-${currentUTCTime} UTC💲】▬`);

    client.channels.cache
      .get(BNB_CHANNEL_ID)
      .setName(`BNB: ${numForCur.format(await getBnbPrice(provider))}`);

    client.channels.cache
      .get(AFP_CHANNEL_ID)
      .setName(`AFP: ${numForCur.format(await getAfpPrice(provider))}`);

    client.channels.cache
      .get(AFD_CHANNEL_ID)
      .setName(`AFD: ${numForCur.format(await getAfdPrice(provider))}`);
  } catch (error) {
    console.error(error);
  }
});

client.login(DISCORD_TOKEN);
