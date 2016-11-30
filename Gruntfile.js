/*!
 * Dialog's Gruntfile
 * https://github.com/cleverche/dialog
 * Copyright 2016-2017 The Dialog Authors
 * Licensed under MIT (https://github.com/cleverche/dialog/blob/master/LICENSE)
 */
//����������Grunt������Ϣ
module.exports = function(grunt) {
	//��ʼ�� configuration���ö���
	grunt.initConfig({
		//��package.json �ļ�������Ŀ������Ϣ��������pkg �����ڡ������Ϳ��������Ƿ��ʵ�package.json�ļ����г���������
		pkg: grunt.file.readJSON('package.json'),
		//��������
		jshint: {
		  files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
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