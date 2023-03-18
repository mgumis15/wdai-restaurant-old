import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
// import { DISHES } from '../data/Dishes';
import { IDishes } from '../data/IDishes';
import { IRec } from '../data/IRec';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from "rxjs/operators";
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class DishesService {
  private dishes=new Observable<IDishes[]>();
  constructor(private fireStore: AngularFirestore) { 

    this.dishes=this.fireStore.collection("dishes").snapshotChanges().pipe(map((actions) => {
      return actions.map((data) => {
        const dish = data.payload.doc.data() as IDishes;
        dish.id  = data.payload.doc.id;
        return dish;
      });
    }));
  }
  getDishes():Observable<IDishes[]>{
    return this.dishes
  }
  removeDish(id:string){
    this.fireStore.collection("dishes").doc(id).delete()
  }
  addDish(dish:any){
    this.fireStore.collection("dishes").add({
      name:dish.name,
      category:dish.category,
      cuisine:dish.cuisine,
      type:dish.type,
      ingredients:dish.ingredients,
      maxQuantity:dish.maxQuantity,
      price:dish.price,
      description:dish.description,
      imgs:dish.imgs,
      opinions:[],
      rec:[]
    })

  }
  updateDish(id:string,dish:any){
    this.fireStore.collection("dishes").doc(id).update({
      name:dish.name,
      category:dish.category,
      cuisine:dish.cuisine,
      type:dish.type,
      ingredients:dish.ingredients,
      maxQuantity:dish.maxQuantity,
      price:dish.price,
      description:dish.description,
      imgs:dish.imgs
    })

  }
  addScore(e:number,uid:string,id:string){
    this.fireStore
    .collection("dishes")
    .doc(id)
    .update({opinions: firebase.firestore.FieldValue.arrayUnion({uid:uid,score:e})});

  }
  addRec(rec:IRec[],id:string){
    console.log(rec)
    this.fireStore
    .collection("dishes")
    .doc(id)
    .update({ rec:rec}).catch((er)=>{console.log(er)});
  }
  
}
