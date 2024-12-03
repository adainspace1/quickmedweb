document.querySelector(".follow-bnt").addEventListener("click", function () {
    const button = document.querySelector(".follow-bnt");
    if (button.innerHTML === "+Follow") {
        button.innerHTML = "Following";
    } else {
        button.innerHTML = "+Follow";
    }
});
