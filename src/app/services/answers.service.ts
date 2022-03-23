import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AnswersService {

  private auth_state: any = null;

  constructor(private firestore: AngularFirestore, private fireauth: AngularFireAuth) {
    this.fireauth.authState.subscribe((auth) => {
      this.auth_state = auth
      //console.log("auth state", this.auth_state)
    });
  }

  public anonymous_signin() {
    this.fireauth.signInAnonymously()
      .then((user) => {
        this.auth_state = user
      })
      .catch(error => console.log("Error signin", error));
  }

  public signout(){
    this.fireauth.signOut()
    .then(()=>{
      this.anonymous_signin()
    });
  }

  public get_uid() {
    return this.auth_state.uid
  }

  public save_country(data:any) {
    return this.firestore.collection('answers').doc(this.get_uid()).set({
      country: data,
      date: new Date()
    })
      .then(() => {
        console.log("Country successfully written!");
      })
      .catch((error) => {
        console.error("Error saving country: ", error);
      });
  }

  public save_answers(answers: any, results:any) {
    return this.firestore.collection('answers').doc(this.get_uid()).update({
      answers: answers,
      result: results
    })
    .then(() => {
      console.log("Answers successfully written!");
    })
    .catch((error) => {
      console.error("Error saving answers: ", error);
    });
  }

}
