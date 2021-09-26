<script>
    import { onMount } from "svelte";
    import { mode, toggleMode, setMode } from "../../stores/darkmode";
    import lightToggle from "./light-toggle.svg";
    import darkToggle from "./dark-toggle.svg";

    $: modeIcon = $mode === "dark" ? darkToggle : lightToggle;

    onMount(() => {
        setMode();
    });
</script>

<button on:click={toggleMode}>
    <img src={modeIcon} alt="darkmode toggle" class="toggle" />
</button>

<style>
    button {
        border: 0;
        background-color: transparent;
        cursor: pointer;
        font-size: 16px;
        width: 3em;
        height: 3em;
        padding: 0;
    }

    .toggle {
        width: 3em;
        height: 3em;
    }
</style>
