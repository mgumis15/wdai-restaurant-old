import { Component, OnInit } from '@angular/core';
import { DishesService } from 'src/app/services/dishes.service';
import { IDishes } from 'src/app/data/IDishes';
import { IKoszyk } from 'src/app/data/IKoszyk';
import { KoszykDataService } from 'src/app/services/koszyk-data.service';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  dishes:IDishes[]=[];
  koszyk:IKoszyk[]=[];
  counter:number=0;
  maxValue!:number;
  minValue:number=0;
  p:number=1;
  perPage:number=5;
  isLogged:boolean;
  canModify:boolean=false;
  constructor(private dishesService:DishesService,private koszykService:KoszykDataService,private authService:AuthService) {
    this.authService.getUserData().subscribe(data=>{

      if(data!==null){
        this.authService.getUserInfo(data.uid).subscribe(user=>{
          const role = user.exists ? user.data().role : null
          if(role=="manager" ||  role=="admin"){
          this.canModify=true
        }
        this.isLogged=true
      })
      }
      else {
        this.isLogged=false

      }
    })
   }

  ngOnInit(): void {
    this.dishesService.getDishes().subscribe(data=>{
      this.dishes=data
      this.getMinMax()
    });
    this.koszykService.getKoszyk().subscribe(data=>{
      this.counter=0
      for (const iterator of data) {
        this.counter+=iterator.quantity
      }
    })
    
  }
  getMinMax(){
    this.minValue=this.dishes.reduce((x,y)=>{
      if (x.price>=y.price) return y
      else return x
    }).price
    this.maxValue=this.dishes.reduce((x,y)=>{
      if (x.price>=y.price) return x
      else return y
    }).price
  }
  onSelect(e:any){
    this.perPage=e.target.value
  }
}
