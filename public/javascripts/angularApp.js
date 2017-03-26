var app = angular.module('flapperNews', ['ui.router']);
//
// Posts service
//
app.factory('posts', [function(){
  // service body
	var o = {
		posts: [
			{
				title: 'post 1', link: '', upvotes: 5, comments: [
					{ author: 'Joe', body: 'Cool post!', upvotes: 0 },
					{ author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0 }]},
			 { title: 'post 2', link: '', upvotes: 2, comments: [] },
			{ title: 'post 3', link: '', upvotes: 15, comments: [] },
			{ title: 'post 4', link: '', upvotes: 9, comments: [] },
			{ title: 'post 5', link: '', upvotes: 4, comments: [] }
		]
	};
	return o;
}]);
app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

	$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: '/home.html',
			controller: 'MainCtrl'
		})
		.state('posts', {
			url: '/posts/{id}',
			templateUrl: '/posts.html',
			controller: 'PostsCtrl'
		});	

  $urlRouterProvider.otherwise('home');
}]);


//
// Post controller
//
app.controller('PostsCtrl', [
'$scope',
'$stateParams',
'posts',
function($scope, $stateParams, posts){
$scope.post = posts.posts[$stateParams.id];
$scope.addComment = function(){
  if($scope.body === '') { return; }
  $scope.post.comments.push({
    body: $scope.body,
    author: 'user',
    upvotes: 0
  });
  $scope.body = '';
};
}]);

//
// Main controller
//
app.controller('MainCtrl', [ '$scope', 'posts', function($scope, posts) {
	$scope.test = 'Hello world!';
	$scope.posts = posts.posts;
  $scope.addPost = function() {
	if(!$scope.title || $scope.title === '') { return; }
	$scope.posts.push({
		title: $scope.title,
	    link: $scope.link,
		upvotes:0});
	$scope.title = '';
	$scope.link = '';
};
$scope.incrementUpvotes = function(post) {
  post.upvotes += 1;
};
}]);