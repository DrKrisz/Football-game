export const teams = {
    england: [
        "Arsenal", "Aston Villa", "Bournemouth", "Brentford", "Brighton & Hove Albion", 
        "Burnley", "Chelsea", "Crystal Palace", "Everton", "Fulham", 
        "Leeds United", "Liverpool", "Manchester City", "Manchester United", 
        "Newcastle United", "Nottingham Forest", "Sunderland", 
        "Tottenham Hotspur", "West Ham United", "Wolverhampton Wanderers"
    ],
    spain: [
        "Alavés", "Athletic Bilbao", "Atlético Madrid", "Barcelona", "Celta Vigo", 
        "Elche", "Espanyol", "Getafe", "Girona", "Levante", 
        "Mallorca", "Osasuna", "Oviedo", "Rayo Vallecano", 
        "Real Betis", "Real Madrid", "Real Sociedad", "Sevilla", 
        "Valencia", "Villarreal"
    ],
    italy: [
        "Atalanta", "Bologna", "Cagliari", "Empoli", "Fiorentina", 
        "Genoa", "Inter Milan", "Juventus", "Lazio", "Lecce", 
        "Milan", "Monza", "Napoli", "Roma", 
        "Salernitana", "Sampdoria", "Sassuolo", 
        "Torino", "Udinese", "Verona"
    ],
    germany: [
        "Augsburg", "Bayer Leverkusen", "Bayern Munich", "Bochum", 
        "Borussia Dortmund", "Borussia Mönchengladbach", "Darmstadt", 
        "Eintracht Frankfurt", "Freiburg", "Heidenheim", 
        "Hoffenheim", "Köln", "Mainz", "RB Leipzig", 
        "Stuttgart", "Union Berlin", "Werder Bremen", "Wolfsburg"
    ],
    france: [
        "Angers", "Ajaccio", "Auxerre", "Brest", "Clermont", 
        "Lens", "Lille", "Lorient", "Lyon", "Marseille", 
        "Monaco", "Montpellier", "Nantes", "Nice", 
        "Paris Saint-Germain", "Reims", "Rennes", 
        "Strasbourg", "Toulouse", "Troyes"
    ],
    norway: [
        "Aalesund", "Bodø/Glimt", "Brann", "HamKam", 
        "Haugesund", "Lillestrøm", "Molde", "Odd", 
        "Rosenborg", "Sandefjord", "Sarpsborg 08", 
        "Stabæk", "Strømsgodset", "Tromsø", 
        "Vålerenga", "Viking"
    ],
    hungary: [
        "Budapest Honvéd", "Debrecen", "Diósgyőr", "Fehérvár", 
        "Ferencváros", "Kecskemét", "Kisvárda", "Mezőkövesd", 
        "MTK Budapest", "Paks", "Puskás Akadémia", 
        "Újpest", "Zalaegerszeg"
    ]
};

let allTeams = [];
for (let league in teams) {
    allTeams = allTeams.concat(teams[league]);
}

export function getRandomTeam() {
    return allTeams[Math.floor(Math.random() * allTeams.length)];
}

export const bigTeams = [
    "Real Madrid", "Barcelona", "Manchester City", "Liverpool",
    "Bayern Munich", "PSG", "Juventus", "Chelsea", "Manchester United",
    "Inter Milan", "Milan", "Atlético Madrid", "Arsenal", "Borussia Dortmund",
    "RB Leipzig", "Marseille", "Napoli"
];

export function getRandomBigTeam() {
    return bigTeams[Math.floor(Math.random() * bigTeams.length)];
}
