import { Component, OnInit } from '@angular/core';
import {CounterComponent} from '../counter/counter.component'
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-player-stats',
  templateUrl: './player-stats.component.html',
  styleUrls: ['./player-stats.component.scss'],
  standalone: true,
  imports: [IonicModule,CounterComponent]
})
export class PlayerStatsComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
