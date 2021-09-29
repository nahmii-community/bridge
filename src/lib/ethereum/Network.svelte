<script>
    import Button from "$lib/shared/Button.svelte";
    import GradientTitle from "$lib/shared/GradientTitle.svelte";
    import Modal from "$lib/shared/Modal.svelte";
    import {
        network,
        findSupportedNetwork,
        switchNetwork,
    } from "../../stores/wallet";

    let networkDetails;
    let activeNetwork;
    let isSupported;

    network.subscribe(async (value) => {
        networkDetails = await findSupportedNetwork(value);
        activeNetwork = networkDetails.chainName;
        isSupported = networkDetails.isSupported;
    });
</script>

{#if !isSupported}
    <Modal footer={false}>
        <GradientTitle>Unsupported network</GradientTitle>
        <p class="modal-text">Your active network is not supported!</p>
        <p class="modal-text">Switch to one of the supported networks:</p>
        <div class="buttons">
            <Button on:click={() => switchNetwork("0x1")}>Ethereum Mainnet</Button>
            <div class="spacer"></div>
            <Button on:click={() => switchNetwork("0x22b")}>Nahmii</Button>
            <div class="spacer"></div>
            <Button on:click={() => switchNetwork("0x3")}>Ropsten</Button>
            <div class="spacer"></div>
            <Button on:click={() => switchNetwork("0x15b1")}>Nahmii Testnet</Button>
        </div>
    </Modal>
{/if}

<div class="network">
    <p class="network-text network-name">{activeNetwork}</p>
    <p class="network-text info">Network</p>
</div>

<style>
    .network {
        display: inline-flex;
        flex-direction: column;
        padding: 0.5em;
        align-items: flex-end;
        justify-content: center;
    }

    .network-text {
        display: inline-flex;
        color: var(--text-color-white);
        margin: 0;
        line-height: 16px;
        white-space: nowrap;
    }

    .network-name::before {
        content: "";
        width: 8px;
        height: 8px;
        display: block;
        float: left;
        margin: 3px;
        margin-right: 8px;
        border-radius: 10px;
        background: -webkit-linear-gradient(330deg, #ff44c9 0%, #00b8fa 100%);
    }

    .network-name {
        font-size: 14px;
    }

    .info {
        opacity: 0.6;
        font-size: 12px;
    }

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
