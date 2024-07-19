let Menu = document.querySelector("#MenuBtn");
let Navbar = document.querySelector(".navbar");

Menu.onclick = () => {
  Menu.classList.toggle("fa-times");
  Navbar.classList.toggle("active");
};

window.onscroll = () => {
  Menu.classList.remove("fa-times");
  Navbar.classList.remove("active");
};




let number = 1
let stopvalue = 1000;
function increment(){
  let secondo2Elements = document.querySelectorAll(".countup")
  secondo2Elements.forEach((element)=>{
    element.innerHTML = `${number}+`
  })

  if(number === stopvalue){
      clearInterval()
  }
  number++
}

setInterval(increment, 700)