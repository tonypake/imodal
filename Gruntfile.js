/*!
 * Dialog's Gruntfile
 * https://github.com/cleverche/dialog
 * Copyright 2016-2017 The Dialog Authors
 * Licensed under MIT (https://github.com/cleverche/dialog/blob/master/LICENSE)
 */
//包含了整个Grunt配置信息
module.exports = function(grunt) {
	//js使用严格模式
	'use strict';
	
	//初始化 configuration配置对象
	grunt.initConfig({
		//从package.json 文件读入项目配置信息，并存入pkg 属性内。这样就可以让我们访问到package.json文件中列出的属性了
		pkg: grunt.file.readJSON('package.json'),
		//文件开头的banner
		banner: '/*!\n' +
            ' * Dialog v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
            ' * Copyright 2016-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' * Licensed under MIT (https://github.com/cleverche/dialog/blob/master/LICENSE)\n' +
            ' */\n',
		//任务配置
		//清除内容任务
		clean: {
			dist: 'dist',
			docs: 'docs/dist'
		},
		//静态文件服务器
		connect: {
			options: {
				port: 3000,
				hostname: '*', //默认就是这个值，可配置为本机某个 IP，localhost 或域名
				base: '.',
				livereload: 35729  //声明给 watch 监听的端口
			},
			server: {
				options: {
					open: true //自动打开网页 http://
				}
			}
		},
		//监视文件的改变
		watch: {
			files: ['<%= jshint.files %>'],
			tasks: ['jshint'],
			livereload: {
				options: {
					livereload: '<%=connect.options.livereload%>'  //监听前面声明的端口  35729
				},
				files: [  //下面文件的改变就会实时刷新网页
					'index.html',
					'<%= pkg.name %>.css',
					'<%= pkg.name %>.js'
				]
			}
		},
		jshint: {
		  files: ['Gruntfile.js', 'dist/**/*.js', 'examples/**/*.js'],
		  options: {
			globals: {
			  jQuery: true
			}
		  }
		}
		
	});
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['jshint']);
};