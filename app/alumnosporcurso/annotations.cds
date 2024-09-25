using EstudiantesService as service from '../../srv/service';
annotate service.EstudiantesByCursos with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'Nombre',
                Value : Nombre,
            },
            {
                $Type : 'UI.DataField',
                Label : 'NombreEstudiante',
                Value : NombreEstudiante,
            },
            {
                $Type : 'UI.DataField',
                Label : 'DataAniversario',
                Value : DataAniversario,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'Nombre',
            Value : Nombre,
        },
        {
            $Type : 'UI.DataField',
            Label : 'NombreEstudiante',
            Value : NombreEstudiante,
        },
        {
            $Type : 'UI.DataField',
            Label : 'DataAniversario',
            Value : DataAniversario,
        },
    ],
);

