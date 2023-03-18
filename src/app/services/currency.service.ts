import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private currency=new BehaviorSubject<boolean>(true);
  constructor() { }

  changeCurrency(){
    this.currency.next(!this.currency.getValue())
  }

  getCurrency():Observable<boolean>{
    return this.currency.asObservable()
  }
}
