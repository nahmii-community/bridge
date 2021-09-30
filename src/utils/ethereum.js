import { parseUnits } from "@ethersproject/units";
import { Contract } from "ethers";
import ERC20ABI from "../lib/ABI/ERC20ABI.json";
import L1StandardBridge from "../lib/ABI/L1StandardBridgeABI.json";

const DEFAULT_GAS_L1 = 330_000
const DEFAULT_GAS_L2 = 1_300_000;

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