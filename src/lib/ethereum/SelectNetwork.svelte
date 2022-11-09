<script>
    import { createEventDispatcher } from "svelte";
    import Button from "$lib/shared/Button.svelte";
    import GradientTitle from "$lib/shared/GradientTitle.svelte";
    import Modal from "$lib/shared/Modal.svelte";
    import { switchNetwork } from "../../stores/wallet";

    export let title = "Unsupported network";
    export let subtext = "Your active network is not supported!";
    export let message = "Switch to one of the supported networks:";
    export let closeable = false;

    const dispatch = createEventDispatcher();

    const onNetworkClick = async (chainId) => {
        await switchNetwork(chainId);
        if (closeable) {
            dispatch("close");
        }
    }
</script>

<Modal footer={false} on:cancel>
    <GradientTitle>{title}</GradientTitle>
    <p class="modal-text">{subtext}</p>
    <p class="modal-text">{message}</p>
    <div class="buttons">
        <Button on:click={() => onNetworkClick("0x1")}>Ethereum Mainnet</Button>
        <div class="spacer" />
        <Button on:click={() => onNetworkClick("0x15af")}>Nahmii Mainnet</Button>
        <div class="spacer" />
        <Button on:click={() => onNetworkClick("0x5")}>Goerli Testnet</Button>
        <div class="spacer" />
        <Button on:click={() => onNetworkClick("0x15b1")}>Nahmii Testnet</Button>
        <div class="spacer" />
        <Button on:click={() => onNetworkClick("0x7A69")}>Local L1</Button>
        <div class="spacer" />
        <Button on:click={() => onNetworkClick("0x22B")}>Local L2</Button>
    </div>
</Modal>

<style>
    .modal-text {
        text-align: center;
    }

    .buttons {
        display: flex;
        flex-direction: column;
    }

    .spacer {
        padding-top: 0.5em;
    }
</style>
