import { getRandomTeam } from './teams.js';

export function updateCareerDetails(player) {
    const careerDetails = document.getElementById('careerDetails');
    const clubHistory = document.getElementById('clubHistory');

    if (!careerDetails || !clubHistory) {
        console.error('Missing career details or club history element.');
        return;
    }

    careerDetails.innerHTML = `
        ${player.age} yrs: ${player.team}<br>
        Value: ${player.value.toLocaleString()} $
    `;

    clubHistory.innerHTML = '';
    player.clubHistory.forEach(item => clubHistory.appendChild(item));
}

export function updateRandomTeamButtons(player) {
    player.nextTeams = [getRandomTeam(), getRandomTeam()];
    document.getElementById('team1').innerText = `Go to ${player.nextTeams[0]}`;
    document.getElementById('team2').innerText = `Go to ${player.nextTeams[1]}`;
}

export function scrollToBottom(elementId) {
    const element = document.getElementById(elementId);
    element.scrollTop = element.scrollHeight;
}

export function showCareerSummary(player) {
    const stats = generateRandomStats();
    const careerSummary = `
        <h2>Career Summary</h2>
        <p>Highest Value: ${player.highestValue.toLocaleString()} $</p>
        <p>Goals: ${stats.goals}</p>
        <p>Assists: ${stats.assists}</p>
        <p>Trophies: ${stats.trophies}</p>
    `;
    document.getElementById('page2').innerHTML = careerSummary + '<button onclick="startNewCareer()">Start New Career</button>';
}

function generateRandomStats() {
    return {
        goals: Math.floor(Math.random() * 500),
        assists: Math.floor(Math.random() * 300),
        trophies: Math.floor(Math.random() * 20)
    };
}
