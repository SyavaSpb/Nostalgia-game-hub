let engineFolder = "nostalgic-games-hub-engine"
let gamesFolder = "nostalgic-games-hub-games"
let frontFolder = "nostalgic-games-hub-front"
let backFolder = "nostalgic-games-hub-back"

let files = {
  engine: {
    from: engineFolder + "/src/**/*.js",
    to: frontFolder + "/src/Games/Engine/"
  },
  games: {
    from: gamesFolder + "/src/**/*.*",
    to: frontFolder + "/src/Games/"
  },
  watch: {
    engine: engineFolder + "/src/**/*.js",
    games: gamesFolder + "/src/**/*.*"
  },
  clean: frontFolder + "/src/Games/"
}

let {src, dest} = require('gulp'),
  gulp = require('gulp'),
  del = require('del')

function engine(params) {
  return src(files.engine.from)
    .pipe(dest(files.engine.to))
}

function games(params) {
  return src(files.games.from)
    .pipe(dest(files.games.to))
}

function watchFiles(params) {
  gulp.watch([files.watch.engine], engine)
  gulp.watch([files.watch.games], games)
}

function clean(params) {
  return del(files.clean)
}

let build = gulp.series(clean, gulp.parallel(engine, games))
let watch = gulp.parallel(build, watchFiles)

exports.games = games
exports.engine = engine
exports.build = build
exports.watch = watch
exports.default = watch
