<script lang="ts">
    import { onMount } from 'svelte';
    import * as THREE from 'three';
    import { OrbitControls } from 'three/examples/jsm/Addons.js';
    
    let container: HTMLDivElement | null = null;
    
    const setupFloor = (scene: THREE.Scene) => {
        const floorGeometry = new THREE.PlaneGeometry(9, 10);
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
            new THREE.BoxGeometry(9, wallHeight, wallThickness),
            wallMaterial
        );
        wallBack.position.set(0, wallHeight / 2, -5);
        scene.add(wallBack);
        
        // front wall (z = 5)
        const wallFront = new THREE.Mesh(
            new THREE.BoxGeometry(9, wallHeight, wallThickness),
            wallMaterial
        );
        wallFront.position.set(0, wallHeight / 2, 5);
        scene.add(wallFront);
        
        // left wall (x = -4)
        const wallLeft = new THREE.Mesh(
            new THREE.BoxGeometry(wallThickness, wallHeight, 10),
            wallMaterial
        );
        wallLeft.position.set(-4.5, wallHeight / 2, 0);
        scene.add(wallLeft);
        
        // right wall (x = 4)
        const wallRight = new THREE.Mesh(
            new THREE.BoxGeometry(wallThickness, wallHeight, 10),
            wallMaterial
        );
        wallRight.position.set(4.5, wallHeight / 2, 0);
        scene.add(wallRight);

        // bedroom left wall 
        const wallBedroomRight = new THREE.Mesh(
            new THREE.BoxGeometry(wallThickness, wallHeight, 5),
            wallMaterial
        );
        wallBedroomRight.position.set(0.5, wallHeight / 2, -2.5);
        scene.add(wallBedroomRight);

        // bedroom back wall 
        const wallBedroomFront = new THREE.Mesh(
            new THREE.BoxGeometry(3, wallHeight, wallThickness),
            wallMaterial
        );
        wallBedroomFront.position.set(3, wallHeight / 2, 0);
        scene.add(wallBedroomFront);

        // bathroom back wall
        const wallBathroomBack = new THREE.Mesh(
            new THREE.BoxGeometry(2, wallHeight, wallThickness),
            wallMaterial
        );
        wallBathroomBack.position.set(3.5, wallHeight / 2, 1.5);
        scene.add(wallBathroomBack);

        // bathroom left wall
        const wallBathroomLeft = new THREE.Mesh(
            new THREE.BoxGeometry(wallThickness, wallHeight, 2.5),
            wallMaterial
        );
        wallBathroomLeft.position.set(2.5, wallHeight / 2, 3.75);
        scene.add(wallBathroomLeft);

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
