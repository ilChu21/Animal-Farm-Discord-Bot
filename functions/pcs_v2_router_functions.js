import { ethers } from 'ethers';
import {
  PCS_V2_ROUTER_ADDRESS,
  PCS_V2_ROUTER_ABI,
} from '../contracts/pcs_v2_router_contract.js';

export async function Get_Pcs_V2_Price(
  tokenInAddress,
  tokenOutAddress,
  provider
) {
  try {
    const contract = new ethers.Contract(
      PCS_V2_ROUTER_ADDRESS,
      PCS_V2_ROUTER_ABI,
      provider
    );
    const amountIn = ethers.utils.parseEther('1');
    const amountOut = await contract.getAmountsIn(amountIn, [
      tokenOutAddress,
      tokenInAddress,
    ]);

    return ethers.utils.formatEther(amountOut[0]);
  } catch (error) {
    console.error(error);
  }
}
