# gulp-md5-includes

Adds **Soft MD5 suffix** to files which included in a main `HTML` file

#### Why?
this forces the browser to re-fetch new files that are already cached 

## Example 

#### Before

```html
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="utf-8">
    <link href="assets/style.css" rel="stylesheet"/>
</head>
<body>
<h1>Hello World</h1>
<script src="assets/scripts.js"></script>
</body>
</html>
```

#### After

```html
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="utf-8">
    <link href="assets/style.css?eb6d8713c185988b8d6e1dfdf412a6bf" rel="stylesheet"/>
</head>
<body>
<h1>Hello World</h1>
<script src="assets/scripts.js?3131354f5733fc16f92093dfd42f78c8"></script>
</body>
</html>
```

## Usage

First, install `gulp-md5-includes` as a development dependency:

```shell
npm install --save-dev gulp-md5-includes
```

Then, add it to your `gulpfile.js`:

```javascript
var gulp = require('gulp');
var md5Includes = require('gulp-md5-includes');

gulp.task('md5', function () {
    gulp.src("./index.tpl.html")
        .pipe(md5Includes(['assets/style.css', 'assets/scripts.js'], 'index.html'))
        .pipe(gulp.dest("./dist"));
});
```

### Advanced Usage

```javascript
var gulp = require('gulp');
var md5Includes = require('gulp-md5-includes');

gulp.task('md5-advanced', function () {
    gulp.src("./index.tpl.html")
        .pipe(md5Includes([
                {
                    path: 'assets/style.css',
                    pattern: 'advanced/configuration/path/style.css'
                },
                {
                    path: 'assets/scripts.js',
                    pattern: 'advanced/configuration/path/scripts.js'
                }],
            'index-advanced.html'))
        .pipe(gulp.dest("./dist"));
});

```

## API

> ### `md5Includes(includes,newName)`
> 
> #### includes
> Type: `Array`
> Default: null
> 
> The included files you wish to hash in your `HTML` file
> can be `string` or `object`
> 
> #### newName
> Type: `String`
> Default: null
> 
> Optional: html new name

## License

http://en.wikipedia.org/wiki/MIT_License


