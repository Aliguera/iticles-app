import { NavController } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from './../../models/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user = {} as User;

  constructor(private afAuth: AngularFireAuth, private navCtrl: NavController) { }

  ngOnInit() {
  }

  async register(user: User) {
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
      this.navCtrl.navigateRoot('login');
    } catch (e) {
      console.log(e);
    }
  }

}
