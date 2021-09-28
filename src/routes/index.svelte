<script>
    import ConnectWallet from "$lib/ConnectWallet.svelte";
    import Bridge from "$lib/bridge/Bridge.svelte"
    import { isConnected } from "../stores/wallet";

    let connected = false;

    isConnected.subscribe(value => {
        connected = value;
    })
</script>

{#if connected} 
    <Bridge />
{:else}
    <ConnectWallet />
{/if}