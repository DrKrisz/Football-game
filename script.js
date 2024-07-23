const clubsGermany = ["Bayern Munich", "Borussia Dortmund", "RB Leipzig", "Schalke 04", "VfB Stuttgart"];
const clubsSpain = ["Real Madrid", "FC Barcelona", "Atletico Madrid", "Sevilla FC", "Valencia CF"];
const clubsArgentina = ["Boca Juniors", "River Plate", "Independiente", "San Lorenzo", "Racing Club"];

let age = 16;
let money = 0;
let fame = 0;
let respect = 0;
let seasonalStats = 0;
let season = "23/24";
let contractYears = 0;
let playerPrice = 0;
let currentClub = "";

function startGame(nationality) {
    document.getElementById("nationality-selection").style.display = "none";
    document.getElementById("game-actions").style.display = "block";
    switch (nationality) {
        case "Germany":
            currentClub = clubsGermany[Math.floor(Math.random() * clubsGermany.length)];
            break;
        case "Spain":
            currentClub = clubsSpain[Math.floor(Math.random() * clubsSpain.length)];
            break;
        case "Argentina":
            currentClub = clubsArgentina[Math.floor(Math.random() * clubsArgentina.length)];
            break;
    }
    document.getElementById("current-club").innerText = currentClub;
}

function updatePlayerInfo() {
    document.getElementById("age").innerText = age;
    document.getElementById("money").innerText = formatCurrency(money);
    document.getElementById("fame").innerText = fame;
    document.getElementById("respect").innerText = respect;
    document.getElementById("seasonal-stats").innerText = seasonalStats;
    document.getElementById("season").innerText = season;
    document.getElementById("contract-years").innerText = contractYears;
    document.getElementById("player-price").innerText = formatCurrency(playerPrice) + " $";
}

function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(value).replace('$', '').trim();
}

function nextYear() {
    age++;
    money += Math.floor(Math.random() * 100000);
    fame += Math.floor(Math.random() * 5);
    respect += Math.floor(Math.random() * 5);
    seasonalStats = Math.floor(Math.random() * 10);
    season = (parseInt(season.split('/')[0]) + 1) + '/' + (parseInt(season.split('/')[1]) + 1);
    contractYears = Math.max(0, contractYears - 1);
    playerPrice += Math.floor(Math.random() * 1000000);

    if (contractYears === 0) {
        if (Math.random() < 0.5) {
            extendContract();
        } else {
            newClub();
        }
    }

    updatePlayerInfo();
}

function extendContract() {
    contractYears += 3;
    updatePlayerInfo();
}

function newClub() {
    let newClubList = [];
    if (clubsGermany.includes(currentClub)) {
        newClubList = clubsGermany;
    } else if (clubsSpain.includes(currentClub)) {
        newClubList = clubsSpain;
    } else if (clubsArgentina.includes(currentClub)) {
        newClubList = clubsArgentina;
    }
    currentClub = newClubList[Math.floor(Math.random() * newClubList.length)];
    contractYears = 3;
    document.getElementById("current-club").innerText = currentClub;
    updatePlayerInfo();
}

function retire() {
    alert(`You have retired! Final stats:\nAge: ${age}\nMoney: ${formatCurrency(money)}€\nFame: ${fame}\nRespect: ${respect}\nSeasonal Stats: ${seasonalStats}\nSeason: ${season}\nContract Years: ${contractYears}\nPlayer Price: ${formatCurrency(playerPrice)}$\nCurrent Club: ${currentClub}`);
    location.reload();
}
