import * as THREE from 'three';

export function Vanity(): THREE.Group {
    const group = new THREE.Group();
    
    const sink = new THREE.Mesh(
        new THREE.BoxGeometry(1.0, 0.4, 0.5),
        new THREE.MeshStandardMaterial({ color: 0xf0f0f0 })
    );
    sink.position.y = 0.2;
    
    const counter = new THREE.Mesh(
        new THREE.BoxGeometry(1.0, 0.1, 0.6),
        new THREE.MeshStandardMaterial({ color: 0x8b7e66 })
    );
    counter.position.y = 0.55;
    
    group.add(counter, sink);
    return group;
}
