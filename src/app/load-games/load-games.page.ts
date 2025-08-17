import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { LocalStorageService } from '../local-storage.service';
import { MatchStats } from '../models/matchStats';
import { MatchServiceService } from '../match-service.service';
import { Router } from '@angular/router';
import { TranslateService,TranslateModule } from '@ngx-translate/core';
import { Translations } from '../models/translations';

@Component({
  selector: 'app-load-games',
  templateUrl: './load-games.page.html',
  styleUrls: ['./load-games.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,TranslateModule]
})
export class LoadGamesPage implements OnInit {

  private translations: Translations;
  public matches: { [key: string]: MatchStats };
  constructor(private router: Router,private storageService: LocalStorageService,public matchService:MatchServiceService, private location: Location,private translate: TranslateService) { }

  ngOnInit() {
    debugger;
    this.matches = this.storageService.getItems("matches"); 
    this.translations = new Translations(this.translate.instant('PAREJA 1'),this.translate.instant('PAREJA 2'),this.translate.instant('DRIVE'),this.translate.instant('REVES'),this.translate.instant('PAREJA'));
  }
  getKeys(dictionary: { [key: string]: MatchStats }): string[] {
    return Object.keys(dictionary);
  }

  loadGame(key){
    let match = this.matches[key];
    let matchs = new MatchStats(this.translations,true,match);
    this.matchService.game = matchs;
    this.router.navigate(['/match-stats']);
  }
  goBack() {
    this.location.back(); 
  }

}
