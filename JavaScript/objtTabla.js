let ContTareas = document.querySelector(".container-tareas"); 
let ArregloTablas = []; 
const Integrantes = ["Josue R", "Alisson", "Stephanie", "Josue S", "Esteban","Rafael"];
let arregloEstados = ["Estancado","En proceso","Casi Listo","Listo"];

class Tabla {
    constructor(filas){
        this.filas = filas
    }

    getFilas(){
        return this.filas;
    }

    setFilas(filas){
        this.filas = filas; 
    }  

    NuevaTabla(){
        ArregloTablas.push(new Tabla(1));
        let numTabla = ArregloTablas.length-1;
        ContTareas.innerHTML += `<div class="container-tabla tabla-${numTabla}">
                                    <h2 onclick="ModificarNomTabla(${numTabla})">NOMBRE TABLA</h2>
                                    <div class="tabla">
                                        <div class="fila">
                                            <label>Tarea</label>
                                            <label>Encargado</label>
                                            <label>Estado</label>
                                            <label>Descripcion</label>
                                            <label>Fecha</label>
                                            <label>Sub-Tareas</label>
                                        </div>
                                        <div class="fila">
                                            <label onclick="ModificarTexto(${numTabla},${ArregloTablas[numTabla].getFilas()},0)"><p>Tarea</p></label>
                                            <label>
                                                <div class="container-encargados"> 
                                                    <div onclick="DesplegarEncargados(${numTabla},${ArregloTablas[numTabla].getFilas()-1})" class="encargado">
                                                        Encargado
                                                    </div>
                                                    <div class="container-opciones-encargado">
                                                        <div class="Integrante">
                                                          <input type="radio" class="radio"/>
                                                          <span onclick="elegirEncargado(${numTabla},${ArregloTablas[numTabla].getFilas()-1},0)">Nadie</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </label>
                                            <label>
                                                <div class="container-estados"> 
                                                    <div onclick="DesplegarEstados(${numTabla},${ArregloTablas[numTabla].getFilas()-1})" class="seleccion">
                                                        Estado
                                                    </div>
                                                    <div class="container-opciones-estado">
                                                    </div>
                                                </div>
                                            </label>
                                            <label onclick="ModificarTexto(${numTabla},${ArregloTablas[numTabla].getFilas()},3)"><p>Descripcion</p></label>
                                            <label><input onblur="tareasXRealizar(); efectividadUsuario(); Responsabilidad();" type="date" name="" id="fecha" data-date-format="DD MMMM YYYY" value="2022-09-21"></label>
                                            <label>
                                            <div onclick="agregarSubTarea(${numTabla},${ArregloTablas[numTabla].getFilas()-1})" class="btn-sub-tareas"><i class="fa-solid fa-plus"></i></div>
                                                <div class="container-sub-tareas"> 
                                                    <div onclick="DesplegarSubTareas(${numTabla},${ArregloTablas[numTabla].getFilas()-1})" class="ver-sub-tarea">
                                                        Sub-Tareas
                                                    </div>
                                                    <div class="container-opciones-sub-tareas">
                                                        <div class="sub-tarea">
                                                          <input type="radio" class="radio"/>
                                                          <span onclick="elegirSubTarea(${numTabla},${ArregloTablas[numTabla].getFilas()-1},0)">Sub-tarea 1</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div onclick="eliminarSubTarea(${numTabla},${ArregloTablas[numTabla].getFilas()-1})" class="btn-sub-tareas"><i class="fa-solid fa-minus"></i></div>
                                            </label>
                                            <label for="btn-modulo">
                                                <i onclick="Modulo(${numTabla},${ArregloTablas[numTabla].getFilas()})" class="fa-solid fa-arrow-up-right-from-square"></i>
                                            </label>
                                        </div>
                                    </div>
                                    <div onclick="AgregarFila(${numTabla})" class="cont-agregar-fila"><h4 style="margin-left: 7px;">+ Nueva Fila</h4></div>
                                    <h3 onclick="AgregarTabla(${numTabla})">+ Nueva Tabla</h3>
                                </div>`;
        console.log(ArregloTablas);

        //Estadisticas del usuario
        tareasXRealizar(); 
        efectividadUsuario(); 
        Responsabilidad();
    }

