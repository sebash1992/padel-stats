import { Injectable } from '@angular/core';
import { MatchStats } from './models/matchStats';
import { ModalController } from '@ionic/angular';
import { Team } from './models/team';
import { LocalStorageService } from './local-storage.service';
import { TranslateService } from '@ngx-translate/core';
import { Translations } from './models/translations';

@Injectable({
  providedIn: 'root'
})
export class MatchServiceService {
  public game: MatchStats;
  private history: MatchStats[] = [];
  private translations: Translations;

  constructor(public modalCtrl: ModalController, private storageService: LocalStorageService, private translate: TranslateService) {
    this.translations = new Translations(this.translate.instant('PAREJA 1'), this.translate.instant('PAREJA 2'), this.translate.instant('DRIVE'), this.translate.instant('REVES'), this.translate.instant('PAREJA'));
  }


  public initializeMatch() {
    this.game = new MatchStats(this.translations, false);
  }

  public point(team: number) {
    debugger;
    const copy = structuredClone(this.game)
    this.history.push(copy);
    this.game.point(team);
    this.saveInLocalStorage();
  }

  public isServing(team: number) {
    return this.game.isServing(team);
  }
  public setService(team: number) {
    this.game.setService(team);
  }
  public addHistory() {
    const copy = structuredClone(this.game)
    this.history.push(copy);
  }

  public rollBackPoint() {
    if (this.history.length > 0) {
      ;
      var previousPoint = this.history.pop();
      console.log('Previo');
      console.log(JSON.stringify(this.game));
      this.game = new MatchStats(this.translations, false);

      this.game.team1 = new Team(this.translations, previousPoint.team1.isServing, previousPoint.team1);
      this.game.team2 = new Team(this.translations, previousPoint.team2.isServing, previousPoint.team2);
      this.game.currentSet = previousPoint.currentSet;
      this.game.setWinner = previousPoint.setWinner;
      this.game.thirdSetType = previousPoint.thirdSetType;

      this.saveInLocalStorage();
    }
  }


  public saveInLocalStorage() {
    this.storageService.setItem(this.game.id, this.game);

  }

}
