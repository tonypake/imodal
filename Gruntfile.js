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
		//connect服务器
		connect: {
			server: {
				options: {
					port: 3000,
					base: '.'
				}
			}
		},
		jshint: {
		  files: ['Gruntfile.js', 'src/**/*.js', 'examples/**/*.js'],
		  options: {
			globals: {
			  jQuery: true
			}
		  }
		},
		watch: {
		  files: ['<%= jshint.files %>'],
		  tasks: ['jshint']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['jshint']);
};