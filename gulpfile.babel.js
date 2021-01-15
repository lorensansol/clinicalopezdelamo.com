// Common
import child from 'child_process'
import gulp from 'gulp'

// HTML
import pug from 'gulp-pug'

// CSS
import postcss from 'gulp-postcss'
import comments from 'postcss-discard-comments'
import cssnano from 'cssnano'
import autoprefixer from 'autoprefixer'
import purgecss from 'gulp-purgecss'

// JavaScript
import babel from 'gulp-babel'
import terser from 'gulp-terser'

// IMG
import imagemin from 'gulp-imagemin'

// Fonts
import googleWebFonts from 'gulp-google-webfonts'
import fontgen from 'gulp-fontgen'
const critical = require('critical').stream

gulp.task('html', () => {
  return gulp
    .src('_pug/*.pug')
    .pipe(pug({ pretty: false }))
    .pipe(gulp.dest('_layouts'))
})

gulp.task('js', () => {
  return gulp
    .src('_site/_assets/js/scripts.js')
    .pipe(babel({ minified: true, comments: false }))
    .pipe(terser())
    .pipe(gulp.dest('assets/js'))
})

gulp.task('css', () => {
  return gulp
    .src('_site/_assets/css/styles.css')
    .pipe(
      purgecss({
        content: [
          '_site/**/*.html',
          '_site/assets/js/scripts.js'
        ],
        variables: true
      })
    )
    .pipe(postcss([comments({ removeAll: true }), cssnano(), autoprefixer()]))
    .pipe(gulp.dest('assets/css'))
})

gulp.task('critical', (done) => {
  function criticalPathCss (htmlSrc, cssTarget) {
    gulp
      .src('_site/' + htmlSrc)
      .pipe(
        critical({
          base: './',
          inline: false,
          css: ['assets/css/styles.css'],
          target: {
            css: '_includes/critical-path-css/' + cssTarget
            // html: htmlSrc.replace('.html', '-critical.html'),
            // uncritical: 'assets/css/uncritical/' + cssTarget,
          },
          ignore: ['@font-face', ':root']
        })
      )
  }
  criticalPathCss('index.html', 'critical-index.css')
  criticalPathCss('mas-podologia/index.html', 'critical-bloglist.css')
  criticalPathCss('drafts/*-instrucciones.html', 'critical-posts.css')
  done()
})

gulp.task('img', () => {
  return gulp
    .src('_assets/img/**/*')
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 70, progressive: true }),
        imagemin.optipng({ optimizationLevel: 1 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }]
        })
      ])
    )
    .pipe(gulp.dest('assets/img'))
})

// create an optimal fa-used.json with all the fontawesome used icons
gulp.task('fa-min', () => child.exec('make fa-min'))

gulp.task('fonts', gulp.series(
  // create json files to custom font style weight of each font
  // () => child.exec('echo \'{"style":"italic"}\' > ./_assets/fonts/OpenSans-Italic.json'),
  () => {
    return gulp
      .src('_assets/fonts/*.{ttf,otf}')
      .pipe(fontgen({
        css_fontpath: '/assets/fonts',
        dest: 'assets/fonts'
      }))
  },
  // concatenate css files, font-display swap, save new sass file and delete old css files
  () => child.exec('cat ./assets/fonts/*.css | perl -p -e "s/\}/    font-display: swap;\n}\n/gm" > ./_assets/css/_sass/_custom-fonts.scss; rm ./assets/fonts/*.css')
))

gulp.task('gfonts', gulp.series(
  // () => child.exec('grep "gfonts:" _config.yml | perl -pe "s/gfonts: |\'//g" | sed "s/&family=/|/" > fonts.list'),
  () => {
    return gulp
      .src('fonts.list')
      .pipe(googleWebFonts({ fontDisplayType: 'swap' }))
      .pipe(gulp.dest('_assets/gfonts'))
  }
  // ,
  // () => child.exec('rm fonts.list')
))

gulp.task('rest', () => {
  return gulp
    .src([
      '_assets/js/lunr.js',
      '_assets/js/lunrsearchengine.js',
      '_assets/js/smooth-scroll.js'
    ])
    .pipe(gulp.dest('assets/js'))
})

gulp.task('build', () => child.exec('make build'))

gulp.task('all', gulp.series('img', 'fonts', 'gfonts', 'rest', 'html', 'fa-min', 'js', 'css', 'critical'))

gulp.task('jcc', gulp.series('js', 'css', 'critical'))

gulp.task('buildandup', gulp.series('html', 'build', 'fa-min', 'build', 'js', 'css', 'critical', () => child.exec('make up')))

gulp.task('default', () => {
  gulp.watch('_pug/*.pug', gulp.series('html'))
})
