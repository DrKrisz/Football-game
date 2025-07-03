import { getRandomBigTeam } from './teams.js';

export function checkInjury(player) {
    if (Math.random() < 0.01) {
        player.injured = true;
        player.injuryDuration = getRandomInjuryDuration();
        showPopup(`You got injured! You will be out for ${player.injuryDuration} year(s).`);
        return true;
    }
    return false;
}

export function getRandomInjuryDuration() {
    return Math.floor(Math.random() * 3) + 1;
}

export function getRandomValueChange() {
    return Math.floor(Math.random() * 500001);
}

export function getRandomHighValueIncrease() {
    return 5000000 + Math.floor(Math.random() * 5500001);
}

export function getRandomHighValueDecrease() {
    return 10000000 + Math.floor(Math.random() * 11000001);
}

export function getGoalsForPosition(position) {
    const prob = Math.random();
    switch (position) {
        case 'GK':
            return prob < 0.01 ? 1 : 0;
        case 'CB':
        case 'RB':
        case 'LB':
        case 'RWB':
        case 'LWB':
            if (prob < 0.8) return Math.floor(Math.random() * 3); // 0-2
            if (prob < 0.95) return Math.floor(Math.random() * 6); // 0-5
            return Math.floor(Math.random() * 11); // 0-10
        case 'CDM':
        case 'CM':
        case 'RM':
        case 'LM':
            if (prob < 0.8) return Math.floor(Math.random() * 6); // 0-5
            if (prob < 0.95) return Math.floor(Math.random() * 11); // 0-10
            return Math.floor(Math.random() * 21); // 0-20
        case 'CAM':
        case 'ST':
        case 'CF':
        case 'RW':
        case 'LW':
        default:
            if (prob < 0.8) return Math.floor(Math.random() * 16); // 0-15
            if (prob < 0.95) return Math.floor(Math.random() * 26); // 0-25
            return Math.floor(Math.random() * 41); // 0-40
    }
}

export function getAssistsForPosition(position) {
    const prob = Math.random();
    switch (position) {
        case 'GK':
            return prob < 0.05 ? 1 : 0;
        case 'CB':
        case 'RB':
        case 'LB':
        case 'RWB':
        case 'LWB':
            if (prob < 0.8) return Math.floor(Math.random() * 3); // 0-2
            if (prob < 0.95) return Math.floor(Math.random() * 6); // 0-5
            return Math.floor(Math.random() * 11); // 0-10
        case 'CDM':
        case 'CM':
        case 'RM':
        case 'LM':
            if (prob < 0.8) return Math.floor(Math.random() * 8); // 0-7
            if (prob < 0.95) return Math.floor(Math.random() * 16); // 0-15
            return Math.floor(Math.random() * 26); // 0-25
        case 'CAM':
        case 'ST':
        case 'CF':
        case 'RW':
        case 'LW':
        default:
            if (prob < 0.8) return Math.floor(Math.random() * 6); // 0-5
            if (prob < 0.95) return Math.floor(Math.random() * 11); // 0-10
            return Math.floor(Math.random() * 16); // 0-15
    }
}

export function getPassingMultiplier(position) {
    switch (position) {
        case 'GK':
            return 0.1;
        case 'CB':
        case 'RB':
        case 'LB':
        case 'RWB':
        case 'LWB':
            return 0.2;
        case 'CDM':
        case 'CM':
        case 'CAM':
        case 'RM':
        case 'LM':
            return 0.6;
        case 'ST':
        case 'CF':
        case 'RW':
        case 'LW':
        default:
            return 0.4;
    }
}

export function getRandomYellowCards() {
    const probability = Math.random();
    if (probability < 0.6) {
        return Math.floor(Math.random() * 3); // 0-2
    } else if (probability < 0.9) {
        return Math.floor(Math.random() * 4) + 3; // 3-6
    } else {
        return Math.floor(Math.random() * 5) + 7; // 7-11
    }
}

export function getRandomRedCards() {
    const chance = Math.random();
    if (chance < 0.85) {
        return 0;
    } else if (chance < 0.95) {
        return 1;
    } else {
        return 2;
    }
}

export function adjustValueForSeason(player, goals, assists, yellowCards, redCards) {
    let change = goals * 200000 + assists * 150000;
    change -= yellowCards * 50000 + redCards * 200000;
    if (player.transferOffer) {
        change *= 1.2;
    }
    player.value = Math.max(0, player.value + Math.floor(change));
    if (player.value > player.highestValue) {
        player.highestValue = player.value;
    }
}

export function getRandomBallonDorIncrease() {
    return 10000000 + Math.floor(Math.random() * 40000001);
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

export function showEventMessage(message) {
    const div = document.createElement('div');
    div.className = 'event-message';
    div.innerText = message;
    document.body.appendChild(div);
    playBeep();
    setTimeout(() => div.classList.add('fade-out'), 2000);
    setTimeout(() => div.remove(), 3000);
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
