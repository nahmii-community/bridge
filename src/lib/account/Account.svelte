<script>
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import Card from "$lib/shared/Card.svelte";
    import TransactionTable from "$lib/account/TransactionTable.svelte";
    import GradientTitle from "$lib/shared/GradientTitle.svelte";
    import { mode } from "$lib/../stores/darkmode";
    import SmallArrowLeft from "./small-arrow-left.png";
    import SmallArrowLeftDark from "./small-arrow-left-dark.png";
    
    $: arrowLeft = $mode === "dark" ? SmallArrowLeftDark : SmallArrowLeft;

    const returnToBridge = () => {
        goto("/bridge");
    }

    let withdrawals = [];
    let deposits = [];

    onMount(() => {
        // TODO Check active account
        // TODO fetch deposits and withdrawals from localStorage for active account
    });
</script>

<div class="container">
    <Card>
        <img on:click={returnToBridge} src={arrowLeft} alt="Arrow pointing left. Navigate back button." />
        <GradientTitle marginTop="0">Account History</GradientTitle>

        <p>Recent Withdrawals</p>
        <TransactionTable
            transactions={withdrawals}
            transactionType="withdrawals"
        />

        <p>Recent Deposits</p>
        <TransactionTable transactions={deposits} transactionType="deposits" />
    </Card>
</div>

<style>
    .container {
        display: flex;
        max-width: 550px;
        margin: auto;
        justify-content: center;
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
