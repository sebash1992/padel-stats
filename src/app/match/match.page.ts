import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule,NavController } from '@ionic/angular';
import {PlayerStatsComponent} from '../player-stats/player-stats.component'
import {ThirdSetModalComponent} from '../third-set-modal/third-set-modal.component'
import {MatchServiceService} from '../match-service.service'
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-match',
  templateUrl: './match.page.html',
  styleUrls: ['./match.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,PlayerStatsComponent,ThirdSetModalComponent,TranslateModule]
})
export class MatchPage implements OnInit {
  
  constructor(public nav: NavController, public matchService:MatchServiceService,private location: Location,private router: Router) {
    //this.matchService.initializeMatch();
   }
   
  ngOnInit() {
  }

  goToStats() {
    this.router.navigate(['/match-stats']);
  }
  checkboxClick(e,team: number){
    //TODO
     this. matchService.game.team1.changeServe();
     this. matchService.game.team2.changeServe();
  }

  goBack(){
    this.router.navigate(['/menu'])
  }

  
  
}

