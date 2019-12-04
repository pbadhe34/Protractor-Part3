function updateList($scope) {
$scope.todos = [
{text:'buy vegetables', done:true},
{text:'buy Sauce', done:false},
{text:'get Laundry', done:false},
{text:'call SweetHeart', done:false},
{text:'inform office about Leave', done:false}];
 
 
$scope.addTodo = function() {
$scope.todos.push({text:$scope.todoText, done:false});
$scope.todoText = '';
};
 
$scope.remaining = function() {
var count = 0;
	angular.forEach($scope.todos, function(todo) {
	count += todo.done ? 0 : 1;
	});
return count;
};
 
$scope.archive = function() {
var oldTodos = $scope.todos;
$scope.todos = [];
	angular.forEach(oldTodos, function(todo) {
	if (!todo.done) $scope.todos.push(todo);
	});
 };
}