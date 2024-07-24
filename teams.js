export const teams = {
    england: [
        "Arsenal", "Aston Villa", "Bournemouth", "Brentford", "Brighton & Hove Albion", "Burnley",
        "Chelsea", "Crystal Palace", "Everton", "Fulham", "Liverpool", "Luton Town",
        "Manchester City", "Manchester United", "Newcastle United", "Nottingham Forest", "Sheffield United",
        "Tottenham Hotspur", "West Ham United", "Wolverhampton"
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

export function getRandomTeam() {
    return allTeams[Math.floor(Math.random() * allTeams.length)];
}
