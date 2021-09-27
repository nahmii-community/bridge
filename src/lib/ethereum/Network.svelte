<script>
    import Modal from "$lib/shared/Modal.svelte";
    import { network, networks } from "../../stores/wallet";

    let networkDetails;
    let activeNetwork;
    let isSupported;

    network.subscribe(async (value) => {
        networkDetails = await networks(value);
        activeNetwork = networkDetails.name;
        isSupported = networkDetails.isSupported;
    });
</script>

{#if !isSupported}
    <Modal title="Unsupported network">
            <p>Active network is not supported!</p>
            <div slot="footer"></div>
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

    .network-text  {
        display: inline-flex;
        color: var(--text-color-white);
        margin: 0;
        line-height: 16px;
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
</style>
