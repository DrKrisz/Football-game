import { showCareerSummary } from './ui.js';

export function checkInjury(player) {
    console.log('Checking for injury...');
    if (Math.random() < 0.01) { // 1% chance
        player.retired = true;
        alert("You got injured and have to retire early.");
        showCareerSummary(player);
        return true;
    }
    return false;
}

export function getRandomValueChange() {
    return Math.floor(Math.random() * 5000001); // Random value between 0 and 5 million
}

export function getRandomHighValueIncrease() {
    return 50000000 + Math.floor(Math.random() * 51000001); // Random value between 50 and 100 million
}

export function getRandomHighValueDecrease() {
    return 50000000 + Math.floor(Math.random() * 51000001); // Random value between 50 and 100 million
}

export function getRandomGoals() {
    return Math.floor(Math.random() * 61); // Random goals between 0 and 60
}

export function getRandomAssists() {
    return Math.floor(Math.random() * 61); // Random assists between 0 and 60
}
