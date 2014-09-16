module.exports = function(grunt) {

	//	Concatenation file order
	var concatFiles = ['src/mithril.bindings.js', 'src/mithril.bindings.defaults.js'];
		concatNodefaultsFiles = ['src/mithril.bindings.js'];

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			options: {
				separator: ';'
			},
			dist: {
				//  We'd prefer to fail on missing files, but at least this will warn: https://github.com/gruntjs/grunt-contrib-concat/issues/15
				nonull: true,
				files: {
					'dist/version/<%= pkg.name %>-<%= pkg.version %>.js': concatFiles,
					'dist/<%= pkg.name %>.js': concatFiles,
					'dist/version/<%= pkg.name %>-<%= pkg.version %>.no_defaults.js': concatNodefaultsFiles,
					'dist/no_defaults/<%= pkg.name %>.no_defaults.js': concatNodefaultsFiles
				}
			}
		},
		qunit: {
			files: ['test/**/*.htm']
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			dist: {
				files: {
					'dist/version/<%= pkg.name %>-<%= pkg.version %>.min.js': 'dist/version/<%= pkg.name %>-<%= pkg.version %>.js',
					'dist/<%= pkg.name %>.min.js': 'dist/<%= pkg.name %>.js',
					'dist/version/<%= pkg.name %>-<%= pkg.version %>.no_defaults.min.js': 'dist/version/<%= pkg.name %>-<%= pkg.version %>.no_defaults.js',
					'dist/no_defaults/<%= pkg.name %>.no_defaults.min.js': 'dist/no_defaults/<%= pkg.name %>.no_defaults.js'
				}
			}
		},
		jshint: {
			files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
			options: {
				ignores: [],
				// options here to override JSHint defaults
				globals: {
					jQuery: true,
					console: true,
					module: true,
					document: true
				},
				//	Ignore specific errors
				'-W015': true,	//	Indentation of }
				'-W099': true,	//	Mixed spaces and tabs
				'-W032': true	//	Unnecessary semicolon
			}
		},
		watch: {
			files: ['<%= jshint.files %>'],
			//	Just build when watching
			tasks: ['concat']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');

	grunt.registerTask('test', ['jshint', 'qunit']);
	grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);
	grunt.registerTask('justbuild', ['concat', 'uglify']);
};