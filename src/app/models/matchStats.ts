import { Team } from './team'
import { MatchSet } from './matchSet'
import { Player, PlayerSet } from './player'
import { ThirdSetModalComponent } from '../third-set-modal/third-set-modal.component';

export class MatchStats {
    set1: MatchSet;
    set2: MatchSet;
    set3: MatchSet;
    super: MatchSet;
    currentSet: number;
    team1Drive: Player;
    team1Reves: Player;
    team2Drive: Player;
    team2Reves: Player;
    thirdSetType: number = 3;


    public constructor(hasPar: boolean, set1?: MatchSet, set2?: MatchSet, set3?: MatchSet, superSet?: MatchSet, team1Drive?: Player, team1Reves?: Player, team2Drive?: Player, team2Reves?: Player, currentSet?: number) {
        if (hasPar) {
            this.set1 = set1;
            this.set2 = set2;
            this.set3 = set3;
            this.super = superSet;
            this.team1Drive = team1Drive;
            this.team1Reves = team1Reves;
            this.team2Drive = team2Drive;
            this.team2Reves = team2Reves;
            this.currentSet = currentSet
        }else{
            this.set1 = new MatchSet();
            this.set2 = new MatchSet();
            this.set3 = new MatchSet();
            this.super = new MatchSet();
            this.team1Drive = new Player('Drive');
            this.team1Reves = new Player('Reves');
            this.team2Drive = new Player('Drive');
            this.team2Reves = new Player('Reves');
            this.currentSet = 1
        }
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
    public getWinner() {
        if (this.currentSet == -1) {
            return true;
        }
        if (this.currentSet <= 2) {
            return false;
        }
        var winnedBy1 = 0;
        var winnedBy2 = 0;

        if (this.set1.isEnded) {
            var winner = this.set1.getSetWinner();
            if (winner == 1) {
                winnedBy1++;
            } else {
                winnedBy2++;
            }
        }
        if (this.set2.isEnded) {
            var winner = this.set2.getSetWinner();
            if (winner == 1) {
                winnedBy1++;
            } else {
                winnedBy2++;
            }
        }
        if (this.set3.isEnded) {
            var winner = this.set3.getSetWinner();
            if (winner == 1) {
                winnedBy1++;
            } else {
                winnedBy2++;
            }
        }
        if (this.super.isEnded) {
            var winner = this.super.getSetWinner();
            if (winner == 1) {
                winnedBy1++;
            } else {
                winnedBy2++;
            }
        }

        if (winnedBy1 >= 2) {
            return 1;
        }
        if (winnedBy1 >= 2) {
            return 2;
        }
        return -1;
    }

    public isMatchEnded(): boolean {
        if (this.currentSet == -1) {
            return true;
        }
        if (this.currentSet <= 2) {
            return false;
        }
        var winnedBy1 = 0;
        var winnedBy2 = 0;

        if (this.set1.isEnded) {
            var winner = this.set1.getSetWinner();
            if (winner == 1) {
                winnedBy1++;
            } else {
                winnedBy2++;
            }
        }
        if (this.set2.isEnded) {
            var winner = this.set2.getSetWinner();
            if (winner == 1) {
                winnedBy1++;
            } else {
                winnedBy2++;
            }
        }
        if (this.set3.isEnded) {
            var winner = this.set3.getSetWinner();
            if (winner == 1) {
                winnedBy1++;
            } else {
                winnedBy2++;
            }
        }
        if (this.super.isEnded) {
            var winner = this.super.getSetWinner();
            if (winner == 1) {
                winnedBy1++;
            } else {
                winnedBy2++;
            }
        }

        return winnedBy1 >= 2 || winnedBy2 >= 2;
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
                    this.set1.isEnded = true;
                    this.currentSet++
                    if ((this.set1.team1.points == 7 && this.set1.team2.points == 6) || (this.set1.team2.points == 7 && this.set1.team1.points == 6)) {
                        if (this.set1.team1.startServingTieBreak) {
                            this.set2.team2.isServing = true;
                            this.set2.team1.isServing = false;
                        } else {
                            this.set2.team1.isServing = true;
                            this.set2.team2.isServing = false;
                        }
                    } else {
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
                ;
                if (this.set2.isSetEnded()) {
                    this.currentSet++
                    this.set2.isEnded = true;
                    var s = this.isMatchEnded();
                    if (!this.isMatchEnded()) {
                        this.openModal();

                        var t = this.thirdSetType;
                        if ((this.set2.team1.points == 7 && this.set2.team2.points == 6) || (this.set2.team2.points == 7 && this.set2.team1.points == 6)) {
                            if (this.set2.team1.startServingTieBreak) {
                                this.set3.team2.isServing = true;
                                this.set3.team1.isServing = false;
                            } else {
                                this.set3.team1.isServing = true;
                                this.set3.team2.isServing = false;
                            }
                        } else {
                            this.set3.team1.isServing = this.set2.team1.isServing;
                            this.set3.team2.isServing = this.set2.team2.isServing;
                        }

                    } else {
                        this.currentSet = -1;
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
                    this.set3.isEnded = true;
                    this.currentSet = -1
                }
                break;
            case 4:
                if (team == 1) {
                    this.super.pointTeam1();
                } else {

                    this.super.pointTeam2();
                }
                if (this.super.isSetEnded()) {
                    this.super.isEnded = true;
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

    public getTeamLabel(team: number) {
        if (team == 1) {
    
          if (this.team1Drive.name != 'Drive' || this.team1Reves.name != 'Reves') {
            return this.team1Drive.name + "-" + this.team1Reves.name
          } else {
            return 'Pareja 1';
          }
    
        } else {
    
          if (this.team2Drive.name != 'Drive' || this.team2Reves.name != 'Reves') {
            return this.team2Drive.name + "-" + this.team2Reves.name
          } else {
           return 'Pareja 2';
          }
        }
      }



}