import * as THREE from 'three';
import { TUB_SIZE } from '$utils/layout';

export function Tub(): THREE.Group {
    const [width, depth] = TUB_SIZE;
    const height = 0.5;
    const wallThickness = 0.05;
    
    const group = new THREE.Group();
    const material = new THREE.MeshStandardMaterial({ color: 0xd8f0ff });
    
    // Base
    const base = new THREE.Mesh(
        new THREE.BoxGeometry(width - wallThickness * 2, wallThickness, depth - wallThickness * 2),
        material
    );
    base.position.y = wallThickness / 2;
    group.add(base);
    
    // Back wall
    const backWall = new THREE.Mesh(
        new THREE.BoxGeometry(width - wallThickness * 2, height, wallThickness),
        material
    );
    backWall.position.set(0, height / 2, -(depth / 2 - wallThickness * 1.5));
    group.add(backWall);
    
    // Front wall
    const frontWall = new THREE.Mesh(
        new THREE.BoxGeometry(width - wallThickness * 2, height, wallThickness),
        material
    );
    frontWall.position.set(0, height / 2, depth / 2 - wallThickness * 1.5);
    group.add(frontWall);
    
    // Left wall
    const leftWall = new THREE.Mesh(
        new THREE.BoxGeometry(wallThickness, height, depth - wallThickness * 2),
        material
    );
    leftWall.position.set(-(width / 2 - wallThickness * 1.5), height / 2, 0);
    group.add(leftWall);
    
    // Right wall
    const rightWall = new THREE.Mesh(
        new THREE.BoxGeometry(wallThickness, height, depth - wallThickness * 2),
        material
    );
    rightWall.position.set(width / 2 - wallThickness * 1.5, height / 2, 0);
    group.add(rightWall);
    
    return group;
}
