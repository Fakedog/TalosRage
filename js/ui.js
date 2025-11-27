export let playerStats = {
    hp: 100, maxHp: 100,
    mana: 100, maxMana: 100,
    stamina: 100, maxStamina: 100,
    isDead: false
};

export let currentGameMode = null;
export let currentTeam = null;
export let myUsername = "Guerriero";

export function initUI() {
    const savedName = localStorage.getItem('ragequit_username');
    if (savedName) document.getElementById('menu-input-name').value = savedName;

    document.getElementById('menu-btn').addEventListener('click', () => location.reload());
    document.getElementById('reset-btn').addEventListener('click', respawn);
    document.getElementById('change-name-btn').addEventListener('click', () => {
        document.exitPointerLock();
        document.getElementById('login-modal').style.display = 'block';
    });
    document.getElementById('btn-login').addEventListener('click', () => {
        const newName = document.getElementById('login-input').value.trim() || myUsername;
        myUsername = newName;
        localStorage.setItem('ragequit_username', newName);
        if (socket.connected) socket.emit('updateUsername', newName);
        document.getElementById('login-modal').style.display = 'none';
        document.body.requestPointerLock();
    });
}

export function updateUI() {
    document.getElementById('hp-bar').style.width = `${playerStats.hp}%`;
    document.getElementById('mana-bar').style.width = `${playerStats.mana}%`;
    document.getElementById('stamina-bar').style.width = `${playerStats.stamina}%`;
}