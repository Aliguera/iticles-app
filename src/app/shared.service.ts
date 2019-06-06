import { Injectable } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private alertCtrl: AlertController,
              private loadingCtrl: LoadingController) { }

  // async presentAlert(messageVar): Promise<void> {
  //   const alert = this.alertCtrl.create({
  //     message:  messageVar,
  //     buttons: ['OK']
  //   });
  //   return await alert.present();
  // }

  // async presentLoading(): Promise<void> {
  //   const loadingElement = this.loadingCtrl.create({
  //     message: 'Creating article...',
  //     spinner: 'crescent'
  //   });
  //   return await loadingElement.present();
  // }
}
