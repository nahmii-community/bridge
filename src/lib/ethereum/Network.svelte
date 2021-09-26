<script>
    import { network, networks } from "../../stores/wallet";

    let activeNetwork;

    network.subscribe(async (value) => {
        activeNetwork = (await networks(value)).name;
    });
</script>

<div class="network">
    <p class="network-name">{activeNetwork}</p>
    <p class="info">Network</p>
</div>

<style>
    .network {
        display: inline-flex;
        flex-direction: column;
        padding: 0.5em;
        align-items: flex-end;
        justify-content: center;
    }

    p {
        display: inline-flex;
        color: var(--text-color-white);
        margin: 0;
        line-height: 16px;
    }

    .network-name::before {
        content: "";
        width: 8px;
        height: 8px;
        display: block;
        float: left;
        margin: 3px;
        margin-right: 8px;
        border-radius: 10px;
        background: -webkit-linear-gradient(330deg, #ff44c9 0%, #00b8fa 100%);
    }

    .network-name {
        font-size: 14px;
    }

    .info {
        opacity: 0.6;
        font-size: 12px;
    }
</style>