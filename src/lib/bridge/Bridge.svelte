<script>
    import { ethers } from "ethers";
    import { onMount, onDestroy } from "svelte";
    import Divider from "$lib/shared/Divider.svelte";
    import Button from "$lib/shared/Button.svelte";
    import Card from "../shared/Card.svelte";
    import BridgeType from "./BridgeType.svelte";
    import To from "./To.svelte";
    import From from "./From.svelte";
    import SelectToken from "./SelectToken.svelte";
    import {
        wallet,
        network,
        findSupportedNetwork,
        switchNetwork,
    } from "../../stores/wallet";
    import {
        getTokens,
        getTokensForChain,
        getTokenDetails,
        getTokenBridge,
    } from "../../utils/token";
    import logoETH from "./eth.png";

    let isSelectingToken;
    let selectedToken = "ETH";
    let selectedTokenLogo = logoETH;
    let activeNetwork;
    let chainId;
    let provider;
    let balance;
    let address;
    let bridgeAddress;
    let companionNetworkProvider;
    let companionChainId;
    let companionNetwork;
    let companionBalance;
    let L2;

    let deposit;
    $: buttonText = deposit === true ? "DEPOSIT" : "WITHDRAW";
    $: deposit = L2 === false ? true : false;

    const selectToken = () => {
        isSelectingToken = true;
    };

    const closeSelectToken = (event) => {
        isSelectingToken = false;
    };

    const getSelectedToken = (event) => {
        console.log(event.detail);
        selectedToken = event.detail.symbol;
        isSelectingToken = false;
        // TODO update bridge address, balances and token symbol
        if (selectedToken == "ETH") {
            selectedTokenLogo = logoETH;
        } else {
            selectedTokenLogo = getTokenDetails(
                selectedToken,
                chainId,
                getTokens()
            ).logoURI;
        }
    };

    const updateBalance = async (provider, address) => {
        const balance = await provider.getBalance(address);
        return ethers.utils.formatEther(balance);
    };

    const populateData = async (_chainId) => {
        let networkDetails = await findSupportedNetwork(_chainId);
        if (networkDetails.isSupported) {
            let rpcUrls;
            ({
                chainName: activeNetwork,
                L2,
                companionChainId,
            } = networkDetails);
            ({ chainName: companionNetwork, rpcUrls } =
                await findSupportedNetwork(companionChainId));
            provider = new ethers.providers.Web3Provider(window.ethereum);
            companionNetworkProvider = new ethers.providers.JsonRpcProvider(
                rpcUrls[0]
            );
            await wallet.subscribe(async (accounts) => {
                address = accounts[0];
            });
            balance = await updateBalance(provider, address);
            companionBalance = await updateBalance(
                companionNetworkProvider,
                address
            );
        }
    };

    const unsubscribe = network.subscribe(async (_chainId) => {
        chainId = _chainId;
        await populateData(_chainId);
    });

    const flipNetworks = async () => {
        await switchNetwork(companionChainId);
    };

    const formatTokenBalance = (amount) => {
        if (!amount) {
            return "-";
        }

        if (amount.includes(".")) {
            const parts = amount.split(".");
            if (parts[1].length > 2) {
                return `${parts[0]}.${parts[1].slice(0, 2)}`;
            }
            return amount;
        }
    };

    // onMount(async () => {
    //     await populateData(chainId);
    // });

    onDestroy(() => {
        unsubscribe();
    });
</script>

{#if isSelectingToken}
    <SelectToken
        on:cancel={closeSelectToken}
        on:selectedToken={getSelectedToken}
    />
{/if}

<div class="container">
    <Card>
        <BridgeType bind:deposit on:network={flipNetworks} />
        <From
            on:selectToken={selectToken}
            network={activeNetwork}
            balance={formatTokenBalance(balance)}
            token={selectedToken}
            logo={selectedTokenLogo}
        />
        <Divider />
        <To
            network={companionNetwork}
            balance={formatTokenBalance(companionBalance)}
            token={selectedToken}
            logo={selectedTokenLogo}
        />
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
