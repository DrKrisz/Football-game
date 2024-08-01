import { showPopup, showCareerSummary } from './main.js';

// utils.js
export function checkInjury(player) {
    if (Math.random() < 0.01) { // 1% chance of injury
        player.retired = true;
        showPopup(`You got injured and had to retire! Career summary is now shown.`);
        showCareerSummary(player);
        return true;
    }
    return false;
}

export function getRandomValueChange() {
    return Math.floor(Math.random() * 1000001); // Random value between 0 and 1 million
}

export function getRandomHighValueIncrease() {
    return 10000000 + Math.floor(Math.random() * 11000001); // Random value between 10 and 100 million
}

export function getRandomHighValueDecrease() {
    return 20000000 + Math.floor(Math.random() * 21000001); // Random value between 20 and 100 million
}

export function getRandomGoals() {
    return Math.floor(Math.random() * 10); // Random goals between 0 and 60
}

export function getRandomAssists() {
    return Math.floor(Math.random() * 5); // Random assists between 0 and 60
}
