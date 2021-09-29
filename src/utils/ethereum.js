import { Contract } from "ethers";
import ERC20ABI from "../lib/ABI/ERC20ABI.json";

export const getERC20Balance = async (targetAddress, tokenAddress, provider) => {
    const contract = new Contract(tokenAddress, ERC20ABI, provider);
    const balance = await contract.balanceOf(targetAddress);
    return balance;
}