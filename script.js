document.getElementById('startCareer').addEventListener('click', startCareer);
document.getElementById('stayTeam').addEventListener('click', stayTeam);
document.getElementById('team1').addEventListener('click', () => chooseTeam('team1'));
document.getElementById('team2').addEventListener('click', () => chooseTeam('team2'));

const teams = {
    england: [
        "Arsenal", "Aston Villa", "Bournemouth", "Brentford", "Brighton & Hove Albion", "Burnley",
        "Chelsea", "Crystal Palace", "Everton", "Fulham", "Liverpool", "Luton Town",
        "Manchester City", "Manchester United", "Newcastle United", "Nottingham Forest", "Sheffield United",
        "Tottenham Hotspur", "West Ham United", "Wolverhampton Wanderers"
    ],
    spain: [
        "Alavés", "Athletic Bilbao", "Atlético Madrid", "Barcelona", "Cádiz", "Celta Vigo",
        "Elche", "Espanyol", "Getafe", "Girona", "Granada", "Mallorca", "Osasuna", "Rayo Vallecano",
        "Real Betis", "Real Madrid", "Real Sociedad", "Sevilla", "Valencia", "Villarreal"
    ],
    italy: [
        "Atalanta", "Bologna", "Cagliari", "Empoli", "Fiorentina", "Genoa", "Inter Milan", "Juventus",
        "Lazio", "Lecce", "Milan", "Monza", "Napoli", "Roma", "Salernitana", "Sampdoria", "Sassuolo",
        "Torino", "Udinese", "Verona"
    ],
    germany: [
        "Augsburg", "Bayer Leverkusen", "Bayern Munich", "Bochum", "Borussia Dortmund",
        "Borussia Mönchengladbach", "Darmstadt", "Eintracht Frankfurt", "Freiburg", "Heidenheim",
        "Hoffenheim", "Köln", "Mainz", "RB Leipzig", "Stuttgart", "Union Berlin", "Werder Bremen", "Wolfsburg"
    ],
    france: [
        "Angers", "Ajaccio", "Auxerre", "Brest", "Clermont", "Lens", "Lille", "Lorient",
        "Lyon", "Marseille", "Monaco", "Montpellier", "Nantes", "Nice", "PSG", "Reims", "Rennes",
        "Strasbourg", "Toulouse", "Troyes"
    ],
    norway: [
        "Aalesund", "Bodø/Glimt", "Brann", "HamKam", "Haugesund", "Lillestrøm", "Molde",
        "Odd", "Rosenborg", "Sandefjord", "Sarpsborg 08", "Stabæk", "Strømsgodset", "Tromsø",
        "Vålerenga", "Viking"
    ],
    hungary: [
        "Budapest Honvéd", "Debrecen", "Diósgyőr", "Fehérvár", "Ferencváros", "Kisvárda", "Kecskemét",
        "Mezőkövesd", "MTK Budapest", "Paks", "Puskás Akadémia", "Újpest", "Zalaegerszeg"
    ]
};

let allTeams = [];
for (let league in teams) {
    allTeams = allTeams.concat(teams[league]);
}

let player = {
    age: 16,
    team: '',
    position: '',
    origin: '',
    value: 100000,
    prevValue: 100000,
    highestValue: 100000,
    clubHistory: [],
    nextTeams: [],
    retired: false
};

