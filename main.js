import { Player } from './player.js';
import { getRandomTeam } from './teams.js';
import { updateCareerDetails, updateRandomTeamButtons, scrollToBottom, showCareerSummary as uiShowCareerSummary } from './ui.js';
import { checkInjury, getRandomGoals, getRandomAssists } from './utils.js';

let player = new Player();

document.getElementById('startCareer').addEventListener('click', startCareer);
document.getElementById('stayTeam').addEventListener('click', stayTeam);
document.getElementById('team1').addEventListener('click', () => chooseTeam('team1'));
document.getElementById('team2').addEventListener('click', () => chooseTeam('team2'));
document.getElementById('restartCareer').addEventListener('click', startNewCareer);
document.getElementById('retireEarly').addEventListener('click', retireEarly);
document.getElementById('closePopup').addEventListener('click', closePopup);

const originalPage2Content = document.getElementById('page2').innerHTML;

function startCareer() {
    console.log('Starting career...');
    const positionSelect = document.getElementById('position');
    const originSelect = document.getElementById('origin');

    if (!positionSelect || !originSelect) {
        console.error('Missing elements for position or origin selection.');
        return;
    }

    player.position = positionSelect.value;
    player.origin = originSelect.value.toLowerCase();

    player.team = getRandomTeam();
    console.log(`Initial team assigned: ${player.team}`);
    player.addClubHistory(player.age, player.team, player.value, 0, 0);

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

function stayTeam() {
    console.log('Staying with the team...');
    if (checkInjury(player)) {
        return;
    }

    // 25% chance the club terminates the contract
    if (Math.random() < 0.25) {
        let newTeam = getRandomTeam();
        
        // Ensure the new team is different from the current team
        while (newTeam === player.team) {
            newTeam = getRandomTeam();
        }

        const newValueRaw = Math.random() < 0.1 ? "Free" : (Math.random() * 100000000).toFixed(2);
        const newValue = newValueRaw === "Free" ? "Free" : roundToNearestMillion(parseFloat(newValueRaw));
        showPopup(`The club has terminated the contract with you! They sold you to ${newTeam} for ${newValue}.`);
        player.team = newTeam;

        if (newValue !== "Free") {
            player.value = parseFloat(newValue.replace(/,/g, "").replace(" $", ""));
        }
    }

    player.incrementAge();
    const goals = getRandomGoals();
    const assists = getRandomAssists();
    player.addClubHistory(player.age, player.team, player.value, goals, assists);
    player.totalGoals += goals;
    player.totalAssists += assists;
    if (!document.getElementById('careerDetails') || !document.getElementById('clubHistory')) {
        console.log('Career summary already shown, skipping updates.');
        return;
    }
    updateCareerDetails(player);
    updateRandomTeamButtons(player);
    scrollToBottom('clubHistory');
}

function chooseTeam(buttonId) {
    console.log(`Choosing new team from button: ${buttonId}`);
    if (checkInjury(player)) {
        return;
    }
    player.incrementAge();
    const chosenTeam = player.nextTeams[buttonId === 'team1' ? 0 : 1];
    player.team = chosenTeam;
    console.log(`New team chosen: ${player.team}`);
    const goals = getRandomGoals();
    const assists = getRandomAssists();
    player.addClubHistory(player.age, player.team, player.value, goals, assists);
    player.totalGoals += goals;
    player.totalAssists += assists;
    if (!document.getElementById('careerDetails') || !document.getElementById('clubHistory')) {
        console.log('Career summary already shown, skipping updates.');
        return;
    }
    updateCareerDetails(player);
    updateRandomTeamButtons(player);
    scrollToBottom('clubHistory');
}

function retireEarly() {
    console.log('Retiring early...');
    showCareerSummary(player);
}

export function startNewCareer() {
    console.log('Starting new career...');
    player = new Player();
    document.getElementById('page1').style.display = 'block';
    document.getElementById('page2').style.display = 'none';
    document.getElementById('page2').innerHTML = originalPage2Content;

    document.getElementById('stayTeam').addEventListener('click', stayTeam);
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

export function showPopup(message) {
    document.getElementById('popupMessage').innerText = message;
    document.getElementById('popup').style.display = 'flex';
}

export function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

export function showCareerSummary(player) {
    uiShowCareerSummary(player);
}
