
import { Player } from './player'

export class TeamSet {

    breakOptions: number;
    breaksAcchived: number;
    goldenPoints: number;
    goldenPointAchived: number;
    scoreCurrentGame: number;
    points: number;
    isSuper: boolean
    consecutiveWins: number;
    serving: boolean;
    pointsWinned: number;
    maxConsecutiveWins: number;

    public constructor(isSuper: boolean, serving: boolean, teamSet?: TeamSet) {
        if (teamSet != undefined) {

            this.breakOptions = teamSet.breakOptions;
            this.breaksAcchived = teamSet.breaksAcchived;
            this.goldenPoints = teamSet.goldenPoints;
            this.goldenPointAchived = teamSet.goldenPointAchived;
            this.points = teamSet.points;
            this.scoreCurrentGame = teamSet.scoreCurrentGame;
            this.isSuper = teamSet.isSuper;
            this.consecutiveWins = teamSet.consecutiveWins;
            this.serving = teamSet.serving;
            this.pointsWinned = teamSet.pointsWinned;
        } else {

            this.breakOptions = 0;
            this.breaksAcchived = 0;
            this.goldenPoints = 0;
            this.goldenPointAchived = 0;
            this.points = 0;
            this.scoreCurrentGame = 0;
            this.isSuper = isSuper;
            this.consecutiveWins = 0;
            this.serving = serving;
            this.pointsWinned = 0;
        }

    }
    public addBreakOption(options: number) {
        this.breakOptions += options;
        return this.breakOptions;
    }
    public substractBreakOption(options: number) {
        if (this.breakOptions > options) this.breakOptions -= options;
        return this.breakOptions;
    }

    public addBreakAchived() {
        this.breakOptions++;
        return this.breakOptions;
    }
    public substractBreakAchived() {
        if (this.breakOptions > 0) this.breakOptions--;
        return this.breakOptions;
    }

    public addGoldenPoint() {
        this.goldenPoints++;
        return this.goldenPoints;
    }
    public substractGoldenPoint() {
        if (this.goldenPoints > 0) this.goldenPoints--;
        return this.goldenPoints;
    }

    public addGoldenPointAchived() {
        this.goldenPointAchived++;
        return this.goldenPointAchived;
    }
    public substractGoldenPointAchived() {
        if (this.goldenPointAchived > 0) this.goldenPointAchived--;
        return this.goldenPointAchived;
    }

    public resetCurrentGames() {
        this.scoreCurrentGame = 0;
    }

    public point(oponentScoreCurrentGames: number, oponentPoints: number): boolean {
        this.addConsecutiveWin();
        if (oponentPoints === 6 && this.points === 6) {
            this.scoreCurrentGame++;
            let difference = (this.scoreCurrentGame - oponentScoreCurrentGames);
            if (this.scoreCurrentGame >= 7 && difference >= 2) {
                this.scoreCurrentGame = 0;
                this.points++;
                return true;

            }
        } else if (!this.isSuper) {
            switch (this.scoreCurrentGame) {
                case 0:
                    this.scoreCurrentGame = 15;
                    break;
                case 15:
                    this.scoreCurrentGame = 30;
                    break;
                case 30:
                    if (!this.serving) {
                        this.breakOptions += this.calculateBreakOportunities(oponentScoreCurrentGames);
                    }
                    if (oponentScoreCurrentGames == 40) {
                        this.goldenPoints++;
                    }
                    this.scoreCurrentGame = 40;
                    break;
                case 40:
                    if (!this.serving) {
                        this.breaksAcchived++
                        if (this.isGoldenPoint(oponentScoreCurrentGames)) this.goldenPointAchived++;
                    }
                    if (oponentScoreCurrentGames == 40) {
                        this.goldenPointAchived++;
                    }
                    this.scoreCurrentGame = 0;
                    this.points++;
                    return true;
            }
        } else {
            this.points++;
        }
        return false;
    }
    public addConsecutiveWin() {
        this.pointsWinned++;
        this.consecutiveWins++;
        if (this.consecutiveWins > this.maxConsecutiveWins) {
            this.maxConsecutiveWins + this.consecutiveWins;
        }
    }

