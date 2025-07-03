import { getRandomTeam, getRandomBigTeam } from './teams.js';
import { calculatePerformance, getContinentalCupName } from './utils.js';

export function updateCareerDetails(player) {
    const careerDetails = document.getElementById('careerDetails');
    const clubHistory = document.getElementById('clubHistory');

    if (!careerDetails || !clubHistory) {
        return;
    }

    careerDetails.innerHTML = `
        ${player.age} yrs: ${player.team}<br>
        Value: ${player.value.toLocaleString()} $<br>
        Contract Years Left: ${player.contractYearsLeft}<br>
        Total Goals: ${player.totalGoals} <br>
        Total Assists: ${player.totalAssists} <br>
        Yellow Cards: ${player.totalYellowCards} <br>
        Red Cards: ${player.totalRedCards} <br>
        Passing Skill: ${player.passing}
    `;

    clubHistory.innerHTML = '';
    player.clubHistory.forEach(item => {
        clubHistory.appendChild(item);
    });
}

export function updateRandomTeamButtons(player) {
    const team1Button = document.getElementById('team1');
    const team2Button = document.getElementById('team2');
    
    if (!team1Button || !team2Button) {
        return;
    }
    
    if (player.transferOffer) {
        player.nextTeams = [getRandomBigTeam(), getRandomBigTeam()];
    } else {
        player.nextTeams = [getRandomTeam(), getRandomTeam()];
    }
    team1Button.innerText = `Go to ${player.nextTeams[0]}`;
    team2Button.innerText = `Go to ${player.nextTeams[1]}`;
}

export function scrollToBottom(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollTop = element.scrollHeight;
    }
}

export function showCareerSummary(player) {
    const totalTrophies = player.leagueTitles + player.internationalCups + player.worldCups + player.continentalCups;
    const careerSummary = `
        <h2>Career Summary</h2>
        <p>Name: ${player.name}</p>
        <p>Appearance: <span style="background-color: ${player.appearance}; width: 20px; height: 20px; display: inline-block;"></span></p>
        <p>Highest Value: ${player.highestValue.toLocaleString()} $</p>
        <p>Total Goals: ${player.totalGoals}</p>
        <p>Total Assists: ${player.totalAssists}</p>
        <p>Yellow Cards: ${player.totalYellowCards}</p>
        <p>Red Cards: ${player.totalRedCards}</p>
        <p>Passing Skill: ${player.passing}</p>
        <p>Contract Years Left: ${player.contractYearsLeft}</p>
        <p>League Titles: ${player.leagueTitles}</p>
        <p>International Cups: ${player.internationalCups}</p>
        <p>World Cups: ${player.worldCups}</p>
        <p>${getContinentalCupName(player.origin)}: ${player.continentalCups}</p>
        <p>Ballon d'Ors: ${player.ballonDors}</p>
        <p>Total Years Played: ${player.totalYears}</p>
        <p>Overall Performance: ${calculatePerformance(player)}%</p>
    `;
    document.getElementById('page2').innerHTML = careerSummary + '<button onclick="startNewCareer()">Restart</button>';
}
