using { entrenamiento, sap.common } from '../db/schemas';

@path: 'service/admin'
service AdminService {

    type inText: {
        comment: String;
    }

    entity Estudiantes as projection on entrenamiento.Alumnos actions {
        @Common.IsActionCritical
        action notificaAlumno(); 
        @Common.IsActionCritical
        action inactivaAlumno(text:inText:comment);
    };

    entity Cursos as projection on entrenamiento.Cursos;

    annotate Estudiantes with @odata.draft.enabled;
    annotate Estudiantes with @odata.draft.bypass;

    annotate Cursos with @odata.draft.enabled;
    annotate Cursos with @odata.draft.bypass;

}
annotate AdminService with @(requires:'admin');


service EstudiantesService {
    @readonly
    view EstudiantesByCursos as 
        select from entrenamiento.Cursos as CursosEstudiantes {
            key ID,
            Nombre,
            estudiantes.Nombre as NombreEstudiante,
            estudiantes.DtAniversario as DataAniversario
        }
}

annotate EstudiantesService with @(requires:'viewer');

annotate AdminService.inText:comment with @Common.Label : 'Comentarios';
annotate AdminService.inText:comment with @UI.MultiLineText : true;