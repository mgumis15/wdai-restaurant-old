import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable } from 'rxjs';
import { IKoszyk } from '../data/IKoszyk';
import { AuthService } from './auth.service';
BehaviorSubject
@Injectable({
  providedIn: 'root'
})

export class KoszykDataService {
  private koszyk=new BehaviorSubject<IKoszyk[]>([]);
  constructor(private authService:AuthService) {
   }
  getKoszyk():Observable<IKoszyk[]>{
    return this.koszyk.asObservable()
  }

  updateKoszyk(e:IKoszyk){
    let isIn:boolean=false;
    let current=this.koszyk.getValue()
    for (const obj of current) {
      if(obj.name==e.name){
        obj.quantity=e.quantity
        isIn=true
      }
    }
    if(!isIn)current.push(e)
    current.filter((obj)=>{
      return obj.quantity!=0
    })
    console.log(current)

    this.koszyk.next(current)

  }

  order(){
    
    this.authService.addOrder(Object.assign({},this.koszyk.getValue()))
    this.koszyk.next([])
  }
}
