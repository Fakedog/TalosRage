import { updateAnimations } from './animations.js';
import { updateUI } from './ui.js';
import { updateParticles, updateProjectiles, updateFloatingTexts, updateConversions } from './utils.js';
import { playerMesh, playerLimbs, otherPlayers } from './models.js';
import { playerStats } from './ui.js';
import { SETTINGS } from './config.js';

let prevTime = performance.now();
const velocity = new THREE.Vector3();
let canJump = true;
let isBlocking = false;
let isSprinting = false;

export function animate() {
    requestAnimationFrame(animate);
    const time = performance.now();
    const delta = (time - prevTime) / 1000;
    prevTime = time;

    if (!playerStats.isDead && document.getElementById('main-menu').style.display === 'none') {
        updatePhysics(delta);
        updateProjectiles(delta);
        updateParticles(delta);
        updateConversions(delta);
        updateFloatingTexts(delta);
        updateCamera();
    }

    updateAnimations(delta);
    updateUI();
    renderer.render(scene, camera);
}

function updatePhysics(delta) {
    if (currentGameMode === 'SPECTATOR') {
        // movimento libero per spettatore
        const speed = 600 * delta;
        const dir = new THREE.Vector3();
        if (window.moveForward) dir.z -= 1;
        if (window.moveBackward) dir.z += 1;
        if (window.moveLeft) dir.x -= 1;
        if (window.moveRight) dir.x += 1;
        dir.normalize().applyEuler(camera.rotation);
        playerMesh.position.add(dir.multiplyScalar(speed));
        return;
    }

    // stamina regen + costi
    if (!isBlocking && !isSprinting) playerStats.stamina = Math.min(100, playerStats.stamina + 3 * delta);
    if (isSprinting && playerStats.stamina > 0) playerStats.stamina -= 10 * delta;
    if (isBlocking) playerStats.stamina -= 8 * delta;
    playerStats.mana = Math.min(100, playerStats.mana + 2 * delta);

    const speed = isSprinting && playerStats.stamina > 0 ? SETTINGS.speed * 1.6 : SETTINGS.speed;
    velocity.x *= 0.9;
    velocity.z *= 0.9;
    velocity.y -= SETTINGS.gravity * delta;

    if (window.moveForward) velocity.z -= speed * delta;
    if (window.moveBackward) velocity.z += speed * delta;
    if (window.moveLeft) velocity.x -= speed * delta;
    if (window.moveRight) velocity.x += speed * delta;

    playerMesh.position.add(velocity.clone().multiplyScalar(delta));

    if (playerMesh.position.y <= 6) {
        playerMesh.position.y = 6;
        velocity.y = 0;
        canJump = true;
    }

    // invio movimento al server
    if (socket?.connected) {
        socket.emit('playerMovement', {
            position: playerMesh.position,
            rotation: { y: playerMesh.rotation.y },
            animState: isSprinting ? 'run' : (window.moveForward || window.moveBackward || window.moveLeft || window.moveRight) ? 'walk' : 'idle',
            weaponMode: window.weaponMode || 'ranged'
        });
    }
}

function updateCamera() {
    const head = playerMesh.position.clone().add(new THREE.Vector3(0, 8.5, 0));
    if (currentGameMode === 'SPECTATOR') {
        camera.position.copy(playerMesh.position).add(new THREE.Vector3(0, 20, 40));
        camera.lookAt(playerMesh.position);
    } else if (window.weaponMode === 'ranged') {
        camera.position.copy(head);
        camera.rotation.copy(camera.rotation);
    } else {
        const offset = new THREE.Vector3(0, 6, 20).applyAxisAngle(new THREE.Vector3(1, 0, 0), -0.3);
        camera.position.copy(head).add(offset.applyEuler(new THREE.Euler(0, camera.rotation.y, 0));
        camera.lookAt(head);
    }
}

export { canJump, isBlocking, isSprinting };
window.isBlocking = () => isBlocking;