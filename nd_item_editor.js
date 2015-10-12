/* 2 way databinding for elements with contenteditable */
angular.module('commonDirectives', [])
.directive('contenteditable', function() {
  return {
    require: '?ngModel',
    link: function(scope, element, attr, ctrl) {
      if(!ctrl) {return;}

      element.bind('input enterKey keyup', function() {
        var rerender = false;
        var html = element.html();

        if(attr.noLineBreaks) {
          html = html.replace(/<div>/g, '').replace(/<br>/g, '').replace(/<\/div>/g, '');
          rerender = true;
        }

        scope.$apply(function() {
          ctrl.$setViewValue(html);
          if(rerender) {
            ctrl.$render();
          }
        });
      });

      ctrl.$render = function(e) {
        element.html(ctrl.$viewValue);
      };

      ctrl.$render();
    }
  }
});

angular.module('ngDirectivesPrac', [])
.controller('ItemsCtrl', function() {
  this.items = [
    {a: 'a1', b:'b1'},
    {a: 'a2', b:'b2'},
    {a: 'a3', b:'b3'},
    {a: 'a4', b:'b4'}
  ];
});

angular.module('ngDirectivesPracForm', [])
.directive('ndItemEditorForm', function() {
  return {
    scope: {
      items: '=',
    },
    link: function(scope, element, attr, ctrl) {
      ctrl.item = {a:'', b:''};
    },
    templateUrl: 'nd_item_editor.html',
    replace: true,
    controller: 'ItemEditorFormCtrl',
    controllerAs: 'ctrl'
  };
})

.controller('ItemEditorFormCtrl', function($scope) {
  this.add = function() {
    if((this.item.a !== '') && (this.item.b !== ''))
      $scope.items.push(this.item);
      this.item = {a:'', b:''};
  };
});

angular.module('itemApp', ['ngDirectivesPrac', 'ngDirectivesPracForm', 'commonDirectives'])
