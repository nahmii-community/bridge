<script>
    import { createEventDispatcher, onMount, onDestroy } from "svelte";
    import GradientTitle from "$lib/shared/GradientTitle.svelte";
    import Modal from "$lib/shared/Modal.svelte";
    import logo from "./eth.png";
    import { network, findSupportedNetwork } from "../../stores/wallet";
    import { getTokens, getTokensForChain } from "../../utils/token";

    const dispatch = createEventDispatcher();

    let filter = "";
    let tokens = [];
    let filteredTokens = [];

    function selectedToken(symbol) {
        dispatch("selectedToken", { symbol });
    }

    const filterTokens = () => {
        filteredTokens = tokens.filter(({ symbol, name }) => {
            if (
                name.toLowerCase().includes(filter.toLowerCase()) ||
                symbol.toLowerCase().includes(filter.toLowerCase())
            ) {
                return true;
            }
        });
    };

    const unsubscribe = network.subscribe(async (chainId) => {
        if (!(await findSupportedNetwork(chainId)).isSupported) {
            dispatch("cancel");
        }
        const tempList = getTokensForChain(chainId, getTokens());
        tokens = [
            {
                symbol: "ETH",
                name: "Ethereum",
                logoURI: logo,
            },
            ...tempList,
        ];
        filteredTokens = [...tokens];
    });

    onDestroy(() => {
        unsubscribe();
    });
</script>

<Modal on:cancel>
    <GradientTitle>Choose a token</GradientTitle>
    <p class="modal-text">Search for token</p>
    <input
        type="text"
        placeholder="Token name or symbol..."
        bind:value={filter}
        on:input={filterTokens}
    />
    <ul class="token-list">
        {#each filteredTokens as { symbol, name, logoURI }}
            <li on:click={() => selectedToken(symbol)}>
                <img src={logoURI} alt={name} />
                <p>{name}</p>
            </li>
        {/each}
    </ul>
</Modal>

<style>
    .modal-text {
        margin: 0 0 0.5em 0;
    }

    input {
        display: flex;
        margin: 0 0 0.25em 0;
        width: 100%;
        color: var(--text-color);
        background-color: var(--text-color-inverse);
        border: 1px solid var(--text-color-medium-grey);
        border-radius: 12px;
        padding: 1em;
        box-sizing: border-box;
    }

    ul {
        display: flex;
        flex-direction: column;
        list-style: none;
        padding: 0;
        margin: 0;
    }

    li {
        display: flex;
        align-content: center;
        margin: 0.5em 0;
        padding: 1em;
        border: 1px solid var(--text-color-medium-grey);
        border-radius: 12px;
        cursor: pointer;
        transition: background-color 750ms;
    }

    li:hover {
        background: var(--hover-color);
    }

    li > img {
        width: 2em;
        height: 2em;
        margin-right: 1em;
    }

    li > p {
        display: flex;
        align-self: center;
        margin: 0;
        font-weight: 500;
    }
</style>
