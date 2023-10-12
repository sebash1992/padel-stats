import { Component, OnInit } from '@angular/core';
import { ModalController,IonicModule} from '@ionic/angular';

@Component({
  selector: 'app-third-set-modal',
  templateUrl: './third-set-modal.component.html',
  styleUrls: ['./third-set-modal.component.scss'],
  standalone: true,
  imports:[IonicModule]
})
export class ThirdSetModalComponent  implements OnInit {

  public thirdSetSelection: number = 3;
  public status: string = "1";

  constructor(private modalCtrl: ModalController) {
  }

  confirm() {
    ;
    return this.modalCtrl.dismiss(this.thirdSetSelection,'confirm');
  }
  checkValue(e){
    this.thirdSetSelection = e.detail.value as number;
  }

  changeStatus(e){
  }

  ngOnInit() {}

}
