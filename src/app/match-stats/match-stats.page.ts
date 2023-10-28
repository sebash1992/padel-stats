import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, BarController, BarElement } from 'chart.js'
import { Router } from '@angular/router';
import { MatchStats } from '../models/matchStats'
import { Team } from '../models/team'
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatchServiceService } from '../match-service.service';
import { PlayerSet } from '../models/player';

@Component({
  selector: 'app-match-stats',
  templateUrl: './match-stats.page.html',
  styleUrls: ['./match-stats.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, NgxDatatableModule]
})

export class MatchStatsPage implements OnInit {

  @ViewChild('teamUnforcedErrorsBarChart') teamUnforcedErrorsBarChart;
  @ViewChild('playersUnforcedErrorsBarChart') playersUnforcedErrorsBarChart;
  @ViewChild('teamWinnersBarChart') teamWinnersBarChart;
  @ViewChild('playersWinnersBarChart') playersWinnersBarChart;
  @ViewChild('lineCanvas') private lineCanvas?: ElementRef;
  @ViewChild('lineUnforcedErrorsPerTeam') private lineUnforcedErrorsPerTeam?: ElementRef;
  @ViewChild('lineUnforcedErrorsPerPlayer') private lineUnforcedErrorsPerPlayer?: ElementRef;
  @ViewChild('lineWinnersPerPlayer') private lineWinnersPerPlayer?: ElementRef;
  @ViewChild('lineWinnersPerTeam') private lineWinnersPerTeam?: ElementRef;

  @ViewChild('teamUnforcedErrorsBarChartSet1') teamUnforcedErrorsBarChartSet1;
  @ViewChild('playersUnforcedErrorsBarChartSet1') playersUnforcedErrorsBarChartSet1;
  @ViewChild('teamWinnersBarChartSet1') teamWinnersBarChartSet1;
  @ViewChild('playersWinnersBarChartSet1') playersWinnersBarChartSet1;

  @ViewChild('teamUnforcedErrorsBarChartSet2') teamUnforcedErrorsBarChartSet2;
  @ViewChild('playersUnforcedErrorsBarChartSet2') playersUnforcedErrorsBarChartSet2;
  @ViewChild('teamWinnersBarChartSet2') teamWinnersBarChartSet2;
  @ViewChild('playersWinnersBarChartSet2') playersWinnersBarChartSet2;

  @ViewChild('teamUnforcedErrorsBarChartSet3') teamUnforcedErrorsBarChartSet3;
  @ViewChild('playersUnforcedErrorsBarChartSet3') playersUnforcedErrorsBarChartSet3;
  @ViewChild('teamWinnersBarChartSet3') teamWinnersBarChartSet3;
  @ViewChild('playersWinnersBarChartSet3') playersWinnersBarChartSet3;

  @ViewChild('teamUnforcedErrorsBarChartSuper') teamUnforcedErrorsBarChartSuper;
  @ViewChild('playersUnforcedErrorsBarChartSuper') playersUnforcedErrorsBarChartSuper;
  @ViewChild('teamWinnersBarChartSuper') teamWinnersBarChartSuper;
  @ViewChild('playersWinnersBarChartSuper') playersWinnersBarChartSuper;

  lineChart: any;
  lineChartUnforcedErrorsPerTeam: any;
  lineChartUnforcedErrorsPerPlayer: any;
  lineChartWinnersPerPlayer: any;
  lineChartWinnersPerTeam: any;
  game: MatchStats;
  tablestyle = 'bootstrap';
  teamUnforcedErrorsBar: any;
  playersUnforcedErrorsBar: any;
  teamWinnersBar: any;
  playersWinnersBar: any;

  teamUnforcedErrorsBarSet1: any;
  playersUnforcedErrorsBarSet1: any;
  teamWinnersBarSet1: any;
  playersWinnersBarSet1: any;

  teamUnforcedErrorsBarSet2: any;
  playersUnforcedErrorsBarSet2: any;
  teamWinnersBarSet2: any;
  playersWinnersBarSet2: any;

  teamUnforcedErrorsBarSet3: any;
  playersUnforcedErrorsBarSet3: any;
  teamWinnersBarSet3: any;
  playersWinnersBarSet3: any;

  teamUnforcedErrorsBarSuper: any;
  playersUnforcedErrorsBarSuper: any;
  teamWinnersBarSuper: any;
  playersWinnersBarSuper: any;

  constructor(public router: Router, private location: Location, public matchService: MatchServiceService, private navController: NavController) {
    this.game = this.matchService.game;
  }

  ngOnInit() {
  }
  ngAfterViewInit() {
    Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, BarController, BarElement);
    this.lineChartMethod();
    this.createBarChartForUnforcedErrorsByTeam();
    this.createBarChartForUnforcedErrorsByPlayer();
    this.createBarChartForWinnersByPlayer();
    this.createBarChartForWinnersByTeam();
    this.createWinnersPerPlayerlineChart();
    this.createUnforcedErroresPerPlayerLineChart();
    this.createUnforcedErroresLineChart();
    this.createWinnersLineChart();

    if (this.game.currentSet === 1 || this.game.set1.isEnded) {
      this.createBarChartForUnforcedErrorsByTeamSet1();
      this.createBarChartForUnforcedErrorsByPlayerSet1();
      this.createBarChartForWinnersByPlayerSet1();
      this.createBarChartForWinnersByTeamSet1();
    }

    if (this.game.currentSet === 2 || this.game.set2.isEnded) {
      this.createBarChartForUnforcedErrorsByTeamSet2();
      this.createBarChartForUnforcedErrorsByPlayerSet2();
      this.createBarChartForWinnersByPlayerSet2();
      this.createBarChartForWinnersByTeamSet2();
    }
    if (this.game.currentSet === 3 || this.game.set3.isEnded) {
      this.createBarChartForUnforcedErrorsByTeamSet3();
      this.createBarChartForUnforcedErrorsByPlayerSet3();
      this.createBarChartForWinnersByPlayerSet3();
      this.createBarChartForWinnersByTeamSet3();
    }
    if (this.game.currentSet === 4 || this.game.super.isEnded) {
      this.createBarChartForUnforcedErrorsByTeamSuper();
      this.createBarChartForUnforcedErrorsByPlayerSuper();
      this.createBarChartForWinnersByPlayerSuper();
      this.createBarChartForWinnersByTeamSuper();
    }

  }

  private getLabels(): string[] {
    var labels:string[]=[];
    if (this.matchService.game.currentSet === 1 || (this.matchService.game.set1.isEnded)) {
      labels.push('1 Set');
    }
    if (this.matchService.game.currentSet === 2 || (this.matchService.game.set2.isEnded)) {
      labels.push('2 Set');
    }
    if (this.matchService.game.currentSet === 3 || (this.matchService.game.set3.isEnded)) {
      labels.push('3 Set');
    }
    if (this.matchService.game.currentSet === 4 || (this.matchService.game.super.isEnded)) {
      labels.push('Super');
    }
    return labels;
  }

  public getTeamLabel(team: number) {
    if (team === 1) {

      if (this.game.team1Drive.name !== 'Drive' || this.game.team1Reves.name !== 'Reves') {
        return this.game.team1Drive.name + "-" + this.game.team1Reves.name
      } else {
        return 'Pareja 1';
      }

    } else {

      if (this.game.team2Drive.name !== 'Drive' || this.game.team2Reves.name !== 'Reves') {
        return this.game.team2Drive.name + "-" + this.game.team2Reves.name
      } else {
       return 'Pareja 2';
      }
    }
  }

  private getLabelsTeamsForBarChar() {
    var labels: string[] = [];

    labels.push(this.getTeamLabel(1));
    labels.push(this.getTeamLabel(2));
    return labels;
  }

  private GetLabelsPlayerForBarChar(): string[] {
    return ["P1 " + this.game.team1Drive.name, "P1 " + this.game.team1Reves.name, "P2 " + this.game.team2Drive.name, "P2 " + this.game.team2Reves.name]
  }

  createBarChartForUnforcedErrorsByTeam() {
    this.teamUnforcedErrorsBar = new Chart(this.teamUnforcedErrorsBarChart.nativeElement, {
      type: 'bar',
      data: {
        labels: this.getLabelsTeamsForBarChar(),
        datasets: [{
          label: 'Errores no forzados',
          data: [this.getUnforcedErrors(1, 'drive') + this.getUnforcedErrors(1, 'reves'), this.getUnforcedErrors(2, 'drive') + this.getUnforcedErrors(2, 'reves')],
          backgroundColor: this.get2Colors(), // array should have same number of elements as number of dataset
          borderColor: this.get2Colors(),// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      }
    });
  }
  private getColors(): string[] {
    return ['#00B1FF', '#00CEEF', '#00E5BA', '#8CF387'];
  }
  private get2Colors(): string[] {
    return ['#00B1FF', '#00E5BA'];
  }
  createBarChartForUnforcedErrorsByPlayer() {
    this.playersUnforcedErrorsBar = new Chart(this.playersUnforcedErrorsBarChart.nativeElement, {
      type: 'bar',
      data: {
        labels: this.GetLabelsPlayerForBarChar(),
        datasets: [{
          label: 'Errores no forzados por jugador',
          data: [this.getUnforcedErrors(1, 'drive'), this.getUnforcedErrors(1, 'reves'), this.getUnforcedErrors(2, 'drive'), this.getUnforcedErrors(2, 'reves')],
          backgroundColor: this.getColors(), // array should have same number of elements as number of dataset
          borderColor: this.getColors(),// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      }
    });
  }
  createBarChartForWinnersByTeam() {
    this.teamWinnersBar = new Chart(this.teamWinnersBarChart.nativeElement, {
      type: 'bar',
      data: {
        labels: this.getLabelsTeamsForBarChar(),
        datasets: [{
          label: 'Errores no forzados',
          data: [this.getWinners(1, 'drive') + this.getWinners(1, 'reves'), this.getWinners(2, 'drive') + this.getWinners(2, 'reves')],
          backgroundColor: this.get2Colors(),// array should have same number of elements as number of dataset
          borderColor: this.get2Colors(),// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      }
    });
  }
  createBarChartForWinnersByPlayer() {
    this.playersWinnersBar = new Chart(this.playersWinnersBarChart.nativeElement, {
      type: 'bar',
      data: {
        labels: this.GetLabelsPlayerForBarChar(),
        datasets: [{
          label: 'Errores no forzados por jugador',
          data: [this.getWinners(1, 'drive'), this.getWinners(1, 'reves'), this.getWinners(2, 'drive'), this.getWinners(2, 'reves')],
          backgroundColor: this.getColors(), // array should have same number of elements as number of dataset
          borderColor: this.getColors(),// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      }
    });
  }
  public getCoupleName(team: number) {
    if (team === 1) {
      return 'Pareja 1'
    } else {
      return 'Pareja 2'
    }
  }
  public getBreakOptions(team: number, set: number = -1) {

    var teamStats: Team;
    switch (set) {
      case (1):
        if (team === 1) {
          teamStats = this.matchService.game.set1.team1;
        } else {
          teamStats = this.matchService.game.set1.team1;
        }
        break;
      case (2):
        if (team === 1) {
          teamStats = this.matchService.game.set2.team1;
        } else {
          teamStats = this.matchService.game.set2.team1;
        }
        break;
      case (3):
        if (team === 1) {
          teamStats = this.matchService.game.set3.team1;
        } else {
          teamStats = this.matchService.game.set3.team1;
        }
        break;
      case (4):
        if (team === 1) {
          teamStats = this.matchService.game.super.team1;
        } else {
          teamStats = this.matchService.game.super.team1;
        }
        break;
      default:
        if (team === 1) {
          return this.matchService.game.set1.team1.breakOptions + this.matchService.game.set2.team1.breakOptions + this.matchService.game.set2.team1.breakOptions + this.matchService.game.super.team1.breakOptions;
        } else {
          return this.matchService.game.set1.team2.breakOptions + this.matchService.game.set2.team2.breakOptions + this.matchService.game.set2.team2.breakOptions + this.matchService.game.super.team2.breakOptions;
        }
    }
    return teamStats.breakOptions;
  }

  public getBreaks(team: number, set: number = -1) {

    var teamStats: Team;
    switch (set) {
      case (1):
        if (team === 1) {
          teamStats = this.matchService.game.set1.team1;
        } else {
          teamStats = this.matchService.game.set1.team1;
        }
        break;
      case (2):
        if (team === 1) {
          teamStats = this.matchService.game.set2.team1;
        } else {
          teamStats = this.matchService.game.set2.team1;
        }
        break;
      case (3):
        if (team === 1) {
          teamStats = this.matchService.game.set3.team1;
        } else {
          teamStats = this.matchService.game.set3.team1;
        }
        break;
      case (4):
        if (team === 1) {
          teamStats = this.matchService.game.super.team1;
        } else {
          teamStats = this.matchService.game.super.team1;
        }
        break;
      default:
        if (team === 1) {
          return this.matchService.game.set1.team1.breaksAcchived + this.matchService.game.set2.team1.breaksAcchived + this.matchService.game.set2.team1.breaksAcchived + this.matchService.game.super.team1.breaksAcchived;
        } else {
          return this.matchService.game.set1.team2.breaksAcchived + this.matchService.game.set2.team2.breaksAcchived + this.matchService.game.set2.team2.breaksAcchived + this.matchService.game.super.team2.breaksAcchived;
        }
    }
    return teamStats.breaksAcchived;
  }

  public getGoldenPoinsPlayed(team: number, set: number = -1) {

    var teamStats: Team;
    switch (set) {
      case (1):
        if (team === 1) {
          teamStats = this.matchService.game.set1.team1;
        } else {
          teamStats = this.matchService.game.set1.team1;
        }
        break;
      case (2):
        if (team === 1) {
          teamStats = this.matchService.game.set2.team1;
        } else {
          teamStats = this.matchService.game.set2.team1;
        }
        break;
      case (3):
        if (team === 1) {
          teamStats = this.matchService.game.set3.team1;
        } else {
          teamStats = this.matchService.game.set3.team1;
        }
        break;
      case (4):
        if (team === 1) {
          teamStats = this.matchService.game.super.team1;
        } else {
          teamStats = this.matchService.game.super.team1;
        }
        break;
      default:
        if (team === 1) {
          return this.matchService.game.set1.team1.goldenPointsPlayed + this.matchService.game.set2.team1.goldenPointsPlayed + this.matchService.game.set2.team1.goldenPointsPlayed + this.matchService.game.super.team1.goldenPointsPlayed;
        } else {
          return this.matchService.game.set1.team2.goldenPointsPlayed + this.matchService.game.set2.team2.goldenPointsPlayed + this.matchService.game.set2.team2.goldenPointsPlayed + this.matchService.game.super.team2.goldenPointsPlayed;
        }
    }
    return teamStats.goldenPointsPlayed;
  }

  public getGoldenPointsWinned(team: number, set: number = -1) {

    var teamStats: Team;
    switch (set) {
      case (1):
        if (team === 1) {
          teamStats = this.matchService.game.set1.team1;
        } else {
          teamStats = this.matchService.game.set1.team1;
        }
        break;
      case (2):
        if (team === 1) {
          teamStats = this.matchService.game.set2.team1;
        } else {
          teamStats = this.matchService.game.set2.team1;
        }
        break;
      case (3):
        if (team === 1) {
          teamStats = this.matchService.game.set3.team1;
        } else {
          teamStats = this.matchService.game.set3.team1;
        }
        break;
      case (4):
        if (team === 1) {
          teamStats = this.matchService.game.super.team1;
        } else {
          teamStats = this.matchService.game.super.team1;
        }
        break;
      default:
        if (team === 1) {
          return this.matchService.game.set1.team1.goldenPointsWinned + this.matchService.game.set2.team1.goldenPointsWinned + this.matchService.game.set2.team1.goldenPointsWinned + this.matchService.game.super.team1.goldenPointsWinned;
        } else {
          return this.matchService.game.set1.team2.goldenPointsWinned + this.matchService.game.set2.team2.goldenPointsWinned + this.matchService.game.set2.team2.goldenPointsWinned + this.matchService.game.super.team2.goldenPointsWinned;
        }
    }
    return teamStats.goldenPointsWinned;
  }

  public getConsecutivePointsWinned(team: number, set: number = -1) {

    var teamStats: Team;
    switch (set) {
      case (1):
        if (team === 1) {
          teamStats = this.matchService.game.set1.team1;
        } else {
          teamStats = this.matchService.game.set1.team1;
        }
        break;
      case (2):
        if (team === 1) {
          teamStats = this.matchService.game.set2.team1;
        } else {
          teamStats = this.matchService.game.set2.team1;
        }
        break;
      case (3):
        if (team === 1) {
          teamStats = this.matchService.game.set3.team1;
        } else {
          teamStats = this.matchService.game.set3.team1;
        }
        break;
      case (4):
        if (team === 1) {
          teamStats = this.matchService.game.super.team1;
        } else {
          teamStats = this.matchService.game.super.team1;
        }
        break;
      default:
        if (team === 1) {
          return Math.max(this.matchService.game.set1.team1.consecutiveWins, this.matchService.game.set2.team1.consecutiveWins, this.matchService.game.set2.team1.goldenPointsWinned, this.matchService.game.super.team1.consecutiveWins);
        } else {
          return Math.max(this.matchService.game.set1.team2.consecutiveWins, this.matchService.game.set2.team2.consecutiveWins, this.matchService.game.set2.team2.goldenPointsWinned, this.matchService.game.super.team2.consecutiveWins);
        }
    }
    return teamStats.consecutiveWins;
  }

  public getWinnedPoints(team: number, set: number = -1) {

    var teamStats: Team;
    switch (set) {
      case (1):
        if (team === 1) {
          teamStats = this.matchService.game.set1.team1;
        } else {
          teamStats = this.matchService.game.set1.team1;
        }
        break;
      case (2):
        if (team === 1) {
          teamStats = this.matchService.game.set2.team1;
        } else {
          teamStats = this.matchService.game.set2.team1;
        }
        break;
      case (3):
        if (team === 1) {
          teamStats = this.matchService.game.set3.team1;
        } else {
          teamStats = this.matchService.game.set3.team1;
        }
        break;
      case (4):
        if (team === 1) {
          teamStats = this.matchService.game.super.team1;
        } else {
          teamStats = this.matchService.game.super.team1;
        }
        break;
      default:
        if (team === 1) {
          return this.matchService.game.set1.team1.pointsWinned + this.matchService.game.set2.team1.pointsWinned + this.matchService.game.set2.team1.pointsWinned + this.matchService.game.super.team1.pointsWinned;
        } else {
          return this.matchService.game.set1.team2.pointsWinned + this.matchService.game.set2.team2.pointsWinned + this.matchService.game.set2.team2.pointsWinned + this.matchService.game.super.team2.pointsWinned;
        }
    }
    return teamStats.pointsWinned;
  }

  public getUnforcedErrors(team: number, player: string, set: number = -1) {

    var playerStats: PlayerSet;
    switch (set) {
      case (1):
        if (team === 1) {
          if (player === 'drive') playerStats = this.matchService.game.team1Drive.set1;
          else playerStats = this.matchService.game.team1Reves.set1;

        } else {
          if (player === 'drive') playerStats = this.matchService.game.team2Drive.set1;
          else playerStats = this.matchService.game.team2Reves.set1;
        }
        break;
      case (2):
        if (team === 1) {
          if (player === 'drive') playerStats = this.matchService.game.team1Drive.set2;
          else playerStats = this.matchService.game.team1Reves.set2;

        } else {
          if (player === 'drive') playerStats = this.matchService.game.team2Drive.set2;
          else playerStats = this.matchService.game.team2Reves.set2;
        }
        break;
      case (3):
        if (team === 1) {
          if (player === 'drive') playerStats = this.matchService.game.team1Drive.set3;
          else playerStats = this.matchService.game.team1Reves.set3;

        } else {
          if (player === 'drive') playerStats = this.matchService.game.team2Drive.set3;
          else playerStats = this.matchService.game.team2Reves.set3;
        }
        break;
      case (4):
        if (team === 1) {
          if (player === 'drive') playerStats = this.matchService.game.team1Drive.super;
          else playerStats = this.matchService.game.team1Reves.super;

        } else {
          if (player === 'drive') playerStats = this.matchService.game.team2Drive.super;
          else playerStats = this.matchService.game.team2Reves.super;
        }
        break;
      default:
        if (team === 1) {
          if (player === 'drive') return this.matchService.game.team1Drive.set1.unforcedErrors + this.matchService.game.team1Drive.set2.unforcedErrors + this.matchService.game.team1Drive.set3.unforcedErrors + this.matchService.game.team1Drive.super.unforcedErrors;
          else return this.matchService.game.team1Reves.set1.unforcedErrors + this.matchService.game.team1Reves.set2.unforcedErrors + this.matchService.game.team1Reves.set3.unforcedErrors + this.matchService.game.team1Reves.super.unforcedErrors;

        } else {
          if (player === 'drive') return this.matchService.game.team2Drive.set1.unforcedErrors + this.matchService.game.team2Drive.set2.unforcedErrors + this.matchService.game.team2Drive.set3.unforcedErrors + this.matchService.game.team2Drive.super.unforcedErrors;
          else return this.matchService.game.team2Reves.set1.unforcedErrors + this.matchService.game.team2Reves.set2.unforcedErrors + this.matchService.game.team2Reves.set3.unforcedErrors + this.matchService.game.team2Reves.super.unforcedErrors;

        }
    }
    return playerStats.unforcedErrors;
  }

  public getWinners(team: number, player: string, set: number = -1) {

    var playerStats: PlayerSet;
    switch (set) {
      case (1):
        if (team === 1) {
          if (player === 'drive') playerStats = this.matchService.game.team1Drive.set1;
          else playerStats = this.matchService.game.team1Reves.set1;

        } else {
          if (player === 'drive') playerStats = this.matchService.game.team2Drive.set1;
          else playerStats = this.matchService.game.team2Reves.set1;
        }
        break;
      case (2):
        if (team === 1) {
          if (player === 'drive') playerStats = this.matchService.game.team1Drive.set2;
          else playerStats = this.matchService.game.team1Reves.set2;

        } else {
          if (player === 'drive') playerStats = this.matchService.game.team2Drive.set2;
          else playerStats = this.matchService.game.team2Reves.set2;
        }
        break;
      case (3):
        if (team === 1) {
          if (player === 'drive') playerStats = this.matchService.game.team1Drive.set3;
          else playerStats = this.matchService.game.team1Reves.set3;

        } else {
          if (player === 'drive') playerStats = this.matchService.game.team2Drive.set3;
          else playerStats = this.matchService.game.team2Reves.set3;
        }
        break;
      case (4):
        if (team === 1) {
          if (player === 'drive') playerStats = this.matchService.game.team1Drive.super;
          else playerStats = this.matchService.game.team1Reves.super;

        } else {
          if (player === 'drive') playerStats = this.matchService.game.team2Drive.super;
          else playerStats = this.matchService.game.team2Reves.super;
        }
        break;
      default:
        if (team === 1) {
          if (player === 'drive') return this.matchService.game.team1Drive.set1.winners + this.matchService.game.team1Drive.set2.winners + this.matchService.game.team1Drive.set3.winners + this.matchService.game.team1Drive.super.winners;
          else return this.matchService.game.team1Reves.set1.winners + this.matchService.game.team1Reves.set2.winners + this.matchService.game.team1Reves.set3.winners + this.matchService.game.team1Reves.super.winners;

        } else {
          if (player === 'drive') return this.matchService.game.team2Drive.set1.winners + this.matchService.game.team2Drive.set2.winners + this.matchService.game.team2Drive.set3.winners + this.matchService.game.team2Drive.super.winners;
          else return this.matchService.game.team2Reves.set1.winners + this.matchService.game.team2Reves.set2.winners + this.matchService.game.team2Reves.set3.winners + this.matchService.game.team2Reves.super.winners;

        }
    }
    return playerStats.winners;
  }

  public getWinnedPointsPercentage(team: number, set: number = -1) {

    var teamStats: Team;
    var pointsPlayed: number;
    switch (set) {
      case (1):
        if (team === 1) {
          teamStats = this.matchService.game.set1.team1;
        } else {
          teamStats = this.matchService.game.set1.team1;
        }
        pointsPlayed = this.matchService.game.set1.pointsPlayed;
        break;
      case (2):
        if (team === 1) {
          teamStats = this.matchService.game.set2.team1;
        } else {
          teamStats = this.matchService.game.set2.team1;
        }
        pointsPlayed = this.matchService.game.set2.pointsPlayed;
        break;
      case (3):
        if (team === 1) {
          teamStats = this.matchService.game.set3.team1;
        } else {
          teamStats = this.matchService.game.set3.team1;
        }
        pointsPlayed = this.matchService.game.set3.pointsPlayed;
        break;
      case (4):
        if (team === 1) {
          teamStats = this.matchService.game.super.team1;
        } else {
          teamStats = this.matchService.game.super.team1;
        }
        pointsPlayed = this.matchService.game.super.pointsPlayed;
        break;
      default:
        var totalPoints = this.game.set1.pointsPlayed + this.game.set2.pointsPlayed + this.game.set3.pointsPlayed + this.game.super.pointsPlayed
        if (totalPoints !== 0) {
          var winned: number;
          if (team === 1) {
            winned = this.matchService.game.set1.team1.pointsWinned + this.matchService.game.set2.team1.pointsWinned + this.matchService.game.set2.team1.pointsWinned + this.matchService.game.super.team1.pointsWinned;
          } else {
            winned = this.matchService.game.set1.team2.pointsWinned + this.matchService.game.set2.team2.pointsWinned + this.matchService.game.set2.team2.pointsWinned + this.matchService.game.super.team2.pointsWinned;
          }
          return ((winned / totalPoints) * 100).toFixed(0)
        } else {
          return 0;
        }
    }

    if (pointsPlayed === 0) {
      return 0;
    }
    return ((teamStats.pointsWinned / pointsPlayed) * 100).toFixed(0);
  }



  getPointsWinnedForLineChart(team: number) {

    var pointwinned: number[] = []
    if (team === 1) {
      if (this.matchService.game.currentSet === 1 || (this.matchService.game.set1.isEnded)) {
        pointwinned.push(this.game.set1.team1.pointsWinned);
      }
      if (this.matchService.game.currentSet === 2 || (this.matchService.game.set2.isEnded)) {
        pointwinned.push(this.game.set2.team1.pointsWinned);
      }
      if (this.matchService.game.currentSet === 3 || (this.matchService.game.set3.isEnded)) {
        pointwinned.push(this.game.set3.team1.pointsWinned);
      }
      if (this.matchService.game.currentSet === 4 || (this.matchService.game.super.isEnded)) {
        pointwinned.push(this.game.super.team1.pointsWinned);
      }
    } else {
      if (this.matchService.game.currentSet === 1 || (this.matchService.game.set1.isEnded)) {
        pointwinned.push(this.game.set1.team2.pointsWinned);
      }
      if (this.matchService.game.currentSet === 2 || (this.matchService.game.set2.isEnded)) {
        pointwinned.push(this.game.set2.team2.pointsWinned);
      }
      if (this.matchService.game.currentSet === 3 || (this.matchService.game.set3.isEnded)) {
        pointwinned.push(this.game.set3.team2.pointsWinned);
      }
      if (this.matchService.game.currentSet === 4 || (this.matchService.game.super.isEnded)) {
        pointwinned.push(this.game.super.team2.pointsWinned);
      }
    }
    return pointwinned;
  }
  getWinnersForLineChart(team: number) {
    var winners: number[] = []
    if (team === 1) {
      if (this.matchService.game.currentSet === 1 || (this.matchService.game.set1.isEnded)) {
        winners.push(this.getWinners(1, 'drive', 1) + this.getWinners(1, 'reves', 1));
      }
      if (this.matchService.game.currentSet === 2 || (this.matchService.game.set2.isEnded)) {
        winners.push(this.getWinners(1, 'drive', 2) + this.getWinners(1, 'reves', 2));
      }
      if (this.matchService.game.currentSet === 3 || (this.matchService.game.set3.isEnded)) {
        winners.push(this.getWinners(1, 'drive', 3) + this.getWinners(1, 'reves', 3));
      }
      if (this.matchService.game.currentSet === 4 || (this.matchService.game.super.isEnded)) {
        winners.push(this.getWinners(1, 'drive', 4) + this.getWinners(1, 'reves', 4));
      }
    } else {
      if (this.matchService.game.currentSet === 1 || (this.matchService.game.set1.isEnded)) {
        winners.push(this.getWinners(2, 'drive', 1) + this.getWinners(2, 'reves', 1));
      }
      if (this.matchService.game.currentSet === 2 || (this.matchService.game.set2.isEnded)) {
        winners.push(this.getWinners(2, 'drive', 2) + this.getWinners(2, 'reves', 2));
      }
      if (this.matchService.game.currentSet === 3 || (this.matchService.game.set3.isEnded)) {
        winners.push(this.getWinners(2, 'drive', 3) + this.getWinners(2, 'reves', 3));
      }
      if (this.matchService.game.currentSet === 4 || (this.matchService.game.super.isEnded)) {
        winners.push(this.getWinners(2, 'drive', 4) + this.getWinners(2, 'reves', 4));
      }
    }
    return winners;
  }




  lineChartMethod() {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: this.getLabels(),
        datasets: [
          {
            label: this.getTeamLabel(1),
            fill: false,
            tension: 0.1,
            backgroundColor: '#00B1FF',
            borderColor: '#00B1FF',
            pointBorderColor: '#00B1FF',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.getPointsWinnedForLineChart(1),
          },
          {
            label: this.getTeamLabel(2),
            fill: false,
            tension: 0.1,
            backgroundColor: '#00E5BA',
            borderColor: '#00E5BA',
            pointBorderColor: '#00E5BA',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.getPointsWinnedForLineChart(2),
          }
        ]
      }
    });
  }
  createWinnersLineChart() {
    this.lineChartWinnersPerTeam = new Chart(this.lineWinnersPerTeam.nativeElement, {
      type: 'line',
      data: {
        labels: this.getLabels(),
        datasets: [
          {
            label: 'Sell per week',
            fill: false,
            tension: 0.1,
            backgroundColor: '#00B1FF',
            borderColor: '#00B1FF',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#00B1FF',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#00B1FF',
            pointHoverBorderColor: '#00B1FF',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.getWinnersForLineChart(1),
            spanGaps: false,
          },
          {
            label: 'Sell per week',
            fill: false,
            tension: 0.1,
            backgroundColor: '#00E5BA',
            borderColor: '#00E5BA',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#00E5BA',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#00E5BA',
            pointHoverBorderColor: '#00E5BA',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.getWinnersForLineChart(2),
            spanGaps: false,
          }
        ]
      }
    });
  }
  createUnforcedErroresLineChart() {
    this.lineChartUnforcedErrorsPerTeam = new Chart(this.lineUnforcedErrorsPerTeam.nativeElement, {
      type: 'line',
      data: {
        labels: this.getLabels(),
        datasets: [
          {
            label: 'Sell per week',
            fill: false,
            tension: 0.1,
            backgroundColor: '#00B1FF',
            borderColor: '#00B1FF',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#00B1FF',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#00B1FF',
            pointHoverBorderColor: '#00B1FF',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [this.game.team1Drive.set1.unforcedErrors + this.game.team1Reves.set1.unforcedErrors, this.game.team1Drive.set2.unforcedErrors + this.game.team1Reves.set2.unforcedErrors, this.game.team1Drive.set3.unforcedErrors + this.game.team1Reves.set3.unforcedErrors, this.game.team1Drive.super.unforcedErrors + this.game.team1Reves.super.unforcedErrors],
            spanGaps: false,
          },
          {
            label: 'Sell per week',
            fill: false,
            tension: 0.1,
            backgroundColor: '#00E5BA',
            borderColor: '#00E5BA',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#00E5BA',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#00E5BA',
            pointHoverBorderColor: '#00E5BA',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [this.game.team2Drive.set1.unforcedErrors + this.game.team2Reves.set1.unforcedErrors, this.game.team2Drive.set2.unforcedErrors + this.game.team2Reves.set2.unforcedErrors, this.game.team2Drive.set3.unforcedErrors + this.game.team2Reves.set3.unforcedErrors, this.game.team2Drive.super.unforcedErrors + this.game.team2Reves.super.unforcedErrors],
            spanGaps: false,
          }
        ]
      }
    });
  }
  createUnforcedErroresPerPlayerLineChart() {
    this.lineChartUnforcedErrorsPerPlayer = new Chart(this.lineUnforcedErrorsPerPlayer.nativeElement, {
      type: 'line',
      data: {
        labels: this.getLabels(),
        datasets: [
          {
            label: 'Sell per week',
            fill: false,
            tension: 0.1,
            backgroundColor: '#00B1FF',
            borderColor: '#00B1FF',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#00B1FF',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#00B1FF',
            pointHoverBorderColor: '#00B1FF',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [this.game.team1Drive.set1.unforcedErrors, this.game.team1Drive.set2.unforcedErrors, this.game.team1Drive.set3.unforcedErrors, this.game.team1Drive.super.unforcedErrors],
            spanGaps: false,
          },
          {
            label: 'Sell per week',
            fill: false,
            tension: 0.1,
            backgroundColor: '#00CEEF',
            borderColor: '#00CEEF',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#00CEEF',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#00CEEF',
            pointHoverBorderColor: '#00CEEF',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [this.game.team1Reves.set1.unforcedErrors, this.game.team1Reves.set2.unforcedErrors, this.game.team1Reves.set3.unforcedErrors, this.game.team1Reves.super.unforcedErrors],
            spanGaps: false,
          },
          {
            label: 'Sell per week',
            fill: false,
            tension: 0.1,
            backgroundColor: '#00E5BA',
            borderColor: '#00E5BA',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#00E5BA',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#00E5BA',
            pointHoverBorderColor: '#00E5BA',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [this.game.team2Drive.set1.unforcedErrors, this.game.team2Drive.set2.unforcedErrors, this.game.team2Drive.set3.unforcedErrors, this.game.team2Drive.super.unforcedErrors],
            spanGaps: false,
          },
          {
            label: 'Sell per week',
            fill: false,
            tension: 0.1,
            backgroundColor: '#8CF387',
            borderColor: '#8CF387',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#8CF387',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#8CF387',
            pointHoverBorderColor: '#8CF387',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [this.game.team2Reves.set1.unforcedErrors, this.game.team2Reves.set2.unforcedErrors, this.game.team2Reves.set3.unforcedErrors, this.game.team2Reves.super.unforcedErrors],
            spanGaps: false,
          }
        ]
      }
    });
  }
  createWinnersPerPlayerlineChart() {
    this.lineChartWinnersPerPlayer = new Chart(this.lineWinnersPerPlayer.nativeElement, {
      type: 'line',
      data: {
        labels: this.getLabels(),
        datasets: [
          {
            label: 'Sell per week',
            fill: false,
            tension: 0.1,
            backgroundColor: '#00B1FF',
            borderColor: '#00B1FF',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#00B1FF',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#00B1FF',
            pointHoverBorderColor: '#00B1FF',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [this.game.team1Drive.set1.winners, this.game.team1Drive.set2.winners, this.game.team1Drive.set3.winners, this.game.team1Drive.super.winners],
            spanGaps: false,
          },
          {
            label: 'Sell per week',
            fill: false,
            tension: 0.1,
            backgroundColor: '#00CEEF',
            borderColor: '#00CEEF',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#00CEEF',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#00CEEF',
            pointHoverBorderColor: '#00CEEF',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [this.game.team1Reves.set1.winners, this.game.team1Reves.set2.winners, this.game.team1Reves.set3.winners, this.game.team1Reves.super.winners],
            spanGaps: false,
          },
          {
            label: 'Sell per week',
            fill: false,
            tension: 0.1,
            backgroundColor: '#00E5BA',
            borderColor: '#00E5BA',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#00E5BA',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#00E5BA',
            pointHoverBorderColor: '#00E5BA',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [this.game.team2Drive.set1.winners, this.game.team2Drive.set2.winners, this.game.team2Drive.set3.winners, this.game.team2Drive.super.winners],
            spanGaps: false,
          },
          {
            label: 'Sell per week',
            fill: false,
            tension: 0.1,
            backgroundColor: '#8CF387',
            borderColor: '#8CF387',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'r#8CF387',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#8CF387',
            pointHoverBorderColor: '#8CF387',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [this.game.team2Reves.set1.winners, this.game.team2Reves.set2.winners, this.game.team2Reves.set3.winners, this.game.team2Reves.super.winners],
            spanGaps: false,
          }
        ]
      }
    });
  }
  createBarChartForUnforcedErrorsByTeamSet1() {
    
    var s = [this.getUnforcedErrors(1, 'drive', 1) + this.getUnforcedErrors(1, 'reves', 1), this.getUnforcedErrors(2, 'drive', 1) + this.getUnforcedErrors(2, 'reves', 1)];
    var ss = this.getLabelsTeamsForBarChar();
    this.teamUnforcedErrorsBarSet1 = new Chart(this.teamUnforcedErrorsBarChartSet1.nativeElement, {
      type: 'bar',
      data: {
        labels: this.getLabelsTeamsForBarChar(),
        datasets: [{
          label: 'Errores no forzados',
          data: [this.getUnforcedErrors(1, 'drive', 1) + this.getUnforcedErrors(1, 'reves', 1), this.getUnforcedErrors(2, 'drive', 1) + this.getUnforcedErrors(2, 'reves', 1)],
          backgroundColor: this.get2Colors(), // array should have same number of elements as number of dataset
          borderColor: this.get2Colors(),// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      }
    });
  }
  createBarChartForUnforcedErrorsByPlayerSet1() {
    this.playersUnforcedErrorsBarSet1 = new Chart(this.playersUnforcedErrorsBarChartSet1.nativeElement, {
      type: 'bar',
      data: {
        labels: this.GetLabelsPlayerForBarChar(),
        datasets: [{
          label: 'Errores no forzados por jugador',
          data: [this.getUnforcedErrors(1, 'drive', 1), this.getUnforcedErrors(1, 'reves', 1), this.getUnforcedErrors(2, 'drive', 1), this.getUnforcedErrors(2, 'reves', 1)],
          backgroundColor: this.getColors(), // array should have same number of elements as number of dataset
          borderColor: this.getColors(),// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      }
    });
  }
  createBarChartForWinnersByTeamSet1() {
    this.teamWinnersBarSet1 = new Chart(this.teamWinnersBarChartSet1.nativeElement, {
      type: 'bar',
      data: {
        labels: this.getLabelsTeamsForBarChar(),
        datasets: [{
          label: 'Errores no forzados',
          data: [this.getWinners(1, 'drive', 1) + this.getWinners(1, 'reves', 1), this.getWinners(2, 'drive', 1) + this.getWinners(2, 'reves', 1)],
          backgroundColor: this.get2Colors(), // array should have same number of elements as number of dataset
          borderColor: this.get2Colors(),// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      }
    });
  }
  createBarChartForWinnersByPlayerSet1() {
    this.playersWinnersBarSet1 = new Chart(this.playersWinnersBarChartSet1.nativeElement, {
      type: 'bar',
      data: {
        labels: this.GetLabelsPlayerForBarChar(),
        datasets: [{
          label: 'Errores no forzados por jugador',
          data: [this.getWinners(1, 'drive', 1), this.getWinners(1, 'reves', 1), this.getWinners(2, 'drive', 1), this.getWinners(2, 'reves', 1)],
          backgroundColor: this.getColors(),// array should have same number of elements as number of dataset
          borderColor: this.getColors(),// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      }
    });
  }


  createBarChartForUnforcedErrorsByTeamSet2() {
    this.teamUnforcedErrorsBarSet2 = new Chart(this.teamUnforcedErrorsBarChartSet2.nativeElement, {
      type: 'bar',
      data: {
        labels: this.getLabelsTeamsForBarChar(),
        datasets: [{
          label: 'Errores no forzados',
          data: [this.getUnforcedErrors(1, 'drive', 2) + this.getUnforcedErrors(1, 'reves', 2), this.getUnforcedErrors(2, 'drive', 2) + this.getUnforcedErrors(2, 'reves', 2)],
          backgroundColor: this.get2Colors(), // array should have same number of elements as number of dataset
          borderColor: this.get2Colors(),// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      }
    });
  }
  createBarChartForUnforcedErrorsByPlayerSet2() {
    this.playersUnforcedErrorsBarSet2 = new Chart(this.playersUnforcedErrorsBarChartSet2.nativeElement, {
      type: 'bar',
      data: {
        labels: this.GetLabelsPlayerForBarChar(),
        datasets: [{
          label: 'Errores no forzados por jugador',
          data: [this.getUnforcedErrors(1, 'drive', 2), this.getUnforcedErrors(1, 'reves', 2), this.getUnforcedErrors(2, 'drive', 2), this.getUnforcedErrors(2, 'reves', 2)],
          backgroundColor: this.getColors(), // array should have same number of elements as number of dataset
          borderColor: this.getColors(),// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      }
    });
  }
  createBarChartForWinnersByTeamSet2() {
    this.teamWinnersBarSet2 = new Chart(this.teamWinnersBarChartSet2.nativeElement, {
      type: 'bar',
      data: {
        labels: this.getLabelsTeamsForBarChar(),
        datasets: [{
          label: 'Errores no forzados',
          data: [this.getWinners(1, 'drive', 2) + this.getWinners(1, 'reves', 2), this.getWinners(2, 'drive', 2) + this.getWinners(2, 'reves', 2)],
          backgroundColor: this.get2Colors(), // array should have same number of elements as number of dataset
          borderColor: this.get2Colors(),// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      }
    });
  }
  createBarChartForWinnersByPlayerSet2() {
    this.playersWinnersBarSet2 = new Chart(this.playersWinnersBarChartSet2.nativeElement, {
      type: 'bar',
      data: {
        labels: this.GetLabelsPlayerForBarChar(),
        datasets: [{
          label: 'Errores no forzados por jugador',
          data: [this.getWinners(1, 'drive', 2), this.getWinners(1, 'reves', 2), this.getWinners(2, 'drive', 2), this.getWinners(2, 'reves', 2)],
          backgroundColor: this.getColors(), // array should have same number of elements as number of dataset
          borderColor: this.getColors(),// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      }
    });
  }


  createBarChartForUnforcedErrorsByTeamSet3() {
    this.teamUnforcedErrorsBarSet3 = new Chart(this.teamUnforcedErrorsBarChartSet3.nativeElement, {
      type: 'bar',
      data: {
        labels: this.getLabelsTeamsForBarChar(),
        datasets: [{
          label: 'Errores no forzados',
          data: [this.getUnforcedErrors(1, 'drive', 3) + this.getUnforcedErrors(1, 'reves', 3), this.getUnforcedErrors(2, 'drive', 3) + this.getUnforcedErrors(2, 'reves', 3)],
          backgroundColor: 'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
          borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      }
    });
  }
  createBarChartForUnforcedErrorsByPlayerSet3() {
    this.playersUnforcedErrorsBarSet3 = new Chart(this.playersUnforcedErrorsBarChartSet3.nativeElement, {
      type: 'bar',
      data: {
        labels: this.GetLabelsPlayerForBarChar(),
        datasets: [{
          label: 'Errores no forzados por jugador',
          data: [this.getUnforcedErrors(1, 'drive', 3), this.getUnforcedErrors(1, 'reves', 3), this.getUnforcedErrors(2, 'drive', 3), this.getUnforcedErrors(2, 'reves', 3)],
          backgroundColor: this.getColors(), // array should have same number of elements as number of dataset
          borderColor: this.getColors(),// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      }
    });
  }
  createBarChartForWinnersByTeamSet3() {
    this.teamWinnersBarSet3 = new Chart(this.teamWinnersBarChartSet3.nativeElement, {
      type: 'bar',
      data: {
        labels: this.getLabelsTeamsForBarChar(),
        datasets: [{
          label: 'Errores no forzados',
          data: [this.getWinners(1, 'drive', 3) + this.getWinners(1, 'reves', 3), this.getWinners(2, 'drive', 3) + this.getWinners(2, 'reves', 3)],
          backgroundColor: this.get2Colors(), // array should have same number of elements as number of dataset
          borderColor: this.get2Colors(),// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      }
    });
  }
  createBarChartForWinnersByPlayerSet3() {
    this.playersWinnersBarSet3 = new Chart(this.playersWinnersBarChartSet3.nativeElement, {
      type: 'bar',
      data: {
        labels: this.GetLabelsPlayerForBarChar(),
        datasets: [{
          label: 'Errores no forzados por jugador',
          data: [this.getWinners(1, 'drive', 3), this.getWinners(1, 'reves', 3), this.getWinners(2, 'drive', 3), this.getWinners(2, 'reves', 3)],
          backgroundColor: this.getColors(), // array should have same number of elements as number of dataset
          borderColor: this.getColors(),// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      }
    });
  }


  createBarChartForUnforcedErrorsByTeamSuper() {
    this.teamUnforcedErrorsBarSuper = new Chart(this.teamUnforcedErrorsBarChartSuper.nativeElement, {
      type: 'bar',
      data: {
        labels: this.getLabelsTeamsForBarChar(),
        datasets: [{
          label: 'Errores no forzados',
          data: [this.getUnforcedErrors(1, 'drive', 4) + this.getUnforcedErrors(1, 'reves', 4), this.getUnforcedErrors(2, 'drive', 4) + this.getUnforcedErrors(2, 'reves', 4)],
          backgroundColor: this.get2Colors(), // array should have same number of elements as number of dataset
          borderColor: this.get2Colors(),// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      }
    });
  }
  createBarChartForUnforcedErrorsByPlayerSuper() {
    this.playersUnforcedErrorsBarSuper = new Chart(this.playersUnforcedErrorsBarChartSuper.nativeElement, {
      type: 'bar',
      data: {
        labels: this.GetLabelsPlayerForBarChar(),
        datasets: [{
          label: 'Errores no forzados por jugador',
          data: [this.getUnforcedErrors(1, 'drive', 4), this.getUnforcedErrors(1, 'reves', 4), this.getUnforcedErrors(2, 'drive', 4), this.getUnforcedErrors(2, 'reves', 4)],
          backgroundColor: this.getColors(), // array should have same number of elements as number of dataset
          borderColor: this.getColors(),// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      }
    });
  }
  createBarChartForWinnersByTeamSuper() {
    this.teamWinnersBarSuper = new Chart(this.teamWinnersBarChartSuper.nativeElement, {
      type: 'bar',
      data: {
        labels: this.getLabelsTeamsForBarChar(),
        datasets: [{
          label: 'Errores no forzados',
          data: [this.getWinners(1, 'drive', 4) + this.getWinners(1, 'reves', 4), this.getWinners(2, 'drive', 4) + this.getWinners(2, 'reves', 4)],
          backgroundColor: this.get2Colors(), // array should have same number of elements as number of dataset
          borderColor: this.get2Colors(),// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      }
    });
  }
  createBarChartForWinnersByPlayerSuper() {
    this.playersWinnersBarSuper = new Chart(this.playersWinnersBarChartSuper.nativeElement, {
      type: 'bar',
      data: {
        labels: this.GetLabelsPlayerForBarChar(),
        datasets: [{
          label: 'Errores no forzados por jugador',
          data: [this.getWinners(1, 'drive', 4), this.getWinners(1, 'reves', 4), this.getWinners(2, 'drive', 4), this.getWinners(2, 'reves', 4)],
          backgroundColor: this.getColors(), // array should have same number of elements as number of dataset
          borderColor: this.getColors(),// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      }
    });
  }


  goBack() {
    this.location.back();
  }

}
