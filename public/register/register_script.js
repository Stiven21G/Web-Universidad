const nombre = document.getElementById('name');
const apellido = document.getElementById('last-name');
const correo = document.getElementById('email');
const pass = document.getElementById('pass');
const boton = document.getElementById('boton-registro');

const sendData = async () => {
    // Recibir Datos
    const names = nombre.value;
    const lastName = apellido.value;
    const email = correo.value;
    const password = pass.value;

    if (names === '' || lastName === '' || email === '' || password === '') {
        window.alert('Los campos no pueden estar vacios');
        return;
    }  
    try{
        const response = await fetch('/register/',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                names, lastName, email, password
            })
        });
        if(!response.ok) throw new Error('Fallo interno en el servidor');
        
        const resultado = await response.text();
        console.log('Server response:' + resultado);
        window.alert('Datos enviados con exito');

    } catch(err){
        window.alert(err)
    }
}

boton.addEventListener('click', function (event) {
    event.preventDefault();
    sendData();

})