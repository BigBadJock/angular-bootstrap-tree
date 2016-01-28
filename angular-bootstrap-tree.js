(function () {
    'use strict';

    angular
      .module('AngularBootstrapTree', []);

    angular
      .module('AngularBootstrapTree')
      .directive("tree", function ($compile) {
          return {
              restrict: "E",
              scope: {
                  branch: '='
              },
              template: '<ul class="nav nav-pills nav-stacked">' +
                '<li class="presentation">' +
                '<a >' +
                '<div>' +
                '<span ng-show="branch.children.length>0 && !branch.isExpanded">' +
                '<i class="fa fa-plus" ' +
                'ng-click="branch.isExpanded=true;"' +
                'ng-dblclick="expand(branch, true)"></i></span>' +
                '<span ng-show="branch.children.length>0 && branch.isExpanded">' +
                '<i class="fa fa-minus"' +
                'ng-click="branch.isExpanded=false;"' +
                'ng-dblclick="expand(branch, false)"></i></span>' +
                '&nbsp;' +
                '<span ng-show="!branch.isSelected"><i class="fa fa-square-o" ng-click="toggle(branch,true)"></i></span>' +
                '<span ng-show="branch.isSelected"><i class="fa fa-check-square-o"  ng-click="toggle(branch,false)"></i></span> {{ branch.name }}' +
                '</div>' +
                '</a>' +
                '</li>' +
                '<div ng-if="branch.isExpanded" class="angular-bootstrap-tree">' +
                '<ul class="nav nav-pills nav-stacked">' +
                '<li class="presentation" ng-repeat="child in branch.children">' +
                '<tree branch="child"></tree>' +
                '</li>' +
                '</ul>' +
                '</div>' +
                '</ul>',
              compile: function (tElement, tAttr) {
                  var contents = tElement.contents().remove();
                  var compiledContents;
                  return function (scope, iElement, iAttr) {
                      if (!compiledContents) {
                          compiledContents = $compile(contents);
                      }
                      compiledContents(scope, function (clone, scope) {
                          iElement.append(clone);
                      });
                  };
              },
              controller: function ($scope) {

                  $scope.toggle = function (root, setting, depth) {
                      if (!depth) {
                          depth = 0
                      }
                      if (setting === null || setting === undefined) {
                          setting = !root.isSelected;
                      }
                      root.isSelected = setting;
                      root.children.forEach(function (branch) {
                          $scope.toggle(branch, setting, depth + 1);
                      });
                      if (depth === 0) {
                          $scope.checkParent(root.parent);
                      }
                  }

                  $scope.expand = function (root, setting) {
                      if (!setting) {
                          setting = !root.isExpanded;
                      }
                      root.isExpanded = setting;
                      root.children.forEach(function (branch) {
                          $scope.expand(branch, setting);
                      });
                  }

                  $scope.checkParent = function (root) {
                      var selected = false;
                      root.children.forEach(function (branch) {
                          if (branch.isSelected) {
                              selected = true;
                          }
                      });
                      root.isSelected = selected;
                      $scope.checkParent(root.parent);
                  }

              }
          };
      });
})();
