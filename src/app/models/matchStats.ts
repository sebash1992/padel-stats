import {Team} from './team'
import {MatchSet} from './matchSet'

export class MatchStats {
    set1: MatchSet;
    set2: MatchSet;
    set3: MatchSet;
    super: MatchSet;
    currentSet: number;
    public constructor() {
        this.set1 = new MatchSet();
        this.set2 = new MatchSet();
        this.set3 = new MatchSet();
        this.super = new MatchSet();
        this.currentSet = 1;
    }
    
    public getCurrentSet(): MatchSet {
        switch (this.currentSet) {
            case 1:
                return this.set1;
            case 2:
                return this.set2;
            case 3:
                return this.set3;
            case 4:
                return this.super;
            default:
                return this.set1;

        }
    }
    public point(team: number) {
        switch (this.currentSet) {
            case 1:
                if (team == 1) {
                    this.set1.pointTeam1();
                } else {

                    this.set1.pointTeam2();
                }
                this.set1.calculateGoldenPoint();
                if (this.set1.isSetEnded()) {
                    this.currentSet++
                    if((this.set1.team1.points == 7 && this.set1.team2.points == 6)||(this.set1.team2.points == 7 && this.set1.team1.points == 6)){
                        if(this.set1.team1.startServingTieBreak){
                            this.set2.team2.isServing = true;
                            this.set2.team1.isServing = false;
                        }else{
                            this.set2.team1.isServing = true;
                            this.set2.team2.isServing = false;
                        }
                    }else{
                        this.set2.team1.isServing = this.set1.team1.isServing;
                        this.set2.team2.isServing = this.set1.team2.isServing;
                    }
                }
                break;
            case 2:
                if (team == 1) {
                    this.set2.pointTeam1();
                } else {

                    this.set2.pointTeam2();
                }
                this.set2.calculateGoldenPoint();
                if (this.set2.isSetEnded()) {
                    this.currentSet++
                    if((this.set2.team1.points == 7 && this.set2.team2.points == 6)||(this.set2.team2.points == 7 && this.set2.team1.points == 6)){
                        if(this.set2.team1.startServingTieBreak){
                            this.set3.team2.isServing = true;
                            this.set3.team1.isServing = false;
                        }else{
                            this.set3.team1.isServing = true;
                            this.set3.team2.isServing = false;
                        }
                    }else{
                        this.set3.team1.isServing = this.set2.team2.isServing;
                        this.set3.team2.isServing = this.set2.team2.isServing;
                    }
                }
                break;
            case 3:
                if (team == 1) {
                    this.set3.pointTeam1();
                } else {

                    this.set3.pointTeam2();
                }

                this.set3.calculateGoldenPoint();
                if (this.set3.isSetEnded()) {
                    this.currentSet = -1
                }
                break;
            case 4:
                if (team == 1) {
                    this.super.pointTeam1();
                } else {

                    this.super.pointTeam2();
                }
                this.super.calculateGoldenPoint();
                if (this.super.isSetEnded()) {
                    this.currentSet = -1
                }
                break;
        }
    }

    public getCurrentGame(team: number): number {
        switch (this.currentSet) {
            case 1:
                if (team == 1) {
                    return this.set1.team1.scoreCurrentGame;
                } else {

                    return this.set1.team2.scoreCurrentGame;
                }
            case 2:
                if (team == 1) {
                    return this.set2.team1.scoreCurrentGame;
                } else {

                    return this.set2.team2.scoreCurrentGame;
                }
            case 3:
                if (team == 1) {
                    return this.set3.team1.scoreCurrentGame;
                } else {

                    return this.set3.team2.scoreCurrentGame;
                }
            case 4:
                if (team == 1) {
                    return this.super.team1.scoreCurrentGame;
                } else {

                    return this.super.team2.scoreCurrentGame;
                }
        }
        return 0;
    }



}