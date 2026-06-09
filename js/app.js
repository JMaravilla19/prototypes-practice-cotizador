// ******* CONSTRUCTORES *******
function Seguro(marca, year, tipo){
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
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
        console.log("No pasó validacion");
        
    }else{
        console.log("Si pasó la validación");
        
    }
    
    
}