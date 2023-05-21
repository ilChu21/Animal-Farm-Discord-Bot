import { ethers } from 'ethers';
import { MAT_ADDRESS, MAT_ABI } from '../contracts/mat_contract.js';
import { Get_Pcs_V2_Price } from './pcs_v2_router_functions.js';
import {
  BUSD_ADDRESS,
  AFP_ADDRESS,
  AFD_ADDRESS,
} from '../contracts/token_contracts.js';

import {
  calculateLpPrice,
  afpBusdLiquidity,
  afdBusdLiquidity,
  afdWbnbLiquidity,
  circulatingAfpBusd,
  circulatingAfdBusd,
  circulatingAfdWbnb,
} from '../functions/liquidity.js';

export async function getBnbPrice(provider) {
  try {
    const contract = new ethers.Contract(MAT_ADDRESS, MAT_ABI, provider);
    return ethers.utils.formatEther(await contract.getBnbPrice());
  } catch (error) {
    console.error(error);
  }
}

export async function getBusdPrice(provider) {
  try {
    return await Get_Pcs_V2_Price(BUSD_ADDRESS, provider);
  } catch (error) {
    console.error(error);
  }
}

export async function getAfpPrice(provider) {
  try {
    return await Get_Pcs_V2_Price(AFP_ADDRESS, provider);
  } catch (error) {
    console.error(error);
  }
}

export async function getAfdPrice(provider) {
  try {
    return await Get_Pcs_V2_Price(AFD_ADDRESS, provider);
  } catch (error) {
    console.error(error);
  }
}

export async function getAfpBusdPrice(provider) {
  try {
    return await calculateLpPrice(
      await afpBusdLiquidity(provider),
      await circulatingAfpBusd(provider)
    );
  } catch (error) {
    console.error(error);
  }
}

export async function getAfdBusdPrice(provider) {
  try {
    return await calculateLpPrice(
      await afdBusdLiquidity(provider),
      await circulatingAfdBusd(provider)
    );
  } catch (error) {
    console.error(error);
  }
}

export async function getAfdWbnbPrice(provider) {
  try {
    return await calculateLpPrice(
      await afdWbnbLiquidity(provider),
      await circulatingAfdWbnb(provider)
    );
  } catch (error) {
    console.error(error);
  }
}
