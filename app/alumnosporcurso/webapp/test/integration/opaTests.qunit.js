sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'alumnosporcurso/test/integration/FirstJourney',
		'alumnosporcurso/test/integration/pages/EstudiantesByCursosList',
		'alumnosporcurso/test/integration/pages/EstudiantesByCursosObjectPage'
    ],
    function(JourneyRunner, opaJourney, EstudiantesByCursosList, EstudiantesByCursosObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('alumnosporcurso') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheEstudiantesByCursosList: EstudiantesByCursosList,
					onTheEstudiantesByCursosObjectPage: EstudiantesByCursosObjectPage
                }
            },
            opaJourney.run
        );
    }
);