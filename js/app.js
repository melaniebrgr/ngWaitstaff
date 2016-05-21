angular.module('myApp', ['ngMessages', 'ngRoute'])
	.config(function($routeProvider) {
		$routeProvider.when('/', {
			templateUrl: 'home.html',
			controller: 'homeCtrl'
		})
		.when('/newmeal', {
			templateUrl: 'newmeal.html',
			controller: 'mealCtrl'
		})
		.when('/myearnings', {
			templateUrl: 'myearnings.html',
			controller: 'earningsCtrl'
		})
		.when('/error', {
			template: '<p>Error – page not found</p>'
		})
		.otherwise('/error');
	})
	.run(function($rootScope, $location) {
		$rootScope.charges_data = {
			subtotal: 0,
			tip: 0,
			total: 0
		};
		$rootScope.master_data = {
			tipTotal: 0,
			mealCount: 0,
			avgTips: 0
		};
	    $rootScope.$on('$routeChangeError', function() {
	        $location.path('/error');
	    });
	})	
	.controller('homeCtrl', function($scope, $rootScope) {
		// Nothing here
	})
	.controller('mealCtrl', function($scope, $rootScope) {

		$scope.submit = function() {
			$rootScope.charges_data.subtotal = $scope.meal_data.baseMealPrice * (1+($scope.meal_data.taxRate/100));
			$rootScope.charges_data.tip = $scope.charges_data.subtotal * ($scope.meal_data.tipPercentage/100);
			$rootScope.charges_data.total = $scope.charges_data.subtotal + $scope.charges_data.tip;
			
			$rootScope.master_data.tipTotal += $scope.charges_data.tip;
			$rootScope.master_data.mealCount += 1;
			$rootScope.master_data.avgTips = $scope.master_data.tipTotal/$scope.master_data.mealCount;
			console.log('meal charges', $rootScope.charges_data);
			console.log('earnings', $rootScope.master_data);
			$rootScope.clearMeal();
		};

		$rootScope.clearMeal = function() {
			var form = document.getElementsByName('mealDetails__form')[0],
				inputs = Array.from(form.getElementsByTagName('input'));
			inputs.forEach(function(el) {
				el.value = '';
			});
		};

		$rootScope.clearCustCharges = function() {
			for (var data in $rootScope.charges_data) {
				$rootScope.charges_data[data] = 0;
			}			
		}
	})
	.controller('earningsCtrl', function($scope, $rootScope) {
		$scope.reset = function() {
			$rootScope.clearMeal();
			$rootScope.clearCustCharges();
			for (var data in $rootScope.master_data) {
				$rootScope.master_data[data] = 0;
			}
		};
	});