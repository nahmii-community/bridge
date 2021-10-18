<script>
    import { createEventDispatcher } from "svelte";

    export let text = "Click me";
    export let disabled = false;

    const dispatch = createEventDispatcher();

    function onClick() {
        dispatch('click', {});
    }

</script>

<button on:click={onClick} {disabled}>
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
        transition: opacity 400ms;
    }

    button:hover {
        opacity: 0.6;
    }

    button:disabled {
        opacity: 0.4;
    }
</style>
