import { Component, OnInit,Input } from '@angular/core';
import { IonicModule } from '@ionic/angular'; 

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
  standalone: true,
  imports:[IonicModule]
})
export class CounterComponent  implements OnInit {
  @Input() counter: number;

  constructor() { }

  ngOnInit() {}

  onAdd() {
    this.counter++;
  }
  onMinus() {
    if(this.counter>0) this.counter--;
  }

}
