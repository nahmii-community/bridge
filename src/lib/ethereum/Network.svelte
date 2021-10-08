<script>
    import { onDestroy } from "svelte";
    import SelectNetwork from "./SelectNetwork.svelte";
    import {
        network,
        findSupportedNetwork,
    } from "../../stores/wallet";

    let networkDetails;
    let activeNetwork;
    let isSupported;

    const unsubscribe = network.subscribe(async (value) => {
        networkDetails = await findSupportedNetwork(value);
        activeNetwork = networkDetails.chainName;
        isSupported = networkDetails.isSupported;
    });

    onDestroy(() => {
        unsubscribe();
    });
</script>

{#if !isSupported}
    <SelectNetwork />
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
</style>
