const navbar = document.getElementById("navbar");

window.addEventListener('scroll', () => {
    if(window.scrollY > 0) {
        navbar.classList.add("shadow");
    } else {
        navbar.classList.remove("shadow");
    }
});