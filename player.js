import { getRandomValueChange, getRandomHighValueIncrease, getRandomHighValueDecrease, showEventMessage, getContractLengthForAge } from './utils.js';
import { showCareerSummary } from './ui.js';

export class Player {
    constructor() {
        this.name = '';
        this.appearance = '';
        this.age = 16;
        this.team = '';
        this.position = '';
        this.origin = '';
        this.value = 100000;
        this.prevValue = 100000;
        this.highestValue = 100000;
        this.totalGoals = 0;
        this.totalAssists = 0;
        this.totalYellowCards = 0;
        this.totalRedCards = 0;
        this.clubHistory = [];
        this.nextTeams = [];
        this.retired = false;
        this.totalYears = 0;
        this.leagueTitles = 0;
        this.internationalCups = 0;
        this.worldCups = 0;
        this.continentalCups = 0;
        this.injured = false;
        this.injuryDuration = 0;
        this.ballonDors = 0;
        this.passing = 50;
        this.trainingBoostYears = 0;
        this.transferOffer = false;
        this.contractYearsLeft = 0;
    }

    incrementAge() {
        this.age++;
        this.totalYears++;
        this.prevValue = this.value;
        this.contractYearsLeft--;
        if (this.contractYearsLeft <= 0) {
            this.signNewContract();
        }

        if (this.trainingBoostYears > 0) {
            this.value += 1000000;
            this.passing += 5;
            this.trainingBoostYears--;
        }

        if (this.age >= 24 && this.age <= 27) {
            if (Math.random() < 0.20) {
                this.value += getRandomHighValueIncrease();
            } else {
                this.value += getRandomValueChange();
            }
        } else if (this.age <= 30) {
            this.value += getRandomValueChange();
        } else if (this.age > 34 && this.value > 100000000) {
            if (Math.random() < 0.75) {
                this.value -= getRandomHighValueDecrease();
                if (this.value < 30000000) this.value = 30000000;
            } else {
                this.value -= getRandomValueChange();
                if (this.value < 0) this.value = 0;
            }
        } else {
            this.value -= getRandomValueChange();
            if (this.value < 0) this.value = 0;
        }

        if (this.value > this.highestValue) {
            this.highestValue = this.value;
        }

        this.checkTrophies();

        if (this.age > 40) {
            showCareerSummary(this);
        }
    }

    incrementAgeDuringInjury() {
        this.age++;
        this.totalYears++;
        this.prevValue = this.value;
        this.contractYearsLeft--;
        if (this.contractYearsLeft <= 0) {
            this.signNewContract();
        }
        const valueDecrease = getRandomValueChange();
        this.value = Math.max(0, this.value - valueDecrease);

        if (this.trainingBoostYears > 0) {
            this.passing += 5;
            this.trainingBoostYears--;
        }

        if (this.age > 40) {
            showCareerSummary(this);
        }
    }

    checkTrophies() {
        if (Math.random() < 0.25) {
            this.leagueTitles++;
            this.value += 2000000;
            showEventMessage('League Title Won!');
        }

        const internationalChance = Math.random();
        if (internationalChance < 0.01) {
            this.internationalCups += 3;
            this.value += 10000000;
            showEventMessage('International Cup Treble!');
        } else if (internationalChance < 0.15) {
            this.internationalCups += 2;
            this.value += 7000000;
            showEventMessage('International Cup Double!');
        } else if (internationalChance < 0.25) {
            this.internationalCups += 1;
            this.value += 3000000;
            showEventMessage('International Cup Win!');
        }

        if (this.age % 4 === 0 && Math.random() < 0.01) {
            this.worldCups++;
            this.value += 20000000;
            showEventMessage('World Cup Champion!');
        }

        if (this.age % 4 === 0 && Math.random() < 0.05) {
            this.continentalCups++;
            this.value += 4000000;
            showEventMessage('Continental Cup Victory!');
        }
    }

    addClubHistory(age, team, value, goals, assists, color, ballonDorMessage = '', yellowCards = 0, redCards = 0) {
        const p = document.createElement('p');
        if (goals === 'Injured' && assists === 'Injured') {
            p.innerText = `${age} yrs: ${team} - ${value.toLocaleString()} $ - Injured`;
        } else {
            p.innerText = `${age} yrs: ${team} - ${value.toLocaleString()} $ - ${goals} goals - ${assists} assists - ${yellowCards} YC - ${redCards} RC${ballonDorMessage}`;
        }
        p.style.color = color;
        this.clubHistory.push(p);
    }

    signNewContract() {
        this.contractYearsLeft = getContractLengthForAge(this.age);
        showEventMessage(`Signed a ${this.contractYearsLeft}-year contract with ${this.team}`);
    }
}
