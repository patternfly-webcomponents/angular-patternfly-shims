/**
 * @ngdoc directive
 * @name patternfly.wc.component:pfUtilizationBarChart
 *
 * @description
 *  Angular component shim to wrap the pf-utilization-bar-chart web component
 *
 * @example
 <example module="patternfly.wc.charts">
 <file name="index.html">
 <div ng-controller="ChartsDemoCtrl">
   <pf-utilization-bar-chart
     threshold-set="thresholdSet(event)"
     id="thresholdExample"
     layout="default"
     chart-title="RAM Usage"
     used="{{used}}"
     total="100"
     units="MB"
     threshold-warning="60"
     threshold-error="85">
   </pf-utilization-bar-chart>
 </div>
 </file>

 <file name="script.js">
 angular.module('patternfly.wc.charts' ).controller( 'ChartsDemoCtrl', function( $scope ) {
   activate();

  function activate () {
    //loading / utilization bar chart
    $scope.loading = false;
    $scope.used = 10;

    $interval(function () {
      if ($scope.used > 100) {
        $scope.used = 10;
      } else {
        $scope.used += 10;
      }
    }, 1900);
  }

  $scope.thresholdSet = function (e) {
    //monitor threshold here!
    var threshold = e.detail.threshold;
  };
 });
 </file>
 </example>
 */
angular.module('patternfly.wc.charts').component('pfUtilizationBarChart', {
  bindings: {
    thresholdSet: '&'
  },
  controller: ['$scope', '$element', function ($scope, $element) {
    'use strict';
    var ctrl = this;

    ctrl.$onInit = function () {
      $element[0].addEventListener('thresholdSet', function (ev) {
        if (ctrl.thresholdSet) {
          ctrl.thresholdSet({'event': ev});
        }
      });
    };
  }]
});
