import { Injectable } from '@angular/core';
import { IUser } from '../data/IUser';
import { auth } from 'firebase';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestore,AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router, UrlSegment } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import * as firebase from 'firebase';
import { map } from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users:Observable<any>;
  constructor(private fireStore: AngularFirestore,private afAuth:AngularFireAuth,private router:Router) {


    this.users=this.fireStore.collection('users').snapshotChanges().pipe(map((actions) => {
      return actions.map((data) => {
        const user = data.payload.doc.data() as IUser;
        user.uid  = data.payload.doc.id;
        return user;
      });
    }));

   }

   getUsers():Observable<any>{
    return this.users
   }
   banUser(uid:string,ban:boolean){
     this.fireStore.doc(`users/${uid}`).update({banned:ban})
   }
   updateRoles(uid:string,role:string){
    this.fireStore.doc(`users/${uid}`).update({role:role})
   }
}
