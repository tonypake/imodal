/*!
 * Dialog's Gruntfile
 * https://github.com/cleverche/dialog
 * Copyright 2016-2017 The Dialog Authors
 * Licensed under MIT (https://github.com/cleverche/dialog/blob/master/LICENSE)
 */
//����������Grunt������Ϣ
module.exports = function(grunt) {
	//jsʹ���ϸ�ģʽ
	'use strict';
	
	//��ʼ�� configuration���ö���
	grunt.initConfig({
		//��package.json �ļ�������Ŀ������Ϣ��������pkg �����ڡ������Ϳ��������Ƿ��ʵ�package.json�ļ����г���������
		pkg: grunt.file.readJSON('package.json'),
		//�ļ���ͷ��banner
		banner: '/*!\n' +
            ' * Dialog v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
            ' * Copyright 2016-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' * Licensed under MIT (https://github.com/cleverche/dialog/blob/master/LICENSE)\n' +
            ' */\n',
		//��������
		//�����������
		clean: {
			dist: 'dist',
			docs: 'docs/dist'
		},
		//connect������
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