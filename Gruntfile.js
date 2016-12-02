/*!
 * Dialog's Gruntfile
 * https://github.com/cleverche/iModal
 * Copyright 2016-2017 The Dialog Authors
 * Licensed under MIT (https://github.com/cleverche/iModal/blob/master/LICENSE)
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
            ' * Licensed under MIT (https://github.com/cleverche/iModal/blob/master/LICENSE)\n' +
            ' */\n',
		//��������
		//�����������
		clean: {
			dist: 'dist',
			docs: 'docs/dist'
		},
		//��̬�ļ�������
		connect: {
			options: {
				port: 3000,
				hostname: '*', //Ĭ�Ͼ������ֵ��������Ϊ����ĳ�� IP��localhost ������
				base: '.',
				keepalive: true,
				livereload: 35729  //������ watch �����Ķ˿�
			},
			server: {
				options: {
					open: true //�Զ�����ҳ http://
				}
			}
		},
		//�����ļ��ĸı�
		watch: {
			files: ['<%= pkg.name %>.css','<%= pkg.name %>.js'],
			tasks: ['jshint'],
			livereload: {
				options: {
					livereload: '<%=connect.options.livereload%>'  //����ǰ�������Ķ˿�  35729
				},
				files: [  //�����ļ��ĸı�ͻ�ʵʱˢ����ҳ
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
		},
		cssmin: {
			options: {
				compatibility: 'ie9,-properties.zeroUnits',
				sourceMap: true,
				// sourceMapInlineSources: true,
				advanced: false
			},
			core: {
				files: [{
					expand: true,
					cwd: 'dist/css',
					src: ['*.css', '!*.min.css'],
					dest: 'dist/css',
					ext: '.min.css'
				}]
			},
			docs: {
				files: [{
					expand: true,
					cwd: 'docs/assets/css',
					src: ['*.css', '!*.min.css'],
					dest: 'docs/assets/css',
					ext: '.min.css'
				}]
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	grunt.registerTask('default', ['jshint']);
	grunt.registerTask('dist-css', ['sass-compile', 'exec:postcss', 'cssmin:core', 'cssmin:docs']);
	grunt.registerTask('dist', ['clean:dist', 'dist-css', 'dist-js']);
	grunt.registerTask('serve', ['connect:server','watch']);
};