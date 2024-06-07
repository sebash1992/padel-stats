export class Player {
    set1: PlayerSet;
    set2: PlayerSet;
    set3: PlayerSet;
    super: PlayerSet;
    name: string;
    public constructor(name: string, player?:Player) {
        if(player == undefined){
            this.set1 = new PlayerSet();
            this.set2 = new PlayerSet();
            this.set3 = new PlayerSet();
            this.super = new PlayerSet();
            this.name = name;
        }else{

            this.set1 = new PlayerSet(player.set1);
            this.set2 = new PlayerSet(player.set2);
            this.set3 = new PlayerSet(player.set3);
            this.super = new PlayerSet(player.super);
            this.name = player.name;
        }
    }
    public getUnforcedErrors(set: number): number {
        switch (set) {
            case 1:
                return this.set1.unforcedErrors;
            case 2:
                return this.set2.unforcedErrors;
            case 3:
                return this.set3.unforcedErrors
            case 4:
                return this.super.unforcedErrors;
            default:
                return this.set1.unforcedErrors + this.set2.unforcedErrors + this.set3.unforcedErrors + this.super.unforcedErrors;
        }
    }

    public getWinners(set: number): number {
        switch (set) {
            case 1:
                return this.set1.winners;
            case 2:
                return this.set2.winners;
            case 3:
                return this.set3.winners
            case 4:
                return this.super.winners;
            default:
                return this.set1.winners + this.set2.winners + this.set3.winners + this.super.winners;
        }
    }

    public getWinnersIn40(set: number): number {
        switch (set) {
            case 1:
                return this.set1.winnersIn40;
            case 2:
                return this.set2.winnersIn40;
            case 3:
                return this.set3.winnersIn40
            case 4:
                return this.super.winnersIn40;
            default:
                return this.set1.winnersIn40 + this.set2.winnersIn40 + this.set3.winnersIn40 + this.super.winnersIn40;
        }
    }

    public getUnforcedErrorsIn40(set: number): number {
        switch (set) {
            case 1:
                return this.set1.unfocedErrorsIn40;
            case 2:
                return this.set2.unfocedErrorsIn40;
            case 3:
                return this.set3.unfocedErrorsIn40
            case 4:
                return this.super.unfocedErrorsIn40;
            default:
                return this.set1.unfocedErrorsIn40 + this.set2.unfocedErrorsIn40 + this.set3.unfocedErrorsIn40 + this.super.unfocedErrorsIn40;
        }
    }

    public getServeErrors(set: number): number {
        switch (set) {
            case 1:
                return this.set1.serverErrors;
            case 2:
                return this.set2.serverErrors;
            case 3:
                return this.set3.serverErrors
            case 4:
                return this.super.serverErrors;
            default:
                return this.set1.serverErrors + this.set2.serverErrors + this.set3.serverErrors + this.super.serverErrors;
        }
    }
    public addUnforcedError(set: number) {
        switch (set) {
            case 1:
                 this.set1.addUnforcedErrors();
                 break;
            case 2:
                 this.set2.addUnforcedErrors();
                 break;
            case 3:
                 this.set3.addUnforcedErrors();
                 break;
            case 4:
                 this.super.addUnforcedErrors();
                 break;
        }
    }
    public addWinner(set: number) {
        switch (set) {
            case 1:
                 this.set1.addWinner();
                 break;
            case 2:
                 this.set2.addWinner();
                 break;
            case 3:
                 this.set3.addWinner();
                 break;
            case 4:
                 this.super.addWinner();
                 break;
        }
    }    public addUnforcedErrorIn40(set: number) {
        switch (set) {
            case 1:
                 this.set1.addUnforcedErrorsIn40();
                 break;
            case 2:
                 this.set2.addUnforcedErrorsIn40();
                 break;
            case 3:
                 this.set3.addUnforcedErrorsIn40();
                 break;
            case 4:
                 this.super.addUnforcedErrorsIn40();
                 break;
        }
    }
    public addWinnerIn40(set: number) {
        switch (set) {
            case 1:
                 this.set1.addWinnerIn40();
                 break;
            case 2:
                 this.set2.addWinnerIn40();
                 break;
            case 3:
                 this.set3.addWinnerIn40();
                 break;
            case 4:
                 this.super.addWinnerIn40();
                 break;
        }
    }

    public substractUnforcedError(set: number) {
        switch (set) {
            case 1:
                 this.set1.substractUnforcedErrors();
                 break;
            case 2:
                 this.set2.substractUnforcedErrors();
                 break;
            case 3:
                 this.set3.substractUnforcedErrors();
                 break;
            case 4:
                 this.super.substractUnforcedErrors();
                 break;
        }
    }
    public substractWinner(set: number) {
        switch (set) {
            case 1:
                 this.set1.substractWinner();
                 break;
            case 2:
                 this.set2.substractWinner();
                 break;
            case 3:
                 this.set3.substractWinner();
                 break;
            case 4:
                 this.super.substractWinner();
                 break;
        }
    }    public substractUnforcedErrorIn40(set: number) {
        switch (set) {
            case 1:
                 this.set1.substractUnforcedErrorsIn40();
                 break;
            case 2:
                 this.set2.substractUnforcedErrorsIn40();
                 break;
            case 3:
                 this.set3.substractUnforcedErrorsIn40();
                 break;
            case 4:
                 this.super.substractUnforcedErrorsIn40();
                 break;
        }
    }
    public substractWinnerIn40(set: number) {
        switch (set) {
            case 1:
                 this.set1.substractWinnerIn40();
                 break;
            case 2:
                 this.set2.substractWinnerIn40();
                 break;
            case 3:
                 this.set3.substractWinnerIn40();
                 break;
            case 4:
                 this.super.substractWinnerIn40();
                 break;
        }
    }
    
}

