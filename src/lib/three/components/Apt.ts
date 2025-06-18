import * as THREE from 'three';
import { Floor } from './Floor';
import { Walls } from './Walls';
import { Bathroom } from './rooms/bathroom/Bathroom';

export function Apt(): THREE.Group {
    const group = new THREE.Group();
    group.add(Floor(), Walls(), Bathroom());
    return group;
}
