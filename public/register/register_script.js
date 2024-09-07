const nombre = document.getElementById('name')
const apellido = document.getElementById('last-name')
const correo = document.getElementById('email')
const password = document.getElementById('pass')
const boton = document.getElementById('boton-registro')

const sendData = async () => {
    const names = nombre.value
    const lastName = apellido.value
    const email = correo.value
    const pass = password.value

    if (names === '' || lastName === '' || email === '' || password === '') {
        window.alert('Los campos no pueden estar vacios')
        return
    }
    try {
        // Enviar a la ubicacion
        const response = await fetch('/register', {
            // METODO
            method: 'POST',
            //CABECERA
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ names, lastName, email, pass }),

        });
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }

        const result = await response.text(); // O .json() si el servidor responde con JSON
        console.log('Server response:', result);
        window.alert('Datos enviados con éxito');
    } catch (error) {
        console.log(error)
    }
}


boton.addEventListener('click', function (event) {
    event.preventDefault();
    sendData();

})