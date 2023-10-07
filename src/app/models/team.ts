export class Team {
    breakOptions:number;
    breaksAcchived:number;
    goldenPointsPlayed: number;
    goldenPointsWinned:number;
    maxConsecutiveWins:number;
    consecutiveWins:number;
    pointsWinned:number;
    currentSet: number;
    isServing: boolean;
    points: number;
    scoreCurrentGame: number;
    startServingTieBreak: boolean;
    public constructor(isServing:boolean=false) {
        this.breakOptions = 0;
        this.breaksAcchived = 0;
        this.goldenPointsPlayed = 0;
        this.goldenPointsWinned = 0;
        this.maxConsecutiveWins = 0;
        this.consecutiveWins = 0;
        this.pointsWinned = 0;
        this.currentSet = 0;
        this.isServing = isServing;
        this.points = 0;
        this.scoreCurrentGame = 0;
        this.startServingTieBreak = false;
    }

    public addConsecutiveWin(){
        this.pointsWinned++;
        this.consecutiveWins++;
        if(this.consecutiveWins > this.maxConsecutiveWins){
            this.maxConsecutiveWins + this.consecutiveWins;
        }
    }
    public resetConsecutiveWin(){
        this.consecutiveWins = 0;
    }
}