import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Food} from '../services/food';
import {FirebaseService} from '../services/firebase.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  constructor(public fireService: FirebaseService) {}
  public foods: Array<Food>;

  myInput: string;
  searchFoods: Food[] = [];

  ngOnInit(): void {
    this.fireService.getFoodsFire('').subscribe(value => {
      this.searchFoods = value;
      this.correctBase64();
    });
  }

  onInput(){
    this.fireService.getFoodsFire(this.myInput).subscribe(value => {
      this.searchFoods = value;
      this.correctBase64();
    });
  }

  correctBase64(){
    this.searchFoods.forEach(value => {
      value.imgBase64 = 'data:image/jpeg;base64,' + value.imgBase64;
    });
  }
}
