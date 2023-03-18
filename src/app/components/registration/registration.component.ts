import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { ActivatedRoute } from '@angular/router';
import { passwordValidatior } from 'src/app/data/passwordValidator';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  loginForm! : FormGroup;
  displayErrors:string="";
  constructor(private formBuilder:FormBuilder,private route:ActivatedRoute,private authService:AuthService) { }

  ngOnInit() {
    this.loginForm=this.formBuilder.group({
      nick:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      pass:['',[Validators.required]],
      passConfirm:['',[Validators.required]]
    },{validators:passwordValidatior});
  }
  errors={
    nick:{
      required:false
    },
    email:{
      required:false,
      email:false
    },
    pass:{
      required:false
    },
    passConfirm:{
      required:false,
      identityRevealed:false
    }
  }

  validationMessages ={
    nick:{
      required:'Nick jest wymagany<br>'
    },
    email:{
      required:'E-mail jest wymagany<br>',
      email:'Niepoprawny e-mail<br>'
    },
    pass:{
      required:'Podaj hasło<br>'
    },
    passConfirm:{
      identityRevealed:'Hasła nie są identyczne<br>'
    }
  }
  onSubmit(form:any):void{
    if(this.onValidation()){
      this.authService.signUpUser(form.value.email,form.value.pass,form.value.nick)
      // form.reset()
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
    if(form.value.pass!=form.value.passConfirm){
      this.displayErrors+=this.validationMessages.passConfirm.identityRevealed
      valid=false
    }
    
    return valid
  }

}
