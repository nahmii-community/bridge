<script>
    import { ethers } from "ethers";
    import { finalizeWithdrawal } from "@nahmii/sdk";
    import { toast } from "@zerodevx/svelte-toast";
    import { goto } from "$app/navigation";
    import { onDestroy, onMount } from "svelte";
    import Card from "$lib/shared/Card.svelte";
    import TransactionTable from "$lib/account/TransactionTable.svelte";
    import GradientTitle from "$lib/shared/GradientTitle.svelte";
    import { mode } from "$lib/../stores/darkmode";
    import { wallet, network, isConnected, switchNetwork } from "$lib/../stores/wallet";
    import { getTransactions, updateTransaction } from "$lib/../utils/storage";
    import { findCompanionNetwork, findSupportedNetwork, getFraudProofWindow } from "$lib/../utils/network";
    import SmallArrowLeft from "./small-arrow-left.png";
    import SmallArrowLeftDark from "./small-arrow-left-dark.png";
    import Modal from "$lib/shared/Modal.svelte";

    let connected = false;
    let blocked = false;
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

    const claimFunds = async (event) => {
        console.log(event);
        const { hash, timestamp, token } = event.detail.transaction;
        console.log(hash);
        blocked = true;
        // TODO: Block claim button(s) when relay is active.
        // TODO: Handle withdrawal finalization transaction callback.
        let transaction;
        const result = await finalizeWithdrawal(
            hash,
            l1NetworkDetails.crossDomainMessenger,
            l1Provider,
            l2Provider,
            l1Provider.getSigner(),
            5,
            1,
            (tx) => {
                transaction = tx;
            }
        );
        console.log(result);
        updateTransaction(chainId, address[0], token, { hash, timestamp }, "complete", "withdrawals");
        ({ deposits, withdrawals } = getTransactions(chainId, address[0]));
        console.log(transaction);
        blocked = false;
        // TODO: Handle results. 
        // Disable claim button for a transaction if message has already been sent.
        // Update status for finished claim.
    }
</script>

{#if blocked}
    <Modal footer={false}>
        Transaction in progress...
    </Modal>
{/if}

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
                on:claimFunds={claimFunds}
                blockExplorer={l2BlockExplorer}
                transactions={withdrawals}
                transactionType="withdrawals"
                {fraudProofWindow}
            />

            <p>Recent Deposits</p>
            <TransactionTable
                blockExplorer={l1BlockExplorer}
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