// Store the original content of page2 to restore later
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
    player.clubHistory.push(createClubHistoryItem(player.age, player.team, player.value, player.prevValue));

    if (!player.team) {
        alert("Error: No team found for the selected origin.");
        return;
    }

    document.getElementById('page1').style.display = 'none';
    document.getElementById('page2').style.display = 'block';

    updateCareerDetails();
    updateRandomTeamButtons();
    scrollToBottom('clubHistory');
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
        Value: ${player.value.toLocaleString()} $
    `;

    clubHistory.innerHTML = '';
    player.clubHistory.forEach(item => clubHistory.appendChild(item));
}

function stayTeam() {
    if (checkInjury()) {
        return;
    }
    incrementAge();
    player.clubHistory.push(createClubHistoryItem(player.age, player.team, player.value, player.prevValue));
    updateCareerDetails();
    updateRandomTeamButtons();
    scrollToBottom('clubHistory');
}

function chooseTeam(buttonId) {
    if (checkInjury()) {
        return;
    }
    incrementAge();
    const chosenTeam = player.nextTeams[buttonId === 'team1' ? 0 : 1];
    player.team = chosenTeam;
    player.clubHistory.push(createClubHistoryItem(player.age, player.team, player.value, player.prevValue));
    updateCareerDetails();
    updateRandomTeamButtons();
    scrollToBottom('clubHistory');
}

function incrementAge() {
    player.age++;
    player.prevValue = player.value;
    
    if (player.age >= 24 && player.age <= 27) {
        if (Math.random() < 0.10) { // 10% chance
            player.value += getRandomHighValueIncrease();
        } else {
            player.value += getRandomValueChange();
        }
    } else if (player.age <= 30) {
        player.value += getRandomValueChange();
    } else if (player.age > 34 && player.value > 100000000) {
        if (Math.random() < 0.9) { // 90% chance
            player.value -= getRandomHighValueDecrease();
            if (player.value < 30000000) player.value = 30000000; // Ensure value doesn't go below 30 million
        } else {
            player.value -= getRandomValueChange();
            if (player.value < 0) player.value = 0; // Prevent negative value
        }
    } else {
        player.value -= getRandomValueChange();
        if (player.value < 0) player.value = 0; // Prevent negative value
    }

    if (player.value > player.highestValue) {
        player.highestValue = player.value;
    }

    if (player.age > 40) {
        retirePlayer();
    }
}

function checkInjury() {
    if (Math.random() < 0.01) { // 1% chance
        player.retired = true;
        alert("You got injured and have to retire early.");
        retirePlayer();
        return true;
    }
    return false;
}

function retirePlayer() {
    const stats = generateRandomStats();
    const careerSummary = `
        <h2>Career Summary</h2>
        <p>Highest Value: ${player.highestValue.toLocaleString()} $</p>
        <p>Goals: ${stats.goals}</p>
        <p>Assists: ${stats.assists}</p>
        <p>Trophies: ${stats.trophies}</p>
    `;
    document.getElementById('page2').innerHTML = careerSummary + '<button onclick="startNewCareer()">Restart</button>';
}

function generateRandomStats() {
    return {
        goals: Math.floor(Math.random() * 500),
        assists: Math.floor(Math.random() * 300),
        trophies: Math.floor(Math.random() * 20)
    };
}

function startNewCareer() {
    player.age = 16;
    player.team = '';
    player.position = '';
    player.origin = '';
    player.value = 100000;
    player.prevValue = 100000;
    player.highestValue = 100000;
    player.clubHistory = [];
    player.nextTeams = [];
    player.retired = false;

    document.getElementById('page1').style.display = 'block';
    document.getElementById('page2').style.display = 'none';
    
    // Restore the original content of page2
    document.getElementById('page2').innerHTML = originalPage2Content;

    // Reattach event listeners to the new buttons
    document.getElementById('stayTeam').addEventListener('click', stayTeam);
    document.getElementById('team1').addEventListener('click', () => chooseTeam('team1'));
    document.getElementById('team2').addEventListener('click', () => chooseTeam('team2'));
}

function getRandomValueChange() {
    return Math.floor(Math.random() * 5000001); // Random value between 0 and 5 million
}

function getRandomHighValueIncrease() {
    return 50000000 + Math.floor(Math.random() * 51000001); // Random value between 50 and 100 million
}

function getRandomHighValueDecrease() {
    return 50000000 + Math.floor(Math.random() * 51000001); // Random value between 50 and 100 million
}

function getRandomTeam() {
    return allTeams[Math.floor(Math.random() * allTeams.length)];
}

function updateRandomTeamButtons() {
    player.nextTeams = [getRandomTeam(), getRandomTeam()];
    document.getElementById('team1').innerText = `Go to ${player.nextTeams[0]}`;
    document.getElementById('team2').innerText = `Go to ${player.nextTeams[1]}`;
}

function createClubHistoryItem(age, team, value, prevValue) {
    const p = document.createElement('p');
    p.innerText = `${age} yrs: ${team} - ${value.toLocaleString()} $`;
    if (value > prevValue) {
        p.style.color = 'green';
    } else if (value < prevValue) {
        p.style.color = 'red';
    }
    return p;
}

function scrollToBottom(elementId) {
    const element = document.getElementById(elementId);
    element.scrollTop = element.scrollHeight;
}
