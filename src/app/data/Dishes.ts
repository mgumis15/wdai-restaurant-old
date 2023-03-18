// import {IDishes} from './IDishes'

// export const DISHES:IDishes[]=[
//     {
//         name:"Pierogi z mięsem",
//         cuisine:"polska",
//         type:"mięsna",
//         category:"danie główne",
//         ingredients:["mięso","mąka","cebula"],
//         maxQuantity:20,
//         price:22,
//         description:"Bardzo dobre pierogi z mięsem",
//         imgs:["https://cdn.pixabay.com/photo/2020/09/21/12/40/meal-5589923_960_720.jpg","https://cdn.pixabay.com/photo/2017/03/10/13/57/cooking-2132874_960_720.jpg","https://cdn.pixabay.com/photo/2018/05/29/00/49/dumplings-3437689_960_720.jpg"], 
//         score:0,
//         opinions:0,
//         id:0
//         ,rec:[]},
//     {
//         name:"Pierogi z kapustą",
//         cuisine:"polska",
//         type:"wegetariańska",
//         category:"danie główne",
//         ingredients:["kapusta","mąka","cebula"],
//         maxQuantity:12,
//         price:16,
//         description:"Bardzo dobre pierogi z kapustą",
//         imgs:["https://cdn.pixabay.com/photo/2017/03/10/13/57/cooking-2132874_960_720.jpg","https://cdn.pixabay.com/photo/2020/09/21/12/40/meal-5589923_960_720.jpg","https://cdn.pixabay.com/photo/2018/05/29/00/49/dumplings-3437689_960_720.jpg"]
//     , 
//     score:9,
//     opinions:2,
//     id:1,rec:[]},
//     {
//         name:"Pierogi ruskie",
//         cuisine:"polska",
//         type:"wegetariańska",
//         category:"danie główne",
//         ingredients:["ziemniaki","ser biały","mąka","cebula"],
//         maxQuantity:25,
//         price:20,
//         description:"Bardzo dobre pierogi ruskie",
//         imgs:["https://cdn.pixabay.com/photo/2018/05/29/00/49/dumplings-3437689_960_720.jpg","https://cdn.pixabay.com/photo/2020/09/21/12/40/meal-5589923_960_720.jpg","https://cdn.pixabay.com/photo/2017/03/10/13/57/cooking-2132874_960_720.jpg"]
//     ,
//     score:13,
//     opinions:3,
//     id:2
//     ,rec:[]},
//     {
//         name:"Zupa pomidorowa",
//         cuisine:"ukraińska",
//         type:"wegetariańska",
//         category:"zupa",
//         ingredients:["pomidory","cebula","marchew","ryż"],
//         maxQuantity:20,
//         price:10,
//         description:"Bardzo dobra zupa pomidorowa",
//         imgs:["https://cdn.pixabay.com/photo/2016/06/01/21/40/soup-1429793_960_720.jpg","https://cdn.pixabay.com/photo/2017/05/05/19/06/tomato-soup-2288056_960_720.jpg"]
//     , score:10, opinions:5,id:3,rec:[]},
//     {
//         name:"Zupa dyniowa",
//         cuisine:"francuska",
//         type:"wegetariańska",
//         category:"zupa",
//         ingredients:["dynia ","marchew","cebula"],
//         maxQuantity:10,
//         price:14,
//         description:"Bardzo dobra zupa dyniowa",
//         imgs:["https://cdn.pixabay.com/photo/2019/09/27/09/59/pumpkin-soup-4508015_960_720.jpg","https://cdn.pixabay.com/photo/2017/11/23/13/50/pumpkin-soup-2972858_960_720.jpg"]
//     , score:12, opinions:4,id:4,rec:[]},
//     {
//         name:"Rosół",
//         cuisine:"polska",
//         type:"mięsna",
//         category:"zupa",
//         ingredients:["mięso","marchew","cebula","pietruszka"],
//         maxQuantity:30,
//         price:12,
//         description:"Bardzo dobry rosół",
//         imgs:["https://cdn.pixabay.com/photo/2017/01/24/20/30/soup-2006317_960_720.jpg",
//     "https://cdn.pixabay.com/photo/2015/04/06/16/32/if-709614_960_720.jpg"]
//     , score:13, opinions:4,id:5,rec:[]},
//     {
//         name:"Stek jagnięcy",
//         cuisine:"arabska",
//         type:"mięsna",
//         category:"danie główne",
//         ingredients:["mięso jagnięce","cebula","smalec","bukiet surówek"],
//         maxQuantity:8,
//         price:35,
//         description:"Bardzo dobry kotlet jagnięcy",
//         imgs:["https://cdn.pixabay.com/photo/2017/03/23/19/57/asparagus-2169305_960_720.jpg","https://cdn.pixabay.com/photo/2016/03/05/23/02/barbecue-1239434_960_720.jpg"]
//     , score:0, opinions:0,id:6,rec:[]},
//     {
//         name:"Talerz serów",
//         cuisine:"międzynarodowa",
//         type:"serowy",
//         category:"przystawka",
//         ingredients:["ser podpuszczkowy","ser dojrzewajacy","figi"],
//         maxQuantity:10,
//         price:25,
//         description:"Bardzo dobre sery",
//         imgs:["https://cdn.pixabay.com/photo/2015/12/26/11/08/kaseplatte-1108564_960_720.jpg","https://cdn.pixabay.com/photo/2018/06/08/23/30/cheese-3463368_960_720.jpg","https://cdn.pixabay.com/photo/2016/01/18/16/20/cheeses-1146823_960_720.jpg"]
//     , score:0, opinions:0,id:7,rec:[]},
//     {
//         name:"Sernik",
//         cuisine:"polska",
//         type:"ciasto",
//         category:"deser",
//         ingredients:["ser","mąka","cukier"],
//         maxQuantity:15,
//         price:13,
//         description:"Bardzo dobry sernik",
//         imgs:["https://cdn.pixabay.com/photo/2016/03/27/22/38/cake-1284548_960_720.jpg"]
//     , score:0, opinions:0,id:8,rec:[]},
//     {
//         name:"Szarlotka",
//         cuisine:"polska",
//         type:"ciasto",
//         category:"deser",
//         ingredients:["jabłka","mąka","cukier","cynamon"],
//         maxQuantity:20,
//         price:10,
//         description:"Bardzo dobra szarlotka",
//         imgs:["https://cdn.pixabay.com/photo/2019/05/14/23/00/pie-4203785_960_720.jpg"]
//     , score:0, opinions:0,id:9,rec:[]},
//     {
//         name:"Babeczka",
//         cuisine:"międzynarodowa",
//         type:"ciasto",
//         category:"deser",
//         ingredients:["mąka","cukier","kakao"],
//         maxQuantity:30,
//         price:5,
//         description:"Bardzo dobra babeczka",
//         imgs:["https://cdn.pixabay.com/photo/2016/06/12/15/03/cupcakes-1452178_960_720.jpg","https://cdn.pixabay.com/photo/2017/05/04/21/23/cupcakes-2285209_960_720.jpg"]
// , 
// score:0,
// opinions:0,
// id:10
// ,rec:[]},
//     {
//         name:"Risotto",
//         cuisine:"włoska",
//         type:"wegetariańskie",
//         category:"danie główne",
//         ingredients:["ryż","oliwa","groszek"],
//         maxQuantity:20,
//         price:22,
//         description:"Bardzo dobre pierogi",
//         imgs:["https://cdn.pixabay.com/photo/2016/05/21/20/13/rice-1407379_960_720.jpg","https://cdn.pixabay.com/photo/2012/06/08/18/04/rice-ladle-49693_960_720.jpg"], score:0, 
//         opinions:0,
//         id:11,
//         rec:[]
//     }
// ]