import * as THREE from 'three';

export function Floor(): THREE.Group {
    const group = new THREE.Group();
    
    const floorGeometry = new THREE.PlaneGeometry(7.1882, 8.8392);
    const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xe6dccc });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    group.add(floor);
    
    const balconyGeometry = new THREE.PlaneGeometry(2.5273, 0.8382);
    const balcony = new THREE.Mesh(balconyGeometry, floorMaterial);
    balcony.rotation.x = -Math.PI / 2;
    balcony.position.z = -4.4196 - (0.8382 / 2);
    balcony.position.x = 2.28;
    balcony.receiveShadow = true;
    group.add(balcony);
    
    return group;
}
