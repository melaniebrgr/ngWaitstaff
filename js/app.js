angular.module('myApp', ['ngMessages'])
	.controller('myController', function($scope) {
		$scope.charges_data = {
			subtotal: 0,
			tip: 0,
			total: 0
		};
		$scope.master_data = {
			tipTotal: 0,
			mealCount: 0,
			avgTips: 0
		};

		$scope.submit = function() {
			$scope.charges_data.subtotal = $scope.meal_data.baseMealPrice * (1+($scope.meal_data.taxRate/100));
			$scope.charges_data.tip = $scope.charges_data.subtotal * ($scope.meal_data.tipPercentage/100);
			$scope.charges_data.total = $scope.charges_data.subtotal + $scope.charges_data.tip;
			
			$scope.master_data.tipTotal += $scope.charges_data.tip;
			$scope.master_data.mealCount += 1;
			$scope.master_data.avgTips = $scope.master_data.tipTotal/$scope.master_data.mealCount;
		};

		$scope.cancel = function(name) {
			var form = document.getElementsByName(name)[0],
				inputs = Array.from(form.getElementsByTagName('input'));
			inputs.forEach(function(el) {
				el.value = '';
			});
			for (var data in $scope.charges_data) {
				$scope.charges_data[data] = 0;
			}
			console.log($scope.charges_data);
		}
	});