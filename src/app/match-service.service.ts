import { Injectable } from '@angular/core';
import { MatchStats } from './models/matchStats';
import { ModalController } from '@ionic/angular';
import { MatchSet } from './models/matchSet';
import { Player } from './models/player';
import { Team } from './models/team';

@Injectable({
  providedIn: 'root'
})
export class MatchServiceService {
  public game: MatchStats;
  private history:MatchStats[]= [];
  constructor(public modalCtrl: ModalController) { }

  public initializeMatch() {
    this.game = new MatchStats(false);
  }





  public point(team: number) {
    const copy = structuredClone(this.game)
    this.history.push(copy);
    this.game.point(team);
  }

  public addHistory() {
    debugger;
    const copy = structuredClone(this.game)
    this.history.push(copy);
  }

  public rollBackPoint() {
    if (this.history.length > 0) {
      debugger;
      var previousPoint = this.history.pop();
      console.log('Previo');
      console.log(JSON.stringify(this.game));
      this.game = new MatchStats(false);

      this.game.team1 = new Team(previousPoint.team1.isServing, previousPoint.team1);
      this.game.team2 = new Team(previousPoint.team2.isServing, previousPoint.team2);
      this.game.currentSet = previousPoint.currentSet;
      this.game.setWinner = previousPoint.setWinner;
      this.game.thirdSetType = previousPoint.thirdSetType;


      console.log('Despues');
      console.log(JSON.stringify(this.game));
    }
  }

}
