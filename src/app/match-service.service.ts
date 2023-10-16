import { Injectable } from '@angular/core';
import { MatchStats } from './models/matchStats';
import { ModalController } from '@ionic/angular';
import { MatchSet } from './models/matchSet';
import { Player } from './models/player';

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
    debugger;
    //this.history.push(JSON.stringify(this.game));
    const copy = structuredClone(this.game)
    this.history.push(copy);
    this.game.point(team);

  }

  public rollBackPoint() {
    debugger;
    if (this.history.length > 0) {
      var previousPoint = this.history.pop();
      console.log('Previo');
      console.log(JSON.stringify(this.game));
      this.game = new MatchStats(false);
      this.game.set1 = new MatchSet(previousPoint.set1.team1,previousPoint.set1.team2,previousPoint.set1.lastWin,previousPoint.set1.pointsPlayed,previousPoint.set1.isEnded,previousPoint.set1.isSuper);
      this.game.set2 = new MatchSet(previousPoint.set2.team1,previousPoint.set2.team2,previousPoint.set2.lastWin,previousPoint.set2.pointsPlayed,previousPoint.set2.isEnded,previousPoint.set2.isSuper);
      this.game.set3 = new MatchSet(previousPoint.set3.team1,previousPoint.set3.team2,previousPoint.set3.lastWin,previousPoint.set3.pointsPlayed,previousPoint.set3.isEnded,previousPoint.set3.isSuper);
      this.game.super = new MatchSet(previousPoint.super.team1,previousPoint.super.team2,previousPoint.super.lastWin,previousPoint.super.pointsPlayed,previousPoint.super.isEnded,previousPoint.super.isSuper);
      this.game.team1Drive = previousPoint.team1Drive;
      this.game.team1Reves = previousPoint.team1Reves;
      this.game.team2Drive = previousPoint.team2Drive;
      this.game.team2Reves = previousPoint.team2Reves;
      this.game.currentSet = previousPoint.currentSet;


      console.log('Despues');
      console.log(JSON.stringify(this.game));
    }
  }

}
