import { createEnemyModel, removeEnemyModel } from './models.js';
import { playerStats } from './ui.js';

export let socket;

export function initSocket() {
    socket = io();

    socket.on('currentPlayers', players => {
        Object.keys(players).forEach(id => {
            if (id !== socket.id) createEnemyModel(id);
        });
    });

    socket.on('newPlayer', data => createEnemyModel(data.id));

    socket.on('playerMoved', data => {
        if (enemies[data.id]) {
            enemies[data.id].position.set(data.position.x, data.position.y, data.position.z);
            enemies[data.id].rotation.y = data.rotation.y;
        }
    });

    socket.on('updateHealth', data => {
        if (data.id === socket.id) playerStats.hp = data.hp;
    });

    socket.on('playerDied', data => {
        if (data.id === socket.id) playerStats.isDead = true;
    });

    socket.on('playerDisconnected', id => removeEnemyModel(id));
}