import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

export const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
export const TELEGRAM_API_KEY = process.env.TELEGRAM_API_KEY;
export const PRICES_CATEGORY_ID = process.env.PRICES_CATEGORY_ID;
export const ANNOUNCEMENTS_CHANNEL_ID = process.env.ANNOUNCEMENTS_CHANNEL_ID;
export const BNB_CHANNEL_ID = process.env.BNB_CHANNEL_ID;
export const AFP_CHANNEL_ID = process.env.AFP_CHANNEL_ID;
export const AFD_CHANNEL_ID = process.env.AFD_CHANNEL_ID;
export const AFP_BUSD_CHANNEL_ID = process.env.AFP_BUSD_CHANNEL_ID;
export const AFD_BUSD_CHANNEL_ID = process.env.AFD_BUSD_CHANNEL_ID;
export const AFD_WBNB_CHANNEL_ID = process.env.AFD_WBNB_CHANNEL_ID;
