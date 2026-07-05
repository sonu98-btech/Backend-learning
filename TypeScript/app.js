"use strict";
// interface User{
//     name:string,
//     email:string,
// }
// function abcd(obj:User){
//     console.log(obj)
// }
// abcd({name:"sonu",email:"okkokkk"})
// type sonu = number|string|null
// function abcd( obj:sonu):void{
//     console.log(obj)
// }
// abcd("okokokookoko")
// Classes and Objects 
// class songMaker{
//     constructor(public name:string,public artist:string,public duration:number,public album:boolean=true){    }
// }
// const b1 = new songMaker("Kon aaya wapas","Krsna", 2000)
// console.log(b1)
class songMaker {
    name;
    artist;
    duration;
    album;
    constructor(name, artist, duration, album = true) {
        this.name = name;
        this.artist = artist;
        this.duration = duration;
        this.album = album;
        this.name = name,
            this.artist = artist,
            this.duration = duration,
            this.album = album;
    }
}
const b1 = new songMaker("Kon aaya wapas", "Krsna", 2000);
console.log(b1);
