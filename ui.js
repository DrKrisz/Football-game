import { getRandomTeam } from './teams.js';

export function updateCareerDetails(player) {
    console.log('Updating career details...');
    const careerDetails = document.getElementById('careerDetails');
    const clubHistory = document.getElementById('clubHistory');

    if (!careerDetails || !clubHistory) {
        console.error('Missing career details or club history element.');
        return;
    }

    console.log(`Career details: ${player.age} yrs, ${player.team}, ${player.value}, ${player.totalGoals}, ${player.totalAssists}`);
    
    careerDetails.innerHTML = `
        ${player.age} yrs: ${player.team}<br>
        Value: ${player.value.toLocaleString()} $<br>
        Total Goals: ${player.totalGoals} <br>
        Total Assists: ${player.totalAssists}
    `;

    clubHistory.innerHTML = '';
    player.clubHistory.forEach(item => {
        console.log(`Club history item: ${item.innerText}`);
        clubHistory.appendChild(item);
    });
}

export function updateRandomTeamButtons(player) {
    console.log('Updating random team buttons...');
    const team1Button = document.getElementById('team1');
    const team2Button = document.getElementById('team2');
    
    if (!team1Button || !team2Button) {
        console.error('Missing team button elements.');
        return;
    }
    
    player.nextTeams = [getRandomTeam(), getRandomTeam()];
    console.log(`Next teams: ${player.nextTeams[0]}, ${player.nextTeams[1]}`);
    team1Button.innerText = `Go to ${player.nextTeams[0]}`;
    team2Button.innerText = `Go to ${player.nextTeams[1]}`;
}

export function scrollToBottom(elementId) {
    console.log('Scrolling to bottom...');
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollTop = element.scrollHeight;
        console.log(`Scrolled to bottom of ${elementId}`);
    } else {
        console.error(`Element with id ${elementId} not found.`);
    }
}

export function showCareerSummary(player) {
    console.log('Showing career summary...');
    
    const totalTrophies = player.leagueTitles + player.internationalCups + player.worldCups + player.continentalCups;

    const careerSummary = `
        <h2>Career Summary</h2>
        <p>Highest Value: ${player.highestValue.toLocaleString()} $</p>
        <p>Total Goals: ${player.totalGoals}</p>
        <p>Total Assists: ${player.totalAssists}</p>
        <p>League Titles: ${player.leagueTitles}</p>
        <p>International Cups: ${player.internationalCups}</p>
        <p>World Cups: ${player.worldCups}</p>
        <p>${getContinentalCupName(player.origin)}: ${player.continentalCups}</p>
        <p>Total Years Played: ${player.totalYears}</p>
    `;
    document.getElementById('page2').innerHTML = careerSummary + '<button onclick="startNewCareer()">Restart</button>';
}

function getContinentalCupName(origin) {
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
