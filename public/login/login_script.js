const correo = document.getElementById("email");
const pass = document.getElementById("password");
const boton = document.getElementById("boton-inicio");

const consultar = async () => {
    const email = correo.value;
    const password = pass.value;

    // Validar que los campos no estén vacíos
    if (email === '' || password === '') {
        window.alert('Los campos no pueden estar vacíos');
        return;
    }

    try {
        const res = await fetch('/login/login.html', {  // Cambia la ruta a donde estás manejando el login en tu backend
            method: 'POST',  // Cambiado a POST para enviar datos
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password  // Corregido el nombre de la propiedad 'password'
            })
        });

        const data = await res.json();  // Esperar la promesa de res.json()

        // Comprobación de éxito en la autenticación
        if (data.success) {
            window.alert("Éxito");
        } else {
            window.alert("Falló");
        }

    } catch (err) {
        console.log(err);
    }
};

boton.addEventListener('click', function (event) {
    event.preventDefault();
    consultar();
});