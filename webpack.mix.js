const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

 mix.webpackConfig({
    externals: {
        config: JSON.stringify({
            apiUrl: '/api'
        })
    },
 });

 mix.js('resources/js/index.js', 'public/js/app.js')
    .react()
    .sass('resources/sass/app.scss', 'public/css/app.css');

//static pages
//mix.combine(['resources/css/lux.css', 'resources/css/app.css', 'resources/css/spinner.css'], 'public/css/_static.css');