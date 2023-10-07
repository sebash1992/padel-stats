import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular'; 

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
  standalone: true,
  imports:[IonicModule]
})
export class CounterComponent  implements OnInit {
  public counter: number;

  constructor() { 
    this.counter = 0;}

  ngOnInit() {}

  onAdd() {
    this.counter++;
  }
  onMinus() {
    if(this.counter>0) this.counter--;
  }

}
