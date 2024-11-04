
document.getElementById("see").addEventListener("click", function(){
    window.location = "About.html"
})


// window.alert("jjjj")

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


// setInterval(function(){
//     querySelector(".fade").true;
// },10000)


// function workabeg(){
//     document.querySelector(".imgs").classList.add("active")
//     rrrr++
// }

// document.getElementById("nn1").addEventListener("click", function(){
    
//     workabeg() = rrrr;
// })

// document.getElementById("nn2").addEventListener("click", function(){

//     document.querySelector("#radio1").classList.add("checked")
// })

document.querySelector(".play").addEventListener("click", function(){
    // window.alert("kkkk")
    document.querySelector(".over").classList.add("active")
    document.querySelector(".popup").classList.add("active")
    document.querySelector("body").classList.add("active")
    document.getElementById("ul").classList.add("active")
    document.querySelector(".top").classList.add("active")
})


document.getElementById("overp").addEventListener("click", function(){
    // window.alert("kkkk")
    document.querySelector(".over").classList.remove("active")
    document.querySelector(".popup").classList.remove("active")
    document.querySelector("body").classList.remove("active")
    document.getElementById("ul").classList.remove("active")
    document.querySelector(".top").classList.remove("active")
})


document.getElementById("faqham").addEventListener("click", function(){
    // window.alert("kdkdkdk")
    document.getElementById("faqham").classList.add("active")
    document.getElementById("faqp").classList.add("active")
    document.getElementById("faqimg").classList.add("active")
    document.querySelector(".faqs").classList.add("active")
})


document.getElementById("faqp").addEventListener("click", function(){
    // window.alert("kdkdkdk")
    document.getElementById("faqham").classList.remove
    ("active")
    document.getElementById("faqp").classList.remove("active")
    document.getElementById("faqimg").classList.remove("active")
    document.querySelector(".faqs").classList.remove("active")
})



