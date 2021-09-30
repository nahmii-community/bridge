<script>
    import { createEventDispatcher } from "svelte";
    import GradientTitle from "$lib/shared/GradientTitle.svelte";
    import Modal from "$lib/shared/Modal.svelte";
    import logo from "./eth.png";

    const dispatch = createEventDispatcher();

    function selectedToken(symbol) {
        dispatch("selectedToken", { symbol });
    }
</script>

<Modal on:cancel>
    <GradientTitle>Choose a token</GradientTitle>
    <p class="modal-text">Search for token</p>
    <input>
    <ul class="token-list">
        <li on:click={() => selectedToken("ETH")}>
            <img src={logo} alt="Ethereum" />
            <p>Ethereum</p>
        </li>
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
        border: 1px solid #bbb;
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
        border: 1px solid #bbb;
        border-radius: 12px;
        cursor: pointer;
        transition: background-color 750ms;
    }

    li:hover {
        background: rgb(219, 218, 218);
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
