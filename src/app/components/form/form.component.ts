import { Component, OnInit,Input, NgModule } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { IDishes } from 'src/app/data/IDishes';
import { DishesService } from 'src/app/services/dishes.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  
})

export class FormComponent implements OnInit {

  dishForm! : FormGroup
  displayErrors:string="";
  constructor(private formBuilder:FormBuilder,private dihsesService:DishesService) {
   }
   errors={
    name:{
      required:false
    },
    cuisine:{
      required:false
    },
    type:{
      required:false
    },
    category:{
      required:false
    },
    ingredients:{
      required:false
    },
    price:{
      required:false,
      min:false
    },
    maxQuantity:{
      required:false,
      min:false
      
    },
    imgs:{
      required:false,
      pattern:false
    }
   }
   private validationMessages ={
  name:{
    required:'Pole nazwa jest wymagane<br>'
  },
  cuisine:{
    required:'Pole kuchnia jest wymagane<br>'
  },
  type:{
    required:'Pole typ jest wymagane<br>'
  },
  category:{
    required:'Pole kategoria jest wymagane<br>'
  },
  ingredients:{
    required:'Pole składniki jest wymagane<br>'
  },
  price:{
    required:'Pole cena jest wymagane<br>',
    min:'Cena nie może być tak mała<br>'
  },
  maxQuantity:{
    required:'Pole ilość jest wymagane<br>',
    min:'Ilość nie może być tak mała<br>'
    
  },
  imgs:{
    required:'Pole zdjęcie jest wymagane<br>',
    pattern:'Podaj poprawny adres<br>'
  }
  }
  ngOnInit(): void {
    this.dishForm=this.formBuilder.group({
      name:['Hamburger',[Validators.required]],
      cuisine:['amerykańska',[Validators.required]],
      type:['mięsna',[Validators.required]],
      category:['danie główne',[Validators.required]],
      ingredients:['mięso chleb pomidor',[Validators.required]],
      price:['20',[Validators.required,Validators.min(1)]],
      maxQuantity:['20',[Validators.required,Validators.min(1)]],
      description:['Dobry'],
      imgs:['https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_960_720.jpg',[Validators.required,Validators.pattern("(https?:\/\/.*\.(?:png|jpg))")]]
    });
    // this.dishForm.valueChanges.debounceTime(1000).subscribe((value:any) => {
    //   this.onValidation();
    // });
    
  }
onSubmit(form:any):void{
  if(this.onValidation()){
    let value=form.value;
    value.ingredients=value.ingredients.split(" ")
    value.imgs=value.imgs.split(" ")
    this.dihsesService.addDish(form.value)
    form.reset()
  }
  
}
onValidation():boolean{
  this.displayErrors=""
    let form=this.dishForm
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
