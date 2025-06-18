import * as THREE from 'three';
import { BATHROOM_ORIGIN, BATHROOM_SIZE, VANITY_SIZE } from '$utils/layout';
import { Vanity } from './Vanity';
import { alignInRoom } from '$utils/align';

export function Bathroom(): THREE.Group {
    const group = new THREE.Group();
    group.position.set(...BATHROOM_ORIGIN);
    
    const [roomWidth, roomDepth] = BATHROOM_SIZE;
    const [vanityWidth, vanityDepth] = VANITY_SIZE;
    
    const vanity = Vanity();
    const { position: vPosition, rotationY: vRotationY } = 
        alignInRoom(roomWidth, roomDepth, vanityWidth, vanityDepth, 'back-right', 'left');
    vanity.position.copy(vPosition);
    vanity.rotation.y = vRotationY;
    group.add(vanity);
    
    return group;
}
