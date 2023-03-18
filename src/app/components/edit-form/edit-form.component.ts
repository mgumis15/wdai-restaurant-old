import { Component, OnInit,Input, NgModule } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { IDishes } from 'src/app/data/IDishes';
import { DishesService } from 'src/app/services/dishes.service';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent implements OnInit {

  @Input() dish:IDishes
  editForm! : FormGroup
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
    let oldImgs=""
    for (const iterator of this.dish.imgs) {
      oldImgs+=iterator
      oldImgs+=" "
    }
    oldImgs.trim()
    this.editForm=this.formBuilder.group({
      name:[this.dish.name,[Validators.required]],
      cuisine:[this.dish.cuisine,[Validators.required]],
      type:[this.dish.type,[Validators.required]],
      category:[this.dish.category,[Validators.required]],
      ingredients:[this.dish.ingredients,[Validators.required]],
      price:[this.dish.price,[Validators.required,Validators.min(1)]],
      maxQuantity:[this.dish.maxQuantity,[Validators.required,Validators.min(1)]],
      description:[this.dish.description],
      imgs:[oldImgs,[Validators.required,Validators.pattern("(https?:\/\/.*\.(?:png|jpg))")]]
    });
    
  }
onSubmit(form:any):void{
  console.log(this.dish.id)
  if(this.onValidation()){
    let value=form.value;
    value.ingredients=value.ingredients.split(" ")
    value.imgs=value.imgs.split(" ")
    this.dihsesService.updateDish(this.dish.id,form.value)
    form.reset()
  };
 
}
onValidation():boolean{
  this.displayErrors=""
    let form=this.editForm
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
