//efeito do menu
var a_menu = document.querySelectorAll(".a-menu")
a_menu.forEach((elemento) => {
    elemento.addEventListener("mouseover", () => {
        elemento.style.color = "cadetblue";
    });

    elemento.addEventListener("mouseout", () => {
        elemento.style.color = "darkslategray";
    });
});


//efeito do text-menu
var observer = new IntersectionObserver((enter) => {
    enter.forEach((ent) => {
        if (ent.isIntersecting) {
            ent.target.classList.add("vis")
        } else {
            ent.target.classList.remove("vis")
        }
    })
})

var elemnts = document.querySelectorAll(".hidden")
elemnts.forEach((element) => observer.observe(element))

//salvar as tarefas com JSON (usei chatgpt)
function atualizarLista() {
    if(tarefas.length > 0){
        cont_tarefas.classList.remove("list-hidden")
        p.innerHTML = tarefas.map(t => `- ${t}`).join("<br>")
    } else {
        cont_tarefas.classList.add("list-hidden")
        p.innerHTML = ""
    }
}

function salvarTarefas() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas))
}

function carregarTarefas() {
    const tarefasSalvas = localStorage.getItem("tarefas")
    if (tarefasSalvas) {
        tarefas = JSON.parse(tarefasSalvas)
    }
    atualizarLista()
}

//lista de tarefas
var tarefas = []
var p = document.getElementById("tarefa")
var btn_add = document.getElementById("btn-add")
var cont_tarefas = document.getElementById("container-tarefa")
var tarefa = document.getElementById("tarefa")

btn_add.addEventListener("click", () => {
    var titulo = document.getElementById("text-tarefa").value
    if (titulo === "") {
        const alerta = document.getElementById("alerta");
        alerta.style.display = "block";

        setTimeout(() => {
            alerta.style.display = "none"
        }, 5000)

    } else {
        tarefas.push(titulo.charAt(0).toUpperCase() + titulo.slice(1))
        cont_tarefas.classList.remove("list-hidden")
        p.innerHTML = tarefas.map(t => `-${t}`).join("<br>")
        salvarTarefas() 
        atualizarLista() 

        document.getElementById("desc").value = ""
        document.getElementById("text-tarefa").value = ""
    }
})

carregarTarefas()

//zerar campo de tarefas
var check = document.getElementById("check-tarefa")
var btn_fim = document.getElementById("btn-fim")
check.addEventListener("click", () =>{
    if(check.checked === true){
    btn_fim.classList.remove("btn-hidden")
}
})

btn_fim.addEventListener("click", () =>{
    tarefas = []
    salvarTarefas()
    atualizarLista()
    cont_tarefas.classList.add("list-hidden")
    check.checked = false
    btn_fim.classList.add("btn-hidden")
})