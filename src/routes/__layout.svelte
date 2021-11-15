<script>
    import { SvelteToast } from "@zerodevx/svelte-toast";
    import Header from "$lib/Header.svelte";
    import "../app.css";

    const options = {
        pausable: true,
        duration: 10000,
    };
</script>

<Header />

<main>
    <slot />
</main>

<SvelteToast {options} />
