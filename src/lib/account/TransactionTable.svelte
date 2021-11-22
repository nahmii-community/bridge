<script>
    import { shorten, timestampToDateTime } from "$lib/../utils/format";

    export let transactions = [];
    export let transactionType = "transaction";
</script>

<div class="container">
    {#if transactions.length != 0}
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Hash</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {#each transactions as transaction}
                    <tr>
                        <td>{timestampToDateTime(transaction.timestamp)}</td>
                        <td>{shorten(transaction.hash)}</td>
                        <td>{transaction.status}</td>
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
        margin-bottom: 1em;
    }

    .container:last-of-type {
        margin-bottom: 0;
    }

    th {
        text-align: left;
    }
</style>
