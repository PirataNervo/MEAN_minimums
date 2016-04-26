(function() {
    var app = angular.module('Minimos', ['ngRoute']);

	// configure our routes
    app.config(function($routeProvider) {

        $routeProvider
            // route for the home page
            .when('/', {
                templateUrl : 'index/subjects.html'
            })
            // route for the home page
            .when('/index', {
                templateUrl : 'index/subjects.html',
				//controller  : 'SubjectController'
            })
			// route for specific subject
			.when('/subject/:id', {
                templateUrl : 'index/subject.html',
				controller  : 'SubjectController'
            })
			// route for specific student
			.when('/student/:id', {
                templateUrl : 'index/student.html',
				controller  : 'ProfileController'
            });
    });
})();