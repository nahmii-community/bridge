<script>
    import { SvelteToast } from "@zerodevx/svelte-toast";
    import ConnectWallet from "$lib/ConnectWallet.svelte";
    import Bridge from "$lib/bridge/Bridge.svelte"
    import { isConnected } from "../stores/wallet";

    let connected = false;

    const options = {
        pausable: true,
        duration: 10000
    };

    isConnected.subscribe(value => {
        connected = value;
    })
</script>

{#if connected} 
    <Bridge />
{:else}
    <ConnectWallet />
{/if}

<SvelteToast {options} />