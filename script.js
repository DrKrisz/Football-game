document.getElementById('startCareer').addEventListener('click', startCareer);
document.getElementById('stayTeam').addEventListener('click', stayTeam);
document.getElementById('team1').addEventListener('click', () => chooseTeam('team1'));
document.getElementById('team2').addEventListener('click', () => chooseTeam('team2'));

const teams = [
    "FC Barcelona", "Real Madrid", "Paris Saint-Germain", "Bayern Munich", "Manchester City",
    "Boca Juniors", "River Plate", "Flamengo", "Palmeiras", "Santos",
    "Al Ahly", "Zamalek", "Esperance Sportive de Tunis", "TP Mazembe", "Mamelodi Sundowns",
    "Al Hilal", "Urawa Red Diamonds", "Guangzhou Evergrande", "Al Sadd", "Persepolis",
    "LA Galaxy", "New York City FC", "Toronto FC", "Club America", "Seattle Sounders"
];

let player = {
    age: 16,
    team: '',
    position: '',
    origin: '',
    value: 10000000,
    clubHistory: [],
    nextTeams: []
};

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
    player.clubHistory.push(`${player.age} yrs: ${player.team}`);

    if (!player.team) {
        alert("Error: No team found for the selected origin.");
        return;
    }

    document.getElementById('page1').style.display = 'none';
    document.getElementById('page2').style.display = 'block';

    updateCareerDetails();
    updateRandomTeamButtons();
}

function updateCareerDetails() {
    const careerDetails = document.getElementById('careerDetails');
    const clubHistory = document.getElementById('clubHistory');
    
    if (!careerDetails || !clubHistory) {
        console.error('Missing career details or club history element.');
        return;
    }

    careerDetails.innerHTML = `
        ${player.age} yrs: ${player.team}<br>
        Value: ${player.value.toLocaleString()} $<br>
        Goal: ${player.position !== 'goalkeeper' ? 'Yes' : 'N/A'}<br>
        Assist: ${player.position !== 'goalkeeper' ? 'Yes' : 'N/A'}<br>
        Clear: ${player.position === 'goalkeeper' ? 'Yes' : 'N/A'}
    `;

    clubHistory.innerHTML = player.clubHistory.join('<br>');
}

function stayTeam() {
    incrementAge();
    player.clubHistory.push(`${player.age} yrs: ${player.team}`);
    updateCareerDetails();
    updateRandomTeamButtons();
}

function chooseTeam(buttonId) {
    incrementAge();
    const chosenTeam = player.nextTeams[buttonId === 'team1' ? 0 : 1];
    player.team = chosenTeam;
    player.clubHistory.push(`${player.age} yrs: ${player.team}`);
    updateCareerDetails();
    updateRandomTeamButtons();
}

function incrementAge() {
    player.age++;
    if (player.age > 40) {
        alert("Your career is over!");
        resetGame();
    }
}

function getRandomTeam() {
    return teams[Math.floor(Math.random() * teams.length)];
}

function updateRandomTeamButtons() {
    player.nextTeams = [getRandomTeam(), getRandomTeam()];
    document.getElementById('team1').innerText = `Go to ${player.nextTeams[0]}`;
    document.getElementById('team2').innerText = `Go to ${player.nextTeams[1]}`;
}

function resetGame() {
    player.age = 16;
    player.team = '';
    player.position = '';
    player.origin = '';
    player.value = 10000000;
    player.clubHistory = [];
    player.nextTeams = [];

    document.getElementById('page1').style.display = 'block';
    document.getElementById('page2').style.display = 'none';
}
