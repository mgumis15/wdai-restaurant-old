import { Component, OnInit,Input,Output,EventEmitter,Pipe,PipeTransform } from '@angular/core';
import {IDishes} from '../../data/IDishes'
import { IKoszyk } from 'src/app/data/IKoszyk';
import { KoszykDataService } from 'src/app/services/koszyk-data.service';
import { DishesService } from 'src/app/services/dishes.service';
import { currencyPipe } from '../../data/currencyPipe';
import { CurrencyService } from 'src/app/services/currency.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.css']
})

export class DishComponent implements OnInit {
  @Input() dish!:IDishes
  currencyType!:boolean
  @Input() maxValue!:number
  @Input() minValue!:number
  editMode:boolean=false
  isLogged:boolean;
  counter:number=0;
  specialAccess:boolean=false;
  canModify:boolean=false;

  constructor(private koszykService:KoszykDataService,private currencyService:CurrencyService,private dishesService:DishesService,private router:Router,private authService:AuthService) {

    this.authService.getUserData().subscribe(data=>{
      if(data!==null){
        this.authService.getUserInfo(data.uid).subscribe(user=>{
          const role = user.exists ? user.data().role : null
          if((role=="manager" ||  role=="admin" )){
            this.specialAccess=true
            if(this.router.url=="/DishesManagment"){
              this.canModify=true
            }

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
    this.currencyService.getCurrency().subscribe(data=>this.currencyType=data)
    this.koszykService.getKoszyk().subscribe(data=>{
      for (const iterator of data) {
        if (this.dish.id==iterator.id){
          this.counter=iterator.quantity
        }
      }
    })

  }

  onPlusClick(){
    if(this.counter<this.dish.maxQuantity){
      this.counter+=1      
    }
    this.updateKoszyk()
  }
  onMinusClick(){
    if(this.counter>0){
      this.counter-=1
    }
      this.updateKoszyk()
  }
  updateKoszyk(){
    let obj:IKoszyk={
      name:this.dish.name,
      quantity:this.counter,
      price:this.dish.price,
      id:this.dish.id
    }
    this.koszykService.updateKoszyk(obj)
  }
  onDelete(e:any){
    this.counter=0
    this.updateKoszyk()
    this.dishesService.removeDish(this.dish.id)
  }
  onChooseDish(e:any){
   if( this.router.url=="/Menu"){
     this.router.navigate(['/SingleDish',this.dish.id])
   }
    
    
  }
  onEdit(e:any){
    this.editMode=!this.editMode
  }
  
}
