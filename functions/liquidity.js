import { ethers } from 'ethers';
import { BEP20_ABI } from '../contracts/bep20_abi.js';
import {
  BUSD_ADDRESS,
  WBNB_ADDRESS,
  AFP_BUSD_ADDRESS,
  AFD_BUSD_ADDRESS,
  AFD_WBNB_ADDRESS,
} from '../contracts/token_contracts.js';
import { getBusdPrice, getBnbPrice } from './prices.js';

export async function calculateLiquidity(tokenBalance, tokenPrice) {
  try {
    return (await tokenBalance) * (await tokenPrice) * 2;
  } catch (error) {
    console.error(error);
  }
}

export async function getCirculatingLp(lpAddress, provider) {
  try {
    const contract = new ethers.Contract(lpAddress, BEP20_ABI, provider);
    return ethers.utils.formatEther(await contract.totalSupply());
  } catch (error) {
    console.error(error);
  }
}

export async function getBalanceOf(tokenAddress, contractAddress, provider) {
  try {
    const contract = new ethers.Contract(tokenAddress, BEP20_ABI, provider);
    return ethers.utils.formatEther(await contract.balanceOf(contractAddress));
  } catch (error) {
    console.error(error);
  }
}

export async function afpBusdLiquidity(provider) {
  try {
    return await calculateLiquidity(
      await getBalanceOf(BUSD_ADDRESS, AFP_BUSD_ADDRESS, provider),
      await getBusdPrice(provider)
    );
  } catch (error) {
    console.error(error);
  }
}

export async function afdBusdLiquidity(provider) {
  try {
    return await calculateLiquidity(
      await getBalanceOf(BUSD_ADDRESS, AFD_BUSD_ADDRESS, provider),
      await getBusdPrice(provider)
    );
  } catch (error) {
    console.error(error);
  }
}

export async function afdWbnbLiquidity(provider) {
  try {
    return await calculateLiquidity(
      await getBalanceOf(WBNB_ADDRESS, AFD_WBNB_ADDRESS, provider),
      await getBnbPrice(provider)
    );
  } catch (error) {
    console.error(error);
  }
}

export async function circulatingAfpBusd(provider) {
  try {
    return await getCirculatingLp(AFP_BUSD_ADDRESS, provider);
  } catch (error) {
    console.error(error);
  }
}

export async function circulatingAfdBusd(provider) {
  try {
    return await getCirculatingLp(AFD_BUSD_ADDRESS, provider);
  } catch (error) {
    console.error(error);
  }
}

export async function circulatingAfdWbnb(provider) {
  try {
    return await getCirculatingLp(AFD_WBNB_ADDRESS, provider);
  } catch (error) {
    console.error(error);
  }
}

export async function calculateLpPrice(liquidity, circulatingLp) {
  try {
    return (await liquidity) / (await circulatingLp);
  } catch (error) {
    console.error(error);
  }
}
