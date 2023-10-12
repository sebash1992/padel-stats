import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule,NavController } from '@ionic/angular';
import { Chart, ChartConfiguration, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, BarController, BarElement } from 'chart.js'
import { Router } from '@angular/router';
import { MatchStats } from '../models/matchStats'
import { MatchSet } from '../models/matchSet'
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

  constructor(public router: Router, private location: Location, public matchService: MatchServiceService,private navController: NavController) {
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

    this.createBarChartForUnforcedErrorsByTeamSet1();
    this.createBarChartForUnforcedErrorsByPlayerSet1();
    this.createBarChartForWinnersByPlayerSet1();
    this.createBarChartForWinnersByTeamSet1();

    this.createBarChartForUnforcedErrorsByTeamSet2();
    this.createBarChartForUnforcedErrorsByPlayerSet2();
    this.createBarChartForWinnersByPlayerSet2();
    this.createBarChartForWinnersByTeamSet2();

    this.createBarChartForUnforcedErrorsByTeamSet3();
    this.createBarChartForUnforcedErrorsByPlayerSet3();
    this.createBarChartForWinnersByPlayerSet3();
    this.createBarChartForWinnersByTeamSet3();

    this.createBarChartForUnforcedErrorsByTeamSuper();
    this.createBarChartForUnforcedErrorsByPlayerSuper();
    this.createBarChartForWinnersByPlayerSuper();
    this.createBarChartForWinnersByTeamSuper();

  }

  private getLabels(): string[] {
    switch (this.game.currentSet) {
      case (1):
        return ["1 Set"];
      case (2):
        return ["1 Set", "2 Set"];
      case (3):
      case (4):
      default:
        return ["1 Set", "2 Set", "3 Set"];
    }
  }

  private GetLabelsPlayerForBarChar(): string[] {
    return ["P1 " + this.game.team1Drive.name, "P1 " + this.game.team1Reves.name, "P2 " + this.game.team2Drive.name, "P2 " + this.game.team2Reves.name]
  }

  private GetLabelsTeamsForBarChar() {
    return ["Pareja 1", "Pareja 2"]
  }

  private GetUnforcedErrorForTeam(set: number): number[] {
    switch (set) {
      case 1:
        return [this.game.team1Drive.set1.unforcedErrors + this.game.team1Reves.set1.unforcedErrors, this.game.team2Reves.set1.unforcedErrors + this.game.team2Drive.set1.unforcedErrors]
      case 2:
        return [this.game.team1Drive.set2.unforcedErrors + this.game.team1Reves.set2.unforcedErrors, this.game.team2Reves.set2.unforcedErrors + this.game.team2Drive.set2.unforcedErrors]
      case 3:
        return [this.game.team1Drive.set3.unforcedErrors + this.game.team1Reves.set3.unforcedErrors, this.game.team2Reves.set3.unforcedErrors + this.game.team2Drive.set3.unforcedErrors]
      case 4:
        return [this.game.team1Drive.super.unforcedErrors + this.game.team1Reves.super.unforcedErrors, this.game.team2Reves.super.unforcedErrors + this.game.team2Drive.super.unforcedErrors]
      default:
        return [this.game.team1Drive.getTotalUnforcedErrors() + this.game.team1Reves.getTotalUnforcedErrors(), this.game.team2Reves.getTotalUnforcedErrors() + this.game.team2Drive.getTotalUnforcedErrors()]
    }
  }

  private GetUnforcedErrorForPlayers(set: number): number[] {
    switch (set) {
      case 1:
        return [this.game.team1Drive.set1.unforcedErrors, this.game.team1Reves.set1.unforcedErrors, this.game.team2Drive.set1.unforcedErrors, this.game.team2Reves.set1.unforcedErrors]
      case 2:
        return [this.game.team1Drive.set2.unforcedErrors, this.game.team1Reves.set2.unforcedErrors, this.game.team2Drive.set2.unforcedErrors, this.game.team2Reves.set2.unforcedErrors]
      case 3:
        return [this.game.team1Drive.set3.unforcedErrors, this.game.team1Reves.set3.unforcedErrors, this.game.team2Drive.set3.unforcedErrors, this.game.team2Reves.set3.unforcedErrors]
      case 4:
        return [this.game.team1Drive.super.unforcedErrors, this.game.team1Reves.super.unforcedErrors, this.game.team2Drive.super.unforcedErrors, this.game.team2Reves.super.unforcedErrors]
      default:
        return [this.game.team1Drive.getTotalUnforcedErrors(), this.game.team1Reves.getTotalUnforcedErrors(), this.game.team2Drive.getTotalUnforcedErrors(), this.game.team2Reves.getTotalUnforcedErrors()]
    }
  }

  private GetWinnerForTeam(set: number): number[] {
    switch (set) {
      case 1:
        return [this.game.team1Drive.set1.winners + this.game.team1Reves.set1.winners, this.game.team2Reves.set1.winners + this.game.team2Drive.set1.winners]
      case 2:
        return [this.game.team1Drive.set2.winners + this.game.team1Reves.set2.winners, this.game.team2Reves.set2.winners + this.game.team2Drive.set2.winners]
      case 3:
        return [this.game.team1Drive.set3.winners + this.game.team1Reves.set3.winners, this.game.team2Reves.set3.winners + this.game.team2Drive.set3.winners]
      case 4:
        return [this.game.team1Drive.super.winners + this.game.team1Reves.super.winners, this.game.team2Reves.super.winners + this.game.team2Drive.super.winners]
      default:
        return [this.game.team1Drive.getTotalWinners() + this.game.team1Reves.getTotalWinners(), this.game.team2Reves.getTotalWinners() + this.game.team2Drive.getTotalWinners()]
    }
  }

  private GetWinnersPlayers(set: number): number[] {
    switch (set) {
      case 1:
        return [this.game.team1Drive.set1.winners, this.game.team1Reves.set1.winners, this.game.team2Drive.set1.winners, this.game.team2Reves.set1.winners]
      case 2:
        return [this.game.team1Drive.set2.winners, this.game.team1Reves.set2.winners, this.game.team2Drive.set2.winners, this.game.team2Reves.set2.winners]
      case 3:
        return [this.game.team1Drive.set3.winners, this.game.team1Reves.set3.winners, this.game.team2Drive.set3.winners, this.game.team2Reves.set3.winners]
      case 4:
        return [this.game.team1Drive.super.winners, this.game.team1Reves.super.winners, this.game.team2Drive.super.winners, this.game.team2Reves.super.winners]
      default:
        return [this.game.team1Drive.getTotalWinners(), this.game.team1Reves.getTotalWinners(), this.game.team2Drive.getTotalWinners(), this.game.team2Reves.getTotalWinners()]
    }
  }
  createBarChartForUnforcedErrorsByTeam() {
    this.teamUnforcedErrorsBar = new Chart(this.teamUnforcedErrorsBarChart.nativeElement, {
      type: 'bar',
      data: {
        labels: this.GetLabelsTeamsForBarChar(),
        datasets: [{
          label: 'Errores no forzados',
          data: this.GetUnforcedErrorForTeam(-1),
          backgroundColor: this.get2Colors(), // array should have same number of elements as number of dataset
          borderColor: this.get2Colors(),// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      }
    });
  }
  private getColors():string[]{
    return ['#00B1FF','#00CEEF','#00E5BA','#8CF387'];
  }
  private get2Colors():string[]{
    return ['#00B1FF','#00E5BA'];
  }
  createBarChartForUnforcedErrorsByPlayer() {
    this.playersUnforcedErrorsBar = new Chart(this.playersUnforcedErrorsBarChart.nativeElement, {
      type: 'bar',
      data: {
        labels: this.GetLabelsPlayerForBarChar(),
        datasets: [{
          label: 'Errores no forzados por jugador',
          data: this.GetUnforcedErrorForPlayers(-1),
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
        labels: this.GetLabelsTeamsForBarChar(),
        datasets: [{
          label: 'Errores no forzados',
          data: this.GetWinnerForTeam(-1),
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
          data: this.GetWinnersPlayers(-1),
          backgroundColor: this.getColors(), // array should have same number of elements as number of dataset
          borderColor: this.getColors(),// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      }
    });
  }
  public getMatchStats() {
    var totalPoints = this.game.set1.pointsPlayed + this.game.set3.pointsPlayed + this.game.set3.pointsPlayed + this.game.super.pointsPlayed
    return [
      {
        "estadistica": "Puntos Ganados",
        "pareja1": this.game.set1.team1.pointsWinned + this.game.set3.team1.pointsWinned + this.game.set3.team1.pointsWinned + this.game.super.team1.pointsWinned,
        "pareja2": this.game.set1.team2.pointsWinned + this.game.set3.team2.pointsWinned + this.game.set3.team2.pointsWinned + this.game.super.team2.pointsWinned
      },
      {
        "estadistica": "% Puntos Ganados",
        "pareja1": ((this.game.set1.team1.pointsWinned + this.game.set3.team1.pointsWinned + this.game.set3.team1.pointsWinned + this.game.super.team1.pointsWinned) / totalPoints) * 100,
        "pareja2": ((this.game.set1.team2.pointsWinned + this.game.set3.team2.pointsWinned + this.game.set3.team2.pointsWinned + this.game.super.team2.pointsWinned) / totalPoints) * 100

      },
      {
        "estadistica": "Opciones de Break",
        "pareja1": this.game.set1.team1.breakOptions + this.game.set3.team1.breakOptions + this.game.set3.team1.breakOptions + this.game.super.team1.breakOptions,
        "pareja2": this.game.set1.team2.breakOptions + this.game.set3.team2.breakOptions + this.game.set3.team2.breakOptions + this.game.super.team2.breakOptions
      },
      {
        "estadistica": "Break points Ganados",
        "pareja1": this.game.set1.team1.breaksAcchived + this.game.set3.team1.breaksAcchived + this.game.set3.team1.breaksAcchived + this.game.super.team1.breaksAcchived,
        "pareja2": this.game.set1.team2.breaksAcchived + this.game.set3.team2.breaksAcchived + this.game.set3.team2.breaksAcchived + this.game.super.team2.breaksAcchived
      },
      {
        "estadistica": "Puntos de Oro",
        "pareja1": this.game.set1.team1.goldenPointsPlayed + this.game.set3.team1.goldenPointsPlayed + this.game.set3.team1.goldenPointsPlayed + this.game.super.team1.goldenPointsPlayed,
        "pareja2": this.game.set1.team2.goldenPointsPlayed + this.game.set3.team2.goldenPointsPlayed + this.game.set3.team2.goldenPointsPlayed + this.game.super.team2.goldenPointsPlayed
      },
      {
        "estadistica": "Puntos de Oro Ganados",
        "pareja1": this.game.set1.team1.goldenPointsWinned + this.game.set3.team1.goldenPointsWinned + this.game.set3.team1.goldenPointsWinned + this.game.super.team1.goldenPointsWinned,
        "pareja2": this.game.set1.team2.goldenPointsWinned + this.game.set3.team2.goldenPointsWinned + this.game.set3.team2.goldenPointsWinned + this.game.super.team2.goldenPointsWinned
      },
      {
        "estadistica": "Puntos Consecutivos Ganados",
        "pareja1": Math.max(this.game.set1.team1.consecutiveWins, this.game.set3.team1.consecutiveWins, this.game.set3.team1.consecutiveWins, this.game.super.team1.consecutiveWins),
        "pareja2": Math.max(this.game.set1.team2.consecutiveWins, this.game.set3.team2.consecutiveWins, this.game.set3.team2.consecutiveWins, this.game.super.team2.consecutiveWins)

      },
      {
        "estadistica": "Errores no forzados",
        "pareja1": this.game.team1Drive.set1.unforcedErrors + this.game.team1Drive.set2.unforcedErrors + this.game.team1Drive.set3.unforcedErrors + this.game.team1Drive.super.unforcedErrors + this.game.team1Reves.set1.unforcedErrors + this.game.team1Reves.set2.unforcedErrors + this.game.team1Reves.set3.unforcedErrors + this.game.team1Reves.super.unforcedErrors,
        "pareja2": this.game.team2Drive.set1.unforcedErrors + this.game.team2Drive.set2.unforcedErrors + this.game.team2Drive.set3.unforcedErrors + this.game.team2Drive.super.unforcedErrors + this.game.team2Reves.set1.unforcedErrors + this.game.team2Reves.set2.unforcedErrors + this.game.team2Reves.set3.unforcedErrors + this.game.team2Reves.super.unforcedErrors

      },
      {
        "estadistica": "winners",
        "pareja1": this.game.team1Drive.set1.winners + this.game.team1Drive.set2.winners + this.game.team1Drive.set3.winners + this.game.team1Drive.super.winners + this.game.team1Reves.set1.winners + this.game.team1Reves.set2.winners + this.game.team1Reves.set3.winners + this.game.team1Reves.super.winners,
        "pareja2": this.game.team2Drive.set1.winners + this.game.team2Drive.set2.winners + this.game.team2Drive.set3.winners + this.game.team2Drive.super.winners + this.game.team2Reves.set1.winners + this.game.team2Reves.set2.winners + this.game.team2Reves.set3.winners + this.game.team2Reves.super.winners

      }
    ]
  }
  public getMatchStatsForSet(setNumber: number) {
    var set: MatchSet;
    var team1DriveSet: PlayerSet;
    var team1RevesSet: PlayerSet;
    var team2DriveSet: PlayerSet;
    var team2RevesSet: PlayerSet;
    switch (setNumber) {
      case 1:
        set = this.game.set1;
        team1DriveSet = this.game.team1Drive.set1;
        team1RevesSet = this.game.team1Reves.set1;
        team2DriveSet = this.game.team2Drive.set1;
        team2RevesSet = this.game.team2Reves.set1;
        break;
      case 2:
        set = this.game.set2;
        team1DriveSet = this.game.team1Drive.set2;
        team1RevesSet = this.game.team1Reves.set2;
        team2DriveSet = this.game.team2Drive.set2;
        team2RevesSet = this.game.team2Reves.set2;
        break;
      case 3:
        set = this.game.set3;
        team1DriveSet = this.game.team1Drive.set3;
        team1RevesSet = this.game.team1Reves.set3;
        team2DriveSet = this.game.team2Drive.set3;
        team2RevesSet = this.game.team2Reves.set3;
        break;
      case 4:
        set = this.game.super;
        team1DriveSet = this.game.team1Drive.super;
        team1RevesSet = this.game.team1Reves.super;
        team2DriveSet = this.game.team2Drive.super;
        team2RevesSet = this.game.team2Reves.super;
        break;
    }
    return [
      {
        "estadistica": "Puntos Ganados",
        "pareja1": set.team1.pointsWinned,
        "pareja2": set.team2.pointsWinned
      },
      {
        "estadistica": "% Puntos Ganados",
        "pareja1": ((set.team1.pointsWinned) / set.pointsPlayed) * 100,
        "pareja2": ((set.team2.pointsWinned) / set.pointsPlayed) * 100

      },
      {
        "estadistica": "Opciones de Break",
        "pareja1": set.team1.breakOptions,
        "pareja2": set.team2.breakOptions
      },
      {
        "estadistica": "Break points Ganados",
        "pareja1": set.team1.breaksAcchived,
        "pareja2": set.team2.breaksAcchived
      },
      {
        "estadistica": "Puntos de Oro",
        "pareja1": set.team1.goldenPointsPlayed,
        "pareja2": set.team2.goldenPointsPlayed
      },
      {
        "estadistica": "Puntos de Oro Ganados",
        "pareja1": set.team1.goldenPointsWinned,
        "pareja2": set.team2.goldenPointsWinned
      },
      {
        "estadistica": "Puntos Consecutivos Ganados",
        "pareja1": set.team1.consecutiveWins,
        "pareja2": set.team2.consecutiveWins
      },
      {
        "estadistica": "Errores no forzados",
        "pareja1": team1DriveSet.unforcedErrors + team1RevesSet.unforcedErrors,
        "pareja2": team2DriveSet.unforcedErrors + team2RevesSet.unforcedErrors
      },
      {
        "estadistica": "Winners",
        "pareja1": team1DriveSet.winners + team1RevesSet.winners,
        "pareja2": team2DriveSet.winners + team2RevesSet.winners
      }
    ]
  }
  private getPointsWinned(team: number): number[] {
    var set1Team: Team;
    var set2Team: Team;
    var set3Team: Team;
    if (team == 1) {
      set1Team = this.game.set1.team1;
      set2Team = this.game.set2.team1;
      set3Team = this.game.set3.team1;
    } else {
      set1Team = this.game.set1.team2;
      set2Team = this.game.set2.team2;
      set3Team = this.game.set3.team2;

    }
    switch (this.game.currentSet) {
      case (1):
        return [set1Team.pointsWinned];
      case (2):
        return [set1Team.pointsWinned, set2Team.pointsWinned];
      case (3):
      case (4):
      default:
        return [set1Team.pointsWinned, set2Team.pointsWinned, set3Team.pointsWinned];
    }
  }
  lineChartMethod() {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
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
            data: this.getPointsWinned(1),
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
            data: this.getPointsWinned(2),
            spanGaps: false,
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
            data: [this.game.team1Drive.set1.winners + this.game.team1Reves.set1.winners, this.game.team1Drive.set2.winners + this.game.team1Reves.set2.winners, this.game.team1Drive.set3.winners + this.game.team1Reves.set3.winners, this.game.team1Drive.super.winners + this.game.team1Reves.super.winners],
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
            data: [this.game.team2Drive.set1.winners + this.game.team2Reves.set1.winners, this.game.team2Drive.set2.winners + this.game.team2Reves.set2.winners, this.game.team2Drive.set3.winners + this.game.team2Reves.set3.winners, this.game.team2Drive.super.winners + this.game.team2Reves.super.winners],
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
    this.teamUnforcedErrorsBarSet1 = new Chart(this.teamUnforcedErrorsBarChartSet1.nativeElement, {
      type: 'bar',
      data: {
        labels: this.GetLabelsTeamsForBarChar(),
        datasets: [{
          label: 'Errores no forzados',
          data: this.GetUnforcedErrorForTeam(1),
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
          data: this.GetUnforcedErrorForPlayers(1),
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
        labels: this.GetLabelsTeamsForBarChar(),
        datasets: [{
          label: 'Errores no forzados',
          data: this.GetWinnerForTeam(1),
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
          data: this.GetWinnersPlayers(1),
          backgroundColor: this.getColors(),// array should have same number of elements as number of dataset
          borderColor:this.getColors(),// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      }
    });
  }


  createBarChartForUnforcedErrorsByTeamSet2() {
    this.teamUnforcedErrorsBarSet2 = new Chart(this.teamUnforcedErrorsBarChartSet2.nativeElement, {
      type: 'bar',
      data: {
        labels: this.GetLabelsTeamsForBarChar(),
        datasets: [{
          label: 'Errores no forzados',
          data: this.GetUnforcedErrorForTeam(2),
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
          data: this.GetUnforcedErrorForPlayers(2),
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
        labels: this.GetLabelsTeamsForBarChar(),
        datasets: [{
          label: 'Errores no forzados',
          data: this.GetWinnerForTeam(2),
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
          data: this.GetWinnersPlayers(2),
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
        labels: this.GetLabelsTeamsForBarChar(),
        datasets: [{
          label: 'Errores no forzados',
          data: this.GetUnforcedErrorForTeam(3),
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
          data: this.GetUnforcedErrorForPlayers(3),
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
        labels: this.GetLabelsTeamsForBarChar(),
        datasets: [{
          label: 'Errores no forzados',
          data: this.GetWinnerForTeam(3),
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
          data: this.GetWinnersPlayers(3),
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
        labels: this.GetLabelsTeamsForBarChar(),
        datasets: [{
          label: 'Errores no forzados',
          data: this.GetUnforcedErrorForTeam(4),
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
          data: this.GetUnforcedErrorForPlayers(4),
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
        labels: this.GetLabelsTeamsForBarChar(),
        datasets: [{
          label: 'Errores no forzados',
          data: this.GetWinnerForTeam(4),
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
          data: this.GetWinnersPlayers(4),
          backgroundColor: this.getColors(), // array should have same number of elements as number of dataset
          borderColor: this.getColors(),// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      }
    });
  }
  

  goBack() {
   // this.navController.back();

    this.navController.navigateForward("match");
  }

}
