import { IRec } from "./IRec";
import { IOpinion } from "./IOpinion";
export interface IDishes{
    name:string,
    cuisine:string,
    type:string,
    category:string,
    ingredients:string[],
    maxQuantity:number,
    price:number,
    description:string,
    imgs:string[],
    opinions:IOpinion[],
    id:string,
    rec:IRec[]
}