import { getRandomBigTeam } from './teams.js';

export function checkInjury(player) {
    if (Math.random() < 0.01) { // 1% chance of injury
        player.injured = true;
        player.injuryDuration = getRandomInjuryDuration(); // Add injury duration
        showPopup(`You got injured! You will be out for ${player.injuryDuration} year(s).`);
        return true;
    }
    return false;
}

export function getRandomInjuryDuration() {
    return Math.floor(Math.random() * 3) + 1; // Random duration between 1 and 3 years
}

export function getRandomValueChange() {
    return Math.floor(Math.random() * 500001); // Random value between 0 and 500,000
}

export function getRandomHighValueIncrease() {
    return 5000000 + Math.floor(Math.random() * 5500001); // Random value between 5 and 10.5 million
}

export function getRandomHighValueDecrease() {
    return 10000000 + Math.floor(Math.random() * 11000001); // Random value between 10 and 20 million
}

export function getRandomGoals() {
    const probability = Math.random();
    if (probability < 0.80) {
        return Math.floor(Math.random() * 11); // 80% chance to get 0-10 goals
    } else if (probability < 0.95) {
        return Math.floor(Math.random() * 31); // 15% chance to get 0-30 goals
    } else {
        return Math.floor(Math.random() * 101); // 5% chance to get 0-100 goals
    }
}

export function getRandomAssists() {
    const probability = Math.random();
    if (probability < 0.80) {
        return Math.floor(Math.random() * 6); // 80% chance to get 0-5 assists
    } else if (probability < 0.95) {
        return Math.floor(Math.random() * 16); // 15% chance to get 0-15 assists
    } else {
        return Math.floor(Math.random() * 31); // 5% chance to get 0-30 assists
    }
}

export function getRandomBallonDorIncrease() {
    return 10000000 + Math.floor(Math.random() * 40000001); // Random value between 10 and 50 million
}

export function showPopup(message) {
    document.getElementById('popupMessage').innerText = message;
    document.getElementById('popup').style.display = 'flex';
}

export function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

export function calculatePerformance(player) {
    return ((player.totalGoals + player.totalAssists + (player.leagueTitles + player.internationalCups + player.worldCups + player.continentalCups) * 10) / player.totalYears).toFixed(2);
}

export function getContinentalCupName(origin) {
    switch (origin) {
        case 'europe':
            return 'European Cups';
        case 'south-america':
            return 'Copa América';
        case 'africa':
            return 'Africa Cup';
        case 'asia':
            return 'Asia Cup';
        case 'north-america':
            return 'Gold Cup';
        default:
            return 'Continental Cup';
    }
}

export function playBeep() {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = 440;
        osc.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
    } catch (e) {}
}

export function showEventMessage(message, withConfetti = false) {
    const div = document.createElement('div');
    div.className = 'event-message';
    div.innerText = message;
    document.body.appendChild(div);
    playBeep();
    if (withConfetti) startConfetti();
    setTimeout(() => div.classList.add('fade-out'), 2000);
    setTimeout(() => div.remove(), 3000);
}

export function startConfetti() {
    const colors = ['#ffeb3b', '#e91e63', '#03a9f4', '#4caf50', '#ff9800'];
    const pieces = 50;
    for (let i = 0; i < pieces; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti';
        piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        piece.style.left = Math.random() * 100 + 'vw';
        piece.style.animationDelay = Math.random() * 0.5 + 's';
        document.body.appendChild(piece);
        setTimeout(() => piece.remove(), 3000);
    }
}

export function checkTrainingBoost(player) {
    if (Math.random() < 0.05) {
        player.trainingBoostYears = Math.floor(Math.random() * 2) + 1;
        showEventMessage(`Training boost! ${player.trainingBoostYears} season(s) of improvement.`);
        return true;
    }
    return false;
}

export function checkTransferInterest(player, goals, assists) {
    if ((goals > 25 || assists > 15) && Math.random() < 0.5) {
        player.transferOffer = true;
        showEventMessage('Big clubs are interested in you!');
        player.nextTeams = [getRandomBigTeam(), getRandomBigTeam()];
    } else {
        player.transferOffer = false;
    }
}
