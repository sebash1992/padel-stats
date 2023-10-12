import {Team} from './team'
import {MatchStats} from './matchStats'

export class MatchSet {
    team1: Team;
    team2: Team;
    lastWin:number=1;
    pointsPlayed:number=1;
    isEnded:boolean=false;
    isSuper:boolean;
    public constructor(isSuper:boolean = false) {
        this.team1 = new Team(true);
        this.team2 = new Team();
        this.isSuper = isSuper;

    }
    private changeService(){
        this.team1.isServing = !this.team1.isServing;
        this.team2.isServing = !this.team2.isServing;
    }
    public pointTeam1() {
        debugger;
        this.pointsPlayed++;
        if (this.team1.points == 6 && this.team2.points == 6) {
            this.team1.scoreCurrentGame++;
            if((this.team2.scoreCurrentGame + this.team1.scoreCurrentGame)%2 != 0){
                this.changeService();
            }
            if ((this.team1.scoreCurrentGame == 7 && this.team2.scoreCurrentGame < 5) || (this.team1.scoreCurrentGame > 7 && this.team1.scoreCurrentGame - this.team2.scoreCurrentGame == 2)) {
                this.team1.points++;
            }
        } else if(!this.isSuper) {
            switch (this.team1.scoreCurrentGame) {
                case 0:
                    this.calculateConsecutiveWin(1);
                    this.team1.scoreCurrentGame = 15;
                    break;
                case 15:
                    this.calculateConsecutiveWin(1);
                    this.team1.scoreCurrentGame = 30;
                    break;
                case 30:
                    this.calculateConsecutiveWin(1);
                    this.team1.breakOptions += this.calculateBreakOportunities(1);
                    this.team1.scoreCurrentGame = 40;
                    break;
                case 40:
                    this.calculateConsecutiveWin(1);
                    if(this.isBreak(1)){
                        this.team1.breaksAcchived ++
                        if(this.isGoldenPoint()) this.team1.goldenPointsWinned++;
                    } 
                    this.team1.scoreCurrentGame = 0;
                    this.team2.scoreCurrentGame = 0;
                    this.team1.points++;
                    this.changeService();
                    if(this.team1.points == 6 && this.team2.points ==6){
                          if(this.team1.isServing){
                            this.team1.startServingTieBreak = true;
                          } else{
                            this.team2.startServingTieBreak = true;

                          } 
                    }
                    break;
            }
        }else{
            this.team1.points++;
            if((this.team2.points + this.team1.pointsWinned)%2 != 0){
                this.changeService();
            }
        }
    }

    public pointTeam2() {
        this.pointsPlayed++;
        if (this.team2.points == 6 && this.team1.points == 6) {
            this.team2.scoreCurrentGame++;
            if((this.team1.scoreCurrentGame + this.team2.scoreCurrentGame)%2 != 0){
                this.changeService();
            }
            if ((this.team2.scoreCurrentGame == 7 && this.team1.scoreCurrentGame < 5) || (this.team2.scoreCurrentGame > 7 && this.team2.scoreCurrentGame - this.team1.scoreCurrentGame == 2)) {
                this.team2.points++;
            }
        } else if(!this.isSuper){
            switch (this.team2.scoreCurrentGame) {
                case 0:
                    this.calculateConsecutiveWin(2);
                    this.team2.scoreCurrentGame = 15;
                    break;
                case 15:
                    this.calculateConsecutiveWin(2);
                    this.team2.scoreCurrentGame = 30;
                    break;
                case 30:
                    this.calculateConsecutiveWin(2);
                    this.team2.breakOptions += this.calculateBreakOportunities(2);
                    this.team2.scoreCurrentGame = 40;
                    break;
                case 40:
                    this.calculateConsecutiveWin(2);
                    if(this.isBreak(2)){
                        this.team2.breaksAcchived ++
                        if(this.isGoldenPoint()) this.team1.goldenPointsWinned++;
                        
                    } 
                    this.team2.scoreCurrentGame = 0;
                    this.team1.scoreCurrentGame = 0;
                    this.team2.points++;
                    this.changeService();
                    if(this.team2.points == 6 && this.team1.points ==6){
                          if(this.team2.isServing){
                            this.team2.startServingTieBreak = true;
                          } else{
                            this.team1.startServingTieBreak = true;
                          } 
                    }
                    break;
            }
        }else{
            this.team2.points++;
            if((this.team2.points + this.team1.points)%2 != 0){
                this.changeService();
            }
        }
    }

    public isSetEnded(): boolean {
        if(!this.isSuper){
            if ((this.team1.points == 6 && this.team2.points < 5) || (this.team2.points == 6 && this.team1.points < 5)) {
                return true
            }
            if ((this.team1.points == 7) || (this.team2.points == 7)) {
                return true
            }
        }else{
            debugger;
            if ((this.team2.points == 11 && this.team1.points < 10) || (this.team2.points > 11 && this.team2.points - this.team1.points == 2)) {
                return true;
            }
            if ((this.team1.points == 11 && this.team2.points < 10) || (this.team1.points > 11 && this.team1.points - this.team2.points == 2)) {
                return true;
            }
        }
        return false;

    }

    public getSetWinner(): number {
        if ((this.team1.points == 6 && this.team2.points < 5)) {
            return 1;
        }
        if((this.team2.points == 6 && this.team1.points < 5)){
            return 2;
        }
        if( (this.team2.points == 7)){
            return 2
        }
        if ((this.team1.points == 7)) {
            return 1;
        }
        return 1;
    }

    private calculateConsecutiveWin(teamWin:number){
        if(this.lastWin != teamWin){
            this.team1.resetConsecutiveWin();
            this.team2.resetConsecutiveWin();
            this.lastWin = teamWin;
        }
        switch(teamWin){
            case(1):
                this.team1.addConsecutiveWin();
                break;
            case(2):
                this.team2.addConsecutiveWin();
                break;
        }
    }

    private isBreak(teamWin:number): boolean{
        if(!this.team1.isServing){
            if(teamWin == 1 && this.team1.scoreCurrentGame == 40) return true;
        }
        if(!this.team2.isServing){
            if(teamWin == 2 && this.team2.scoreCurrentGame == 40) return true;
        }
        return false;
    }
    public calculateGoldenPoint(){
        var isGoldenPoint = this.team2.scoreCurrentGame == 40 &&  this.team1.scoreCurrentGame == 40;
        if(isGoldenPoint){
            this.team2.goldenPointsPlayed++;
            this.team1.goldenPointsPlayed++;
        }
    }
    public isGoldenPoint(): boolean{
        return this.team2.scoreCurrentGame == 40 &&  this.team1.scoreCurrentGame == 40;
    }

    private calculateBreakOportunities(teamWin:number):number{
        if(!this.team1.isServing){
            switch(this.team2.scoreCurrentGame){
                case 0:
                    return 4;
                case 15:
                    return 3;
                case 30:
                    return 2;
                case 40:
                    return 1;
            }
        }
        if(!this.team2.isServing){
            switch(this.team1.scoreCurrentGame){
                case 0:
                    return 4;
                case 15:
                    return 3;
                case 30:
                    return 2;
                case 40:
                    return 1;
            }
        }
        return 0;
    }
}