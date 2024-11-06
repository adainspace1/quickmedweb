document.getElementById("open").addEventListener("click", function(){
    // window.alert("kkk")
    document.getElementById("open").classList.add("active")
    document.getElementById("closee").classList.add("active")
    document.querySelector(".navlinks").classList.add("active")
    document.querySelector(".ham").classList.add("active")
})



document.getElementById("closee").addEventListener("click", function(){
    document.getElementById("open").classList.remove("active")
    document.getElementById("closee").classList.remove("active")
    document.querySelector(".navlinks").classList.remove("active")
    document.querySelector(".ham").classList.remove("active")
})