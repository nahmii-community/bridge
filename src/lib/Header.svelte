<script>
    import { goto } from "$app/navigation";
    import logo from "./nahmii-logo.png";
    import DarkModeToggle from "./darkmode/DarkModeToggle.svelte";
    import Network from "./ethereum/Network.svelte";
    import Wallet from "./ethereum/Wallet.svelte";
    import Button from "./shared/Button.svelte";
    import { connectWallet, isConnected } from "../stores/wallet";

    let awaitingApproval = false;
    let connected = false;

    isConnected.subscribe((value) => {
        connected = value;
    });

    async function connect() {
        awaitingApproval = true;
        connected = await connectWallet();
        awaitingApproval = false;
    }

    const goToAccount = () => {
        goto("/account");
    };
</script>

<header>
    <nav>
        <div class="corner">
            <a href="/">
                <img src={logo} alt="Nahmii" />
            </a>
        </div>

        <div class="corner">
            <DarkModeToggle />
            {#if !connected}
                <Button
                    on:click={connect}
                    disabled={awaitingApproval}
                    height="3em"
                    padding="0 1em"
                    margin="0 0 0 1em"
                    >CONNECT WALLET
                </Button>
            {:else}
                <Button
                    on:click={goToAccount}
                    height="3em"
                    padding="0 1em"
                    margin="0 0 0 1em"
                    >ACCOUNT
                </Button>
            {/if}
        </div>
    </nav>

    {#if connected}
        <div class="network-wallet">
            <hr class="divider" />
            <Network />
            <hr />
            <Wallet />
        </div>
    {/if}
</header>

<style>
    header {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-bottom: 1.5em;
    }

    nav {
        padding: 0.2em 0;
        display: flex;
        justify-content: space-between;
        min-height: 66px;
    }

    .network-wallet {
        display: flex;
        justify-content: center;
        margin-top: 1em;
    }

    .network-wallet hr {
        opacity: 0.24;
        margin: 0.5em 1em;
    }

    .corner {
        display: flex;
        align-self: center;
        height: 3em;
    }

    .corner img {
        width: 9em;
        height: 3em;
        object-fit: contain;
    }

    a:hover {
        color: var(--accent-color);
    }

    .divider {
        display: none;
    }

    hr {
        opacity: 0.24;
        height: 3em;
        margin: 0 1em;
    }

    @media (min-width: 768px) {
        header {
            flex-direction: row;
            padding: 0 2em;
            margin-bottom: 5.75em;
        }

        nav {
            display: flex;
            align-items: space-between;
            width: 100%;
        }

        .network-wallet::before {
            margin: 3px 0px;
            height: 100%;
            border-left: 5px solid rgb(255, 255, 255);
        }

        .network-wallet {
            display: inline-flex;
            margin-top: 0;
        }

        .divider {
            display: block;
        }
    }
</style>
