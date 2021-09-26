<div class="card">
    <slot />
</div>

<style>
    .card {
        display: flex;
        flex-direction: column;
        background: var(--card-color);
        padding: 2em;
        border-radius: 12px;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
        transition: background-color 0.2s linear;
        width: 100%;
    }
</style>
