<script>
    import Button from "$lib/shared/Button.svelte";
    import GradientTitle from "$lib/shared/GradientTitle.svelte";
    import Modal from "$lib/shared/Modal.svelte";
    import { switchNetwork } from "../../stores/wallet";
</script>

<Modal footer={false}>
    <GradientTitle>Unsupported network</GradientTitle>
    <p class="modal-text">Your active network is not supported!</p>
    <p class="modal-text">Switch to one of the supported networks:</p>
    <div class="buttons">
        <Button on:click={() => switchNetwork("0x1")}>Ethereum Mainnet</Button>
        <div class="spacer" />
        <Button on:click={() => switchNetwork("0x15af")}>Nahmii Mainnet</Button>
        <div class="spacer" />
        <Button on:click={() => switchNetwork("0x3")}>Ropsten Testnet</Button>
        <div class="spacer" />
        <Button on:click={() => switchNetwork("0x15b1")}>Nahmii Testnet</Button>
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
