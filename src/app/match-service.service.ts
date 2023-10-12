import { Injectable } from '@angular/core';
import { MatchStats } from './models/matchStats';
import { ModalController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MatchServiceService {
  public game: MatchStats;
  constructor(public modalCtrl: ModalController) { }

  public initializeMatch(){
    this.game = new MatchStats(this.modalCtrl);
  }
}
