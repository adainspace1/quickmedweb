// window.alert("its' working")


document.querySelector(".aboutl").addEventListener("click", function(){

        
    document.querySelector(".joinimg").classList.remove("active");
    document.querySelector(".joinpop").classList.remove("active");
    document.querySelector(".joindrop").classList.remove("active");
            // window.alert("kkkkk")
            document.querySelector(".aboimg").classList.toggle("active");
            document.querySelector(".aboutpop").classList.toggle("active");
            document.querySelector(".aboutdrop").classList.toggle("active");
    
        })
    
    
    
    
        document.querySelector(".joinl").addEventListener("click", function(){
    
            document.querySelector(".aboimg").classList.remove("active");
            document.querySelector(".aboutpop").classList.remove("active");
            document.querySelector(".aboutdrop").classList.remove("active");
    
    // window.alert("kkkkk")
    document.querySelector(".joinimg").classList.toggle("active");
    document.querySelector(".joinpop").classList.toggle("active");
    document.querySelector(".joindrop").classList.toggle("active");
    
    })
    
    
    
    
    
    
    
    
    
    document.querySelector(".aboutll").addEventListener("click", function(){
    
            
    document.querySelector(".joiniimg").classList.remove("active");
    document.querySelector(".joindropp").classList.remove("active");
            // window.alert("kkkkk")
            document.querySelector(".aboiimg").classList.toggle("active");
            document.querySelector(".aboutdropp").classList.toggle("active");
    
        })
    
    
    
    
        document.querySelector(".joinll").addEventListener("click", function(){
    
            document.querySelector(".aboiimg").classList.remove("active");
            document.querySelector(".aboutdropp").classList.remove("active");
    
    // window.alert("kkkkk")
    document.querySelector(".joiniimg").classList.toggle("active");
    document.querySelector(".joindropp").classList.toggle("active");
    
    })




    document.getElementById("open").addEventListener("click", function(){
        document.querySelector(".ham").classList.add("active")
        document.querySelector(".navlinks").classList.add("active")
        document.getElementById("open").classList.add("active")
        document.getElementById("closee").classList.add("active")
    })
    
    document.getElementById("clop").addEventListener("click", function(){
        document.querySelector(".ham").classList.remove("active")
        document.querySelector(".navlinks").classList.remove("active")
        document.getElementById("open").classList.remove("active")
        document.getElementById("closee").classList.remove("active")
    })



    