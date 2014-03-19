/**
 * Gittip widget main initialization.
 *
 * Initializes widgets and pulls in the Widgets API if it isn't already loaded
 */
(function($) {
    'use strict';

    // If widget api script hasn't been loaded, then load it.
    var Gittip = window.Gittip || {};
    var api = window.gttpAPI || '//gttp.co/v1/';
    if (!Gittip.widgets && !$('script[src="' + api + 'api.js"]').length) {
        $('head')[0].appendChild( createElement('script', {src: api + 'api.js'}) );
    }


    // Load widgets, (identified by a `data-gittip-username` attribute)
    window._gttp = window._gttp || [];
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

    //using function declarations for better stack traces -DevinRhode2
    function createElement(element, props) {
        var element = document.createElement(element);
        if (typeof props !== 'undefined') {
            for (var prop in props) {
                if (Object.prototype.hasOwnProperty(prop)) {
                    element[prop] = props[prop];
                    element.setAttribute(prop, props[prop]);
                }
            }
        }
        return element;
    }

    function forEach(list, callback) {
        var length = list.length;
        for (var i = 0; i < length; i++) {
            callback(list[i]);
        }
    }

})(window.$ || document.querySelectorAll);
