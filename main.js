import { Player } from './player.js';
import { getRandomTeam } from './teams.js';
import { updateCareerDetails, updateRandomTeamButtons, scrollToBottom, showCareerSummary } from './ui.js';
import { checkInjury, getRandomGoals, getRandomAssists } from './utils.js';

let player = new Player();

document.getElementById('startCareer').addEventListener('click', startCareer);
document.getElementById('stayTeam').addEventListener('click', stayTeam);
document.getElementById('team1').addEventListener('click', () => chooseTeam('team1'));
document.getElementById('team2').addEventListener('click', () => chooseTeam('team2'));

const originalPage2Content = document.getElementById('page2').innerHTML;

function startCareer() {
    const positionSelect = document.getElementById('position');
    const originSelect = document.getElementById('origin');

    if (!positionSelect || !originSelect) {
        console.error('Missing elements for position or origin selection.');
        return;
    }

    player.position = positionSelect.value;
    player.origin = originSelect.value.toLowerCase();

    player.team = getRandomTeam();
    player.addClubHistory(player.age, player.team, player.value, 0, 0);

    if (!player.team) {
        alert("Error: No team found for the selected origin.");
        return;
    }

    document.getElementById('page1').style.display = 'none';
    document.getElementById('page2').style.display = 'block';

    updateCareerDetails(player);
    updateRandomTeamButtons(player);
    scrollToBottom('clubHistory');
}

function stayTeam() {
    if (checkInjury(player)) {
        return;
    }
    player.incrementAge();
    const goals = getRandomGoals();
    const assists = getRandomAssists();
    player.addClubHistory(player.age, player.team, player.value, goals, assists);
    player.totalGoals += goals;
    player.totalAssists += assists;
    updateCareerDetails(player);
    updateRandomTeamButtons(player);
    scrollToBottom('clubHistory');
}

function chooseTeam(buttonId) {
    if (checkInjury(player)) {
        return;
    }
    player.incrementAge();
    const chosenTeam = player.nextTeams[buttonId === 'team1' ? 0 : 1];
    player.team = chosenTeam;
    const goals = getRandomGoals();
    const assists = getRandomAssists();
    player.addClubHistory(player.age, player.team, player.value, goals, assists);
    player.totalGoals += goals;
    player.totalAssists += assists;
    updateCareerDetails(player);
    updateRandomTeamButtons(player);
    scrollToBottom('clubHistory');
}

export function startNewCareer() {
    player = new Player();
    document.getElementById('page1').style.display = 'block';
    document.getElementById('page2').style.display = 'none';
    document.getElementById('page2').innerHTML = originalPage2Content;

    document.getElementById('stayTeam').addEventListener('click', stayTeam);
    document.getElementById('team1').addEventListener('click', () => chooseTeam('team1'));
    document.getElementById('team2').addEventListener('click', () => chooseTeam('team2'));
}

// Make startNewCareer accessible globally
window.startNewCareer = startNewCareer;
