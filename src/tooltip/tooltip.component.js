/**
 * @ngdoc directive
 * @name patternfly.wc.component:pfTooltip
 *
 * @description
 *  Angular component shim to wrap the pf-tooltip web component
 *
 * @example
 <example module="patternfly.wc.tooltip">
 <file name="index.html">
 <form class="form-horizontal" ng-controller="TooltipDemoCtrl">
 <pf-tooltip placement="right" targetselector="#lastNameLabel">
 {{tooltipContent}}
 </pf-tooltip>
 <label id="lastNameLabel" for="last_name">Last Name</label>
 <input type="text" class="form-control" id="last_name" value="Smith"/>
 </form>
 </file>

 <file name="script.js">
 angular.module( 'patternfly.wc.tooltip' ).controller( 'TooltipDemoCtrl', function( $scope ) {
   $scope.tooltipContent = "Hello world.";
 });
 </file>
 </example>
 */
angular.module('patternfly.wc.tooltip').component('pfTooltip', {
  controller: ['$scope', '$element', function ($scope, $element) {
    'use strict';
    var ctrl = this;

    ctrl.$onInit = function () {
      //observe DOM changes and notify pf-tooltip CE
      var observer = new MutationObserver(function (mutations) {
        $element[0].dispatchEvent(new CustomEvent('handleContentChanged',{}));
      });
      observer.observe($element[0], {
        childList: true,
        subtree: true,
        characterData: true
      });
    };
  }]
});
