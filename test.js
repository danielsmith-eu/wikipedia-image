
var wpimg = require('./wikipedia-image');
var testurl = "http://en.wikipedia.org/wiki/Internet_Archive";

wpimg(testurl).then(function (imgurl) {
    console.log(imgurl);
});

