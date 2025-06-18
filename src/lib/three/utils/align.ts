import * as THREE from 'three';

type Align =
| 'back-left' | 'back-center' | 'back-right'
| 'center-left' | 'center' | 'center-right'
| 'front-left' | 'center-front' | 'right-front';

type Facing = 'front' | 'back' | 'left' | 'right';

type AlignedObject = {
    position: THREE.Vector3;
    rotationY: number;
};

export function alignInRoom(
    roomWidth: number,
    roomDepth: number,
    objectWidth: number,
    objectDepth: number,
    align: Align,
    facing: Facing,
    offset: [number, number] = [0, 0]
): AlignedObject {
    const [dx, dz] = offset;
    const facingRotation: { [key in Facing]: number } = {
        front: 0,
        right: -Math.PI / 2,
        back: Math.PI,
        left: Math.PI / 2,
    };
    const rotationY = facingRotation[facing];
    const isRotated = facing === 'left' || facing === 'right';

    const w = isRotated ? objectDepth : objectWidth;
    const d = isRotated ? objectWidth : objectDepth;
    const xMap = {
        left: w / 2,
        center: roomWidth / 2,
        right: roomWidth - w / 2,
    };
    const zMap = {
        front: roomDepth - d / 2,
        center: roomDepth / 2,
        back: d / 2,
    };
    
    const alignmentMap: { [key in Align]: { x: number; z: number } } = {
        'back-left': { x: xMap.left, z: zMap.back },
        'back-center': { x: xMap.center, z: zMap.back },
        'back-right': { x: xMap.right, z: zMap.back },
        'center-left': { x: xMap.left, z: zMap.center },
        'center': { x: xMap.center, z: zMap.center },
        'center-right': { x: xMap.right, z: zMap.center },
        'front-left': { x: xMap.left, z: zMap.front },
        'center-front': { x: xMap.center, z: zMap.front },
        'right-front': { x: xMap.right, z: zMap.front },
    };
    const { x, z } = alignmentMap[align];
    
    return {
        position: new THREE.Vector3(x + dx, 0, z + dz),
        rotationY,
    };
}
