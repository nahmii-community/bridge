<script>
    import Card from "$lib/shared/Card.svelte";
    import { createEventDispatcher } from "svelte";
    import { fade } from "svelte/transition";
    import Button from "./Button.svelte";

    export let title = "";
    export let footer = true;

    const dispatch = createEventDispatcher();

    function closeThroughBackdrop(event) {
        if (event.srcElement.classList.contains("modal-backdrop")) {
            dispatch("cancel");
        }
    }

    function closeThroughButton() {
        dispatch("cancel");
    }
</script>

<div transition:fade class="modal-backdrop" on:click={closeThroughBackdrop}>
    <div class="container">
        <Card>
            {#if title}
                <h1>{title}</h1>
            {/if}
            <div>
                <slot />
            </div>
            {#if footer}
                <slot name="footer">
                    <div class="footer">
                        <Button on:click={closeThroughButton}>Close</Button>
                    </div>
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
        min-width: 320px;
        max-height: 550px;
        margin: auto;
        z-index: 999;
    }

    .footer {
        margin-top: 0.5em;
        display: flex;
        flex-direction: column;
    }

    h1 {
        padding: 1rem;
        margin: 0;
    }

    @media (min-width: 768px) {
        .container {
            min-width: 500px;
        }
    }

    @media (min-height: 768px) {
        .container {
            max-height: 680px;
        }
    }
</style>
