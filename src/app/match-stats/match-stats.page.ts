import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, BarController, BarElement } from 'chart.js'
import { Router } from '@angular/router';
import { MatchStats } from '../models/matchStats'
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatchServiceService } from '../match-service.service';

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


  @ViewChild('lineUnforcedErrorIn40perPlayer') private lineUnforcedErrorIn40perPlayer?: ElementRef;

  @ViewChild('lineWinnersIn40PerPlayer') private lineWinnersIn40PerPlayer?: ElementRef;

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
    this.createWinnersIn40PerPlayerlineChart();
    this.createUnforcedErrorIn40PerPlayerlineChart();

    if (this.game.currentSet >=1) {
      this.createBarChartForUnforcedErrorsByTeamSet1();
      this.createBarChartForUnforcedErrorsByPlayerSet1();
      this.createBarChartForWinnersByPlayerSet1();
      this.createBarChartForWinnersByTeamSet1();
    }

    if (this.matchService.game.currentSet >= 2) {
      this.createBarChartForUnforcedErrorsByTeamSet2();
      this.createBarChartForUnforcedErrorsByPlayerSet2();
      this.createBarChartForWinnersByPlayerSet2();
      this.createBarChartForWinnersByTeamSet2();
    }
    if (this.matchService.game.currentSet >= 3 && this.matchService.game.thirdSetType == 3) {
      this.createBarChartForUnforcedErrorsByTeamSet3();
      this.createBarChartForUnforcedErrorsByPlayerSet3();
      this.createBarChartForWinnersByPlayerSet3();
      this.createBarChartForWinnersByTeamSet3();
    }
    if (this.matchService.game.currentSet >= 4 && this.matchService.game.thirdSetType == 4) {
      this.createBarChartForUnforcedErrorsByTeamSuper();
      this.createBarChartForUnforcedErrorsByPlayerSuper();
      this.createBarChartForWinnersByPlayerSuper();
      this.createBarChartForWinnersByTeamSuper();
    }

  }

  private getLabels(): string[] {
    var labels: string[] = [];
    if (this.matchService.game.currentSet === 1) {
      labels.push('1 Set');
    }
    if (this.matchService.game.currentSet >= 2) {
      labels.push('2 Set');
    }
    if (this.matchService.game.currentSet >= 3 && this.matchService.game.thirdSetType == 3) {
      labels.push('3 Set');
    }
    if (this.matchService.game.currentSet >= 4 && this.matchService.game.thirdSetType == 4) {
      labels.push('Super');
    }
    return labels;
  }

  public getTeamLabel(team: number) {
    if (team === 1) {
        return this.matchService.game.team1.getTeamLabel(1);
    } else {
      return this.matchService.game.team1.getTeamLabel(2);
    }
  }

  private getLabelsTeamsForBarChar() {
    var labels: string[] = [];

    labels.push(this.getTeamLabel(1));
    labels.push(this.getTeamLabel(2));
    return labels;
  }

  private GetLabelsPlayerForBarChar(): string[] {
    return ["P1 " + this.game.team1.drive.name, "P1 " + this.game.team1.reves.name, "P2 " + this.game.team2.drive.name, "P2 " + this.game.team2.reves.name]
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

  public getGoldenPoinsPlayed(team: number, set: number = -1) {
    switch (team) {
      case 1:
        return this.matchService.game.team1.getGoldenPointsPlayed(set);
      case 2:
        return this.matchService.game.team2.getGoldenPointsPlayed(set);
      default:
        return 0;
    }
  }
  public getGoldenPointsWinned(team: number, set: number = -1) {
    switch (team) {
      case 1:
        return this.matchService.game.team1.getGoldenPointsWinned(set);
      case 2:
        return this.matchService.game.team2.getGoldenPointsWinned(set);
      default:
        return 0;
    }
  }
  public getBreakOptions(team: number, set: number = -1) {
    switch (team) {
      case 1:
        return this.matchService.game.team1.getBreaks(set);
      case 2:
        return this.matchService.game.team2.getBreaks(set);
    }
    return 0;
  }
  public getBreaks(team: number, set: number = -1) {
    switch (team) {
      case 1:
        return this.matchService.game.team1.getBreaksAcchived(set);
      case 2:
        return this.matchService.game.team2.getBreaksAcchived(set);
    }
    return 0;
  }

  public getConsecutivePointsWinned(team: number, set: number = -1) {
    switch (team) {
      case 1:
        return this.matchService.game.team1.getConsecutivePointsWinned(set);
      case 2:
        return this.matchService.game.team2.getConsecutivePointsWinned(set);
    }
    return 0;
  }



  public getUnforcedErrors(team: number, player: string, set: number = -1) {

    if (team === 1) {
      return this.matchService.game.team1.getUnforceErrors(set, player);

    }
    if (team === 2) {
      return this.matchService.game.team2.getUnforceErrors(set, player);

    }
    return 0;
  }

  public getWinners(team: number, player: string, set: number = -1) {
    if (team === 1) {
      return this.matchService.game.team1.getWinners(set, player);

    }
    if (team === 2) {
      return this.matchService.game.team2.getWinners(set, player);

    }
    return 0;
  }

  public getWinnersIn40(team: number, player: string, set: number = -1) {
    if (team === 1) {
      return this.matchService.game.team1.getWinnersIn40(set, player);

    }
    if (team === 2) {
      return this.matchService.game.team2.getWinnersIn40(set, player);

    }
    return 0;
  }

  public getUnforceErrorsIn40(team: number, player: string, set: number = -1) {
    if (team === 1) {
      return this.matchService.game.team1.getUnforceErrorsIn40(set, player);

    }
    if (team === 2) {
      return this.matchService.game.team2.getUnforceErrorsIn40(set, player);

    }
    return 0;
  }

  public getWinnedPointsPercentage(team: number, set: number = -1) {
    let pointsWinnedT1 = this.matchService.game.team2.getPointsWinned(set);
    let pointsWinnedT2 = this.matchService.game.team1.getPointsWinned(set);

    let pointsPlayed = pointsWinnedT1 + pointsWinnedT2;
    if (pointsPlayed === 0) {
      return 0;
    }
    switch (team) {
      case 1:
        return ((pointsWinnedT1 / pointsPlayed) * 100).toFixed(0)
      case 2:
        return ((pointsWinnedT2 / pointsPlayed) * 100).toFixed(0)
      default:
        return 0;
    }
  }

  public getWinnedPoints(team: number, set: number = -1) {

    switch (team) {
      case 1:
        return this.matchService.game.team2.getPointsWinned(set);
      case 2:
        return this.matchService.game.team1.getPointsWinned(set);
      default:
        return 0;
    }
  }






  getPointsWinnedForLineChart(team: number) {
    var pointwinned: number[] = []
    let teamObject;
    if (team == 1) {
      teamObject = this.game.team1;
    } else {
      teamObject = this.game.team2;
    }
    if (this.matchService.game.currentSet === 1) {
      pointwinned.push(teamObject.getPointsWinned(1));
    }
    if (this.matchService.game.currentSet >= 2) {
      pointwinned.push(teamObject.getPointsWinned(2));
    }
    if (this.matchService.game.currentSet >= 3 && this.matchService.game.thirdSetType == 3) {
      pointwinned.push(teamObject.getPointsWinned(3));
    }
    if (this.matchService.game.currentSet >= 4 && this.matchService.game.thirdSetType == 4) {
      pointwinned.push(teamObject.getPointsWinned(4));
    }
    return pointwinned;
  }
  getWinnersForLineChart(team: number) {
    var winners: number[] = []
    let teamObject;
    if (team == 1) {
      teamObject = this.game.team1;
    } else {
      teamObject = this.game.team2;
    }
    if (this.matchService.game.currentSet === 1) {
      winners.push(teamObject.getWinners(1));
    }
    if (this.matchService.game.currentSet >= 2) {
      winners.push(teamObject.getWinners(2));
    }
    if (this.matchService.game.currentSet >= 3 && this.matchService.game.thirdSetType == 3) {
      winners.push(teamObject.getWinners(3));
    }
    if (this.matchService.game.currentSet >= 4 && this.matchService.game.thirdSetType == 4) {
      winners.push(teamObject.getWinners(4));
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
            data: [this.game.team1.drive.getUnforcedErrors(1) + this.game.team1.reves.getUnforcedErrors(1), this.game.team1.drive.getUnforcedErrors(2) + this.game.team1.reves.getUnforcedErrors(2), this.game.team1.drive.getUnforcedErrors(3) + this.game.team1.reves.getUnforcedErrors(3), this.game.team1.drive.getUnforcedErrors(4) + this.game.team1.reves.getUnforcedErrors(4)],
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
            data: [this.game.team2.drive.getUnforcedErrors(1) + this.game.team2.reves.getUnforcedErrors(1), this.game.team2.drive.getUnforcedErrors(2) + this.game.team2.reves.getUnforcedErrors(2), this.game.team2.drive.getUnforcedErrors(3) + this.game.team2.reves.getUnforcedErrors(3), this.game.team2.drive.getUnforcedErrors(4) + this.game.team2.reves.getUnforcedErrors(4)],
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
            data: [this.game.team1.drive.getUnforcedErrors(1), this.game.team1.drive.getUnforcedErrors(2), this.game.team1.drive.getUnforcedErrors(3), this.game.team1.drive.getUnforcedErrors(4)],
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
            data: [this.game.team1.reves.getUnforcedErrors(1), this.game.team1.reves.getUnforcedErrors(2), this.game.team1.reves.getUnforcedErrors(3), this.game.team1.reves.getUnforcedErrors(4)],
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
            data: [this.game.team2.drive.getUnforcedErrors(1), this.game.team2.drive.getUnforcedErrors(2), this.game.team2.drive.getUnforcedErrors(3), this.game.team2.drive.getUnforcedErrors(4)],
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
            data: [this.game.team2.reves.getUnforcedErrors(1), this.game.team2.reves.getUnforcedErrors(2), this.game.team2.reves.getUnforcedErrors(3), this.game.team2.reves.getUnforcedErrors(4)],
            spanGaps: false,
          }
        ]
      }
    });
  }
  createWinnersIn40PerPlayerlineChart() {
    this.lineChartWinnersPerPlayer = new Chart(this.lineWinnersIn40PerPlayer.nativeElement, {
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
            data: [this.game.team1.drive.getWinnersIn40(1), this.game.team1.drive.getWinnersIn40(2), this.game.team1.drive.getWinnersIn40(3), this.game.team1.drive.getWinnersIn40(4)],
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
            data: [this.game.team1.reves.getWinnersIn40(1), this.game.team1.reves.getWinnersIn40(2), this.game.team1.reves.getWinnersIn40(3), this.game.team1.reves.getWinnersIn40(4)],
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
            data: [this.game.team2.drive.getWinnersIn40(1), this.game.team2.drive.getWinnersIn40(2), this.game.team2.drive.getWinnersIn40(3), this.game.team2.drive.getWinnersIn40(4)],
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
            data: [this.game.team2.reves.getWinnersIn40(1), this.game.team2.reves.getWinnersIn40(2), this.game.team2.reves.getWinnersIn40(3), this.game.team2.reves.getWinnersIn40(4)],
            spanGaps: false,
          }
        ]
      }
    });
  }



  createUnforcedErrorIn40PerPlayerlineChart() {
    this.lineChartWinnersPerPlayer = new Chart(this.lineUnforcedErrorIn40perPlayer.nativeElement, {
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
            data: [this.game.team1.drive.getUnforcedErrorsIn40(1), this.game.team1.drive.getUnforcedErrorsIn40(2), this.game.team1.drive.getUnforcedErrorsIn40(3), this.game.team1.drive.getUnforcedErrorsIn40(4)],
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
            data: [this.game.team1.reves.getUnforcedErrorsIn40(1), this.game.team1.reves.getUnforcedErrorsIn40(2), this.game.team1.reves.getUnforcedErrorsIn40(3), this.game.team1.reves.getUnforcedErrorsIn40(4)],
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
            data: [this.game.team2.drive.getUnforcedErrorsIn40(1), this.game.team2.drive.getUnforcedErrorsIn40(2), this.game.team2.drive.getUnforcedErrorsIn40(3), this.game.team2.drive.getUnforcedErrorsIn40(4)],
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
            data: [this.game.team2.reves.getUnforcedErrorsIn40(1), this.game.team2.reves.getUnforcedErrorsIn40(2), this.game.team2.reves.getUnforcedErrorsIn40(3), this.game.team2.reves.getUnforcedErrorsIn40(4)],
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
            data: [this.game.team1.drive.getWinners(1), this.game.team1.drive.getWinners(2), this.game.team1.drive.getWinners(3), this.game.team1.drive.getWinners(4)],
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
            data: [this.game.team1.reves.getWinners(1), this.game.team1.reves.getWinners(2), this.game.team1.reves.getWinners(3), this.game.team1.reves.getWinners(4)],
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
            data: [this.game.team2.drive.getWinners(1), this.game.team2.drive.getWinners(2), this.game.team2.drive.getWinners(3), this.game.team2.drive.getWinners(4)],
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
            data: [this.game.team2.reves.getWinners(1), this.game.team2.reves.getWinners(2), this.game.team2.reves.getWinners(3), this.game.team2.reves.getWinners(4)],
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
    this.router.navigate(['/match'])
  }

}
