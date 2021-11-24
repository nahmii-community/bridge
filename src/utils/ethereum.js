import { parseUnits } from "@ethersproject/units";
import { Contract } from "ethers";
import { DEFAULT_GAS_L1, DEFAULT_GAS_L2, L2_STANDARD_BRIDGE } from "./constants";
import ERC20ABI from "../lib/ABI/ERC20ABI.json";
import L1StandardBridge from "../lib/ABI/L1StandardBridgeABI.json";
import L2StandardBridge from "../lib/ABI/L2StandardBridgeABI.json";

export const getBalance = async (address, provider) => {
    const balance = await provider.getBalance(address);
    return balance;
}

export const getERC20Balance = async (targetAddress, tokenAddress, provider) => {
    const contract = new Contract(tokenAddress, ERC20ABI, provider);
    const balance = await contract.balanceOf(targetAddress);
    return balance;
}

export const depositETH = async (bridgeAddress, signer, depositAmount) => {
    const contract = new Contract(bridgeAddress, L1StandardBridge, signer);
    const result = await contract.depositETH(DEFAULT_GAS_L2, "0xFFFF", {
        value: parseUnits(depositAmount),
        gasLimit: DEFAULT_GAS_L1
    });
    return result;
}

export const depositERC20 = async (L1TokenAddress, L2TokenAddress, bridgeAddress, signer, depositAmount) => {
    const contract = new Contract(bridgeAddress, L1StandardBridge, signer);
    const result = await contract.depositERC20(L1TokenAddress, L2TokenAddress, depositAmount, DEFAULT_GAS_L2,
        "0x");
    return result;
}

export const withdraw = async (L2TokenAddress, signer, withdrawAmount) => {
    const contract = new Contract(L2_STANDARD_BRIDGE, L2StandardBridge, signer);
    const result = await contract.withdraw(L2TokenAddress, withdrawAmount, 0, "0x");
    return result;
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