var path = require('path');
var through = require('through2');
var crypto = require('crypto');
var fs = require('fs');
var Path = require('path');

module.exports = function (includes, name) {

    return through.obj(function (file, encoding, callback) {
        if (file.isNull()) {
            return callback(null, file);
        }

        if (file.isStream()) {
            return callback(new Error('Streaming not supported'));
        }

        if (!includes || !includes.length || !file.contents) {
            return callback(null, file);
        }

        var fileContents = file.contents.toString(encoding);

        for (var i in includes) {
            var item = includes[i];

            var path;
            var pattern;

            if (typeof item === 'string') {
                path = item;
                pattern = item;
            }
            else if (typeof item === 'object') {
                path = item.path;
                pattern = item.pattern || item.path;
            }
            else {
                return callback(new Error('Invalid include item. only strings or objects'));
            }

            var exists = fs.existsSync(path);

            if (!exists) {
                return callback(new Error('Could not calculate MD5 hash - file `' + path + '` does not exists. \nUse the `.path` option to hint for filesystem path. see examples @ https://github.com/Jossef/gulp-md5-includes.git\n'));
            }

            var content = fs.readFileSync(path, encoding);

            var includeFileMD5Hash = calculateMD5Hash(content);
            var newIncludeName = pattern + '?' + includeFileMD5Hash;
            fileContents = replaceAll(fileContents, pattern, newIncludeName);
        }

        file.contents = new Buffer(fileContents, encoding);
        if (name)
        {
            file.path = Path.join(file.base, name);
        }

        return callback(null, file);

    }, function (callback) {
        callback();
    });
};

function calculateMD5Hash(content) {
    var md5 = crypto.createHash('md5');
    md5.update(content, 'utf8');
    return md5.digest('hex');
}

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}