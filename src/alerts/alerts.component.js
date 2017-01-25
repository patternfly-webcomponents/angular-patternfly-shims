/**
 * @ngdoc directive
 * @name patternfly.wc.component:pfAlert
 *
 * @description
 *  Angular component shim to wrap the pf-alert web component
 *
 * @example
 <example module="patternfly.wc.alert">
 <file name="index.html">
 <pf-alert type="info" ng-attr-persistent="{{isPersistent}}">
 {{alertContent}}
 </pf-alert>
 </file>

 <file name="script.js">
 angular.module( 'patternfly.wc.alert' ).controller( 'AlertDemoCtrl', function( $scope ) {
   $scope.alertContent = "Hello world.";
   $scope.isPersistent = true;
 });
 </file>
 </example>
 */
angular.module('patternfly.wc.alert').component('pfAlert', {
  controller: ['$scope', '$element', function ($scope, $element) {
    'use strict';
    var ctrl = this;

    //empty shim for now...
  }]
});