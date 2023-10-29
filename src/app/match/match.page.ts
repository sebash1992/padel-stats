import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule,NavController } from '@ionic/angular';
import {PlayerStatsComponent} from '../player-stats/player-stats.component'
import {ThirdSetModalComponent} from '../third-set-modal/third-set-modal.component'
import {MatchServiceService} from '../match-service.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-match',
  templateUrl: './match.page.html',
  styleUrls: ['./match.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,PlayerStatsComponent,ThirdSetModalComponent]
})
export class MatchPage implements OnInit {
  
  constructor(public nav: NavController, public matchService:MatchServiceService,private location: Location,private router: Router) {
    //this.matchService.initializeMatch();
   }
   
  ngOnInit() {
  }

  goToStats() {
    this.nav.navigateForward("match-stats");
  }
  checkboxClick(e,team: number){
    this. matchService.game.getCurrentSet().team1.isServing = ! this. matchService.game.getCurrentSet().team1.isServing;
    this. matchService.game.getCurrentSet().team2.isServing = ! this. matchService.game.getCurrentSet().team2.isServing;
  }

  goBack(){
    this.router.navigate(['/menu'])
  }

  
  
}

