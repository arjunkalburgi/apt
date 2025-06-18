import * as THREE from 'three';
import { TOILET_SIZE } from '$utils/layout';

export function Toilet(): THREE.Group {
    const [width, depth] = TOILET_SIZE;
    
    const group = new THREE.Group();
    
    const base = new THREE.Mesh(
        new THREE.CylinderGeometry(width / 2, width / 2, 0.2, 16),
        new THREE.MeshStandardMaterial({ color: 0xffffff })
    );
    base.position.y = 0.1;
    
    const tank = new THREE.Mesh(
        new THREE.BoxGeometry(width, 0.4, 0.2),
        new THREE.MeshStandardMaterial({ color: 0xfefefe })
    );
    tank.position.set(0, 0.5, -depth / 2 + 0.1);
    
    group.add(base, tank);
    return group;
}
