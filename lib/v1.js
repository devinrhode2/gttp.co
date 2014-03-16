/**
 * Gittip widget main initialization.
 *
 * Initializes widgets and pulls in the Widgets API if it isn't already loaded
 */
(function($) {
    'use strict';

    // Grab window.Gittip if available
    var Gittip = window.Gittip || {};

    // Where's our files?
    var api = window.gttpAPI || '//gttp.co/v1/';

    window._gttp = window._gttp || [];

    // Load widget API if it hasn't been
    if (!Gittip.widgets && !$('script[src="' + api + 'api.js"]').length) {
        var gttp = document.createElement('script');
        gttp.src = api + 'api.js';
        $('head')[0].appendChild(gttp);
        // jQuery: $('head').append('<script src="' + api + 'api.js"></script>');
    }

    //using function declaration for better stack traces -DevinRhode2
    function forEach(list, callback) {
        var length = list.length;
        for (var i = 0; i < length; i++) {
            callback(list[i]);
        }
    }

    // Load widgets, (identified by having the `data-gittip-username` attribute)
    forEach( $('[data-gittip-username]'), function(element) {
        // Ignore widgets with the `data-gittip-readystatus` property
        if (!element.getAttribute('data-gittip-readystatus')) {
            if (Gittip.widgets) {
                Gittip.widgets.load(element);
            } else {
                _gttp.push(element);
            }

            element.setAttribute('data-gittip-readystatus', 'loading');
        }
    });
})(window.$ || document.querySelectorAll);
