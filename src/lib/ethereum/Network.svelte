<script>
    import { onDestroy } from "svelte";
    import SelectNetwork from "./SelectNetwork.svelte";
    import { network } from "../../stores/wallet";
    import { findSupportedNetwork } from "../../utils/network";

    let networkDetails;
    let activeNetwork;
    let isSupported;
    let isSelectingNetwork;

    const unsubscribe = network.subscribe(async (value) => {
        networkDetails = await findSupportedNetwork(value);
        activeNetwork = networkDetails.chainName;
        isSupported = networkDetails.isSupported;
        isSelectingNetwork = false;
    });

    const openNetworkModal = () => {
        isSelectingNetwork = true;
    };

    const closeNetworkModal = () => {
        isSelectingNetwork = false;
    };

    onDestroy(() => {
        unsubscribe();
    });
</script>

{#if !isSupported}
    <SelectNetwork />
{/if}

{#if isSelectingNetwork}
    <SelectNetwork
        title="Supported Networks"
        subtext=""
        message="Select one of the supported networks to add it to your wallet and switch to it:"
        closeable=true
        on:cancel={closeNetworkModal}
        on:close={closeNetworkModal}
    />
{/if}

<div class="network" on:click={openNetworkModal}>
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
        cursor: pointer;
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
</style>
