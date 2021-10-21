<script>
    import { ethers, BigNumber } from "ethers";
    import { onMount, onDestroy } from "svelte";
    import { toast } from "@zerodevx/svelte-toast";
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
        depositETH,
        depositERC20,
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
    let companionNetworkProvider;
    let companionChainId;
    let companionNetwork;
    let companionBalance;
    let L2;
    let unsubscribeNetwork;
    let unsubscribeWallet;

    let amountToBridge = "0";
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
            const tempBalance = await getBalance(address, provider);
            const tempCompanionBalance = await getBalance(address, companionNetworkProvider);
            balance = ethers.utils.formatEther(tempBalance);
            companionBalance = ethers.utils.formatEther(tempCompanionBalance);
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

    const updateAmountToBridge = async (event) => {
        amountToBridge = event.detail.amountToBridge;
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
            await getSelectedToken({ detail: { symbol: selectedToken } });
        }
    };

    const flipNetworks = async () => {
        await switchNetwork(companionChainId);
    };

    const bridgeAsset = async () => {
        if (L2) {
            // Withdraw
            console.log("withdraw asset: ", selectedToken);
        } else {
            // Deposit
            const blockExplorer = (await findSupportedNetwork(chainId))
                .blockExplorerUrls[0];
            if (selectedToken == "ETH") {
                const standardBridge = (await findSupportedNetwork(chainId))
                    .standardBridge;
                const tx = await depositETH(
                    standardBridge,
                    provider.getSigner(0),
                    amountToBridge
                );
                // Indicate a deposit is in progress
                toast.push(`<strong>Depositing ${selectedToken}...</strong>
                    <p>Click <a href="${blockExplorer}/tx/${tx.hash}" target="_blank">here</a> for more details.</p>`);
                const receipt = await tx.wait(1);
                // Notify user and update balance
                toast.push(`<strong>Deposit of ${selectedToken} complete.</strong>
                    <p>Click <a href="${blockExplorer}/tx/${receipt.transactionHash}" target="_blank">here</a> for more details.</p>`);
                await getSelectedToken({ detail: { symbol: selectedToken } });
            } else {
                const l1Token = getTokenDetails(
                    selectedToken,
                    chainId,
                    getTokens()
                );
                const l2Token = getTokenDetails(
                    selectedToken,
                    companionChainId,
                    getTokens()
                );
                const tokenBridge = getTokenBridge(
                    selectedToken,
                    chainId,
                    getTokens()
                );
                const allowance = await getAllowance(
                    address,
                    tokenBridge,
                    l1Token.address,
                    provider
                );
                const requestedAmountToBridge = ethers.utils.parseUnits(
                    amountToBridge,
                    l1Token.decimals
                );

                if (allowance.lt(requestedAmountToBridge)) {
                    // Increase the allowance by the requested amount.
                    const tx = await approveAllowance(
                        tokenBridge,
                        requestedAmountToBridge,
                        l1Token.address,
                        provider.getSigner(0)
                    );
                    // Indicate an approval is in progress
                    toast.push(`<strong>Approval of ${selectedToken} in progress.</strong>
                        <p>Click <a href="${blockExplorer}/tx/${tx.hash}" target="_blank">here</a> for more details.</p>`);
                    // Indicate an approval has gone through
                    const receipt = await tx.wait(1);
                    toast.push(`<strong>Approval of ${selectedToken} complete.</strong>
                        <p>Click <a href="${blockExplorer}/tx/${receipt.transactionHash}" target="_blank">here</a> for more details.</p>`);
                }

                const tx = await depositERC20(
                    l1Token.address,
                    l2Token.address,
                    tokenBridge,
                    provider.getSigner(0),
                    requestedAmountToBridge
                );
                // Indicate a deposit is in progress
                toast.push(`<strong>Depositing ${selectedToken}...</strong>
                    <p>Click <a href="${blockExplorer}/tx/${tx.hash}" target="_blank">here</a> for more details.</p>`);
                const receipt = await tx.wait(1);
                // Notify user and update balance
                toast.push(`<strong>Deposit of ${selectedToken} complete.</strong>
                    <p>Click <a href="${blockExplorer}/tx/${receipt.transactionHash}" target="_blank">here</a> for more details.</p>`);
                await getSelectedToken({ detail: { symbol: selectedToken } });
            }
        }
    };

    const truncateBalance = (amount) => {
        if (!amount) {
            return "0";
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
        unsubscribeNetwork = network.subscribe(async (_chainId) => {
            chainId = _chainId;
            await populateData(_chainId);
        });
        unsubscribeWallet = wallet.subscribe(async (_wallet) => {
            await populateData(chainId);
        });
    });

    onDestroy(() => {
        unsubscribeNetwork();
        unsubscribeWallet();
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
            on:amountChanged={updateAmountToBridge}
            on:selectToken={selectToken}
            network={activeNetwork}
            balance={truncateBalance(balance)}
            token={selectedToken}
            logo={selectedTokenLogo}
        />
        <Divider on:click={flipNetworks} />
        <To
            network={companionNetwork}
            balance={truncateBalance(companionBalance)}
            balanceAfter={amountToBridge}
            token={selectedToken}
            logo={selectedTokenLogo}
        />
        <Button on:click={bridgeAsset}>{buttonText}</Button>
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
