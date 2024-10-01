const cds = require('@sap/cds')
const { SELECT, INSERT, UPDATE, DELETE } = cds.ql

module.exports = cds.service.impl(function() {

    this.before(['CREATE','UPDATE'], 'Estudiantes', function(req) {
        console.log("Estudiantes called" + req);

        if(req.data && !req.data.Nombre){
            //req.info(400, 'Info - Nome precisa ser preenchido');
            //req.error(400, 'Error - Debe ingresar Nombre');
            req.warn(400, 'Warning- Nome precisa ser preenchido');
            //req.notify(400, 'Notify- Nome precisa ser preenchido');
        }
    
    })

    this.after('READ', 'Estudiantes', function(data) {

        const alumnos = Array.isArray(data) ? data : [data];

        alumnos.forEach((alumno) => {
            switch (alumno.Status) {
                case 'A': //Ativo
                alumno.Critico = 3;
                break;
                case 'I': //Inativo
                alumno.Critico = 2;
                break;
                case 'P': //Pendente
                alumno.Critico = 1;
                break;
                default:
                break;
                }
        })

    })

    this.before(['CREATE','UPDATE'], 'Cursos', function(req) {
        console.log("Cursos called");

        if(req.data && !req.data.Nombre){
            req.error(400, 'Error - Debe ingresar Nombre Curso');
        }

        if(req.data && req.data.MaxEstudiantes > 30){
            req.error(400, 'Error - No pueden ser mas de 30 Estudiantes');
        }
    
    })

    this.on('notificaAlumno', async function(req) {
        console.log("Notifica Alumno");
        let id;
        let alumnos;
        let query;
        let Nombre;
        let curso_ID;
        let cursos;
        let curso_nombre;
        let status;

        const params = req.params;
        if(params != null){
            let adms = await cds.connect.to('AdminService'); //> connected via OData
            for (let i = 0; i < params.length; i++) {
                if (params[i].ID != null) {
                    id = params[i].ID;
                    console.log('ID: ' + id);
                    query = SELECT `ID,Nombre,DtAniversario,curso,Status` .from `Estudiantes` .where `ID = ${id}`;
                    alumnos = await adms.run (query);
                    if (alumnos){
                        Nombre = alumnos[0].Nombre;
                        curso_ID = alumnos[0].curso_ID;
                        status = alumnos[0].Status;
                    }
                    console.log('Nombre: ' + Nombre + ' - ID Curso: ' + curso_ID);
                    query = SELECT `ID,Nombre` .from `Cursos` .where `ID = ${curso_ID}`;
                    cursos = await adms.run (query);
                    if (cursos){
                        curso_nombre = cursos[0].Nombre; 
                    }
                    console.log('Nombre Curso: ' + curso_nombre);
                    req.info(400, 'Alumno: ' + id + ' ' + Nombre + ' cursando: ' + curso_nombre + ' status: ' + status + ' notificado con exito!');
                }
            }
        }

    })

    this.on('inactivaAlumno', async function(req) {
        console.log("inactiva Alumno");

        const { Estudiantes } = this.entities;
        const params = req.params;

        if(params != null){

            for (let i = 0; i < params.length; i++) {
                if (params[i].ID != null) {
                   
                    await UPDATE.entity(Estudiantes, params[i].ID)
                    .set({Status: 'I', Comentario: req.data.text})
                
                    console.log('ID: ' + params[i].ID + ' - Status: ' + params[i].Status);
                    req.info(400, 'Alumno: ' + params[i].ID + ' ' + req.data.text + ' actualizado con exito!');
                }
            }
        }
        req.reply();

    })

})