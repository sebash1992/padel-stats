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
  private history: MatchStats[] = [];
  constructor(public modalCtrl: ModalController) { }

  public initializeMatch() {
    this.game = new MatchStats(new MatchSet(),
      new MatchSet(),
      new MatchSet(),
      new MatchSet(true),
      new Player("Drive"),
      new Player("Reves"),
      new Player("Drive"),
      new Player("Reves"),
      1);
  }





  public point(team: number) {
    debugger;
    //this.history.push(JSON.stringify(this.game));
    const copy = structuredClone(this.game)
    this.history.push(copy);
    var s = this.game.set1.team2.scoreCurrentGame;
    this.game.point(team);

    var t = this.game.set1.team2.scoreCurrentGame;
  }

  public rollBackPoint() {
    if (this.history.length > 0) {
      var previousPoint = this.history.pop();

      var t = this.game.set1.team2.scoreCurrentGame;
      this.game = new MatchStats(
        previousPoint.set1,
        previousPoint.set2,
        previousPoint.set3,
        previousPoint.super,
        previousPoint.team1Drive,
        previousPoint.team1Reves,
        previousPoint.team2Drive,
        previousPoint.team2Reves,
        previousPoint.currentSet
      );
    }
  }

}
