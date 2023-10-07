import { Component, OnInit } from '@angular/core';
import { CommonModule,Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-match-stats',
  templateUrl: './match-stats.page.html',
  styleUrls: ['./match-stats.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class MatchStatsPage implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

  myBackButton(){
    this.location.back();
  }

}
