import { Component, OnInit, Input,Output,EventEmitter} from '@angular/core';
import { IDishes } from 'src/app/data/IDishes';
import { DishesService } from 'src/app/services/dishes.service';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit {
  @Input() activate!:boolean;
  // @Input() id!:string;
  @Input() dish!:IDishes;
  // dish!:IDishes;
  choosenRate:number=0;
  hooverRate:number=0;
  notDone:boolean=true;
  rate:number=0;
  uid:string;
  constructor(private dishesService:DishesService,private authService:AuthService) { 
      this.authService.getUserData().subscribe(data=>{
        if(data){
          this.uid=data.uid
          for (const iterator of this.dish.opinions) {
            if(iterator.uid=data.uid){
              this.activate=false
            }
          }
        }else{
          this.activate=false
        }
        
      })
  }

  ngOnInit(): void {
    for (const iterator of this.dish.opinions) {
      this.rate+=iterator.score
    }
    this.rate=(this.dish.opinions.length>0)?parseFloat((this.rate/this.dish.opinions.length).toFixed(2)):0
  }
  onClick(e:any,star:any){
    if(this.activate){
      if(this.notDone){
        this.choosenRate=star
        this.rate+=this.choosenRate
        this.dishesService.addScore(this.rate,this.uid,this.dish.id)
        
        
      }
      this.notDone=false
      this.activate=false
    }
  }
  onEnter(e:any,star:any){
    if(this.notDone){
    if(this.activate)this.hooverRate=star;
    }
  }
  onLeave(e:any){
    if(this.activate)this.hooverRate=0;
  }
}
