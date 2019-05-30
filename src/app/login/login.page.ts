import { AngularFireAuth } from 'angularfire2/auth';
import { User } from './../../models/user';
import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user = {} as User;

  constructor(private afAuth: AngularFireAuth,
              private navCtrl: NavController,
              private alertCtrl: AlertController,
              private loadinCtrl: LoadingController) { }

  ngOnInit() {
  }

  async login(user: User) {
    const loadingElement = await this.loadinCtrl.create({
      message: 'Logging in...',
      spinner: 'crescent'
    });
    await loadingElement.present();
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      if (result) {
        loadingElement.dismiss();
        console.log('User: ', result);
        window.localStorage.setItem('TOKEN', result.user.refreshToken);
        this.navCtrl.navigateRoot('tabs');
      }
    } catch (e) {
      loadingElement.dismiss();
      this.presentAlert();
    }
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: 'Wrong email or password',
      buttons: ['OK']
    });
    await alert.present();
  }

}
