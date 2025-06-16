<script lang="ts">
    import { onMount } from 'svelte';
    import * as THREE from 'three';
    import { OrbitControls } from 'three/examples/jsm/Addons.js';
    
    let container: HTMLDivElement | null = null;
    
    const setupFloor = (scene: THREE.Scene) => {
        const floorGeometry = new THREE.PlaneGeometry(8, 10);
        const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xe6dccc });
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = -Math.PI / 2; // make it lie flat
        floor.receiveShadow = true;
        scene.add(floor);
        return floor;
    }
    
    const setupWalls = (scene: THREE.Scene) => {
        const wallMaterial = new THREE.MeshStandardMaterial({ color: 0xfbf8f3 });
        
        const wallThickness = 0.1;
        const wallHeight = 2.5;
        
        // back wall (z = -5)
        const wallBack = new THREE.Mesh(
            new THREE.BoxGeometry(8, wallHeight, wallThickness),
            wallMaterial
        );
        wallBack.position.set(0, wallHeight / 2, -5);
        scene.add(wallBack);
        
        // front wall (z = 5)
        const wallFront = new THREE.Mesh(
            new THREE.BoxGeometry(8, wallHeight, wallThickness),
            wallMaterial
        );
        wallFront.position.set(0, wallHeight / 2, 5);
        scene.add(wallFront);
        
        // left wall (x = -5)
        const wallLeft = new THREE.Mesh(
            new THREE.BoxGeometry(wallThickness, wallHeight, 10),
            wallMaterial
        );
        wallLeft.position.set(-4, wallHeight / 2, 0);
        scene.add(wallLeft);
        
        // right wall (x = 5)
        const wallRight = new THREE.Mesh(
            new THREE.BoxGeometry(wallThickness, wallHeight, 10),
            wallMaterial
        );
        wallRight.position.set(4, wallHeight / 2, 0);
        scene.add(wallRight);

        return { wallFront, wallBack, wallLeft, wallRight };
    }
    
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
        
        const floor = setupFloor(scene);
        setupWalls(scene);
        
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(5, 5, 5);
        scene.add(light);
        renderer.shadowMap.enabled = true;
        light.castShadow = true;
        floor.receiveShadow = true;
        const ambient = new THREE.AmbientLight(0xffffff, 0.4); // color, intensity
        scene.add(ambient);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        
        const animate = () => {
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
