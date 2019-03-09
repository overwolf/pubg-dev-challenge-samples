const gulp = require('gulp');
const execa = require('execa');
const fs = require('fs-jetpack');

function build() {
    try {
        console.log('Please wait, building environment');
        execa.shellSync('ng build');

        const fileText = fs.read('dist/index.html');

        fs.write('dist/background.html', fileText.replace('{{COMPONENT}}', 'background'));
        fs.write('dist/in-game.html', fileText.replace('{{COMPONENT}}', 'in-game'));
        fs.write('dist/settings.html', fileText.replace('{{COMPONENT}}', 'settings'));

        fs.remove('dist/index.html');

        console.log('Environment built');
    } catch (error) {
        console.error(error);
    }
}

gulp.task('default', () => {
    build();
    gulp.watch('src', build);
});