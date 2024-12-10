
document.querySelector("#btn").addEventListener("click", function(){
    document.querySelector(".overb").classList.add("active")
    document.querySelector("#normalb").classList.add("active")
  })

  document.querySelector("#close1").addEventListener("click", function(){
    document.querySelector(".overb").classList.remove("active")
    document.querySelector("#normalb").classList.remove("active")
  })


  document.querySelector("#btnn").addEventListener("click", function(){
    document.querySelector(".overb").classList.add("active")
    document.querySelector("#TopBlog").classList.add("active")
  })

  document.querySelector("#close2").addEventListener("click", function(){
    document.querySelector(".overb").classList.remove("active")
    document.querySelector("#TopBlog").classList.remove("active")
  })