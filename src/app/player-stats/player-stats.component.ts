import { Component, OnInit, Input } from '@angular/core';
import { CounterComponent } from '../counter/counter.component'
import { IonicModule } from '@ionic/angular';
import { MatchServiceService } from '../match-service.service'

@Component({
  selector: 'app-player-stats',
  templateUrl: './player-stats.component.html',
  styleUrls: ['./player-stats.component.scss'],
  standalone: true,
  imports: [IonicModule, CounterComponent]
})
export class PlayerStatsComponent implements OnInit {
  @Input() team: string;
  @Input() player: string;
  unforcedErrors: number = 0;
  winners: number = 0;
  constructor(public matchService: MatchServiceService) { }

  ngOnInit() { }

  onMinusWinner() {
    debugger;
    if (this.winners > 0) {
      this.winners --;
      this.matchService.rollBackPoint();
    }
  }
  onAddWinner() {
    this.matchService.addHistory();
    this.winners++;
    switch (this.team) {
      case ("team1"):
        switch (this.player) {
          case ("drive"):
            this.matchService.game.team1.drive.addWinner(this.matchService.game.currentSet);
            if(this.matchService.game.team2.scoreCurrentGame(this.matchService.game.currentSet) == 40){
              this.matchService.game.team1.drive.addWinnerIn40(this.matchService.game.currentSet);
            }
            break;
          case ("reves"):
            this.matchService.game.team1.reves.addWinner(this.matchService.game.currentSet);
            if(this.matchService.game.team2.scoreCurrentGame(this.matchService.game.currentSet) == 40){
              this.matchService.game.team1.reves.addWinnerIn40(this.matchService.game.currentSet);
            }
        }
        this.matchService.game.point(1);
        break;
      case ("team2"):
        switch (this.player) {
          case ("drive"):
            this.matchService.game.team2.drive.addWinner(this.matchService.game.currentSet);
            if(this.matchService.game.team1.scoreCurrentGame(this.matchService.game.currentSet) == 40){
              this.matchService.game.team2.drive.addWinnerIn40(this.matchService.game.currentSet);
            }
            break;
          case ("reves"):
            this.matchService.game.team2.reves.addWinner(this.matchService.game.currentSet);
            if(this.matchService.game.team1.scoreCurrentGame(this.matchService.game.currentSet) == 40){
              this.matchService.game.team2.reves.addWinnerIn40(this.matchService.game.currentSet);
            }
        }
        this.matchService.game.point(2);
        break;
    }
  }
  onAddUnforcedError() {
    this.matchService.addHistory();
    this.unforcedErrors++;
    switch (this.team) {
      case ("team1"):
        switch (this.player) {
          case ("drive"):
            this.matchService.game.team1.drive.addUnforcedError(this.matchService.game.currentSet);
            if(this.matchService.game.team2.scoreCurrentGame(this.matchService.game.currentSet) == 40){
              this.matchService.game.team1.drive.addUnforcedErrorIn40(this.matchService.game.currentSet);
            }
            break;
          case ("reves"):
            this.matchService.game.team1.reves.addUnforcedError(this.matchService.game.currentSet);
            if(this.matchService.game.team2.scoreCurrentGame(this.matchService.game.currentSet) == 40){
              this.matchService.game.team1.reves.addUnforcedErrorIn40(this.matchService.game.currentSet);
            }
        }
        this.matchService.game.point(2);
        break;
      case ("team2"):
        switch (this.player) {
          case ("drive"):
            this.matchService.game.team2.drive.addUnforcedError(this.matchService.game.currentSet);
            if(this.matchService.game.team1.scoreCurrentGame(this.matchService.game.currentSet) == 40){
              this.matchService.game.team2.drive.addUnforcedErrorIn40(this.matchService.game.currentSet);
            }
            break;
          case ("reves"):
            this.matchService.game.team2.reves.addUnforcedError(this.matchService.game.currentSet);
            if(this.matchService.game.team1.scoreCurrentGame(this.matchService.game.currentSet) == 40){
              this.matchService.game.team2.reves.addUnforcedErrorIn40(this.matchService.game.currentSet);
            }
        }
        this.matchService.game.point(1);
        break;
    }
  }

  onMinusUnforcedError() {
    debugger;
    if (this.unforcedErrors > 0){
      this.unforcedErrors --;
      this.matchService.rollBackPoint();
    } 
  }
}
