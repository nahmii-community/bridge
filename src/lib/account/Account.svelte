<script>
    import { goto } from "$app/navigation";
    import { onDestroy, onMount } from "svelte";
    import Card from "$lib/shared/Card.svelte";
    import TransactionTable from "$lib/account/TransactionTable.svelte";
    import GradientTitle from "$lib/shared/GradientTitle.svelte";
    import { mode } from "$lib/../stores/darkmode";
    import { wallet, network, isConnected } from "$lib/../stores/wallet";
    import SmallArrowLeft from "./small-arrow-left.png";
    import SmallArrowLeftDark from "./small-arrow-left-dark.png";

    let connected = false;
    let chainId;
    let address;
    let unsubscribeConnect;
    let unsubscribeNetwork;
    let unsubscribeWallet;
    $: arrowLeft = $mode === "dark" ? SmallArrowLeftDark : SmallArrowLeft;

    const returnToBridge = () => {
        goto("/bridge");
    };

    let withdrawals = [];
    let deposits = [];

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
                });
                unsubscribeWallet = wallet.subscribe(async (_wallet) => {
                    address = _wallet;
                    // TODO fetch deposits and withdrawals from localStorage for active account
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
