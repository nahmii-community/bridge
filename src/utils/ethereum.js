import { Contract } from "ethers";
import ERC20ABI from "../lib/ABI/ERC20ABI.json";

export const getBalance = async (address, provider) => {
    const balance = await provider.getBalance(address);
    return balance;
}

export const getERC20Balance = async (targetAddress, tokenAddress, provider) => {
    const contract = new Contract(tokenAddress, ERC20ABI, provider);
    const balance = await contract.balanceOf(targetAddress);
    return balance;
}

export const getAllowance = async (ownerAddress, spenderAddress, tokenAddress, provider) => {
    const contract = new Contract(tokenAddress, ERC20ABI, provider);
    const balance = await contract.allowance(ownerAddress, spenderAddress);
    return balance;
}

export const approveAllowance = async (spenderAddress, allowAmount, tokenAddress, provider) => {
    const contract = new Contract(tokenAddress, ERC20ABI, provider);
    const success = await contract.approve(spenderAddress, allowAmount);
    return success;
}