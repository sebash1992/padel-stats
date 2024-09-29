import { Team } from './team'
import { v4 as uuidv4 } from 'uuid';

export class MatchStats {
    id: string;
    date: Date

    team1: Team;
    team2: Team;
    currentSet: number;
    setWinner: number[];
    thirdSetType: number = 3;


    public constructor(hasPar: boolean, jsonData?: MatchStats) {
        this.id = uuidv4();
        this.date = new Date();
        if (!hasPar) {
            this.team1 = new Team(true);
            this.team2 = new Team(false);
            this.currentSet = 1
            this.setWinner = [-1, -1, -1, -1]
        }else{
            this.id = jsonData.id;
            this.date = jsonData.date
            this.currentSet = jsonData.currentSet;
            this.setWinner = jsonData.setWinner;
            this.thirdSetType = jsonData.thirdSetType;
            this.team2 = new Team(false, jsonData.team2);
            this.team1 = new Team(false, jsonData.team1);
        }
    }

    public getTeamCurrentGame(equipo: number) {
        switch (equipo) {
            case 1:
                return this.team1.scoreCurrentGame(this.currentSet);
            case 2:
                return this.team2.scoreCurrentGame(this.currentSet);
        }
        return 0;
    }

    async openModal() {
        // const modal = await this.modalCtrl.create({
        //     component: ThirdSetModalComponent,
        // });
        // modal.present();

        // const { data, role } = await modal.onWillDismiss();
        // ;
        // this.thirdSetType = +data;
        // this.currentSet = +data;
        this.thirdSetType = 3;
        this.currentSet = 3;
    }

    public point(team: number) {
        let finish;
        if (team == 1) {
            finish = this.team1.point(this.currentSet, this.team2.scoreCurrentGame(this.currentSet), this.team2.pointsCurrentSet(this.currentSet));
            this.team2.resetConsecutiveWin();
        }
        if (team == 2) {
            finish = this.team2.point(this.currentSet, this.team2.scoreCurrentGame(this.currentSet), this.team2.pointsCurrentSet(this.currentSet));
            this.team1.resetConsecutiveWin();

        }
        let pointsTeam1 = this.team1.pointsCurrentSet(this.currentSet);
        let pointsTeam2 = this.team2.pointsCurrentSet(this.currentSet);
        if (finish) {
            this.team1.changeServe();
            this.team2.changeServe();
            this.team2.resetGames(this.currentSet);
            this.team1.resetGames(this.currentSet);


            if ((pointsTeam1 == 6 && pointsTeam2 < 5) || (pointsTeam1 == 7 && (pointsTeam2 == 5 || pointsTeam2 == 6))) {
                this.setWinner[this.currentSet - 1] = 1;
                if (this.currentSet == 2) {
                    this.currentSet = this.thirdSetType;
                } else {
                    this.currentSet++;
                }

            }
            if ((pointsTeam2 == 6 && pointsTeam1 < 5) || (pointsTeam2 == 7 && (pointsTeam1 == 5 || pointsTeam1 == 6))) {
                this.setWinner[this.currentSet - 1] = 1;
                if (this.currentSet == 2) {
                    this.currentSet = this.thirdSetType;
                } else {
                    this.currentSet++;
                }
            }
            if (this.currentSet >= 3) {
                if (this.winner() != -1) {
                    //HAY UN GANADOR
                    this.currentSet = 5;
                }
            }
        } else {
            if (pointsTeam2 == 6 && pointsTeam2 == 6 && (this.team1.scoreCurrentGame(this.currentSet) + this.team2.scoreCurrentGame(this.currentSet)) % 2 != 0) {
                this.team1.changeServe();
                this.team2.changeServe();
            }
        }
    }

    private winner(): number {
        const counts = {};

        for (const num of this.setWinner) {
            counts[num] = counts[num] ? counts[num] + 1 : 1;
        }
        if (counts[1] == 2) {
            return 1;
        }
        if (counts[2] == 2) {
            return 2;
        }
        return -1;
    }

    public getCurrentGame(team: number): number {
        if (team == 1) {
            return this.team1.scoreCurrentGame(this.currentSet);
        }
        if (team == 2) {
            return this.team2.scoreCurrentGame(this.currentSet);
        }
        return 0;
    }

    public getTeamLabel(team: number) {
        let name = "";
        if (team == 1) {
            name = this.team1.getTeamLabel(1);
        }
        if (team == 2) {
            name = this.team2.getTeamLabel(2);
        }
        return name;
    }
}