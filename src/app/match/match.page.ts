import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {PlayerStatsComponent} from '../player-stats/player-stats.component'
import {MatchStats} from '../models/matchStats'

@Component({
  selector: 'app-match',
  templateUrl: './match.page.html',
  styleUrls: ['./match.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,PlayerStatsComponent]
})
export class MatchPage implements OnInit {
  public modalName: number;
  public game: MatchStats;
  constructor() {
    this.modalName = 0;
    this.game = new MatchStats();
   }

  ngOnInit() {
  }
}
