import * as THREE from 'three';

export function Walls(): THREE.Group {
    const group = new THREE.Group();
    const mat = new THREE.MeshStandardMaterial({ color: 0xfbf8f3 });
    const h = 2.5, t = 0.1;
    
    const createWall = (w: number, h: number, d: number, x: number, y: number, z: number) => {
        const wall = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
        wall.position.set(x, y, z);
        return wall;
    };
    
    group.add(createWall(4.2164, h, t, -1.4858, h/2, -4.4196)); // back
    group.add(createWall(7.1882, h, t, 0, h/2, 4.4196)); // front
    group.add(createWall(t, h, 8.8392, -3.5941, h/2, 0)); // left
    group.add(createWall(t, h, 7.9248, 3.5941, h/2, 0.4572)); // right
    group.add(createWall(t, h, 3.048, 0.6222, h/2, -1.9812)); // bed left
    group.add(createWall(2.9718, h, t, 2.1082, h/2, -3.5052)); // bed back
    group.add(createWall(1.5748, h, t, 2.8066, h/2, 0.3556)); // bed front
    group.add(createWall(1.5748, h, t, 2.8066, h/2, 1.1176)); // bath back
    group.add(createWall(t, h, 2.3876, 2.0192, h/2, 3.2258)); // bath left
    
    return group;
}
