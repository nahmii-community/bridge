<script>
    import { createEventDispatcher } from "svelte";
    import dropdown from "./dropdown.png";
    import logo from "./eth.png";

    export let network = "Unsupported";
    export let token = "ETH";
    export let balance = 0;

    const dispatch = createEventDispatcher();

    function selectTokenModal() {
        dispatch("selectToken");
    }
</script>

<div class="container">
    <div class="left">
        <p>From <span class="network-name">{network}</span></p>
        <div class="token-details">
            <div class="token-hitbox" on:click={selectTokenModal}>
                <div class="token-symbol">
                    <img src={logo} alt="token symbol" />
                </div>
                <div class="token-ticker">{token}</div>
                <div class="token-dropdown">
                    <img src={dropdown} alt="dropdown icon" />
                </div>
            </div>
        </div>
    </div>
    <div class="right">
        <p>Balance: {balance} {token}</p>
        <input type="number" placeholder="Amount" />
    </div>
</div>

<style>
    .container {
        display: flex;
        justify-content: space-between;
        padding: 0.75em 0;
        margin-top: 0.5em;
    }

    .left,
    .right {
        width: 50%;
        display: flex;
        flex-direction: column;
    }

    .right {
        align-items: flex-end;
    }

    p {
        color: var(--text-color-medium-grey);
        margin: 0.75rem 0;
    }

    input {
        border: 0;
        display: block;
        text-align: right;
        font-size: 20px;
        width: 100%;
        height: 100%;
        background-color: var(--text-color-inverse);
    }

    ::placeholder {
        color: var(--text-color-light-grey);
        opacity: 1;
    }

    .network-name {
        background: -webkit-linear-gradient(45deg, #ff44c9 0%, #00b8fa 100%);
        background-clip: unset;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        left: 0px;
        top: 0px;
        font-family: Roboto;
        font-style: normal;
        font-weight: 500;
        letter-spacing: 0.15px;
        text-align: center;
    }

    .token-details {
        display: flex;
        flex-direction: row;
        align-content: center;
        margin-top: 0.75em;
    }

    .token-hitbox {
        display: flex;
        flex-direction: row;
        align-content: center;
        cursor: pointer;
    }

    .token-symbol {
        display: flex;
        justify-content: center;
        align-content: center;
        background-color: rgba(0, 0, 0, 0.05);
        border-radius: 30px;
        height: 32px;
        width: 32px;
    }
    .token-symbol img {
        margin: auto;
        height: 24px;
        width: 24px;
    }

    .token-ticker {
        font-size: 20px;
        font-weight: 500;
        margin-left: 0.4em;
        margin-top: auto;
        margin-bottom: auto;
    }

    .token-dropdown {
        margin-left: 0.4em;
        margin-top: auto;
        margin-bottom: auto;
        padding-bottom: 2px;
    }
</style>
