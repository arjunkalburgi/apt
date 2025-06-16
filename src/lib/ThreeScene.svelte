<script lang="ts">
    import { onMount } from 'svelte';
    import * as THREE from 'three';
    import { OrbitControls } from 'three/examples/jsm/Addons.js';
    
    let container: HTMLDivElement | null = null;
    
    onMount(() => {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf0f0f0);

        if (!container) {
            console.error('Container is not defined');
            return;
        }
        
        const camera = new THREE.PerspectiveCamera(
            75,
            container.clientWidth / container.clientHeight,
            0.1,
            1000
        );
        camera.position.z = 5;
        
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);
        
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshStandardMaterial({ color: 0x0077ff });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
        
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(5, 5, 5);
        scene.add(light);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true; // smoother motion
        
        const animate = () => {
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            controls.update();
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };
        
        animate();
        
        // Optional: handle resizing
        const resizeObserver = new ResizeObserver(() => {
            if (!container) return;
            const { clientWidth, clientHeight } = container;
            camera.aspect = clientWidth / clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(clientWidth, clientHeight);
        });
        resizeObserver.observe(container);
        
        return () => {
            if (!container) return;
            resizeObserver.disconnect();
            container.removeChild(renderer.domElement);
        };
    });
</script>

<div bind:this={container} style="width: 100%; height: 90vh;"></div>
