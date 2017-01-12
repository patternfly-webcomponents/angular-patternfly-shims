/**
 * @ngdoc directive
 * @name patternfly.wc.component:pfTabs
 *
 * @description
 *  Angular component shim to wrap the pf-tabs web component
 *
 * @param {function} tabChanged function to call when the tab changes
 *
 * @example
 <example module="patternfly.wc.tooltip">
 <file name="index.html">
 <div ng-controller="TabsDemoCtrl">
  <pf-tabs tab-changed="tabChanged(event)">
    <pf-tab tabtitle="User Settings" is-active="tabOneActive">
      <h2>Tab One Content</h2>
    </pf-tab>
   <pf-tab tabtitle="User Settings" is-active="tabTwoActive">
    <h2>Tab Two Content</h2>
   </pf-tab>
  </pf-tabs>
 </div>
 </file>

 <file name="script.js">
 angular.module( 'patternfly.wc.tabs' ).controller( 'TabsDemoCtrl', function( $scope ) {
    $scope.tabOneActive = true;
    $scope.tabTwoActive = false;
    $scope.tabChanged = function (ev) {
      alert('holy guacamole! Active tab is now:' + ev.detail);
    };
 });
 </file>
 </example>
 */
angular.module('patternfly.wc.tabs').component('pfTabs', {
  bindings: {
    tabChanged: '&'
  },
  controller: ['$scope', '$element', '$rootScope', function ($scope, $element) {
    'use strict';
    var ctrl = this;

    ctrl.setActive = function (tabTitle) {
      $element[0].setActiveTab(tabTitle || '');
    };

    ctrl.$onInit = function () {
      $element[0].addEventListener('tabChanged', function (ev) {
        $scope.$parent.$broadcast('notifyTabs', {'data': ev});
        if (ctrl.tabChanged) {
          ctrl.tabChanged({'event': ev});
        }
      });
    };
  }]
})
.component('pfTab', {
  require: {
    parent: '^pfTabs'
  },
  bindings: {
    isActive: '='
  },
  controller: ['$scope', '$element', '$rootScope', function ($scope, $element) {
    'use strict';
    var ctrl = this, prevIsActive;

    ctrl.$onInit = function () {
      prevIsActive = ctrl.isActive;
    };

    ctrl.$doCheck = function () {
      if (prevIsActive !== ctrl.isActive) {
        prevIsActive = ctrl.isActive;
        if (ctrl.isActive) {
          this.parent.setActive($element[0].attributes.tabtitle.value);
          $element[0].setAttribute('active', 'true');
        } else {
          $element[0].removeAttribute('active');
        }
      }
    };

    $scope.$on('notifyTabs', function (ev, args) {
      //ensure parent scope stays in sync
      $scope.$applyAsync(function () {
        ctrl.isActive = args.data.detail === $element[0].attributes.tabtitle.value;
      });
    });
  }]
});