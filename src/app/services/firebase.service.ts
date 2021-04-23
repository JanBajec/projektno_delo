import { Injectable } from '@angular/core';
import firebase from 'firebase';
import {AngularFirestore} from '@angular/fire/firestore';
import {Food} from './food';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public afs: AngularFirestore) { }

  searchFoods: Food[] = [];

  addFoodFire(value: Food){
    let currentUser = firebase.auth().currentUser.uid;
    return this.afs.collection('foods').add({
      userUID: currentUser,
      name: value.name,
      ingredients: value.ingredients,
      calories: value.calories,
      imgBase64: value.imgBase64
    });
  }

  getFoodsFire(search: string): Observable<Food[]> {
    if (search === undefined || search === null || search === '') {
      return this.afs.collection<Food>('foods').valueChanges();
    }else{
      return this.afs.collection<Food>('foods', ref => ref
        .where('name', '==', search)).valueChanges();
    }
  }

  getFoodsUserFire(user: string): Observable<Food[]>{
    return this.afs.collection<Food>('foods', ref => ref
      .where('userUID', '==', user)).valueChanges();
  }
}
