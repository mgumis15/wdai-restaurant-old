import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {
  persistance:string;
  users:any=[]
  myUid:string;
  constructor(private authService:AuthService,private usersService:UsersService) { 
    
    this.authService.getPersistence().subscribe(data=>{
      this.persistance = data.exists ? data.data().persistance : "SESSION"
    })
    this.authService.getUserData().subscribe(data=>{
      if(data){
          this.myUid=data.uid
      }
    })
    this.usersService.getUsers().subscribe(data=>{

      if(data){
        this.users=data

      }

    })
  }
  ngOnInit() {
  }
  onSelectPersistence(e:any){    
    this.authService.changePersistence(e.target.value)
  }
  onBan(e:any){
    this.usersService.banUser(e.target.value,e.target.checked)
  }
  onAdmin(e:any){
    const uid=e.target.value

    if(e.target.checked){
      this.usersService.updateRoles(uid,"admin")
    }else{
      this.usersService.updateRoles(uid,"manager")
    }

  }
  onManager(e:any){
    const uid=e.target.value
    if(e.target.checked){
      this.usersService.updateRoles(uid,"manager")
    }else{
      this.usersService.updateRoles(uid,"client")
    }
  }
}