    private isGoldenPoint(oponentGames): boolean {
        if (oponentGames == 40) {
            return true;
        }
        return false;
    }
    private calculateBreakOportunities(oponentGames: number): number {
        switch (oponentGames) {
            case 0:
                return 4;
            case 15:
                return 3;
            case 30:
                return 2;
            case 40:
                return 1;
        }

        return 0;
    }
}



export class Team {

    drive: Player;
    reves: Player;
    set1: TeamSet;
    set2: TeamSet;
    set3: TeamSet;
    super: TeamSet;

    maxConsecutiveWins: number;
    consecutiveWins: number;
    pointsWinned: number;
    isServing: boolean;
    points: number;
    startServingTieBreak: boolean;

    public constructor(isServing: boolean = false, team?: Team) {
        if (team != undefined) {
            this.maxConsecutiveWins = team.maxConsecutiveWins;
            this.consecutiveWins = team.consecutiveWins;
            this.pointsWinned = team.pointsWinned;
            this.isServing = team.isServing;
            this.points = team.points;
            this.startServingTieBreak = team.startServingTieBreak;
            this.drive = new Player("Drive", team.drive);
            this.reves = new Player("Reves",team.reves);
            this.set1 = new TeamSet(false, false,team.set1);
            this.set2 = new TeamSet(false, false,team.set2);
            this.set3 = new TeamSet(false, false,team.set2);
            this.super = new TeamSet(true, false,team.super);
        } else {
            this.maxConsecutiveWins = 0;
            this.consecutiveWins = 0;
            this.pointsWinned = 0;
            this.isServing = isServing;
            this.points = 0;
            this.startServingTieBreak = false;
            this.drive = new Player("Drive");
            this.reves = new Player("Reves");
            this.set1 = new TeamSet(false, false);
            this.set2 = new TeamSet(false, false);
            this.set3 = new TeamSet(false, false);
            this.super = new TeamSet(true, false);
        }
    }

    public changeServe() {
        this.isServing = !this.isServing
    }
    public isTeamServing() {
        return this.isServing
    }
    public resetConsecutiveWin() {
        this.consecutiveWins = 0;
    }

    public resetGames(currentSet: number) {
        switch (currentSet) {
            case 1:
                return this.set1.resetCurrentGames();
            case 2:
                return this.set2.resetCurrentGames();
            case 3:
                return this.set3.resetCurrentGames();
            case 4:
                return this.super.resetCurrentGames();
        }
    }

    public getWinners(set: number, player: string) {
        switch (player) {
            case "drive":
                return this.drive.getWinners(set);
            case "reves":
                return this.reves.getWinners(set);
            default:
                return this.drive.getWinners(set) + this.reves.getWinners(set);
        }

    }

    public getUnforceErrors(set: number, player: string) {
        switch (player) {
            case "drive":
                return this.drive.getUnforcedErrors(set);
            case "reves":
                return this.reves.getUnforcedErrors(set);
            default:
                return this.drive.getUnforcedErrors(set) + this.reves.getUnforcedErrors(set);
        }

    }

    public getUnforceErrorsIn40(set: number, player: string) {
        switch (player) {
            case "drive":
                return this.drive.getUnforcedErrorsIn40(set);
            case "reves":
                return this.reves.getUnforcedErrorsIn40(set);
            default:
                return this.drive.getUnforcedErrorsIn40(set) + this.reves.getUnforcedErrorsIn40(set);
        }
    }
    public getWinnersIn40(set: number, player: string) {
        switch (player) {
            case "drive":
                return this.drive.getWinnersIn40(set);
            case "reves":
                return this.reves.getWinnersIn40(set);
            default:
                return this.drive.getWinnersIn40(set) + this.reves.getWinnersIn40(set);
        }
    }

