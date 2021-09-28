<script>
    import Divider from "$lib/shared/Divider.svelte";
    import Button from "$lib/shared/Button.svelte";
    import Card from "../shared/Card.svelte";
    import BridgeType from "./BridgeType.svelte";
    import To from "./To.svelte";
    import From from "./From.svelte";

    let deposit = true;
    $: buttonText = deposit === true ? "DEPOSIT" : "WITHDRAW";
</script>

<div class="container">
    <Card>
        <BridgeType bind:deposit />
        <From />
        <Divider />
        <To />
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
