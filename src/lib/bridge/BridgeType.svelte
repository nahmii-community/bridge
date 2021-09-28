<script>
    export let deposit = true;

    function toggleTab() {
        deposit = !deposit;
    }
</script>

<ul>
    <li class="{deposit ? 'active' : ''}" on:click={() => {if (!deposit) toggleTab()}}>Deposit</li>
    <li class="{!deposit ? 'active' : ''}" on:click={() => {if (deposit) toggleTab()}}>Withdraw</li>
</ul>

<style>
    ul {
        display: flex;
        list-style: none;
        margin: 0 0 0.5rem 0;
        padding: 0;
    }

    li {
        padding: 0 1rem 1rem 1rem;
        font-size: 20px;
        font-weight: 500;
        color: var(--text-color-medium-grey);
        cursor: pointer;
    }

    .active {
        background: -webkit-linear-gradient(45deg, #ff44c9 0%, #00b8fa 100%)
            left bottom;
        background-size: 100% 5px;
        background-clip: unset;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        text-align: center;

        border-bottom: 3px solid;
        border-image-slice: 1;
        border-image-source: linear-gradient(to left, #00b8fa 0%, #ff44c9 100%);
        border-radius: 3px;
    }

    li:first-child {
        margin-right: 1rem;
    }
</style>
