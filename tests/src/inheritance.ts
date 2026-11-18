

class car{
    car(){
        console.log("car access")
        let name='Hello hari';
        let reverse:string='';
         for(let i=0;i<name.length;i++){
        reverse=name[i]+reverse;
         }
         console.log(reverse)
    }


    van(){
 let name='Palani Hari';
 let reverse='';
 for (let i=0;i<name.length;i++){
    reverse=  name[i]+reverse;
 }
 console.log(reverse);
    }
}

class speed extends car{
    speed(speed:number):number{
      return  speed;
    }

}
const obj=new speed();
console.log(obj.speed(20));
obj.car();
obj.van();



