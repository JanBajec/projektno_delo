import { Injectable } from '@angular/core';
import firebase from 'firebase';
import {AngularFirestore} from '@angular/fire/firestore';
import {Food} from './food';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public afs: AngularFirestore) { }

  addFood(value: Food){
    let currentUser = firebase.auth().currentUser.uid;
    return this.afs.collection('foods').add({
      userUID: currentUser,
      name: value.name,
      ingredients: value.ingredients,
      calories: value.calories,
      imgBase64: value.imgBase64
    });
  }


}
