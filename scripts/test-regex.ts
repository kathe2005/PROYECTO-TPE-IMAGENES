import test from "node:test";

// PRUEBA DE CAMPO PARA LOS DOMINIOS 
const emailRegex = /^[^\s@]+@(gmail\.com|hotmail\.com|outlook\.com|yahoo\.com|est\.ucab\.edu\.ve|ucab\.edu\.ve)$/i; 

const tests = 
[
    { email: "kamaya.23@est.ucab.edu.ve", expected: true },    //Alumno UCAB
    { email: "yor.forger@ucab.edu.ve", expected: true },       //Profesor UCAB
    { email: "anya@gmail.com", expected: true },               //Global 
    { email: "spy@ostania,com", expected: false },             //Bloqueado
    { email: "fake@outlook.es", expected: false }              //Bloqueado (solo .com)
]


console.log("--- 🕵️ REPORTE DE INFILTRACIÓN ---"); 
tests.forEach
(
    (
        { email, expected }
    ) => 
    {
        const passed = emailRegex.test(email); 
        console.log(`${passed === expected ? '✅' : '❌'} Email: ${email.padEnd(30)} -> ${passed ? 'AUTORIZADO' : 'RECHAZADO'}`); 
    }
); 