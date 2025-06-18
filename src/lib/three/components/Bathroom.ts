import * as THREE from 'three';
import { Vanity } from './Vanity';

export function Bathroom(): THREE.Group {
    const group = new THREE.Group();

    const vanity = Vanity();
    vanity.position.set(2.0192+1, 0, 1.1176+1); // arbitrary placement
    group.add(vanity);

    // add more like toilet, tiles...

    return group;
}
