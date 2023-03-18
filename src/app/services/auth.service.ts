import { Injectable } from '@angular/core';
import { IUser } from '../data/IUser';
import { auth } from 'firebase';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestore,AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router, UrlSegment } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import * as firebase from 'firebase';
import { map } from "rxjs/operators";
import { KoszykDataService } from './koszyk-data.service';
import { IKoszyk } from '../data/IKoszyk';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userDataState:Observable<firebase.User>;
  userSub:Observable<any>;
  persistance:string;
  userInfo:any;
  uid:string;
  koszyk:Subscription;


  constructor(private fireStore: AngularFirestore,private afAuth:AngularFireAuth,private router:Router) {

    this.userDataState=this.afAuth.authState
    this.fireStore.doc(`options/qaiNhlxy5yLPpKjit8AB`).get().subscribe(data=>{
      const persistance=data.exists ? data.data().persistance:"SESSION"
      if(persistance=="SESSION")
      this.persistance=firebase.auth.Auth.Persistence.SESSION
      if(persistance=="LOCAL")
      this.persistance=firebase.auth.Auth.Persistence.LOCAL
      if(persistance=="NONE")
      this.persistance=firebase.auth.Auth.Persistence.NONE
    })
    this.userDataState.subscribe(data=>{

      if(data){
       this.uid=data.uid
        this.userSub=this.fireStore.doc(`users/${data.uid}`).get()
        this.userSub.subscribe((data) => {
          console.log("XD")
          this.userInfo = data.exists ? data.data() : null
          this.userInfo.uid=this.uid
          localStorage.setItem('user', JSON.stringify(this.userInfo));
        })

        
      }
      else {
        localStorage.setItem('user', null);
      }
    })
   

   }
   getUserData(){
     return this.userDataState
   }


   signInUser(email:string,password:string){
     
     this.afAuth.auth.setPersistence(this.persistance).then(()=>{
      this.afAuth.auth.signInWithEmailAndPassword(email,password)
      .then((res)=>{
       
        this.userSub=this.fireStore.doc(`users/${res.user.uid}`).get()
        this.userSub.subscribe((data) => {
          this.userInfo = data.exists ? data.data() : null
          this.userInfo.uid=res.user.uid
        })
        this.router.navigate(['/Home'])
      }).catch((error) => {
        console.log(error.message)
      })
     })
   }

   signUpUser(email:string,password:string,nick:string){
    this.afAuth.auth.createUserWithEmailAndPassword(email,password)
    .then((res)=>{
      this.router.navigate(['/Home'])
      this.fireStore.doc(`users/${res.user.uid}`).set({
      email:res.user.email,
      nick:nick,
      role:"client",
      banned:false
      })
    }).catch((error) => {
      console.log(error.message)
    })
   }
   signOut() {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.userInfo=null
      this.router.navigate(['/Home']);
    })
  }
  getUserInfo(uid : string) {
    return (this.fireStore.doc(`users/${uid}`).get())
  } 
  isLogged():boolean{
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null) ? true : false;
  }
  haveAccess(path:string):boolean{

    if(this.userInfo==null){
      return false
    }
    const role:string=this.userInfo.role
    if(path=="AdminView"&&role!="admin")return false
    if(path=="DishesManagment"&&(role!="admin"&&role!="manager"))return false
    if(path=="ShoppingCart"&&role!="client")return false
    if(path=="SingleDish"&&(role!="client"&&role!="admin"&&role!="manager"))return false
    return true


  }
  changePersistence(type:string){
    this.fireStore.doc(`options/qaiNhlxy5yLPpKjit8AB`).update({persistance:type})
  }
  getPersistence(){
    return this.fireStore.doc(`options/qaiNhlxy5yLPpKjit8AB`).get()
  }
  addOrder(koszyk:any){
    this.fireStore.doc(`users/${this.uid}`).update({orders: firebase.firestore.FieldValue.arrayUnion(koszyk)})
   
  }
}
