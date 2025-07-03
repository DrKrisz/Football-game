import { Player } from './player.js';
import { getRandomTeam } from './teams.js';
import { updateCareerDetails, updateRandomTeamButtons, scrollToBottom, showCareerSummary } from './ui.js';
import { checkInjury, getGoalsForPosition, getAssistsForPosition, getPassingMultiplier, getRandomYellowCards, getRandomRedCards, showPopup, closePopup, getRandomValueChange, getRandomBallonDorIncrease, checkTrainingBoost, checkTransferInterest, showEventMessage, adjustValueForSeason } from './utils.js';

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
    player.appearance = appearanceInput.value;

    player.team = getRandomTeam();
    player.addClubHistory(player.age, player.team, player.value, 'Initial', 'Initial', 'black', '', 0, 0);

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
    checkTrainingBoost(player);
    const goals = getGoalsForPosition(player.position);
    const assists = getAssistsForPosition(player.position);
    const yellowCards = getRandomYellowCards();
    const redCards = getRandomRedCards();
    player.totalGoals += goals;
    player.totalAssists += assists;
    player.totalYellowCards += yellowCards;
    player.totalRedCards += redCards;
    player.passing += assists * getPassingMultiplier(player.position);
    checkTransferInterest(player, goals, assists);
    adjustValueForSeason(player, goals, assists, yellowCards, redCards);

    let historyColor = 'black';
    let ballonDorMessage = '';
    if (goals > 30 || assists > 15) {
        historyColor = 'yellow';
        player.value += getRandomBallonDorIncrease();
        player.ballonDors++;
        ballonDorMessage = ' - Ballon d\'Or Winner!';
        showEventMessage("Ballon d'Or winner!");
    } else if (player.value > player.prevValue) {
        historyColor = 'green';
    } else if (player.value < player.prevValue) {
        historyColor = 'red';
    }

    player.addClubHistory(player.age, player.team, player.value, goals, assists, historyColor, ballonDorMessage, yellowCards, redCards);
    updateCareerDetails(player);
    updateRandomTeamButtons(player);
    scrollToBottom('clubHistory');
}

function nextYear() {
    player.injuryDuration--;
    player.incrementAgeDuringInjury();
    player.addClubHistory(player.age, player.team, player.value, 'Injured', 'Injured', 'black', '', 0, 0);

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
    checkTrainingBoost(player);
    const chosenTeam = player.nextTeams[buttonId === 'team1' ? 0 : 1];
    player.team = chosenTeam;
    const goals = getGoalsForPosition(player.position);
    const assists = getAssistsForPosition(player.position);
    const yellowCards = getRandomYellowCards();
    const redCards = getRandomRedCards();
    player.totalGoals += goals;
    player.totalAssists += assists;
    player.totalYellowCards += yellowCards;
    player.totalRedCards += redCards;
    player.passing += assists * getPassingMultiplier(player.position);
    checkTransferInterest(player, goals, assists);
    adjustValueForSeason(player, goals, assists, yellowCards, redCards);

    let historyColor = 'black';
    let ballonDorMessage = '';
    if (goals > 30 || assists > 15) {
        historyColor = 'yellow';
        player.value += getRandomBallonDorIncrease();
        player.ballonDors++;
        ballonDorMessage = ' - Ballon d\'Or Winner!';
        showEventMessage("Ballon d'Or winner!");
    } else if (player.value > player.prevValue) {
        historyColor = 'green';
    } else if (player.value < player.prevValue) {
        historyColor = 'red';
    }

    player.addClubHistory(player.age, player.team, player.value, goals, assists, historyColor, ballonDorMessage, yellowCards, redCards);
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

window.startNewCareer = startNewCareer;
