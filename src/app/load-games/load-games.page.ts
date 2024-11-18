import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { LocalStorageService } from '../local-storage.service';
import { MatchStats } from '../models/matchStats';
import { MatchServiceService } from '../match-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-load-games',
  templateUrl: './load-games.page.html',
  styleUrls: ['./load-games.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoadGamesPage implements OnInit {

  public matches: { [key: string]: MatchStats };
  constructor(private router: Router,private storageService: LocalStorageService,public matchService:MatchServiceService, private location: Location) { }

  ngOnInit() {
    ;
    this.matches = this.storageService.getItems("matches");
    ;
  }
  getKeys(dictionary: { [key: string]: MatchStats }): string[] {
    return Object.keys(dictionary);
  }

  loadGame(key){
    ;
    let match = this.matches[key];
    // let matchs = plainToInstance(MatchStats, match);
    let matchs = new MatchStats(true,match);
;
    this.matchService.game = matchs;
    let s = matchs.team1.getTeamLabel(1);
    this.router.navigate(['/match-stats']);
  }
  goBack() {
    this.location.back(); 
  }

}
