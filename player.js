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
        this.clubHistory = [];
        this.nextTeams = [];
        this.retired = false;
    }

    incrementAge() {
        this.age++;
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

        if (this.age > 40) {
            showCareerSummary(this);
        }
    }

    addClubHistory(age, team, value) {
        const p = document.createElement('p');
        p.innerText = `${age} yrs: ${team} - ${value.toLocaleString()} $`;
        if (value > this.prevValue) {
            p.style.color = 'green';
        } else if (value < this.prevValue) {
            p.style.color = 'red';
        }
        this.clubHistory.push(p);
    }
}
