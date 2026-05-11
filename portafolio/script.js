let theme = "light";
const botonTema = document.getElementsByClassName('tema')[0];
const header = document.getElementById('header');
const footer = document.getElementById('footer');
const storage = window.localStorage;

botonTema.onclick = function () {
    if (botonTema.textContent == "Claro") {
        theme = "dark";
        changeTheme();
        storage.setItem("theme", "dark")
    } else {
        theme = "light";
        changeTheme();
        storage.setItem("theme", "light")
    }
};

function changeTheme() {
    if (theme == "light") {
        document.body.style.backgroundColor = "#f3ded6";
        document.body.style.color = "rgb(44, 44, 44)";
        let future = document.getElementsByClassName('futuro-box');
        for (i = 0; i < future.length; i++) {
            document.getElementsByClassName('futuro-box')[i].style.border = "2px solid black";
        }
        document.getElementById("projectos").style.border = "2px solid black";
        header.style.backgroundColor = "brown";
        header.style.borderBottom = "2px solid black";
        footer.style.backgroundColor = "brown";
        footer.style.borderTop = "2px solid black";
        botonTema.textContent = "Claro";
    } else {
        document.body.style.backgroundColor = "#221d1b";
        document.body.style.color = "white";
        let future = document.getElementsByClassName('futuro-box');
        for (i = 0; i < future.length; i++) {
            document.getElementsByClassName('futuro-box')[i].style.border = "2px solid white";
        }
        document.getElementById("projectos").style.border = "2px solid white";
        header.style.backgroundColor = "rgb(66, 15, 15)";
        header.style.borderBottom = "2px solid white";
        footer.style.backgroundColor = "rgb(66, 15, 15)";
        footer.style.borderTop = "2px solid white";
        botonTema.textContent = "Oscuro";
    }
};

function chargeTheme() {
    if (storage.getItem("theme") == null) {
        storage.setItem("theme", "light");
    }
    theme = storage.getItem("theme");
    changeTheme();
}