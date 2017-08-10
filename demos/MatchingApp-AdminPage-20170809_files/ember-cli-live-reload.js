(function() {
 var srcUrl = null;
 var src = srcUrl || ((location.protocol || 'http:') + '//' + (location.hostname || 'localhost') + ':49153/livereload.js');
 var script    = document.createElement('script');
 script.type   = 'text/javascript';
 script.src    = src;
 document.getElementsByTagName('head')[0].appendChild(script);
}());