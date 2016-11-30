//包含了整个Grunt配置信息
module.exports = function(grunt) {
	//初始化 configuration配置对象
	grunt.initConfig({
		//从package.json 文件读入项目配置信息，并存入pkg 属性内。这样就可以让我们访问到package.json文件中列出的属性了
		pkg: grunt.file.readJSON('package.json'),
		//任务配置
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