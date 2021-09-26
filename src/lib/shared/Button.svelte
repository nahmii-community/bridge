<script>
    import { createEventDispatcher } from "svelte"; 

    export let text = "Click me";

    const dispatch = createEventDispatcher();

    function onClick() {
        dispatch('click', {});
    }

</script>

<button on:click={onClick}>
    <slot>{text}</slot>
</button>

<style>
    button {
        background: -webkit-linear-gradient(45deg, #ff44c9 0%, #00b8fa 100%);
        border-radius: 6px;
        font: 500 16px Roboto;
        color: var(--text-color-inverse);
        height: 56px;
        border-style: none;
    }
</style>
