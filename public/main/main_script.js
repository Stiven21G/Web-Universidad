const boton = document.getElementById('botonEnviar');

const enviar = async () => {
    const nombreProyecto = document.getElementById("nombreProyecto").value;
    const email1 = document.getElementById("email1").value;
    const email2 = document.getElementById("email2").value;
    const ciclos = document.getElementById("ciclos").value;
    const archivo = document.getElementById("archivoPDF").files[0]; // Getting the PDF file

    if (nombreProyecto === '' || email1 === '' || email2 === '' || ciclos === '' || !archivo) {
        window.alert('Asegúrese de llenar todos los campos y seleccionar un archivo');
        return;
    }

    // Create FormData to send text fields and the file
    const formData = new FormData();
    formData.append('nombreProyecto', nombreProyecto);
    formData.append('email1', email1);
    formData.append('email2', email2);
    formData.append('ciclos', ciclos);
    formData.append('archivo', archivo); // Append the PDF file

    try {
        const response = await fetch('/main', {
            method: 'POST',
            body: formData // Send the FormData object
        });

        if (!response.ok) throw new Error('Fallo interno en el servidor');

        const resultado = await response.text();
        console.log('Server response: ' + resultado);
        window.alert('Datos y archivo enviados con éxito');
    } catch (err) {
        window.alert('Error: ' + err.message);
    }
};

boton.addEventListener('click', function (event) {
    event.preventDefault();
    enviar();
});