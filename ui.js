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
        Value: ${player.value.toLocaleString()} $<br>
        Total Goals: ${player.totalGoals} <br>
        Total Assists: ${player.totalAssists}
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
    const stats = generateRandomStats(player.origin);
    const careerSummary = `
        <h2>Career Summary</h2>
        <p>Highest Value: ${player.highestValue.toLocaleString()} $</p>
        <p>Total Goals: ${player.totalGoals}</p>
        <p>Total Assists: ${player.totalAssists}</p>
        <p>League Titles: ${stats.leagueTitles}</p>
        <p>International Cups: ${stats.internationalCups}</p>
        <p>World Cups: ${stats.worldCups}</p>
        <p>${stats.originCupName}: ${stats.originCups}</p>
    `;
    document.getElementById('page2').innerHTML = careerSummary + '<button onclick="startNewCareer()">Start New Career</button>';
}

function generateRandomStats(origin) {
    let originCupName;
    switch (origin) {
        case 'europe':
            originCupName = 'European Cups';
            break;
        case 'south-america':
            originCupName = 'Copa América';
            break;
        case 'africa':
            originCupName = 'Africa Cup';
            break;
        case 'asia':
            originCupName = 'Asia Cup';
            break;
        case 'north-america':
            originCupName = 'Gold Cup';
            break;
        default:
            originCupName = 'Continental Cup';
    }

    return {
        leagueTitles: Math.floor(Math.random() * 25),
        internationalCups: Math.floor(Math.random() * 25),
        worldCups: Math.floor(Math.random() * 5),
        originCupName: originCupName,
        originCups: Math.floor(Math.random() * 5)
    };
}
