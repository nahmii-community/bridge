<script>
    import Card from "$lib/shared/Card.svelte";
    import TransactionTable from "$lib/account/TransactionTable.svelte";
    import GradientTitle from "$lib/shared/GradientTitle.svelte";
    import { onMount } from "svelte";

    let withdrawals = [];
    let deposits = [];

    onMount(() => {
        // TODO Check active account
        // TODO fetch deposits and withdrawals from localStorage for active account
    });
</script>

<div class="container">
    <Card>
        <GradientTitle>Account History</GradientTitle>

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
</style>
