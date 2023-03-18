import { Component, OnInit } from '@angular/core';
import { DishesService } from 'src/app/services/dishes.service';
import { ActivatedRoute } from '@angular/router';
import { IDishes } from 'src/app/data/IDishes';
import { CurrencyService } from 'src/app/services/currency.service';
import { IKoszyk } from 'src/app/data/IKoszyk';
import { KoszykDataService } from 'src/app/services/koszyk-data.service';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { AuthService } from 'src/app/services/auth.service';
import { IRec } from 'src/app/data/IRec';
@Component({
  selector: 'app-single-dish',
  templateUrl: './single-dish.component.html',
  styleUrls: ['./single-dish.component.css']
})
export class SingleDishComponent implements OnInit {
  id!:string;
  dish!:IDishes;
  currencyType!:boolean;
  counter:number=0;
  canComment:boolean;
  canRate:boolean=false;
  currentInd:number=0;
  sliderPoition:string[]=[];
  recForm! : FormGroup
  displayErrors:string="";
  name:string;
  uid:string="";
  canModify:boolean=false;
  constructor(private dishesService:DishesService,private route:ActivatedRoute,private currencyService:CurrencyService,private koszykService:KoszykDataService,private formBuilder:FormBuilder,private authService:AuthService) { 

    this.currencyService.getCurrency().subscribe(data=>this.currencyType=data)
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.dishesService.getDishes().subscribe(data=>{
        if(data){
        for (const iterator of data) {
          if(iterator.id==this.id){
            this.dish=iterator
              this.authService.getUserData().subscribe(data=>{
                this.authService.getUserInfo(data.uid).subscribe(user=>{
                  
                  this.name=user.exists ? user.data().nick : null
                   this.uid=data.uid
                   const role=user.exists ? user.data().role : null
                   const orders=user.exists ? user.data().orders : []
                   const banned=user.exists ? user.data().banned : null
                   if(role=="manager"||role=="admin"){
                    this.canComment=true
                    this.canModify=true
                    this.canRate=false
                  }
                  else{
                    
                    for (const iterator of orders) {
                      Object.entries(iterator).forEach(order => {
                        const ord=order[1] as IKoszyk                      
                        if(ord.id==this.id){
                          this.canComment=true
                          this.canRate=true
                        }
                      })
                      }
                      for (const iterator of this.dish.rec) {
                        if(iterator.uid==this.uid){
                          console.log(true)
                          this.canComment=false
                        }
                      }
                      for (const iterator of this.dish.opinions) {
            
                        if(iterator.uid==this.uid){
                            this.canRate=false
                        }
                      }
        
                        if(role!="client")this.canRate=false
                        if(banned){
                          this.canRate=false
                          this.canComment=false
                        }
                  }
                })
              })
            
             
      
            this.koszykService.getKoszyk().subscribe(data=>{
              for (const iterator of data) {
                if (this.dish.id==iterator.id){
                  this.counter=iterator.quantity
                }
              }
            })
            for(let i=0;i<this.dish.imgs.length;i++){
              this.sliderPoition.push((100*i)+"%")
            }
            break
          }
        }
        }})
    });
   
  }

  ngOnInit(): void {
    
   

  
 this.recForm=this.formBuilder.group({
      nazwa:['',[Validators.required]],
      body:['',[Validators.required,Validators.minLength(50),Validators.maxLength(500)]],
      date:[''],
    });
  }
  errors={
    nazwa:{
      required:false
    },
    body:{
      required:false,
      min:false,
      max:false
    }
  }
  validationMessages ={
    nazwa:{
      required:'Nazwa jest wymagana<br>'
    },
    body:{
      required:'Treść jest wymagana<br>',
      min:'Recenzja musi zawierać min. 50 znaków<br>',
      max:'Recenzja może zawierać max. 500 znaków<br>'
    }
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

  onLeftArrow(e:any){
   
    this.currentInd-=1;
    let len=this.dish.imgs.length
    if(this.currentInd<0)this.currentInd=len-1
    for(let i=0;i<this.dish.imgs.length;i++){
      this.sliderPoition[i]=(i-this.currentInd)*100+"%"
    }
  }
  onRightArrow(e:any){
    this.currentInd+=1;
    let len=this.dish.imgs.length
    if(this.currentInd==len)this.currentInd=0
    for(let i=0;i<this.dish.imgs.length;i++){
      this.sliderPoition[i]=(i-this.currentInd)*100+"%"
    }
  }
  onSubmit(form:any):void{
    if(this.onValidation()){
      if(this.uid){
        const newRec:IRec={
          nick:this.name,
          nazwa:form.value.nazwa,
          body:form.value.body,
          date:form.value.date,
          uid:this.uid
        }
        this.dish.rec.push(newRec)
        console.log(this.dish.rec)
        this.dishesService.addRec(this.dish.rec,this.dish.id)
        form.reset()
      }
      
    }
  }
  onValidation():boolean{
    this.displayErrors=""
    let form=this.recForm
    let valid=true
    for (const [key, value] of Object.entries(this.validationMessages)) {
      if(!form.controls[key].valid){
        valid=false
        for (const [key, text] of Object.entries(value)) {
          this.displayErrors+=text
        }
      }
    }
    return valid
  }
}
