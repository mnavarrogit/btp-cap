sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'alumnos/test/integration/FirstJourney',
		'alumnos/test/integration/pages/EstudiantesList',
		'alumnos/test/integration/pages/EstudiantesObjectPage'
    ],
    function(JourneyRunner, opaJourney, EstudiantesList, EstudiantesObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('alumnos') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheEstudiantesList: EstudiantesList,
					onTheEstudiantesObjectPage: EstudiantesObjectPage
                }
            },
            opaJourney.run
        );
    }
);