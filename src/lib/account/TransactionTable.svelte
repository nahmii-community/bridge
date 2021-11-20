<script>
    export let transactions = [];
    export let transactionType = "transaction";
</script>

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
                    <td>{transaction.timestamp}</td>
                    <td>{transaction.hash}</td>
                    <td>{transaction.status}</td>
                </tr>
            {/each}
        </tbody>
    </table>
{:else}
    No recent {transactionType}
{/if}
