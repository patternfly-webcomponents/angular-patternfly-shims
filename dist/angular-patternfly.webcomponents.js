/**
 * @name  patternfly
 *
 * @description
 *   Charts module for patternfly web components. Must Include d3.js and c3.js to use
 *
 */
angular.module('patternfly.wc.charts', []);;/**
 * @name  patternfly
 *
 * @description
 *   Base module for patternfly webcomponents.
 */
angular.module('patternfly.webcomponents', [
  'patternfly.wc.tooltip',
  'patternfly.wc.tabs',
  'patternfly.wc.charts'
]);

;/**
 * @name  patternfly
 *
 * @description
 *   Tabs shim module for patternfly web components.
 *
 */
angular.module('patternfly.wc.tabs', []);
;/**
 * @name  patternfly
 *
 * @description
 *   Tooltip shim module for patternfly web components.
 *
 */
angular.module('patternfly.wc.tooltip', []);
;/**
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
;/**
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
});;/**
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
