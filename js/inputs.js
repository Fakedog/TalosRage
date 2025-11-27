import { playerStats } from './ui.js';
import { performWhirlwind, performHeal, performConversion } from './combat.js';

const KEYBINDS = {
    MOVE_FORWARD: 'KeyW', MOVE_LEFT: 'KeyA', MOVE_BACKWARD: 'KeyS', MOVE_RIGHT: 'KeyD',
    JUMP: 'Space', SPRINT: 'ShiftLeft', WEAPON_SWITCH: 'KeyQ',
    SPELL_1: 'Digit1', SPELL_2: 'Digit2', SPELL_3: 'Digit3', SPELL_4: 'Digit4',
    HEAL: 'KeyR', CONVERT_1: 'Digit5', CONVERT_2: 'Digit6', CONVERT_3: 'Digit7'
};

let keys = {};
window.moveForward = window.moveBackward = window.moveLeft = window.moveRight = window.isSprinting = false;

export function setupInputs() {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('contextmenu', e => e.preventDefault());
}

function handleKeyDown(e) {
    const code = e.code;
    if (KEYBINDS.MOVE_FORWARD === code) window.moveForward = true;
    if (KEYBINDS.MOVE_LEFT === code) window.moveLeft = true;
    if (KEYBINDS.MOVE_BACKWARD === code) window.moveBackward = true;
    if (KEYBINDS.MOVE_RIGHT === code) window.moveRight = true;
    if (KEYBINDS.SPRINT === code) window.isSprinting = true;
    // ... tutti gli altri tasti (jump, spells, ecc.)
}

function handleKeyUp(e) {
    // stesso sistema ma false
}

function handleMouseDown(e) {
    if (e.button === 0) performAttack();
    if (e.button === 2) startBlocking();
}

function handleMouseUp(e) {
    if (e.button === 2) stopBlocking();
}