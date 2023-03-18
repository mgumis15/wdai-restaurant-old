import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm! : FormGroup;
  displayErrors:string="";
  constructor(private formBuilder:FormBuilder,private route:ActivatedRoute,private auth:AuthService) { }

  ngOnInit() {
    this.loginForm=this.formBuilder.group({
      email:['',[Validators.required]],
      pass:['',[Validators.required]]
    });
  }
  errors={
    email:{
      required:false,

    },
    pass:{
      required:false
    }
  }

  validationMessages ={
    email:{
      required:'E-mail jest wymagany<br>'
    },
    pass:{
      required:'Podaj hasło<br>'
    }
  }
  onSubmit(form:any):void{
    if(this.onValidation()){
      this.auth.signInUser(form.value.email,form.value.pass)
      form.reset()
    }
  }
  onValidation():boolean{
    this.displayErrors=""
    let form=this.loginForm
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
