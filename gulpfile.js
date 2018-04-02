var gulp = require('gulp');
var path = require('path');
var fs = require('fs');
var url = require('url');
var browserSync = require('browser-sync').create();
var through2 = require('through2');
var util = require('gulp-util');
var chalk = require('chalk');
var File = util.File;
var changed = require('gulp-changed');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var clean = require('gulp-clean');
var sequence = require('gulp-sequence');
var tpl = require('gulp-seajs-tpl');
var mockServer = require('gulp-mock-server');

// publish plugins
var uglify = require('gulp-uglify');
var transport = require('gulp-seajs-transport');
var concatSeajs = require('gulp-seajs-concat');
var cleanCss = require('gulp-clean-css');

var cwd = path.resolve(process.cwd());

// 版本号
var version = (function() {
    var d = new Date();
    var p = function(n) {
        return n < 10 ? '0' + n : n;
    }

    if (gulp.env.t) {
        return '' + d.getFullYear() + p(d.getMonth() + 1) + p(d.getDate());
    } else {
        return gulp.env.v;
    }
})();

var port = 4001;
var paths = {
    output: './build/',
    dist: './dist/20180402/',
    html: './src/*.html',
    sass: 'src/**/*.scss',
    css: ['src/**/*.css', '!src/layui/**/*.css'],
    js: ['src/**/*.js', '!src/layui/**/*.js'],
    images: ['src/**/*.jpg', 'src/**/*.png', 'src/**/*.ico', 'src/**/*.gif', '!src/layui/**/*'],
    tpl: 'src/**/*.tpl'
};

var taskAry = ['js', 'sass', 'tpl', 'html', 'css', 'images'];


function _getBuildPath(url) {
    if (typeof url == 'string') {
        return url.replace('src', 'build');
    } else {
        return url.map(function(x) {
            return x.replace('src', 'build');
        });
    }
}

// 此处不能过滤改动过的文件，要是过滤后scss中通过import的文件就没法编译
gulp.task('sass', function() {
    return gulp.src(paths.sass)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.output));
});

gulp.task('js', function() {
    return gulp.src(paths.js)
        .pipe(changed(paths.output))
        .pipe(gulp.dest(paths.output));
});

gulp.task('html', function() {
    return gulp.src(paths.html)
        .pipe(changed(paths.output))
        .pipe(gulp.dest(paths.output));
});

gulp.task('images', function() {
    return gulp.src(paths.images)
        .pipe(changed(paths.output))
        .pipe(gulp.dest(paths.output));
});

gulp.task('css', function() {
    return gulp.src(paths.css)
        .pipe(changed(paths.output))
        .pipe(gulp.dest(paths.output));
});

gulp.task('tpl', function() {
    return gulp.src(paths.tpl)
        .pipe(changed(paths.output, { extension: '.js' }))
        .pipe(tpl())
        .pipe(gulp.dest(paths.output));
});

gulp.task('swf', function() {
    return gulp.src('src/*.swf')
        .pipe(gulp.dest(paths.output));
});

gulp.task('layui', function() {
    return gulp.src('src/layui/**/*')
        .pipe(gulp.dest(paths.output + 'layui'));
});
gulp.task('awesome', function() {
    return gulp.src('src/awesome/**/*')
        .pipe(gulp.dest(paths.output + 'awesome'));
});

gulp.task('mock', function() {
    return gulp.src('.')
        .pipe(mockServer({
            host: 'localhost',
            port: '9999',
            mockDir: './src/data'
        }));
});

gulp.task('clean', function() {
    return gulp.src(paths.output).pipe(clean());
});

gulp.task('cleanDist', function() {
    return gulp.src(paths.dist).pipe(clean());
});

gulp.task('watchDev', function() {
    taskAry.forEach(function(v) {
        gulp.watch(paths[v], [v]);
    });
});

// publish tasks
gulp.task('base', function() {
    return gulp.src(['./src/js/base.js'])
        .pipe(uglify())
        .pipe(gulp.dest(paths.dist + 'js'));
});

gulp.task('pubJs', function() {
    return gulp.src(['./build/js/**/*.js', '!./build/js/base.js'])
        .pipe(transport())
        .pipe(concatSeajs())
        .pipe(uglify())
        .pipe(gulp.dest(paths.dist + 'js'));
});

gulp.task('pubTpl', function() {
    return gulp.src(_getBuildPath('./build/tpl/**/*.js'))
        .pipe(gulp.dest(paths.dist + 'tpl'));
});

gulp.task('pubCss', function() {
    return gulp.src(_getBuildPath(paths.css))
        .pipe(cleanCss({ compatibility: { properties: { iePrefixHack: true } } }))
        .pipe(gulp.dest(paths.dist));
});

gulp.task('pubImg', function() {
    return gulp.src(_getBuildPath(paths.images))
        .pipe(gulp.dest(paths.dist));
});

gulp.task('server', function() {
    browserSync.init({
        files: paths.output + '/**',
        port: port,
        watchOptions: { debounceDelay: 1500 },
        server: {
            baseDir: paths.output
        },
        open: false
    });
});

gulp.task('pubLayui', function() {
    return gulp.src(_getBuildPath('./build/layui/**/*'))
        .pipe(gulp.dest(paths.dist + 'layui'));
});
gulp.task('pubAwesome', function() {
    return gulp.src(_getBuildPath('./build/awesome/**/*'))
        .pipe(gulp.dest(paths.dist + 'awesome'));
});


gulp.task('build', sequence('clean', taskAry.slice(0)));

gulp.task('dev', sequence('build', ['layui', 'awesome', 'swf', 'mock', 'watchDev', 'server']));

gulp.task('pub', sequence('cleanDist', ['base', 'pubJs', 'pubCss', 'pubImg', 'pubTpl', 'pubLayui', 'pubAwesome']));

// gulp.task('pub', function() {
//     if (!version) {
//         util.log(chalk.red('必须输入版本号！如：gulp pub --v 20161125或gulp pub --t(版本号为今天)'));
//     } else {
//         gulp.run(['base', 'pubJs', 'pubCss', 'pubImg', 'pubTpl']);
//     }
// });