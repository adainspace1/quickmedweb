document.querySelector(".getform").addEventListener("click", function(){

    document.querySelector(".over").classList.add("active")

    setTimeout (() => {

        document.querySelector(".over").classList.remove("active")

        document.querySelector(".getform").classList.add("active")

        document.querySelector("form").classList.add("active")
    }, 2000)
});




document.querySelector(".submit-button").addEventListener("click", function(){

    let name = document.getElementById("full-name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let company = document.getElementById("company").value;

    if (name == 0, email == 0, phone == 0, company == 0) {
        document.querySelector(".over").classList.remove("active")
    }else{
    document.querySelector(".over").classList.add("active")

    setTimeout (() => {

        document.querySelector(".over").classList.remove("active")
    }, 5000)
    }
});