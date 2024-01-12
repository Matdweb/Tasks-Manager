const DesplegarEstados = (numTabla,fila)=>{
    let seleccion = document.querySelectorAll(".seleccion");
    let contTabla = document.querySelector(`.tabla-${numTabla}`);
    let containerOpciones = contTabla.querySelectorAll(".container-opciones-estado");
    containerOpciones[fila].classList.add("active");
    seleccion[fila].removeAttribute("onclick");
    if(containerOpciones[fila].children.length<=1){
        llenarEstados(numTabla,fila,containerOpciones);
    }
}

const elegirEstado = (numTabla,fila,numOpcion) =>{
    ArregloTablas[numTabla].modificarEstado(numTabla,fila,numOpcion);
}

const llenarEstados = (numTabla,fila,containerOpciones) =>{
    var i=0;
    for(var estado of arregloEstados){
        containerOpciones[fila].innerHTML += `<div class="opcion">
                                              <input type="radio" class="radio"/>
                                              <span onclick="elegirEstado(${numTabla},${fila},${i})">${estado}</span>
                                            </div>`;
        i++;
    }
}


const DesplegarEncargados = (numTabla,fila)=>{
    let contTabla = document.querySelector(`.tabla-${numTabla}`);
    let containerEncargados = contTabla.querySelectorAll(".container-opciones-encargado");
    containerEncargados[fila].classList.add("active");
    document.querySelectorAll(".encargado")[fila].removeAttribute("onclick");
    if(containerEncargados[fila].children.length==1){
        llenarIntegrantes(numTabla,fila,containerEncargados);
    }
}

const llenarIntegrantes = (numTabla,fila,containerEncargados) =>{
    var i=1;
    for(var Integrante of Integrantes){
        containerEncargados[fila].innerHTML += `<div class="Integrante">
                                                    <input type="radio" class="radio"/>
                                                    <span onclick="elegirEncargado(${numTabla},${fila},${i})">${Integrante}</span>
                                                </div>`;
        i++;
    }
}

const elegirEncargado = (numTabla,fila,numOpcion) =>{
    ArregloTablas[numTabla].modificarEncargado(numTabla,fila,numOpcion);
}


const DesplegarSubTareas = (numTabla,fila) =>{
    let contTabla = document.querySelector(`.tabla-${numTabla}`); 
    let subTarea = contTabla.querySelectorAll(".ver-sub-tarea")[fila];
    contTabla.querySelectorAll(".container-opciones-sub-tareas")[fila].classList.add("active");
    subTarea.removeAttribute("onclick");
}

const elegirSubTarea = (tabla,fila,numOpcion) =>{
    let contTabla = document.querySelector(`.tabla-${tabla}`);
    let tareaFija = contTabla.querySelectorAll(".ver-sub-tarea")[fila];
    let containerSubTareas = contTabla.querySelectorAll(".container-opciones-sub-tareas")[fila];
    let subTareas = containerSubTareas.querySelectorAll(".sub-tarea");
    tareaFija.innerHTML = subTareas[numOpcion].lastElementChild.innerHTML;
    containerSubTareas.classList.remove("active");
    tareaFija.setAttribute("onclick",`DesplegarSubTareas(${tabla},${fila})`);
}