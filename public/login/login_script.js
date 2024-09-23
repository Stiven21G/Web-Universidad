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
    try{
        const response = await fetch('/login',{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({email, password})
        });
        

        const resultado = await response.text();

        
            if (response.ok) {
                    // Redirigir al usuario a la página principal
                    window.location.href = '/main/main.html';  // Asegúrate de que la ruta sea correcta
                } else if(!response.ok){
                    //ACA DEBE IR CONTRASEÑA INCORRECTA DENTRO DEL HTML
                } 
        console.log('Server response:' + resultado);


    } catch(err){
        window.alert(err)
    }
    
};

boton.addEventListener('click', function (event) {
    event.preventDefault();
    consultar();
});