<script>
    import Button from "$lib/shared/Button.svelte";
    import { shorten, timestampToDateTime } from "$lib/../utils/format";

    export let transactions = [];
    export let transactionType = "transaction";
    export let fraudProofWindow = 0;

    const hasFraudProofWindowPassed = (transaction) => {
        // Calculate the time when the fraud proof window is over for a given transaction.
        // Unix time in seconds.
        const fraudProofWindowOver = transaction.timestamp + fraudProofWindow;
        // Current Unix time converted from ms to seconds.
        const currentTime = Date.now() / 1000;

        return (currentTime > fraudProofWindowOver ? true : false);
    }

    const claimFunds = async () => {
        // TODO: Finalize withdrawal
    }
</script>

<div class="container">
    {#if transactions.length != 0}
        <table>
            <thead>
                <tr>
                    <th>Token</th>
                    <th>Date</th>
                    <th>Hash</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {#each transactions as transaction}
                    <tr>
                        <td>{transaction.token}</td>
                        <td>{timestampToDateTime(transaction.timestamp)}</td>
                        <td>{shorten(transaction.hash, 4, 3)}</td>
                        {#if transactionType == "withdrawals" && hasFraudProofWindowPassed(transaction)}
                            <td><Button on:click={claimFunds}>Claimable</Button></td>
                        {:else}
                            <td>{transaction.status}</td>
                        {/if}
                    </tr>
                {/each}
            </tbody>
        </table>
    {:else}
        No recent {transactionType}
    {/if}
</div>

<style>
    .container {
        margin-bottom: 1.5em;
    }

    .container:last-of-type {
        margin-bottom: 0;
    }

    table {
        border-collapse: collapse;
        width: 100%;
    }

    th {
        text-align: left;
        padding: 0.5em 0;
    }

    tr {
        border-bottom: 1px solid var(--text-color-light-grey);
    }

    td {
        font-size: 0.8em;
        padding: 0.5em 0.1em 0.5em 0;
    }

    @media (min-width: 28em) {
        td {
            font-size: 0.9em;
            padding: 0.5em 0.2em 0.5em 0;
        }
    }

    @media (min-width: 32em) {
        td {
            font-size: 1em;
            padding: 0.5em 0.3em 0.5em 0;
        }
    }
</style>
