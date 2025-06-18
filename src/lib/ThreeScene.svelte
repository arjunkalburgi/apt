<script lang="ts">
    import { onMount } from 'svelte';
    import { setupScene } from './three/setupScene';
    import { Apt } from './three/components/Apt';

    let container: HTMLDivElement | null = null;

    onMount(() => {
        if (!container) {
            console.error('Container is not defined');
            return;
        }

        const { scene, camera, renderer, controls } = setupScene(container);
        scene.add(Apt());

        const animate = () => {
            controls.update();
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };

        animate();
    });
</script>

<div bind:this={container} style="width: 100%; height: 90vh;"></div>
