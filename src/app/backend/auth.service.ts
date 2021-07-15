import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<any>;

  constructor(
    private afAuth: AngularFireAuth
  ) {
    this.user$ = this.afAuth.authState;
  }

  async passwordLogin(password: string) {
    return await this.afAuth.signInWithEmailAndPassword("troop370Scout@gmail.com", password);
  }

  async adminLogin(password: string) {
    return await this.afAuth.signInWithEmailAndPassword("troop370Admin@gmail.com", password);
  }


  async logOut() {
    return await this.afAuth.signOut();
  }
}
