import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Food} from "../services/food";
import {FirebaseService} from "../services/firebase.service";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  constructor(public fireService: FirebaseService) {}
  public foods: Array<Food>;

  ngOnInit(): void {
    console.log(this.fireService.getFoods(''));
  }
}
