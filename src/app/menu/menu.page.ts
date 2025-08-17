import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, TranslateModule]
})
export class MenuPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  newGame(){
    this.router.navigate(['/new-game'])
  }
  loadGames(){
    this.router.navigate(['/load-games'])
  }

}
