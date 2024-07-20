
document.getElementById("open").addEventListener("click", function(){
    document.querySelector(".ham").classList.add("active")
    document.querySelector(".navlinks").classList.add("active")
    document.getElementById("open").classList.add("active")
    document.getElementById("closee").classList.add("active")
})

document.getElementById("closee").addEventListener("click", function(){
    document.querySelector(".ham").classList.remove("active")
    document.querySelector(".navlinks").classList.remove("active")
    document.getElementById("open").classList.remove("active")
    document.getElementById("closee").classList.remove("active")
})


setInterval(function(){
    querySelector(".fade").true;
},10000)


function workabeg(){
    document.querySelector(".imgs").classList.add("active")
    rrrr++
}

document.getElementById("nn1").addEventListener("click", function(){
    
    workabeg() = rrrr;
})

document.getElementById("nn2").addEventListener("click", function(){

    document.querySelector("#radio1").classList.add("checked")
})