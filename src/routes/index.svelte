<script>
    import { goto } from "$app/navigation";
    import ConnectWallet from "$lib/ConnectWallet.svelte";
    import { onDestroy } from "svelte";
    import { isConnected } from "../stores/wallet";

    let connected = false;

    const unsubscribeConnect = isConnected.subscribe((value) => {
        connected = value;
    });

    $: connected ? goto("/bridge") : "";

    onDestroy(() => {
        unsubscribeConnect();
    });
</script>

<ConnectWallet />
