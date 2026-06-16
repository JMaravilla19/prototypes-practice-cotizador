// ******* CONSTRUCTORES *******
function Seguro(marca, year, tipo){
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}

//Realiza la cotizacion
Seguro.prototype.cotizarSeguro = function(){
    /**
     * 1 = Americano, 1.15
     * 2 = Asiatico, 1.05
     * 3 = Europeo, 1.35
     */

    console.log(this.marca);
    let cantidad;
    const base = 2000;

    switch(this.marca){
        case '1':
            cantidad = base * 1.15;
            break;

        case '2':
            cantidad = base * 1.05;
            break;

        case '3':
            cantidad = base * 1.35;
            break;
        
        default:
            break;
    }
    
    const diferencia = new Date().getFullYear() - this.year;

    //Cada año que la diferencia es mayor,el costo va reducirse 3%
    cantidad -= ((diferencia * 3) * cantidad) / 100;


    /**
     * Si el seguro es basico se multiplica por un 30% mas
     * Si el seguro es completo se multiplica por un 50% mas
     * 
     */
    if(this.tipo === 'basico'){
        cantidad *= 1.30;
    }else{
        cantidad *= 1.50;
    }

    return cantidad;
    console.log(cantidad);
    
}

// Debes definir el constructor aunque este vacio.
function UI(){}

UI.prototype.llenarOptiones = ()=>{
    const max = new Date().getFullYear();
    const min = max - 20;

    const selectYear = document.querySelector('#year');

    for( let i = max; i > min; i--){
        let option = document.createElement('OPTION');
        option.value = i;
        option.textContent = i;

        selectYear.appendChild(option);
    }
}

UI.prototype.mostrarMensaje = (mensaje, tipo) =>{
    const div = document.createElement('DIV');

    if (tipo === 'error'){
        div.classList.add('error');

    }else{
        div.classList.add('correcto')
    }

    div.classList.add('mensaje', 'mt-10');

    div.textContent = mensaje;

    //insertar en HTML
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div, document.querySelector('#resultado'));

    setTimeout(() => {
        div.remove();
    }, 3000);
}

UI.prototype.mostrarResultado = (seguro, total)=>{
    
}

//Instanciar UI
const ui = new UI();

document.addEventListener('DOMContentLoaded', ()=>{
    ui.llenarOptiones();
})

eventListeners();
function eventListeners(){
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro);

}

function cotizarSeguro(e){
    e.preventDefault();

    //Leer marca seleccionada
    const marca = document.querySelector('#marca').value;

    //Leer año seleccionado
    const year = document.querySelector('#year').value;
    
    //Leer tipo de cobertura
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    if(marca === '' || year === '' || tipo ===''){
        ui.mostrarMensaje('Todos los campos son obligatorios', 'error');
        return;   
    }
    
    ui.mostrarMensaje('Cotizando...', 'exito');

    //instanciar el seguro
    const seguro = new Seguro(marca, year, tipo);
    
    //Usar prototype para el seguro
    const total = seguro.cotizarSeguro();
}