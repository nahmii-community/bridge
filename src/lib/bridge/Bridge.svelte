<script>
    import { onMount } from "svelte";
    import Divider from "$lib/shared/Divider.svelte";
    import Button from "$lib/shared/Button.svelte";
    import Card from "../shared/Card.svelte";
    import BridgeType from "./BridgeType.svelte";
    import To from "./To.svelte";
    import From from "./From.svelte";
    import { network, supportedNetworks } from "../../stores/wallet";

    let networkDetails;
    let activeNetwork;
    let companionNetwork;
    let L2;

    let deposit;
    $: buttonText = deposit === true ? "DEPOSIT" : "WITHDRAW";
    $: deposit = L2 === false ? true : false;

    network.subscribe(async (value) => {
        networkDetails = await supportedNetworks(value);
        activeNetwork = networkDetails.chainName;
        companionNetwork = networkDetails.companionChainName;
        L2 = networkDetails.L2;
    });
</script>

<div class="container">
    <Card>
        <BridgeType bind:deposit />
        <From network={activeNetwork} />
        <Divider />
        <To network={companionNetwork} />
        <Button>{buttonText}</Button>
    </Card>
</div>

<style>
    .container {
        display: flex;
        max-width: 550px;
        margin: auto;
        justify-content: center;
    }
</style>
