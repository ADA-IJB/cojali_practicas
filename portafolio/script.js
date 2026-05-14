const botonTema = document.getElementsByClassName('tema')[0];
const botonEstudios = document.getElementsByClassName('btn-estudio')[0];
const header = document.getElementById('header');
const footer = document.getElementById('footer');
const estudioLista = document.getElementById('estudioLista');
const storage = window.localStorage;
let theme = "light";
let estudios = [
    {"anio": 2020, "nombre": "Educación secundaria obligatorias", "institucion": "IES Vicente Cano"},
    {"anio": 2023, "nombre": "Grado medio de sistemas microinformaticos y redes", "institucion": "IES Juan Bosco"},
    {"anio": 2025, "nombre": "Grado superior de desarrollo de aplicaciones multiplataforma (en proceso)", "institucion": "IES Juan Bosco"}
]

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
        let repos = document.getElementsByClassName('repositorio');
        for (i = 0; i < repos.length; i++) {
            document.getElementsByClassName('repositorio')[i].style.backgroundColor = "#f3ded6";
        }
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
        let repos = document.getElementsByClassName('repositorio');
        for (i = 0; i < repos.length; i++) {
            document.getElementsByClassName('repositorio')[i].style.backgroundColor = "rgb(37, 36, 36)";
        }
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

function onLoadFunction() {
    chargeTheme();
    chargeEstudios();
    mostrarGithub();
}

function chargeEstudios() {
    if (storage.getItem("estudios") != null) {
        estudios = JSON.parse(storage.getItem("estudios"));
    }
    for(let i in estudios) {
        estudioLista.appendChild(createEstudio(estudios[i]["anio"], estudios[i]["nombre"], estudios[i]["institucion"]));
    }
}

function createEstudio(anioN, nombreN, institucionN) {
  const tarjeta = document.createElement('li');
  tarjeta.textContent = anioN + " - " + nombreN + " - " + institucionN;
  return tarjeta;
}

botonEstudios.onclick = function () {
    // Source - https://stackoverflow.com/a/29949852
    // Posted by Jeff Daze, modified by community. See post 'Timeline' for change history
    // Retrieved 2026-05-12, License - CC BY-SA 4.0
    var formData = new FormData(document.getElementById('formularioEstudio'));
    if (!formData.get("anio")) {
        return;
    }
    if (!formData.get("nombre")) {
        return;
    }
    if (!formData.get("institucion")) {
        return;
    }

    estudios.push(
        {
            "anio": formData.get("anio"), 
            "nombre": formData.get("nombre"), 
            "institucion": formData.get("institucion")
        }
    );
    estudioLista.appendChild(
        createEstudio(
            formData.get("anio"),
            formData.get("nombre"),
            formData.get("institucion")
        )
    )
    storage.setItem("estudios", JSON.stringify(estudios));
};

async function mostrarGithub() {
    const card = document.getElementById("card");
    const error = document.getElementById("error");
    const cuenta = "ADA-IJB"

    try {
    const response = await fetch(`https://api.github.com/users/${cuenta}`);
    const repositorios = await fetch(`https://api.github.com/users/${cuenta}/repos`);

    if (!response.ok) {
        throw new Error("Usuario no encontrado");
    }

    const data = await response.json();
    const dataRepo = await repositorios.json();

    document.getElementById("avatar").src = data.avatar_url;
    document.getElementById("name").textContent = data.name || data.login;
    document.getElementById("bio").textContent = data.bio || "Sin bio disponible";
    document.getElementById("repos").textContent = data.public_repos;

    await makeRepos(dataRepo);

    if (theme == "light") {
        let repos = document.getElementsByClassName('repositorio');
        for (i = 0; i < repos.length; i++) {
            document.getElementsByClassName('repositorio')[i].style.backgroundColor = "#f3ded6";
        }
    }

    card.style.display = "flex";

    } catch (err) {
    error.textContent = "Error desplegando cuenta: " + err.message;
    error.style.display = "block";
    }
}

function makeRepos(data) {
    const padre = document.getElementById('repoParent');
    for (let i = 0; i < data.length; i++) {
        const tarjeta = document.createElement('section');
        const titulo = document.createElement('h4');
        const link = document.createElement('a');
        const descripcion = document.createElement('p');
        const lenguaje = document.createElement('p');
        const estado = document.createElement('p');

        tarjeta.className = "repositorio";

        link.textContent = data[i].name;
        link.setAttribute("href", data[i].html_url)
        link.className = "repoNombre";

        descripcion.textContent = data[i].description || "";
        descripcion.className = "repoDesc";

        if (descripcion.textContent == "") {
            descripcion.style.marginTop = 0;
        }

        lenguaje.textContent = data[i].language || "";
        lenguaje.className = "repoLenguaje";

        if (lenguaje.textContent == "") {
            lenguaje.style.marginTop = 0;
        }

        estado.textContent = data[i].private ? "private":"public";
        estado.className = "repoEstado";

        padre.appendChild(tarjeta);
        tarjeta.appendChild(titulo);
        titulo.appendChild(link);
        tarjeta.appendChild(descripcion);
        tarjeta.appendChild(lenguaje);
        tarjeta.appendChild(estado);
    }
}