    modificarTexto(tabla,fila,colm){
        let casillaText = document.querySelector(`.tabla-${tabla}`).children[1].children[fila].children[colm];
        console.log(casillaText.innerHTML); 
        casillaText.removeAttribute("onclick");
        casillaText.innerHTML = `<input type="text" value="${casillaText.firstElementChild.innerHTML}">`;
        casillaText.firstChild.addEventListener("blur",()=>{
            casillaText.innerHTML = `<p>${validacionTexto(casillaText)}</p>`
            setTimeout(()=>{
                casillaText.setAttribute("onclick",`ModificarTexto(${tabla},${fila},${colm})`);
            },1000)
        });
    }

    agregarFila(numTabla){
        ArregloTablas[numTabla].setFilas(ArregloTablas[numTabla].getFilas()+1);
        document.querySelector(`.tabla-${numTabla}`).children[1].innerHTML += `<div class="fila">
                                    <label onclick="ModificarTexto(${numTabla},${ArregloTablas[numTabla].getFilas()},0)"><p>Tarea</p></label>
                                    <label>
                                        <div class="container-encargados"> 
                                            <div onclick="DesplegarEncargados(${numTabla},${ArregloTablas[numTabla].getFilas()-1})" class="encargado">
                                                Encargado
                                            </div>
                                            <div class="container-opciones-encargado">
                                                <div class="Integrante">
                                                  <input type="radio" class="radio"/>
                                                  <span onclick="elegirEncargado(${numTabla},${ArregloTablas[numTabla].getFilas()-1},0)">Nadie</span>
                                                </div>
                                            </div>
                                        </div>
                                    </label>
                                    <label>
                                        <div class="container-estados"> 
                                            <div onclick="DesplegarEstados(${numTabla},${ArregloTablas[numTabla].getFilas()-1})" class="seleccion">
                                                Estado
                                            </div>
                                            <div class="container-opciones-estado">
                                            </div>
                                        </div>
                                    </label>
                                    <label onclick="ModificarTexto(${numTabla},${ArregloTablas[numTabla].getFilas()},3)"><p>Descripcion</p></label>
                                    <label><input onblur="tareasXRealizar(); efectividadUsuario(); Responsabilidad();" type="date" name="" id="fecha" data-date-format="DD MMMM YYYY" value="2022-09-21"></label>
                                    <label>
                                    <div onclick="agregarSubTarea(${numTabla},${ArregloTablas[numTabla].getFilas()-1})" class="btn-sub-tareas"><i class="fa-solid fa-plus"></i></div>
                                        <div class="container-sub-tareas"> 
                                            <div onclick="DesplegarSubTareas(${numTabla},${ArregloTablas[numTabla].getFilas()-1})" class="ver-sub-tarea">
                                                Sub-Tareas
                                            </div>
                                            <div class="container-opciones-sub-tareas">
                                            </div>
                                        </div>
                                        <div onclick="eliminarSubTarea(${numTabla},${ArregloTablas[numTabla].getFilas()-1})" class="btn-sub-tareas"><i class="fa-solid fa-minus"></i></div>
                                    </label>
                                    <label for="btn-modulo">
                                        <i onclick="Modulo(${numTabla},${ArregloTablas[numTabla].getFilas()})" class="fa-solid fa-arrow-up-right-from-square"></i>
                                    </label>
                                </div>`;

        //Estadisticas del usuario
        tareasXRealizar(); 
        efectividadUsuario(); 
        Responsabilidad();
    }

    nuevoNomTabla(numTabla){
        let casillaTitulo = document.querySelector(`.tabla-${numTabla}`).children[0];
        casillaTitulo.innerHTML = `<input type="text" value="${casillaTitulo.innerHTML}" >`;
        casillaTitulo.removeAttribute("onclick");
        casillaTitulo.firstChild.addEventListener("blur",()=>{
            casillaTitulo.innerHTML = validacionTexto(casillaTitulo);
            setTimeout(()=>{
                casillaTitulo.setAttribute("onclick",`ModificarNomTabla(${numTabla})`);
            },100);
        })
    }

