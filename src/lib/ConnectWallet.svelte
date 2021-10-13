<script>
    import Card from "$lib/shared/Card.svelte";
    import GradientTitle from "$lib/shared/GradientTitle.svelte";
    import ArrowDown from "$lib/arrow-down.png";
    import ArrowDownDark from "$lib/arrow-down-dark.png";
    import { mode } from "../stores/darkmode";
    import Button from "./shared/Button.svelte";
    import { connectWallet } from "../stores/wallet";

    let awaitingApproval = false;
    let isConnected = false;
    $: arrowIcon = $mode === "dark" ? ArrowDownDark : ArrowDown;

    async function connect() {
		awaitingApproval = true;
		isConnected = await connectWallet();
		awaitingApproval = false;
    }
</script>

<div class="container">
    <Card>
        <GradientTitle marginTop="1em" marginBottom="0.5em">Nahmii Bridge</GradientTitle>
        <p>
            Welcome to the entrance way of the most powerful Ethereum scaling solution, paving the way for unprecedented Blockchain based user experiences. Use its power at your own risk. 
        </p>
        <img src={arrowIcon} alt="Arrow pointing down" />
        <Button on:click={connect} disabled={awaitingApproval}>CONNECT WALLET</Button>
    </Card>
</div>

<style>
    .container {
        display: flex;
        max-width: 550px;
        margin: auto;
    }
    
    p {
        text-align: center;
        line-height: 24px;
        padding: 0 0.5em;
    }

    img {
        width: 80px;
        height: 80px;
        margin-left: auto;
        margin-right: auto;
        display: block;
        margin-top: 0.5em;
        margin-bottom: 2.5em;
    }
</style>