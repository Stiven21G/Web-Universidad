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
      
    const data = await response.json();
    if (!response.ok) {
        console.error('Error:', data);
        alert(`Error: ${data.message}\nDetalles: ${JSON.stringify(data.errors)}`);
    } else {
        console.log('Success:', data);
        alert('Registro exitoso');
    }

    } catch(err){
        window.alert(err);
    }
}

boton.addEventListener('click', function (event) {
    event.preventDefault();
    sendData();

})