
import { Pipe,PipeTransform } from '@angular/core';
@Pipe({ name: 'currencyPipe' })
export class currencyPipe implements PipeTransform {
transform( price:number, currency:boolean): number{
if(currency){
  return Math.floor(price*(1/3.5)*100)/100
}else{
  return Math.floor(price*(1/4.5)*100)/100
}
}}