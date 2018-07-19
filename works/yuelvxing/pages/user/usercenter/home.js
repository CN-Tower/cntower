/**
 *  usercenter
 */

requirejs([requirePath.CONFIG], function () {
    require(['usercenter'])
});

define('usercenter', ['angular', 'angular-route'], function () {
    var app = angular.module('myapp', ['ngRoute']);
    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/home/:email', {
                templateUrl: './view/home.tpl.html',
                controller: 'homeCtrl',
                resolve: {}
            })
            .when('/setting', {
                templateUrl: './view/setting.tpl.html',
                controller: 'setCtrl',
                resolve: {}
            })
            .otherwise('/home');
    }]);
    app.run(['$rootScope', '$location', '$http', function ($rootScope, $location, $http) {

    }]);
    app
        .controller('myCtrl', ['$scope', function ($scope) {

        }])
        .controller('homeCtrl', ['$scope', '$routeParams', '$http', '$rootScope','trimFilter', function ($scope, $routeParams, $http, $rootScope,trimFilter) {
            var emailParams = $routeParams.email; // 获取路由参数
            $http.post('/api/user/find/' + emailParams)
                .success(function (res) {
                    if (res && res.status) {
                        var userInfo = res.data;
                        $rootScope.userInfo = userInfo;
                    }
                })
                .error(function (err) {
                    console.log(err)
                });
            //$scope.username = trimFilter('   daf');
            // $scope.username = '  daf';
        }])
        .controller('setCtrl', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
            var userInfo = $rootScope.userInfo;
            $scope.username = userInfo.username;
            $scope.description = userInfo.description;
            $scope.location = userInfo.location;
            $scope.submit = function (btn) {
                if (btn == 'btn_uinfo') { // 更新基本信息
                    var id = $rootScope.userInfo._id;
                    var username = $scope.username;
                    var description = $scope.description;
                    var location = $scope.location;
                    if (username !== '') {
                        var data = {
                            id: id,
                            username: username,
                            description: description,
                            location: location
                        };
                        $http.post('/api/user/update', data) // 更新指定数据
                            .success(function (res) {
                                alert(res.message)
                            }).error(function (err) {
                            console.log(err)
                        })

                    }
                    else {
                        alert('昵称不能为空');
                        return false;
                    }
                }
                if (btn == 'btn_mail') { // 更新邮箱
                    var id = $rootScope.userInfo._id;
                    var newEmail = $scope.newEmail;
                    var currentPassword = $scope.currentPassword;
                    if (newEmail !== '' && currentPassword !== '') {
                        var data = {
                            id: id,
                            newEmail: newEmail,
                            currentPassword: currentPassword
                        };
                        $http.post('/api/user/update', data) // 更新指定数据
                            .success(function (res) {
                                alert(res.message)
                            })
                            .error(function (err) {
                                console.log(err)
                            })
                    } else {
                        alert('邮箱或密码不能为空!');
                        return false;
                    }

                }
                if (btn == 'btn_pwd') {
                    var id = $rootScope.userInfo._id;
                    var oldPwd = $scope.oldPwd;
                    var newPwd = $scope.newPwd;
                    var repPwd = $scope.repPwd;
                    // 查询数据库,验证oldPwd通过
                    var data = {
                        id: id,
                        oldPwd: oldPwd,
                        newPwd: newPwd
                    };
                    if (newPwd !== '' && repPwd !== '' && newPwd === repPwd && newPwd !== oldPwd) {
                        $http.post('/api/user/update', data) // 更新指定数据
                            .success(function (res) {
                                alert(res.message)
                            })
                            .error(function (err) {
                                console.log(err)
                            })
                    } else {
                        alert('请检查输入密码!')
                    }
                }
            }
        }]);
    app.filter('trim', [function () {
        return function (data) {
            if (typeof data == 'string') {
                return $.trim(data);
            }
        }
    }]);
    // 手动绑定ng-app 给document
    angular.bootstrap(document, ['myapp']);
});


