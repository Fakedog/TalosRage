import { SETTINGS } from './config.js';
import { playerStats } from './ui.js';
import { socket } from './socket.js';
import { spawnParticles, spawnProjectile, spawnStoneSpikes, spawnExplosionVisual, checkShockwaveAoE, checkSplashDamage, playSound, addToLog, createFloatingText, flashScreen } from './utils.js';
import { playerMesh, otherPlayers } from './models.js';

let lastAttackTime = 0;
let lastHealTime = -10000;
let lastConversionTime = 0;
let lastWhirlwindTime = 0;
let lastSpikesTime = 0;

export function performAttack() {
    if (playerStats.isDead || currentGameMode === 'SPECTATOR') return;
    if (window.weaponMode === 'ranged') {
        startCasting(window.currentSpell, 'attack', 'Mouse');
    } else {
        if (performance.now() - lastAttackTime < SETTINGS.meleeRate) return;
        lastAttackTime = performance.now();
        swingSword();
    }
}

export function performHeal() {
    const now = performance.now();
    if (now - lastHealTime < SETTINGS.healCooldown) return;
    if (playerStats.mana < SETTINGS.healCost || playerStats.hp >= playerStats.maxHp) return;
    playerStats.mana -= SETTINGS.healCost;
    playerStats.hp = Math.min(playerStats.maxHp, playerStats.hp + SETTINGS.healAmount);
    socket?.emit('playerHealed', { amount: SETTINGS.healAmount });
    socket?.emit('playerEffect', { type: 'heal' });
    lastHealTime = now;
    addToLog(`+${SETTINGS.healAmount} HP`, "heal");
    createFloatingText(playerMesh.position.clone().add(new THREE.Vector3(0, 5, 0)), `+${SETTINGS.healAmount}`, '#00ff00');
    flashScreen('green');
    playSound('heal');
}

export function performWhirlwind() {
    const now = performance.now();
    if (now - lastWhirlwindTime < SETTINGS.whirlwindCooldown) return;
    if (playerStats.stamina < SETTINGS.whirlwindCost) return;
    playerStats.stamina -= SETTINGS.whirlwindCost;
    lastWhirlwindTime = now;
    velocity.y += 150;
    window.isWhirlwinding = true;
    setTimeout(() => window.isWhirlwinding = false, 500);
    spawnParticles(playerMesh.position, 0xffffff, 40, 60, 0.6, false);
    socket?.emit('playerAttack', { type: 'whirlwind' });
    playSound('whirlwind');
}

export function performConversion(type) {
    const now = performance.now();
    if (now - lastConversionTime < SETTINGS.conversionCooldown) return;
    // logica completa come nel tuo file originale
    lastConversionTime = now;
    // ... (resto identico)
}