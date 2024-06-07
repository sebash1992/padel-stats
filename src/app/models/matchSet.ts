import {Team} from './team'
import {MatchStats} from './matchStats'

export class MatchSet {
    team1: Team;
    team2: Team;
    lastWin:number=1;
    pointsPlayed:number=0;
    isEnded:boolean=false;
    isSuper:boolean= false;

    public constructor(team1?:Team,team2?:Team, lastWin?:number,pointsPlayed?:number, isEnded?:boolean,isSuper?:boolean) {

        if(team1 === undefined){
            this.team1 = new Team(true);
        }else{
            this.team1 = new Team(true,team1);
        }
        if(team2 === undefined){
            this.team2 = new Team();
        }else{
            this.team2 = new Team(true,team2);
        }
        if(lastWin !== undefined){
            this.lastWin = lastWin;
        }
        if(pointsPlayed !== undefined){
            this.pointsPlayed = pointsPlayed;
        }
        if(isEnded !== undefined){
            this.isEnded = isEnded;
        }
        if(isSuper !== undefined){
            this.isSuper = isSuper;
        }
    }
    
    private changeService(){
        this.team1.isServing = !this.team1.isServing;
        this.team2.isServing = !this.team2.isServing;
    }

    public getSetWinner(): number {
        if ((this.team1.points === 6 && this.team2.points < 5)) {
            return 1;
        }
        if((this.team2.points === 6 && this.team1.points < 5)){
            return 2;
        }
        if( (this.team2.points === 7)){
            return 2
        }
        if ((this.team1.points === 7)) {
            return 1;
        }
        return 1;
    }
}