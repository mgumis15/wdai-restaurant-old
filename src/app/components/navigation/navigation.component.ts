import { Component, OnInit } from '@angular/core';
import { CurrencyService } from 'src/app/services/currency.service';
import { AuthService } from 'src/app/services/auth.service';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  userData:firebase.User
  isLogged:boolean=false;
  nick:string="";
  nickO:Subscription;

  constructor(private currencyService:CurrencyService,private authService:AuthService,private router:Router) { 
    this.authService.getUserData().subscribe(data=>{this.userData=data
      if(this.userData!==null){
       this.nickO= this.authService.getUserInfo(this.userData.uid).subscribe(
          (data) => {
            this.nick = data.exists ? data.data().nick : ""
          }
        )
        this.isLogged=true
        
      }
      else {
        this.isLogged=false
        if(this.nickO)this.nickO.unsubscribe()
        this.nick=""
      }
    })
    
  }

  ngOnInit(): void {
  }
  signOut(e:any){
    this.authService.signOut()
  }
  switchCurrency(){
    this.currencyService.changeCurrency()
  }
}
