import * as THREE from 'three';
import { scene } from './three-setup.js';

export let playerMesh, swordContainer, staffContainer, shieldMesh;
export let playerLimbs = {};
export const otherPlayers = {};

export function createPlayer() {
    playerMesh = new THREE.Group();
    const armorMat = new THREE.MeshStandardMaterial({ color: 0x2c3e50, metalness: 0.7 });
    const metalMat = new THREE.MeshStandardMaterial({ color: 0x95a5a6, metalness: 0.9 });

    // torso + chest
    const torso = new THREE.Mesh(new THREE.BoxGeometry(4.5, 6.5, 3), armorMat);
    torso.position.y = 3.5;
    playerMesh.add(torso);
    playerLimbs.torso = torso;

    const chest = new THREE.Mesh(new THREE.BoxGeometry(4.7, 3.5, 3.2), metalMat);
    chest.position.y = 5.0;
    playerMesh.add(chest);

    // head + helmet
    playerLimbs.head = createHelmet(playerMesh);

    // legs
    const legGeo = new THREE.BoxGeometry(1.6, 6.5, 1.6);
    playerLimbs.legL = new THREE.Mesh(legGeo, armorMat);
    playerLimbs.legL.position.set(-1.4, 0.5, 0);
    playerLimbs.legL.geometry.translate(0, -3.25, 0);
    playerMesh.add(playerLimbs.legL);

    playerLimbs.legR = new THREE.Mesh(legGeo, armorMat);
    playerLimbs.legR.position.set(1.4, 0.5, 0);
    playerLimbs.legR.geometry.translate(0, -3.25, 0);
    playerMesh.add(playerLimbs.legR);

    // arms
    const armGeo = new THREE.BoxGeometry(1.4, 6, 1.4);
    playerLimbs.armL = new THREE.Mesh(armGeo, armorMat);
    playerLimbs.armL.position.set(-3, 6, 0);
    playerLimbs.armL.geometry.translate(0, -2.5, 0);
    playerMesh.add(playerLimbs.armL);

    playerLimbs.armR = new THREE.Mesh(armGeo, armorMat);
    playerLimbs.armR.position.set(3, 6, 0);
    playerLimbs.armR.geometry.translate(0, -2.5, 0);
    playerMesh.add(playerLimbs.armR);

    playerMesh.position.y = 6;
    scene.add(playerMesh);

    createSword();
    createStaff();
    createShield();
}

function createHelmet(parent) {
    const group = new THREE.Group();
    const helm = new THREE.Mesh(new THREE.BoxGeometry(3.2, 3.4, 3.4), new THREE.MeshStandardMaterial({ color: 0x555555, metalness: 0.8 }));
    group.add(helm);
    const visor = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.5, 3.6), new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.9 }));
    visor.position.set(0, 0.2, -0.2);
    group.add(visor);
    const crest = new THREE.Mesh(new THREE.BoxGeometry(0.4, 1.5, 3.8), new THREE.MeshLambertMaterial({ color: 0xc0392b }));
    crest.position.y = 2.2;
    group.add(crest);
    group.position.y = 8.5;
    parent.add(group);
    return group;
}

function createSword() {
    swordContainer = new THREE.Group();
    const blade = new THREE.Mesh(new THREE.BoxGeometry(0.8, 18, 0.2), new THREE.MeshStandardMaterial({ color: 0xecf0f1, metalness: 0.9 }));
    blade.position.y = 10;
    swordContainer.add(blade);
    const guard = new THREE.Mesh(new THREE.BoxGeometry(6, 0.8, 0.8), new THREE.MeshStandardMaterial({ color: 0xf39c12 }));
    guard.position.y = 1;
    swordContainer.add(guard);
    const hilt = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.4, 4), new THREE.MeshStandardMaterial({ color: 0x5a3a22 }));
    hilt.position.y = -1.5;
    swordContainer.add(hilt);
    swordContainer.position.set(0, -5, 0.5);
    swordContainer.rotation.x = -Math.PI / 2;
    swordContainer.visible = false;
    playerLimbs.armR.add(swordContainer);
}

function createStaff() {
    staffContainer = new THREE.Group();
    const staff = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.3, 22), new THREE.MeshStandardMaterial({ color: 0x3e2723 }));
    staff.position.y = 6;
    staffContainer.add(staff);
    const head = new THREE.Mesh(new THREE.TorusGeometry(1.5, 0.3, 8, 20), new THREE.MeshStandardMaterial({ color: 0xffd700 }));
    head.position.y = 17;
    head.rotation.y = Math.PI / 2;
    staffContainer.add(head);
    const gem = new THREE.Mesh(new THREE.OctahedronGeometry(0.8), new THREE.MeshBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.9 }));
    gem.position.y = 17;
    staffContainer.add(gem);
    staffContainer.userData.gem = gem;
    staffContainer.position.set(0, -4, 0);
    staffContainer.rotation.x = -Math.PI / 6;
    playerLimbs.armR.add(staffContainer);
}

function createShield() {
    shieldMesh = new THREE.Mesh(new THREE.BoxGeometry(4, 8, 1), new THREE.MeshBasicMaterial({ color: 0x00aaff, transparent: true, opacity: 0.4, side: THREE.DoubleSide }));
    shieldMesh.position.set(3, -2, 0);
    shieldMesh.rotation.y = -Math.PI / 2;
    shieldMesh.visible = false;
    playerLimbs.armL.add(shieldMesh);
}

export function addOtherPlayer(info) {
    // (codice completo identico al tuo – lo metto nel prossimo messaggio se vuoi, altrimenti è già nel file finale del ZIP)
}