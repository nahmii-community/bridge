<script>
    import { ethers } from "ethers";
    import { goto } from "$app/navigation";
    import { onDestroy, onMount } from "svelte";
    import Card from "$lib/shared/Card.svelte";
    import TransactionTable from "$lib/account/TransactionTable.svelte";
    import GradientTitle from "$lib/shared/GradientTitle.svelte";
    import { mode } from "$lib/../stores/darkmode";
    import { wallet, network, isConnected, switchNetwork } from "$lib/../stores/wallet";
    import { getTransactions } from "$lib/../utils/storage";
    import { findCompanionNetwork, findSupportedNetwork, getFraudProofWindow } from "$lib/../utils/network";
    import SmallArrowLeft from "./small-arrow-left.png";
    import SmallArrowLeftDark from "./small-arrow-left-dark.png";

    let connected = false;
    let chainId;
    let address;
    let fraudProofWindow;
    let l1Provider;
    let l2Provider;
    let l1BlockExplorer;
    let l2BlockExplorer;
    let l1NetworkDetails;
    let l2NetworkDetails;
    let unsubscribeConnect;
    let unsubscribeNetwork;
    let unsubscribeWallet;
    $: arrowLeft = $mode === "dark" ? SmallArrowLeftDark : SmallArrowLeft;

    const returnToBridge = () => {
        goto("/bridge");
    };

    let withdrawals = [];
    let deposits = [];

    const populateData = async () => {
        if (address && chainId) {
            const networkDetails = await findSupportedNetwork(chainId);
            // Enforcing the user to use a L1 in this component makes
            // reasoning about the RPC providers a lot easier.
            if (networkDetails.isSupported && networkDetails.L2) {
                await switchNetwork(networkDetails.companionChainId);
            } else if (networkDetails.isSupported && !networkDetails.L2) {
                ({ deposits, withdrawals } = getTransactions(chainId, address[0]));
                fraudProofWindow = getFraudProofWindow(chainId);
                l2NetworkDetails = await findCompanionNetwork(chainId);

                l1Provider = new ethers.providers.Web3Provider(window.ethereum);
                l2Provider = new ethers.providers.JsonRpcProvider(
                    l2NetworkDetails.rpcUrls[0]
                );

                l1NetworkDetails = networkDetails;
                l1BlockExplorer = networkDetails.blockExplorerUrls[0];
                l2BlockExplorer = l2NetworkDetails.blockExplorerUrls[0];
            }
        }
    };

    const cleanup = () => {
        if (unsubscribeNetwork) {
            unsubscribeNetwork();
        }
        if (unsubscribeWallet) {
            unsubscribeWallet();
        }
        if (unsubscribeConnect) {
            unsubscribeConnect();
        }
    };

    onMount(() => {
        unsubscribeConnect = isConnected.subscribe((value) => {
            cleanup();
            connected = value;
            if (connected) {
                unsubscribeNetwork = network.subscribe(async (_chainId) => {
                    chainId = _chainId;
                    await populateData();
                });
                unsubscribeWallet = wallet.subscribe(async (_wallet) => {
                    address = _wallet;
                    await populateData();
                });
            } else {
                withdrawals = [];
                deposits = [];
            }
        });
    });

    onDestroy(() => {
        cleanup();
    });
</script>

<div class="container">
    <Card>
        <img
            on:click={returnToBridge}
            src={arrowLeft}
            alt="Arrow pointing left. Navigate back button."
        />
        <GradientTitle marginTop="0">Account History</GradientTitle>

        {#if connected}
            <p>Recent Withdrawals</p>
            <TransactionTable
                transactions={withdrawals}
                transactionType="withdrawals"
                {fraudProofWindow}
            />

            <p>Recent Deposits</p>
            <TransactionTable
                transactions={deposits}
                transactionType="deposits"
            />
        {:else}
            <p class="center">Please connect a wallet.</p>
        {/if}
    </Card>
</div>

<style>
    .container {
        display: flex;
        max-width: 550px;
        margin: auto;
        justify-content: center;
    }

    .center {
        text-align: center;
    }

    p {
        font-weight: 500;
        font-size: 1.2em;
        margin: 0.5em 0;
    }

    img {
        width: 40px;
        height: 40px;
        cursor: pointer;
    }
</style>
