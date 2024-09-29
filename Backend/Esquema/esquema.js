import z from 'zod';

const validar = z.object({
    names: z.string({
        required_error: 'Nombres Requeridos'
    }),
    lastName: z.string({
        required_error: 'Apellidos Requeridos'
    }),
    email: z.string().
    endsWith('@ucundinamarca.edu.co',{message:'El correo debe ser institucional'})  ,

    password: z.string()
    .min(8, { message: 'La contraseña debe tener al menos 8 caracteres.' }) // Longitud mínima
    .max(20, { message: 'La contraseña no puede tener más de 20 caracteres.' }) // Longitud máxima
    .regex(/[A-Z]/, { message: 'La contraseña debe contener al menos una letra mayúscula.' }) // Al menos una mayúscula
    .regex(/[a-z]/, { message: 'La contraseña debe contener al menos una letra minúscula.' }) // Al menos una minúscula
    .regex(/[0-9]/, { message: 'La contraseña debe contener al menos un número.' }) // Al menos un número
    .regex(/[@$!%*?&]/, { message: 'La contraseña debe contener al menos un carácter especial.' }) // Al menos un carácter especial
});



function validarDatos(object){
    return validar.safeParse(object);
}

export {validarDatos};