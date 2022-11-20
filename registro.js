const formulario = document.getElementById('registro_formulario');
const inputs = document.querySelectorAll('#registro_formulario input')
const iconEye = document.querySelector(".icon-eye")


const expresiones = {
    nombre : /^[a-zA-Z\á\é\í\ó\ú]{2,25}\s?([a-zA-Z\á\é\í\ó\ú]*)?\s?$/,
    apellido: /^[a-zA-Z\á\é\í\ó\ú]{2,25}\s?([a-zA-Z\á\é\í\ó\ú]*)?\s?$/,
    correo: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
    password: /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{12,18}$/,
}

const campos = {
    nombre: false,
    apellido: false,
    correo: false,
    password: false
}

const validarFormulario = (e) => {
    switch(e.target.name) {
        case "nombre":
            validarCampo(expresiones.nombre, e.target, e.target.name);
        break
        case "apellido":
            validarCampo(expresiones.apellido, e.target, e.target.name);
        break
        case "correo":
            validarCampo(expresiones.correo, e.target, e.target.name);
        break
        case "password":
            validarCampo(expresiones.password, e.target, e.target.name);
        break
    }
}

const validarCampo = (expresion, input, campo) => {
    if(expresion.test(input.value)){
        document.getElementById(`form_${campo}`).classList.remove('form-item-incorrecto');
        document.getElementById(`form_${campo}`).classList.add('form-item-correcto');
        document.querySelector(`#form_${campo} .input_error`).classList.remove('input_error-activo');
        campos[campo] = true;
    } else{
        document.getElementById(`form_${campo}`).classList.add('form-item-incorrecto');
        document.getElementById(`form_${campo}`).classList.remove('form-item-correcto');
        document.querySelector(`#form_${campo} .input_error`).classList.add('input_error-activo');
        campos[campo] = false;
    }
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});


iconEye.addEventListener('click', function(){
    const icon = this.querySelector("i");

    if (this.nextElementSibling.type === 'password') {
        this.nextElementSibling.type = 'text'
        icon.classList.remove("fa-eye")
        icon.classList.add("fa-eye-slash")
    } else {
        this.nextElementSibling.type = 'password'
        icon.classList.remove("fa-eye-slash")
        icon.classList.add("fa-eye")
    }
});

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    if(campos.nombre && campos.apellido && campos.correo && campos.password){
        formulario.reset();
        console.log('Formulario exitoso');
        document.querySelectorAll('.form-item-correcto').forEach((contorno) => {
            contorno.classList.remove('form-item-correcto');
        });
        document.getElementById('form-mensaje').classList.remove('form-mensaje-activo');
    } else {
        document.getElementById('form-mensaje').classList.add('form-mensaje-activo');
    }
});