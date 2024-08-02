import { getRandomValueChange, getRandomHighValueIncrease, getRandomHighValueDecrease } from './utils.js';
import { showCareerSummary } from './ui.js';

export class Player {
    constructor() {
        this.age = 16;
        this.team = '';
        this.position = '';
        this.origin = '';
        this.value = 100000;
        this.prevValue = 100000;
        this.highestValue = 100000;
        this.totalGoals = 0;
        this.totalAssists = 0;
        this.clubHistory = [];
        this.nextTeams = [];
        this.retired = false;
        this.totalYears = 0;
        this.leagueTitles = 0;
        this.internationalCups = 0;
        this.worldCups = 0;
        this.continentalCups = 0;
    }

    incrementAge() {
        this.age++;
        this.totalYears++;
        this.prevValue = this.value;

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

    checkTrophies() {
        // League Titles: 25% chance to win once a year
        if (Math.random() < 0.25) {
            this.leagueTitles++;
        }

        // International Cups: 1% chance to win 3 cups, 15% chance to win 2 cups, 25% chance to win 1 cup
        const internationalChance = Math.random();
        if (internationalChance < 0.01) {
            this.internationalCups += 3;
        } else if (internationalChance < 0.15) { // 0.05 + 0.20
            this.internationalCups += 2;
        } else if (internationalChance < 0.25) { // 0.05 + 0.20 + 0.30
            this.internationalCups += 1;
        }

        // World Cup: 1% chance to win every 4 years
        if (this.age % 4 === 0 && Math.random() < 0.01) {
            this.worldCups++;
        }

        // Continental Cup: 5% chance to win every 4 years
        if (this.age % 4 === 0 && Math.random() < 0.05) {
            this.continentalCups++;
        }
    }

    addClubHistory(age, team, value, goals, assists) {
        const p = document.createElement('p');
        p.innerText = `${age} yrs: ${team} - ${value.toLocaleString()} $ - ${goals} goals - ${assists} assists`;
        if (value > this.prevValue) {
            p.style.color = 'green';
        } else if (value < this.prevValue) {
            p.style.color = 'red';
        }
        this.clubHistory.push(p);
    }
}
