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

    const stats = {
        leagueTitles: Math.floor(Math.random() * 25),
        internationalCups: Math.floor(Math.random() * 25),
        worldCups: Math.floor(Math.random() * 5),
        originCupName: originCupName,
        originCups: Math.floor(Math.random() * 5)
    };

    console.log(`Generated random stats: ${JSON.stringify(stats)}`);
    return stats;
}
