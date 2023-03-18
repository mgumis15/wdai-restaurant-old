import { Component, OnInit ,Input} from '@angular/core';
import { KoszykDataService } from 'src/app/services/koszyk-data.service';
import { IKoszyk } from 'src/app/data/IKoszyk';
import { CurrencyService } from 'src/app/services/currency.service';
@Component({
  selector: 'app-koszyk',
  templateUrl: './koszyk.component.html',
  styleUrls: ['./koszyk.component.css']
})
export class KoszykComponent implements OnInit {
  currencyType!:boolean;
  koszyk:IKoszyk[]=[];
  sum:number=0;
  constructor(private koszykService:KoszykDataService,private currencyService:CurrencyService) {
}

  ngOnInit(): void {
    this.currencyService.getCurrency().subscribe(data=>this.currencyType=data)
    this.koszykService.getKoszyk().subscribe(data=>{
      this.koszyk=data
      this.sum=0
      for (const iterator of data) {
        this.sum+=iterator.price*iterator.quantity
      }
    })
  }
  onOrder(){
      this.koszykService.order()
  }

}
