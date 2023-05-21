import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
import {
  getBnbPrice,
  getAfpPrice,
  getAfdPrice,
  getAfpBusdPrice,
  getAfdBusdPrice,
  getAfdWbnbPrice,
} from '../functions/prices.js';
import {
  BNB_CHANNEL_ID,
  AFP_CHANNEL_ID,
  AFD_CHANNEL_ID,
  AFP_BUSD_CHANNEL_ID,
  AFD_BUSD_CHANNEL_ID,
  AFD_WBNB_CHANNEL_ID,
} from './env_vars.js';

export const channels = [
  { id: BNB_CHANNEL_ID, fn: getBnbPrice, prefix: 'BNB' },
  { id: AFP_CHANNEL_ID, fn: getAfpPrice, prefix: 'AFP' },
  { id: AFD_CHANNEL_ID, fn: getAfdPrice, prefix: 'AFD' },
  { id: AFP_BUSD_CHANNEL_ID, fn: getAfpBusdPrice, prefix: 'AFP/BUSD' },
  { id: AFD_BUSD_CHANNEL_ID, fn: getAfdBusdPrice, prefix: 'AFD/BUSD' },
  { id: AFD_WBNB_CHANNEL_ID, fn: getAfdWbnbPrice, prefix: 'AFD/WBNB' },
];
