<script>
    export let title = "Nahmii";
    export let marginTop = "";
    export let marginBottom = "";
</script>

<h1 class="title" 
    style="{marginTop ? `margin-top: ${marginTop};` : ""}
    {marginBottom ? `margin-bottom: ${marginBottom};` : ""}">
    <slot>{title}</slot>
</h1>

<style>
    .title {
        background: -webkit-linear-gradient(45deg, #ff44c9 0%, #00b8fa 100%);
        background-clip: unset;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        left: 0px;
        top: 0px;
        font-family: Roboto;
        font-style: normal;
        font-weight: 500;
        font-size: 32px;
        letter-spacing: 0.15px;
        text-align: center;
    }
</style>
