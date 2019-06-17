import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth) {}

  doRegister(value) {
    firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
    .then(res => {
       return res;
    }).catch((error) => {
      return error;
    });
  }

  doLogin(value) {
    firebase.auth().signInWithEmailAndPassword(value.email, value.password)
    .then(res => {
      return res;
    }).catch((error) => {
      return error;
    });
  }

	doLogout() {
    this.afAuth.auth.signOut()
    .then((res) => {
      return res;
    }).catch((error) => {
      return error;
    });
  }

  getUser() {
    return this.afAuth.auth.currentUser;
  }
}
