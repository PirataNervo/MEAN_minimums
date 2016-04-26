(function() {
    var app = angular.module('Minimos');
	
	app.controller('MainController', ['$scope', '$http', function($scope, $http) {
		
		$scope.subjects = [];
		
		$http.get('/api/subjects/').then(function(response){
			data = response.data;
			
			$scope.subjects = data;
		});
	}]);
	
	app.controller('StudentController', ['$scope', '$http', function($scope, $http) {
		
		// Add Student
		$scope.addStudent = function(){
			
			$scope.error = null;
			$scope.success = null;
			
			// Process phone numbers into an array
			$scope.student.phones = [{ 'mobile' : $scope.student.mobileNumber}, {'home' : $scope.student.homeNumber }];
			
			$http.post('/api/students/', $scope.student).then(function successCallback(response) {
				data = response.data;
				
				$scope.success = { message: data.message };
				
			}, function errorCallback(response) {
				data = response.data;
				
				$scope.error = { message: data.message };s
			});
		};
	}]);
	
	app.controller('SubjectController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
		
		// Get all students
		$http.get('/api/students/').then(function(response){
			data = response.data;
			
			$scope.students = data;
		});
		
		// Get subject data
		$http.get('/api/subjects/'+$routeParams.id).then(function(response){
			data = response.data;
			
			$scope.subject = data;
		});
		
		// Add Student
		$scope.assignStudent = function(subject){
			
			$scope.assignError = null;
			$scope.assignSuccess = null;
			
			if(typeof $scope.formStudent === 'undefined')
			{
				$scope.assignError = { message: 'Please select a student.' };
			}
			else
			{
				$http.post('/api/students/assign/'+$scope.formStudent+'/'+subject).then(function successCallback(response) {
					data = response.data;
					
					$scope.subject.students.push(data.student);
					
					$scope.assignSuccess = { message: data.message };
					$scope.assignError = null;
					
				}, function errorCallback(response) {
					data = response.data;
					
					$scope.assignError = { message: data.message };
					$scope.assignSuccess = null;
				});
			}
		};
	}]);
	
	app.controller('ProfileController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
		
		// Get student data
		$http.get('/api/students/'+$routeParams.id).then(function(response){
			data = response.data;
			
			data.mobile = data.phones[Object.keys(data.phones)[0]].mobile;
			data.home = data.phones[Object.keys(data.phones)[1]].home;
			
			$scope.profile = data;
		});
	}]);
})();