<script>
    import { mode } from "../../stores/darkmode";
    import SmallArrowDown from "./small-arrow-down.png";
    import SmallArrowDownDark from "./small-arrow-down-dark.png";
    
    $: arrowDown = $mode === "dark" ? SmallArrowDownDark : SmallArrowDown;
</script>

<div class="divider">
    <img src={arrowDown} alt="Arrow pointing down" />
</div>

<style>
    .divider {
        height: 40px;
        width: 100%;
        position: relative;
        text-align: center;
        z-index: 5;
    }

    .divider::before {
        content: "";
        border-top: 1px solid var(--text-color-light-grey);
        width: 100%;
        position: absolute;
        top: 50%;
        left: 0;
    }

    img {
        position: relative;
        width: 40px;
        height: 40px;
        margin: auto;
        z-index: 9;
    }
</style>
