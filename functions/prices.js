import { ethers } from 'ethers';
import { MAT_ADDRESS, MAT_ABI } from '../contracts/mat_contract.js';
import { Get_Pcs_V2_Price } from './pcs_v2_router_functions.js';
import { WBNB_ADDRESS } from '../contracts/wbnb_contract.js';
import { AFP_ADDRESS } from '../contracts/afp_contract.js';
import { AFD_ADDRESS } from '../contracts/afd_contract.js';

export async function getBnbPrice(provider) {
  try {
    const contract = new ethers.Contract(MAT_ADDRESS, MAT_ABI, provider);
    return ethers.utils.formatEther(await contract.getBnbPrice());
  } catch (error) {
    console.error(error);
  }
}

export async function getAfpPrice(provider) {
  try {
    const afpWbnb = await Get_Pcs_V2_Price(AFP_ADDRESS, WBNB_ADDRESS, provider);
    return afpWbnb * (await getBnbPrice(provider));
  } catch (error) {
    console.error(error);
  }
}

export async function getAfdPrice(provider) {
  try {
    const afdWbnb = await Get_Pcs_V2_Price(AFD_ADDRESS, WBNB_ADDRESS, provider);
    return afdWbnb * (await getBnbPrice(provider));
  } catch (error) {
    console.error(error);
  }
}
