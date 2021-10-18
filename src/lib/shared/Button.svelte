<script>
    import { createEventDispatcher } from "svelte";

    export let text = "Click me";
    export let disabled = false;
    let timer;
    let wait = false;

    const dispatch = createEventDispatcher();

    function applyRipple(e) {
        const ripple = document.createElement("div");
        ripple.className = "ripple";
        document.body.appendChild(ripple);
        ripple.style.left = `${e.clientX}px`;
        ripple.style.top = `${e.clientY}px`;
        ripple.style.animation = "ripple-effect 400ms linear";
        ripple.onanimationend = () => document.body.removeChild(ripple);
    }

    function onClick(e) {
        if (!wait) {
            wait = true;
            applyRipple(e);
            clearTimeout(timer);
            timer = setTimeout(() => {
                wait = false;
            }, 2000);
            dispatch("click", {});
        }
    }
</script>

<button on:click={onClick} {disabled}>
    <slot>{text}</slot>
</button>

<style>
    button {
        background: linear-gradient(
            45deg,
            rgba(255, 68, 201, 1) 0%,
            rgba(0, 184, 250, 1) 100%
        );
        border-radius: 6px;
        font: 500 16px Roboto;
        color: var(--text-color-inverse);
        height: 56px;
        border-style: none;
        transition: all 400ms;
    }

    button:hover {
        opacity: 0.7;
    }

    button:disabled {
        opacity: 0.4;
    }

    button:active {
        opacity: 1;
        transition: all 400ms;
    }
</style>
