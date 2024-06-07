import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MatchServiceService } from '../match-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.page.html',
  styleUrls: ['./new-game.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class NewGamePage implements OnInit {

  public t1Drive:string="";
  public t1Reves:string="";
  public t2Drive:string="";
  public t2Reves:string="";
  public definitionWhenTie:string="oro";
  public definitionSet:string="3";
  constructor(public matchService:MatchServiceService,private router: Router,private location: Location,) { }

  ngOnInit() {
  }
  createNewGame(){
    this.matchService.initializeMatch();
    this.matchService.game.thirdSetType = +this.definitionSet;
    if(this.t1Drive!== "")this.matchService.game.team1.drive.name = this.t1Drive;
    if(this.t1Reves!== "")this.matchService.game.team1.reves.name = this.t1Reves;
    if(this.t2Drive!== "")this.matchService.game.team2.drive.name = this.t2Drive;
    if(this.t2Reves!== "")this.matchService.game.team2.reves.name = this.t2Reves;
    this.router.navigate(['/match'])
  }

  goBack(){
    this.location.back();
  }

}