export class PlayerSet {
    unforcedErrors: number;
    winners: number;
    winnersIn40: number;
    unfocedErrorsIn40: number;
    serverErrors: number;
    public constructor(playerSet?:PlayerSet) {
        if(playerSet == undefined){

            this.unforcedErrors = 0;
            this.winners = 0;
            this.unfocedErrorsIn40 = 0;
            this.winnersIn40 = 0;
            this.serverErrors = 0;
        }else{
            this.unforcedErrors = playerSet.unforcedErrors;
            this.winners = playerSet.winners;
            this.unfocedErrorsIn40 = playerSet.unfocedErrorsIn40;
            this.winnersIn40 = playerSet.winnersIn40;
            this.serverErrors = playerSet.serverErrors;
        }
    }

    public addUnforcedErrors(): number {
        this.unforcedErrors++;
        return this.unforcedErrors;
    }
    public addUnforcedErrorsIn40(): number {
        this.unfocedErrorsIn40++;
        return this.unfocedErrorsIn40;
    }
    public addWinner(): number {
        this.winners++;
        return this.winners;
    }
    public addWinnerIn40(): number {
        this.winnersIn40++;
        return this.winnersIn40;
    }

    public substractUnforcedErrors(): number {
        if (this.unforcedErrors > 0) this.unforcedErrors--;
        return this.unforcedErrors;
    }
    public substractUnforcedErrorsIn40(): number {
        if (this.unfocedErrorsIn40 > 0) this.unfocedErrorsIn40--;
        return this.unfocedErrorsIn40;
    }
    public substractWinner(): number {
        if (this.winners > 0) this.winners--;
        return this.winners;
    }
    public substractWinnerIn40(): number {
        if (this.unforcedErrors > 0) this.winnersIn40--;
        return this.winnersIn40;
    }
    public substractServeError(): number {
        if (this.serverErrors > 0) this.serverErrors--;
        return this.serverErrors;
    }
    public addServeError(): number {
        this.serverErrors++;
        return this.serverErrors;
    }
}