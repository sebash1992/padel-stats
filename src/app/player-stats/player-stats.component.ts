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

  onAddWinner() {
    this.winners++;
    switch (this.team) {
      case ("team1"):
        this.matchService.point(1);
        switch (this.player) {
          case ("drive"):
            switch (this.matchService.game.currentSet) {
              case 1:
                this.matchService.game.team1Drive.set1.winners++;
                break;
              case 2:
                this.matchService.game.team1Drive.set2.winners++;
                break;
              case 3:
                this.matchService.game.team1Drive.set3.winners++;
                break;
              case 4:
                this.matchService.game.team1Drive.super.winners++;
                break;
            }
            break;
          case ("reves"):
            switch (this.matchService.game.currentSet) {
              case 1:
                this.matchService.game.team1Reves.set1.winners++;
                break;
              case 2:
                this.matchService.game.team1Reves.set2.winners++;
                break;
              case 3:
                this.matchService.game.team1Reves.set3.winners++;
                break;
              case 4:
                this.matchService.game.team1Reves.super.winners++;
                break;
            }
            break;
        }
        break;
        case ("team2"):
        this.matchService.point(2);
        switch (this.player) {
          case ("drive"):
            switch (this.matchService.game.currentSet) {
              case 1:
                this.matchService.game.team2Drive.set1.winners++;
                break;
              case 2:
                this.matchService.game.team2Drive.set2.winners++;
                break;
              case 3:
                this.matchService.game.team2Drive.set3.winners++;
                break;
              case 4:
                this.matchService.game.team2Drive.super.winners++;
                break;
            }
            break;
          case ("reves"):
            switch (this.matchService.game.currentSet) {
              case 1:
                this.matchService.game.team2Reves.set1.winners++;
                break;
              case 2:
                this.matchService.game.team2Reves.set2.winners++;
                break;
              case 3:
                this.matchService.game.team2Reves.set3.winners++;
                break;
              case 4:
                this.matchService.game.team2Reves.super.winners++;
                break;
            }
            break;
        }

    }
  }
  onMinusWinner() {
    if(this.winners > 0) this.winners--;
    switch (this.team) {
      case ("team1"):
        switch (this.player) {
          case ("drive"):
            switch (this.matchService.game.currentSet) {
              case 1:
                if(this.matchService.game.team1Drive.set1.winners > 0) this.matchService.game.team1Drive.set1.winners--;
                break;
              case 2:
                if(this.matchService.game.team1Drive.set2.winners > 0) this.matchService.game.team1Drive.set2.winners--;
                break;
              case 3:
                if(this.matchService.game.team1Drive.set3.winners > 0) this.matchService.game.team1Drive.set3.winners--;
                break;
              case 4:
                if(this.matchService.game.team1Drive.super.winners > 0) this.matchService.game.team1Drive.super.winners--;
                break;
            }
            break;
          case ("reves"):
            switch (this.matchService.game.currentSet) {
              case 1:
                if(this.matchService.game.team1Reves.set1.winners > 0) this.matchService.game.team1Reves.set1.winners--;
                break;
              case 2:
                if(this.matchService.game.team1Reves.set2.winners > 0) this.matchService.game.team1Reves.set2.winners--;
                break;
              case 3:
                if(this.matchService.game.team1Reves.set3.winners > 0) this.matchService.game.team1Reves.set3.winners--;
                break;
              case 4:
                if(this.matchService.game.team1Reves.super.winners > 0) this.matchService.game.team1Reves.super.winners--;
                break;
            }
            break;
        }
        break;
        case ("team2"):
        switch (this.player) {
          case ("drive"):
            switch (this.matchService.game.currentSet) {
              case 1:
                if(this.matchService.game.team2Drive.set1.winners > 0) this.matchService.game.team2Drive.set1.winners--;
                break;
              case 2:
                if(this.matchService.game.team2Drive.set2.winners > 0) this.matchService.game.team2Drive.set2.winners--;
                break;
              case 3:
                if(this.matchService.game.team2Drive.set3.winners > 0) this.matchService.game.team2Drive.set3.winners--;
                break;
              case 4:
                if(this.matchService.game.team2Drive.super.winners > 0) this.matchService.game.team2Drive.super.winners--;
                break;
            }
            break;
          case ("reves"):
            switch (this.matchService.game.currentSet) {
              case 1:
                if(this.matchService.game.team2Reves.set1.winners > 0) this.matchService.game.team2Reves.set1.winners--;
                break;
              case 2:
                if(this.matchService.game.team2Reves.set2.winners > 0) this.matchService.game.team2Reves.set2.winners--;
                break;
              case 3:
                if(this.matchService.game.team2Reves.set3.winners > 0) this.matchService.game.team2Reves.set3.winners--;
                break;
              case 4:
                if(this.matchService.game.team2Reves.super.winners > 0) this.matchService.game.team2Reves.super.winners--;
                break;
            }
            break;
        }

    }
  }
  onAddUnforcedError() {
    this.unforcedErrors++;
    switch (this.team) {
      case ("team1"):
        this.matchService.point(2);
        switch (this.player) {
          case ("drive"):
            switch (this.matchService.game.currentSet) {
              case 1:
                this.matchService.game.team1Drive.set1.unforcedErrors++;
                break;
              case 2:
                this.matchService.game.team1Drive.set2.unforcedErrors++;
                break;
              case 3:
                this.matchService.game.team1Drive.set3.unforcedErrors++;
                break;
              case 4:
                this.matchService.game.team1Drive.super.unforcedErrors++;
                break;
            }
            break;
          case ("reves"):
            switch (this.matchService.game.currentSet) {
              case 1:
                this.matchService.game.team1Reves.set1.unforcedErrors++;
                break;
              case 2:
                this.matchService.game.team1Reves.set2.unforcedErrors++;
                break;
              case 3:
                this.matchService.game.team1Reves.set3.unforcedErrors++;
                break;
              case 4:
                this.matchService.game.team1Reves.super.unforcedErrors++;
                break;
            }
            break;
        }
        break;
        case ("team2"):
        this.matchService.point(1);
        switch (this.player) {
          case ("drive"):
            switch (this.matchService.game.currentSet) {
              case 1:
                this.matchService.game.team2Drive.set1.unforcedErrors++;
                break;
              case 2:
                this.matchService.game.team2Drive.set2.unforcedErrors++;
                break;
              case 3:
                this.matchService.game.team2Drive.set3.unforcedErrors++;
                break;
              case 4:
                this.matchService.game.team2Drive.super.unforcedErrors++;
                break;
            }
            break;
          case ("reves"):
            switch (this.matchService.game.currentSet) {
              case 1:
                this.matchService.game.team2Reves.set1.unforcedErrors++;
                break;
              case 2:
                this.matchService.game.team2Reves.set2.unforcedErrors++;
                break;
              case 3:
                this.matchService.game.team2Reves.set3.unforcedErrors++;
                break;
              case 4:
                this.matchService.game.team2Reves.super.unforcedErrors++;
                break;
            }
            break;
        }

    }
  }

  onMinusUnforcedError() {
    if(this.unforcedErrors > 0) this.unforcedErrors--;
    switch (this.team) {
      case ("team1"):
        switch (this.player) {
          case ("drive"):
            switch (this.matchService.game.currentSet) {
              case 1:
                if(this.matchService.game.team1Drive.set1.unforcedErrors > 0) this.matchService.game.team1Drive.set1.unforcedErrors--;
                break;
              case 2:
                if(this.matchService.game.team1Drive.set2.unforcedErrors > 0) this.matchService.game.team1Drive.set2.unforcedErrors--;
                break;
              case 3:
                if(this.matchService.game.team1Drive.set3.unforcedErrors > 0) this.matchService.game.team1Drive.set3.unforcedErrors--;
                break;
              case 4:
                if(this.matchService.game.team1Drive.super.unforcedErrors > 0) this.matchService.game.team1Drive.super.unforcedErrors--;
                break;
            }
            break;
          case ("reves"):
            switch (this.matchService.game.currentSet) {
              case 1:
                if(this.matchService.game.team1Reves.set1.unforcedErrors > 0) this.matchService.game.team1Reves.set1.unforcedErrors--;
                break;
              case 2:
                if(this.matchService.game.team1Reves.set2.unforcedErrors > 0) this.matchService.game.team1Reves.set2.unforcedErrors--;
                break;
              case 3:
                if(this.matchService.game.team1Reves.set3.unforcedErrors > 0) this.matchService.game.team1Reves.set3.unforcedErrors--;
                break;
              case 4:
                if(this.matchService.game.team1Reves.super.unforcedErrors > 0) this.matchService.game.team1Reves.super.unforcedErrors--;
                break;
            }
            break;
        }
        break;
        case ("team2"):
        switch (this.player) {
          case ("drive"):
            switch (this.matchService.game.currentSet) {
              case 1:
                if(this.matchService.game.team2Drive.set1.unforcedErrors > 0) this.matchService.game.team2Drive.set1.unforcedErrors--;
                break;
              case 2:
                if(this.matchService.game.team2Drive.set2.unforcedErrors > 0) this.matchService.game.team2Drive.set2.unforcedErrors--;
                break;
              case 3:
                if(this.matchService.game.team2Drive.set3.unforcedErrors > 0) this.matchService.game.team2Drive.set3.unforcedErrors--;
                break;
              case 4:
                if(this.matchService.game.team2Drive.super.unforcedErrors > 0) this.matchService.game.team2Drive.super.unforcedErrors--;
                break;
            }
            break;
          case ("reves"):
            switch (this.matchService.game.currentSet) {
              case 1:
                if(this.matchService.game.team2Reves.set1.unforcedErrors > 0) this.matchService.game.team2Reves.set1.unforcedErrors--;
                break;
              case 2:
                if(this.matchService.game.team2Reves.set2.unforcedErrors > 0) this.matchService.game.team2Reves.set2.unforcedErrors--;
                break;
              case 3:
                if(this.matchService.game.team2Reves.set3.unforcedErrors > 0) this.matchService.game.team2Reves.set3.unforcedErrors--;
                break;
              case 4:
                if(this.matchService.game.team2Reves.super.unforcedErrors > 0) this.matchService.game.team2Reves.super.unforcedErrors--;
                break;
            }
            break;
        }

    }
  }
}
