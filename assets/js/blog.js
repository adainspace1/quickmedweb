


// let move1 = document.querySelector("#dotgo").addEventListener("click", function(){
//     document.querySelector(".carousel-slide").classList.remove("why1");
//     document.querySelector(".carousel-slide2").classList.remove("why2");
//     document.querySelector(".carousel-slide3").classList.remove("why3");
//     check ()
// })
// document.querySelector(".right-arrow").addEventListener("click", function(){
//     document.querySelector(".carousel-slide").classList.add("why1");
//     document.querySelector(".carousel-slide2").classList.add("why2");
//     document.querySelector(".carousel-slide3").classList.remove("why3");
//     check2 ()
// })



//  document.querySelector("#dotgo2").addEventListener("click", function(){
//     document.querySelector(".carousel-slide").classList.add("why1");
//     document.querySelector(".carousel-slide2").classList.add("why2");
//     document.querySelector(".carousel-slide3").classList.remove("why3");
//     check2 ()
//     first ()
// })



// function move2 (){ document.querySelector(".left-arrow2").addEventListener("click", function(){
//     document.querySelector(".carousel-slide").classList.remove("why1");
//     document.querySelector(".carousel-slide2").classList.remove("why2");
//     document.querySelector(".carousel-slide3").classList.remove("why3");
//     check ()
// })
// }
// document.querySelector(".right-arrow2").addEventListener("click", function(){
//     document.querySelector(".carousel-slide").classList.add("why1");
//     document.querySelector(".carousel-slide2").classList.remove("why2");
//     document.querySelector(".carousel-slide3").classList.add("why3");
//     check3 ()
// })






// let move3 = document.querySelector("#dotgo3").addEventListener("click", function(){
//     document.querySelector(".carousel-slide").classList.add("why1");
//     document.querySelector(".carousel-slide2").classList.remove("why2");
//     document.querySelector(".carousel-slide3").classList.add("why3");
//     check3 ()
// })
// document.querySelector(".left-arrow3").addEventListener("click", function(){
//     document.querySelector(".carousel-slide").classList.add("whyno1");
//     document.querySelector(".carousel-slide2").classList.add("why2");
//     document.querySelector(".carousel-slide3").classList.remove("why3");
//     check2 ()
// })














// function first (){ 

//     document.querySelector(".colordot").classList.add("active");
// }


// let radio1 = document.getElementById("dotgo");
//         let radio2 = document.getElementById("dotgo2");
//         let radio3 = document.getElementById("dotgo3");
//         let radio4 = document.getElementById("dotgo4");
    
//      function check (){
    
//         first ()
//         radio1.checked = true;
//         radio2.checked = false;
//         radio3.checked = false;
//         radio4.checked = false;
//      }
    
//      function check2 (){
    
//         first ()
//     radio1.checked = false;
//     radio2.checked = true;
//     radio3.checked = false;
//     radio4.checked = false;
//     }
    
//     function check3 (){
    
//         first ()
//     radio1.checked = false;
//     radio2.checked = false;
//     radio3.checked = true;
//     radio4.checked = false;
//     }
    
//     function check4 (){
    
//         first ()
//     radio1.checked = false;
//     radio2.checked = false;
//     radio3.checked = false;
//     radio4.checked = true;
//     }









// // Elements
// const slides = [
//     document.querySelector(".carousel-slide"),
//     document.querySelector(".carousel-slide2"),
//     document.querySelector(".carousel-slide3"),
// ];
// const dots = [
//     document.getElementById("dotgo"),
//     document.getElementById("dotgo2"),
//     document.getElementById("dotgo3"),
// ];
// const arrows = {
//     left: [document.querySelector(".left-arrow"), document.querySelector(".left-arrow2"), document.querySelector(".left-arrow3")],
//     right: [document.querySelector(".right-arrow"), document.querySelector(".right-arrow2")]
// };

// // State variables
// let currentSlide = 0;
// let autoMove;

// // Functions
// function updateSlides() {
//     slides.forEach((slide, index) => {
//         slide.classList.toggle("active", index === currentSlide);
//     });
//     updateDots();
// }

// function updateDots() {
//     dots.forEach((dot, index) => {
//         dot.checked = (index === currentSlide);
//     });
// }

// function moveToSlide(index) {
//     currentSlide = index;
//     updateSlides();
// }

// function nextSlide() {
//     currentSlide = (currentSlide + 1) % slides.length;
//     updateSlides();
// }

// function prevSlide() {
//     currentSlide = (currentSlide - 1 + slides.length) % slides.length;
//     updateSlides();
// }

// function startAutoMove() {
//     autoMove = setInterval(nextSlide, 5000); // Move every 3 seconds
// }

// function stopAutoMove() {
//     clearInterval(autoMove);
// }

// // Event listeners for dots
// dots.forEach((dot, index) => {
//     dot.addEventListener("click", () => {
//         moveToSlide(index);
//         stopAutoMove();
//         startAutoMove();
//     });
// });

// // Event listeners for arrows
// arrows.right.forEach(arrow => arrow.addEventListener("click", () => {
//     nextSlide();
//     stopAutoMove();
//     startAutoMove();
// }));

// arrows.left.forEach(arrow => arrow.addEventListener("click", () => {
//     prevSlide();
//     stopAutoMove();
//     startAutoMove();
// }));

// // Initialize carousel
// updateSlides();
// startAutoMove();





document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".carousel-slide");
    const leftArrow = document.querySelector(".left-arrow");
    const rightArrow = document.querySelector(".right-arrow");
    const dots = document.querySelectorAll(".dot");
  
    let currentIndex = 0;
  
    // Update Slide Visibility
    const updateSlide = () => {
      slides.forEach((slide, index) => {
        if (index === currentIndex) {
          slide.classList.add("active");
          slide.classList.remove("inactive");
        } else {
          slide.classList.remove("active");
          slide.classList.add("inactive");
        }
      });
  
      // Update dot navigation
      dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentIndex);
      });
    };
  
    // Go to Next Slide
    const nextSlide = () => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateSlide();
    };
  
    // Go to Previous Slide
    const prevSlide = () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateSlide();
    };
  
    // Set Slide via Dot Navigation
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        currentIndex = index;
        updateSlide();
      });
    });
  
    // Attach Event Listeners to Arrows
    leftArrow.addEventListener("click", prevSlide);
    rightArrow.addEventListener("click", nextSlide);
  
    // Auto-Slide (Optional)
    setInterval(nextSlide, 5000); // Change slides every 5 seconds
  
    // Initialize the first slide
    updateSlide();
  });
  