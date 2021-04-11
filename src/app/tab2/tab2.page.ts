import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import {LoadingController, NavController} from '@ionic/angular';
import firebase from 'firebase';
import {firebaseConfig} from '../firebase.config';
import {FirebaseService} from '../services/firebase.service';
import {Food} from '../services/food';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private camera: Camera, public navCtrl: NavController,
              public loadingCtrl: LoadingController, public fireService: FirebaseService, public afs: AngularFirestore) {
    !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
    this.newFood = new class implements Food {
      calories: number;
      imgBase64: string;
      ingredients: string;
      name: string;
      userUID: string;
    };
  }

  public static loading;

  public newFood: Food;
  base64Show;
  public base64;

  takePhoto(){
    const camOptions: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
    };

    this.camera.getPicture(camOptions).then((imageData) => {
      this.base64Show = 'data:image/jpeg;base64,' + imageData;
      this.base64 = imageData;
    }, (err) => {
      console.log(err);
    });
  }

  // dataURLtoBlob(dataURL){
  //   let binary = atob(dataURL.split(',')[1]);
  //   let array = [];
  //   for (let i = 1; i < binary.length; i++) {
  //     array.push(binary.charCodeAt(i));
  //   }
  //   return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
  // }

  // async upload() {
  //   Tab2Page.loading = await this.loadingCtrl.create({
  //     message: 'uploading..'
  //   });
  //   await Tab2Page.loading.present();
  //   if (this.selectedPhoto){
  //     let uploadTask = firebase.storage().ref().child('myImage.jpg')
  //       .put(this.selectedPhoto);
  //     uploadTask.then(this.onSuccess, this.onError);
  //   }
  // }
  //

  async addToFirebase() {
    try {
      Tab2Page.loading = await this.loadingCtrl.create({
        message: 'uploading..'
      });
      await Tab2Page.loading.present();
      this.newFood.imgBase64 = this.base64;
      this.fireService.addFood(this.newFood).then(res => {
        Tab2Page.loading.dismiss();
      });
    } catch (err){
      console.log(err);
      Tab2Page.loading.dismiss();
    }
  }

  removePhoto(){
    this.base64Show = null;
  }

  nameKeyUp(event){
    this.newFood.name = event.target.value;
  }

  ingredientsKeyUp(event){
    this.newFood.ingredients = event.target.value;
  }

  caloriesKeyUp(event){
    this.newFood.calories = event.target.value;
  }
}

