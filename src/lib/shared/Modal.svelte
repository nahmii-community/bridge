<script>
    import { createEventDispatcher } from "svelte";
    import { fade, fly } from "svelte/transition";
    import Button from "./Button.svelte";

    export let title;

    const dispatch = createEventDispatcher();

    function closeModal() {
        dispatch("cancel");
    }
</script>

<div transition:fade class="modal-backdrop" on:click={closeModal}>
    <div class="container">
        <div transition:fade class="modal">
            <h1>{title}</h1>
            <div class="content">
                <slot />
            </div>
            <footer>
                <slot name="footer">
                    <Button on:click={closeModal}>Close</Button>
                </slot>
            </footer>
        </div>
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

    .modal {
        display: flex;
        flex-direction: column;
        padding: 2em;
        background: var(--card-color);
        border-radius: 12px;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
        z-index: 999;
        overflow-x: hidden;
        width: 100%;
    }

    h1 {
        padding: 1rem;
        margin: 0;
        border-bottom: 1px solid #ccc;
    }

    .content {
        padding: 1rem;
    }

    footer {
        padding: 1rem;
    }
</style>
