angular
  .module("SampleApp", ['AngularBootstrapTree']);

angular
  .module("SampleApp")
  .controller("SampleController", SampleController);

SampleController.$inject = ["$scope"];

function SampleController($scope) {
  var vm = this;
  vm.expandAll = expandAll;

  
  vm.data = newItem(0,"Portal");
  var item1 = addChild(vm.data, 1, "Search");
  var item2 = addChild(vm.data, 2, "Dashboard");
  var item3 = addChild(vm.data, 3, "Item 3");
  var item4 = addChild(vm.data, 4, "Item 4");
  
  item4.isSelected=true;
  item1.isExpanded = true;
  addChild(item1, 5, "Policy Search.");
  addChild(item1, 6, "Claims Search.");
  addChild(item2, 7, "Underwriter Dashboard.");
  addChild(item2, 8, "Claims Dashboard.");


  function newItem(id, name) {
    return {
      id: id,
      name: name,
      children: [],
      isExpanded: false,
      isSelected: false,
    };
  }
  
  function addChild(parent, id, name) {
    var child = newItem(id, name);
    child.parent = parent;
    parent.children.push(child);
    return child;
  }

  function expandAll(root, setting){
    if(! setting){
      setting = ! root.isExpanded;
    }
    root.isExpanded = setting;
    root.children.forEach(function(branch){
      expandAll(branch, setting);
    });
  }

}