    modificarEstado(numTabla,fila,numOpcion){
        let contTabla = document.querySelector(`.tabla-${numTabla}`);
        let seleccion = contTabla.querySelectorAll(".seleccion");
        let containerOpciones = contTabla.querySelectorAll(".container-opciones-estado");
        let estado = seleccion[fila];
        estado.innerHTML = document.querySelectorAll(".opcion")[numOpcion].lastElementChild.innerHTML;
        containerOpciones[fila].classList.remove("active");
        estado.setAttribute("onclick",`DesplegarEstados(${numTabla},${fila})`);
        estado.parentElement.parentElement.style.backgroundColor = DefinirEstado(estado.innerHTML);

        //Estadisticas del usuario
        tareasXRealizar(); 
        efectividadUsuario(); 
        Responsabilidad();
    }

    modificarEncargado(numTabla,fila,numOpcion){
        let contTabla = document.querySelector(`.tabla-${numTabla}`);
        let containerEncargados = contTabla.querySelectorAll(".container-opciones-encargado");
        let encargado = contTabla.querySelectorAll(".encargado")[fila];
        encargado.innerHTML = containerEncargados[fila].querySelectorAll(".Integrante")[numOpcion].lastElementChild.innerHTML;
        containerEncargados[fila].classList.remove("active");
        encargado.setAttribute("onclick",`DesplegarEncargados(${numTabla},${fila})`);
    }

    agregarSubTarea(tabla,fila){
        let contTabla = document.querySelector(`.tabla-${tabla}`); 
        let contOpciones = contTabla.querySelectorAll(".container-opciones-sub-tareas")[fila];
        contOpciones.previousElementSibling.innerHTML = `<input type="text"><button>crear</button>`;
        contOpciones.previousElementSibling.lastElementChild.addEventListener("click",()=>{
            let nombre = contOpciones.previousElementSibling.firstElementChild.value;
            contOpciones.previousElementSibling.innerHTML = `Sub-tareas`;
            contOpciones.innerHTML += `<div class="sub-tarea">
                                  <input type="radio" class="radio"/>
                                  <span onclick="elegirSubTarea(${tabla},${fila},${contOpciones.children.length})">${contOpciones.children.length+1}. ${nombre} </span>
                                </div>`;
        });
        
    }

    eliminarSubTarea(tabla,fila){
        let contTabla = document.querySelector(`.tabla-${tabla}`); 
        let subTarea = contTabla.querySelectorAll(".ver-sub-tarea")[fila];
        let ultimo = subTarea.nextElementSibling.children.length;
        if(ultimo>0){
            subTarea.nextElementSibling.removeChild(subTarea.nextElementSibling.children[ultimo-1]);
            subTarea.innerHTML = `Se elimino la ultima sub-tarea`;
            setTimeout(()=>{
                subTarea.innerHTML = `Sub-tareas`;
            },2000)
        }else{
            subTarea.innerHTML = `No existen sub-tareas`;
            setTimeout(()=>{
                subTarea.innerHTML = `Sub-tareas`;
            },2000)
        }

        //Estadisticas del usuario
        tareasXRealizar(); 
        efectividadUsuario(); 
        Responsabilidad();
        
    }

    infoModulo(tabla,fila){
        let filaInfo = document.querySelectorAll(`.tabla`)[tabla].children[fila];
        let estado = filaInfo.children[2].firstElementChild.firstElementChild;
        let anno = filaInfo.children[4].firstElementChild.value.slice(0,4); 
        let mes = filaInfo.children[4].firstElementChild.value.slice(5,7); 
        let dia = filaInfo.children[4].firstElementChild.value.slice(8,10)
        contentModulo[2].style.backgroundColor = DefinirEstado(estado.innerHTML);
         
        contentModulo[0].innerHTML = filaInfo.children[0].firstElementChild.innerHTML;
        contentModulo[1].innerHTML = filaInfo.children[1].firstElementChild.firstElementChild.innerHTML;
        contentModulo[2].innerHTML = estado.innerHTML;
        contentModulo[3].innerHTML = filaInfo.children[3].firstElementChild.innerHTML;
        contentModulo[4].innerHTML = `Se debe entregar antes del: día ${dia}, del mes ${mes}, ${anno}` ;
        contentModulo[5].innerHTML = filaInfo.children[5].children[1].firstElementChild.innerHTML;

        contentModulo[6].addEventListener("click",()=>{
            filaInfo.className = 'eliminado';
            //Estadisticas del usuario
            tareasXRealizar(); 
            efectividadUsuario(); 
            Responsabilidad();
        
        });
    }

}

ArregloTablas.push(new Tabla(2));
let contentModulo = document.querySelector(".content-modulo").children;