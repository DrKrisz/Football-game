import { Player } from './player.js';
import { getRandomTeam } from './teams.js';
import { updateCareerDetails, updateRandomTeamButtons, scrollToBottom, showCareerSummary } from './ui.js';
import { checkInjury, getRandomGoals, getRandomAssists, showPopup, closePopup, getRandomValueChange, getRandomBallonDorIncrease } from './utils.js';

let player = new Player();

document.getElementById('startCareer').addEventListener('click', startCareer);
document.getElementById('stayTeam').addEventListener('click', handleStayOrNextYear);
document.getElementById('team1').addEventListener('click', () => chooseTeam('team1'));
document.getElementById('team2').addEventListener('click', () => chooseTeam('team2'));
document.getElementById('restartCareer').addEventListener('click', startNewCareer);
document.getElementById('retireEarly').addEventListener('click', retireEarly);
document.getElementById('closePopup').addEventListener('click', closePopup);

const originalPage2Content = document.getElementById('page2').innerHTML;

function startCareer() {
    const nameInput = document.getElementById('name');
    const positionSelect = document.getElementById('position');
    const originSelect = document.getElementById('origin');
    const appearanceInput = document.getElementById('appearance');

    if (!nameInput || !positionSelect || !originSelect || !appearanceInput) {
        return;
    }

    player.name = nameInput.value;
    player.position = positionSelect.value;
    player.origin = originSelect.value.toLowerCase();
    player.appearance = appearanceInput.value; // Store appearance

    player.team = getRandomTeam();
    player.addClubHistory(player.age, player.team, player.value, 'Initial', 'Initial');

    if (!player.team) {
        showPopup("Error: No team found for the selected origin.");
        return;
    }

    document.getElementById('page1').style.display = 'none';
    document.getElementById('page2').style.display = 'block';

    updateCareerDetails(player);
    updateRandomTeamButtons(player);
    scrollToBottom('clubHistory');
}

function handleStayOrNextYear() {
    if (player.injured) {
        nextYear();
    } else {
        stayTeam();
    }
}

function stayTeam() {
    if (checkInjury(player)) {
        document.getElementById('stayTeam').innerText = 'Next Year';
        return;
    }

    player.incrementAge();
    const goals = getRandomGoals();
    const assists = getRandomAssists();
    player.totalGoals += goals;
    player.totalAssists += assists;

    let historyColor = 'black';
    let ballonDorMessage = '';
    if (goals > 30 || assists > 15) {
        historyColor = 'yellow';
        player.value += getRandomBallonDorIncrease();
        player.ballonDors++;
        ballonDorMessage = ' - Ballon d\'Or Winner!';
    } else if (player.value > player.prevValue) {
        historyColor = 'green';
    } else if (player.value < player.prevValue) {
        historyColor = 'red';
    }

    player.addClubHistory(player.age, player.team, player.value, goals, assists, historyColor, ballonDorMessage);
    if (!document.getElementById('careerDetails') || !document.getElementById('clubHistory')) {
        return;
    }
    updateCareerDetails(player);
    updateRandomTeamButtons(player);
    scrollToBottom('clubHistory');
}

function nextYear() {
    player.injuryDuration--;
    player.incrementAgeDuringInjury();
    const valueDecrease = getRandomValueChange();
    player.value = Math.max(0, player.value - valueDecrease);
    player.addClubHistory(player.age, player.team, player.value, 'Injured', 'Injured', 'black', '');
    
    if (player.injuryDuration <= 0) {
        player.injured = false;
        showPopup("You have recovered from your injury!");
        document.getElementById('stayTeam').innerText = 'Stay with the Team';
    } else {
        showPopup(`You are still injured. ${player.injuryDuration} year(s) to go.`);
    }

    updateCareerDetails(player);
    updateRandomTeamButtons(player);
    scrollToBottom('clubHistory');
}

function chooseTeam(buttonId) {
    if (checkInjury(player)) {
        document.getElementById('stayTeam').innerText = 'Next Year';
        return;
    }
    player.incrementAge();
    const chosenTeam = player.nextTeams[buttonId === 'team1' ? 0 : 1];
    player.team = chosenTeam;
    const goals = getRandomGoals();
    const assists = getRandomAssists();
    player.totalGoals += goals;
    player.totalAssists += assists;

    let historyColor = 'black';
    let ballonDorMessage = '';
    if (goals > 30 || assists > 15) {
        historyColor = 'yellow';
        player.value += getRandomBallonDorIncrease();
        player.ballonDors++;
        ballonDorMessage = ' - Ballon d\'Or Winner!';
    } else if (player.value > player.prevValue) {
        historyColor = 'green';
    } else if (player.value < player.prevValue) {
        historyColor = 'red';
    }

    player.addClubHistory(player.age, player.team, player.value, goals, assists, historyColor, ballonDorMessage);
    if (!document.getElementById('careerDetails') || !document.getElementById('clubHistory')) {
        return;
    }
    updateCareerDetails(player);
    updateRandomTeamButtons(player);
    scrollToBottom('clubHistory');
}

function retireEarly() {
    showCareerSummary(player);
}

export function startNewCareer() {
    player = new Player();
    document.getElementById('page1').style.display = 'block';
    document.getElementById('page2').style.display = 'none';
    document.getElementById('page2').innerHTML = originalPage2Content;

    document.getElementById('stayTeam').addEventListener('click', handleStayOrNextYear);
    document.getElementById('team1').addEventListener('click', () => chooseTeam('team1'));
    document.getElementById('team2').addEventListener('click', () => chooseTeam('team2'));
    document.getElementById('restartCareer').addEventListener('click', startNewCareer);
    document.getElementById('retireEarly').addEventListener('click', retireEarly);
    document.getElementById('closePopup').addEventListener('click', closePopup);
}

// Make startNewCareer accessible globally
window.startNewCareer = startNewCareer;

function roundToNearestMillion(value) {
    return `${(Math.round(value / 1000000) * 1000000).toLocaleString()} $`;
}
