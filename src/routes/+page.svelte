<script>
    import ThreeScene from '$lib/ThreeScene.svelte';
</script>

<div class="text">
    <h1>APT</h1>
    <div class="controls">
        <small>Zoom w mouse</small>
        <small>Rotate via Click n drag</small>
        <small>Pan via Ctrl n drag</small>
    </div>
</div>
<ThreeScene />

<style>
    .text {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .controls {
        display: flex;
        flex-direction: row;
        align-items: end;
        gap: 1rem;
    }
</style>