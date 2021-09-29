<script>
    import { ethers } from "ethers";
    import { onMount } from "svelte";
    import Divider from "$lib/shared/Divider.svelte";
    import Button from "$lib/shared/Button.svelte";
    import Card from "../shared/Card.svelte";
    import BridgeType from "./BridgeType.svelte";
    import To from "./To.svelte";
    import From from "./From.svelte";
    import {
        wallet,
        network,
        supportedNetworks,
        switchNetwork,
    } from "../../stores/wallet";

    let networkDetails;
    let activeNetwork;
    let provider;
    let balance;
    let address;
    let companionNetworkDetails;
    let companionNetworkProvider;
    let companionChainId;
    let companionNetwork;
    let companionBalance;
    let L2;

    let deposit;
    $: buttonText = deposit === true ? "DEPOSIT" : "WITHDRAW";
    $: deposit = L2 === false ? true : false;

    onMount(async () => {
        if (window.ethereum) {
            provider = new ethers.providers.Web3Provider(window.ethereum);
            let address;
            await wallet.subscribe(async (value) => {
                address = value[0];
            });
            balance = ethers.utils.formatEther(
                await provider.getBalance(address)
            );
            console.log(balance);
        }
    });

    network.subscribe(async (value) => {
        networkDetails = await supportedNetworks(value);
        companionNetworkDetails = await supportedNetworks(networkDetails.companionChainId);
        activeNetwork = networkDetails.chainName;
        companionChainId = companionNetworkDetails.chainId;
        companionNetwork = companionNetworkDetails.chainName;
        L2 = networkDetails.L2;
        provider = new ethers.providers.Web3Provider(window.ethereum);
        companionNetworkProvider = new ethers.providers.JsonRpcProvider(companionNetworkDetails.rpcUrls[0]);
        await wallet.subscribe(async (value) => {
            address = value[0];
        });
        balance = ethers.utils.formatEther(await provider.getBalance(address));
        companionBalance = ethers.utils.formatEther(await companionNetworkProvider.getBalance(address));
    });

    const flipNetworks = async () => {
        await switchNetwork(companionChainId);
    };
</script>

<div class="container">
    <Card>
        <BridgeType bind:deposit on:network={flipNetworks} />
        <From network={activeNetwork} {balance} />
        <Divider />
        <To network={companionNetwork} balance={companionBalance} />
        <Button>{buttonText}</Button>
    </Card>
</div>

<style>
    .container {
        display: flex;
        max-width: 550px;
        margin: auto;
        justify-content: center;
    }
</style>
