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
    import {
        getBalance,
        getERC20Balance,
        getAllowance,
        approveAllowance,
    } from "../../utils/ethereum";
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
    let unsubscribe;

    let deposit;
    $: buttonText = deposit === true ? "DEPOSIT" : "WITHDRAW";
    $: deposit = L2 === false ? true : false;

    const selectToken = () => {
        isSelectingToken = true;
    };

    const closeSelectToken = (event) => {
        isSelectingToken = false;
    };

    const getSelectedToken = async (event) => {
        // TODO optimization, check if token is already populated
        // TODO abstract away token information retrieval
        selectedToken = event.detail.symbol;
        isSelectingToken = false;
        // TODO update bridge address, balances and token symbol
        if (selectedToken == "ETH") {
            selectedTokenLogo = logoETH;
            balance = ethers.utils.formatEther(
                await getBalance(address, provider)
            );
            companionBalance = ethers.utils.formatEther(
                await getBalance(address, companionNetworkProvider)
            );
        } else {
            const tokenDetails = getTokenDetails(
                selectedToken,
                chainId,
                getTokens()
            );
            const companionTokenDetails = getTokenDetails(
                selectedToken,
                companionChainId,
                getTokens()
            );
            selectedTokenLogo = tokenDetails.logoURI;
            balance = ethers.utils.formatUnits(
                await getERC20Balance(address, tokenDetails.address, provider),
                tokenDetails.decimals
            );
            companionBalance = ethers.utils.formatUnits(
                await getERC20Balance(
                    address,
                    companionTokenDetails.address,
                    companionNetworkProvider
                ),
                tokenDetails.decimals
            );
        }
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
            console.log("token", selectedToken);
            await getSelectedToken({ detail: { symbol: selectedToken } });
        }
    };

    const flipNetworks = async () => {
        await switchNetwork(companionChainId);
    };

    const formatTokenBalance = (amount) => {
        console.log(amount);
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

    onMount(() => {
        unsubscribe = network.subscribe(async (_chainId) => {
            chainId = _chainId;
            await populateData(_chainId);
        });
    });

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
