export class Player {
    set1:PlayerSet;
    set2:PlayerSet;
    set3:PlayerSet;
    super:PlayerSet;
    name:string;
    public constructor(name:string) {
        this.set1 = new PlayerSet();
        this.set2 = new PlayerSet();
        this.set3 = new PlayerSet();
        this.super = new PlayerSet();
        this.name = name;
    }
    public getTotalUnforcedErrors():number{
        return this.set1.unforcedErrors + this.set2.unforcedErrors +this.set3.unforcedErrors + this.super.unforcedErrors
    }

    public getTotalWinners():number{
        return this.set1.winners + this.set2.winners +this.set3.winners + this.super.winners
    }
}

export class PlayerSet{
    unforcedErrors:number;
    winners:number;
    public constructor() {
        this.unforcedErrors = 0;
        this.winners = 0;
    }
}