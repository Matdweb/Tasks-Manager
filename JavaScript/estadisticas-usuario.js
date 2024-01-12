const contGraficos = document.querySelectorAll('.container-dato-usuario');
//esta funcion averigua todas las tareas de la APP
const todasTareas = () =>{
    let tablas = document.querySelectorAll('.tabla');
    let tareas = 0; 
    for(var tabla of tablas){
       tareas += tabla.children.length-1  //se resta 1 debido a que la primera fila no cuenta
    }
    console.log(tareas-tareasEliminados())
    return tareas-tareasEliminados();
}

const tareasEliminados = () =>{
    let tablas = document.querySelectorAll('.tabla');
    let eliminados = 0; 
    for(var tabla of tablas){
        for(var i=0; i<tabla.children.length; i++){
            if(tabla.children[i].className == 'eliminado'){
                eliminados++;
            }
        }
    }
    return eliminados
}

//Esta funcion averigua cuantas tareas ya estan listas
const tareasListas = () =>{
    let tablas = document.querySelectorAll('.tabla');
    let listas = 0; 
    for(var tabla of tablas){
       for(var i=1; i<tabla.children.length; i++){
        if(tabla.children[i].children[2].firstElementChild.firstElementChild.innerHTML=='Listo' 
        && tabla.children[i].className != 'eliminado'){
            listas++;
        }
       }
    }

    //Hacer cambios al grafico
    contGraficos[0].children[1].lastElementChild.style.strokeDashoffset = `calc(315 - (315 * ${Math.trunc((listas*100)/todasTareas())}) / 100)`;
    contGraficos[0].children[2].innerHTML = `${Math.trunc((listas*100)/todasTareas())}%`;

    return listas;
}

//Esta funcion averigua cuantas tareas faltan por completar, restando el total con las que ya estan listas
const tareasXRealizar = () =>{
    let Tareas = todasTareas()-tareasListas()
    contGraficos[1].children[1].lastElementChild.style.strokeDashoffset = `calc(315 - (315 * ${Math.trunc((Tareas*100)/todasTareas())}) / 100)`;
    contGraficos[1].children[2].innerHTML = `${Math.trunc((Tareas*100)/todasTareas())}%`
    return Tareas
}

// Este metodo valida cuantas tareas estan en estado de 'Listo' 'Casi Listo' y la diferencia de estas con el total de tareas, y asi calcula la efectividad del usuario
const efectividadUsuario = () =>{
    let tablas = document.querySelectorAll('.tabla');
    let listas = 0; 
    for(var tabla of tablas){
        for(var i=1; i<tabla.children.length; i++){
            if(tabla.children[i].children[2].firstElementChild.firstElementChild.innerHTML=='Listo' 
            || tabla.children[i].children[2].firstElementChild.firstElementChild.innerHTML=='Casi Listo'
            && tabla.children[i].className != 'eliminado'){
                listas++;
            }
        }
    }

    //Hacer cambios al grafico
    contGraficos[3].children[1].lastElementChild.style.strokeDashoffset = `calc(315 - (315 * ${Math.trunc((listas*100)/todasTareas())}) / 100)`;
    contGraficos[3].children[2].innerHTML = `${Math.trunc((listas*100)/todasTareas())}%`;
 
}

//Esta funcion averigua cuantas tareas se pasaron de su dia de entrega y las resta con el total para saber que tan responsable es el usuario
const Responsabilidad = () =>{
    let tablas = document.querySelectorAll('.tabla');
    let hoy = new Date; 
    let faltas = 0; //variable que almacena el numero de tareas que expiraron
    for(var tabla of tablas){
        for(var i=1; i<tabla.children.length; i++){
            let fecha = tabla.children[i].querySelector(`#fecha`).value.split('-').join(',');
            if(hoy.getTime()>=new Date(fecha) && tabla.children[i].className != 'eliminado'){
                faltas++;
            }
        }
     }
     faltas = todasTareas()-faltas;

     //Hacer cambios al grafico
     contGraficos[2].children[1].lastElementChild.style.strokeDashoffset = `calc(315 - (315 * ${Math.trunc((faltas*100)/todasTareas())}) / 100)`;
    contGraficos[2].children[2].innerHTML = `${Math.trunc((faltas*100)/todasTareas())}%`;
    return faltas
}

tareasXRealizar(); 
efectividadUsuario(); 
Responsabilidad();

//cerrar el perfil usuario 
const btn = document.querySelector(".cerrar-perfil")
btn.addEventListener("click",()=>{
    let checkbox = document.getElementById("input-cerrar-perfil"); 
    let contTareas = document.querySelector(".container-tareas");
    let perfil = document.querySelector(".container-perfil"); 

    if(checkbox.checked){
        contTareas.style.gridColumn = '2';
        perfil.style.transform = 'translateX(0%)';
        btn.style.transform = 'rotate(-180deg)';
    }else{
        contTareas.style.gridColumn = '1 / 3';
        perfil.style.transform = 'translateX(-100%)';
        btn.style.transform = 'rotate(180deg)';
    }
})