    public getConsecutivePointsWinned(set: number) {
        switch (set) {
            case 1:
                return this.set1.consecutiveWins;
            case 2:
                return this.set2.consecutiveWins;
            case 3:
                return this.set3.consecutiveWins;
            case 4:
                return this.super.consecutiveWins;
            default:
                //TODO: get max of consecutive wins
                return 0;
        }
    }

    public getPointsWinned(currentSet: number) {
        switch (currentSet) {
            case 1:
                return this.set1.pointsWinned;
            case 2:
                return this.set2.pointsWinned;
            case 3:
                return this.set3.pointsWinned;
            case 4:
                return this.super.pointsWinned;
            default:
                return this.set1.pointsWinned + this.set2.pointsWinned + this.set3.pointsWinned + this.super.pointsWinned
        }
    }

    public getGoldenPointsWinned(currentSet: number) {
        switch (currentSet) {
            case 1:
                return this.set1.goldenPointAchived;
            case 2:
                return this.set2.goldenPointAchived;
            case 3:
                return this.set3.goldenPointAchived;
            case 4:
                return this.super.goldenPointAchived;
            default:
                return this.set1.goldenPointAchived + this.set2.goldenPointAchived + this.set3.goldenPointAchived + this.super.goldenPointAchived
        }
    }
    public getGoldenPointsPlayed(currentSet: number) {
        switch (currentSet) {
            case 1:
                return this.set1.goldenPoints;
            case 2:
                return this.set2.goldenPoints;
            case 3:
                return this.set3.goldenPoints;
            case 4:
                return this.super.goldenPoints;
            default:
                return this.set1.goldenPoints + this.set2.goldenPoints + this.set3.goldenPoints + this.super.goldenPoints
        }
    }

    public getBreaks(currentSet: number) {
        switch (currentSet) {
            case 1:
                return this.set1.breakOptions;
            case 2:
                return this.set2.breakOptions;
            case 3:
                return this.set3.breakOptions;
            case 4:
                return this.super.breakOptions;
            default:
                return this.set1.breakOptions + this.set2.breakOptions + this.set3.breakOptions + this.super.breakOptions
        }
    }

    public getBreaksAcchived(currentSet: number) {
        switch (currentSet) {
            case 1:
                return this.set1.breaksAcchived;
            case 2:
                return this.set2.breaksAcchived;
            case 3:
                return this.set3.breaksAcchived;
            case 4:
                return this.super.breaksAcchived;
            default:
                return this.set1.breaksAcchived + this.set2.breaksAcchived + this.set3.breaksAcchived + this.super.breaksAcchived
        }
    }
    public point(currentSet: number, oponentPoints: number, oponentGames: number) {
        //TODO
        switch (currentSet) {
            case 1:
                return this.set1.point(oponentPoints, oponentGames);
            case 2:
                return this.set2.point(oponentPoints, oponentGames);
            case 3:
                return this.set3.point(oponentPoints, oponentGames);
            case 4:
                return this.super.point(oponentPoints, oponentGames);
        }
        return false;
    }

    public scoreCurrentGame(currentSet: number) {
        switch (currentSet) {
            case 1:
                return this.set1.scoreCurrentGame;
            case 2:
                return this.set2.scoreCurrentGame;
            case 3:
                return this.set3.scoreCurrentGame;
            case 4:
                return this.super.scoreCurrentGame;
        }
        return 0;
    }

    public pointsCurrentSet(currentSet: number) {
        switch (currentSet) {
            case 1:
                return this.set1.points;
            case 2:
                return this.set2.points;
            case 3:
                return this.set3.points;
            case 4:
                return this.super.points;
        }
        return 0;
    }

    public getTeamLabel(number: number) {
        if (this.drive.name.toLowerCase() !== 'drive' || this.reves.name.toLowerCase() !== 'reves') {
            return this.drive.name + "-" + this.reves.name
        } else {
            return "Pareja " + number;
        }
    }
}