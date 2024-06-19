module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            development: {
                files: {
                    'main.css' : 'main.less'
                }
            },
            production:{
                options: {
                    compress: true,
                },
                files: {
                    'main.min.css' : 'main.less'
                }
            }

        },
        concurrent:{
            target: ['watch']
        },

        watch:{
            less:{
                files: ['main.less','index.html','main.js'],
                tasks: ['less:development', 'less:production', 'htmlmin','uglify']
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files:{
                    'indexMin.html' : 'index.html'
                }
            }
        },
        uglify: {
            target: {
                files: {
                    'main.min.js' : 'main.js'
                }
            }
        }
    })

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['watch', 'uglify']);
}