<script>
    import Card from "$lib/shared/Card.svelte";
    import { createEventDispatcher } from "svelte";
    import { fade, fly } from "svelte/transition";
    import Button from "./Button.svelte";

    export let title = "";
    export let footer = true;

    const dispatch = createEventDispatcher();

    function closeModal() {
        dispatch("cancel");
    }
</script>

<div transition:fade class="modal-backdrop" on:click={closeModal}>
    <div class="container">
        <Card class="modal">
            {#if title}
                <h1>{title}</h1>
            {/if}
            <div>
                <slot />
            </div>
            {#if footer}
                <slot name="footer">
                    <Button on:click={closeModal}>Close</Button>
                </slot>
            {/if}
        </Card>
    </div>
</div>

<style>
    .modal-backdrop {
        position: fixed;
        display: flex;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background: rgba(0, 0, 0, 0.75);
        z-index: 998;
        align-content: center;
        justify-content: center;
    }

    .container {
        display: flex;
        max-width: 550px;
        margin: auto;
    }

    h1 {
        padding: 1rem;
        margin: 0;
    }
</style>
