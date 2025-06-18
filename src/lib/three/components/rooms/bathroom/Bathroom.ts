import * as THREE from 'three';
import {
    BATHROOM_ORIGIN,
    BATHROOM_SIZE,
    VANITY_SIZE,
    TUB_SIZE,
    TOILET_SIZE
} from '$utils/layout';

import { Vanity } from './Vanity';
import { Tub } from './Tub';
import { Toilet } from './Toilet';
import { alignInRoom } from '$utils/align';

export function Bathroom(): THREE.Group {
    const group = new THREE.Group();
    group.position.set(...BATHROOM_ORIGIN);
    
    const [roomWidth, roomDepth] = BATHROOM_SIZE;
    
    // vanity
    const vanity = Vanity();
    const { position: vPos, rotationY: vRot } = alignInRoom(
        roomWidth, roomDepth,
        VANITY_SIZE[0], VANITY_SIZE[1],
        'back-right', 'left'
    );
    vanity.position.copy(vPos);
    vanity.rotation.y = vRot;
    group.add(vanity);
    
    // tub (full width, front-center)
    const tub = Tub();
    const { position: tPos, rotationY: tRot } = alignInRoom(
        roomWidth, roomDepth,
        TUB_SIZE[0], TUB_SIZE[1],
        'center-front', 'back'
    );
    tub.position.copy(tPos);
    tub.rotation.y = tRot;
    group.add(tub);
    
    // toilet (between tub + vanity, right-center-ish)
    const toilet = Toilet();
    const { position: wcPos, rotationY: wcRot } = alignInRoom(
        roomWidth, roomDepth,
        TOILET_SIZE[0], TOILET_SIZE[1],
        'center-right', 'right',
    );
    toilet.position.copy(wcPos);
    toilet.rotation.y = wcRot;
    group.add(toilet);
    
    return group;
}
