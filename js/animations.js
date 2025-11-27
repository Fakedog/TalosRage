export let currentAnim = 'idle';
let swordSwingAngle = 0;
let swinging = false;

export function updateAnimations(delta) {
    if (!playerMesh) return;

    // Sword swing animation
    if (swinging) {
        swordSwingAngle += delta * 15;
        swordMesh.rotation.z = Math.sin(swordSwingAngle) * 1.5;
        if (swordSwingAngle > Math.PI * 2) {
            swinging = false;
            swordSwingAngle = 0;
            swordMesh.rotation.z = 0;
        }
    }

    // Simple bob when moving
    const speed = playerStats.velocity.length();
    if (speed > 0.1 && !playerStats.isDead) {
        playerMesh.position.y = 6 + Math.sin(performance.now() * 0.01) * 0.2;
    }
}

export function playSwordSwing() {
    swinging = true;
    swordSwingAngle = 0;
}