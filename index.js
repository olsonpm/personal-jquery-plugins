'use strict';


var jqItemWidths = require('./item-widths');

function initAll($) {
    if (!($ && $.fn && $.fn.jquery)) {
        throw new Error("Invalid Argument: The argument passed does not seem to be a jQuery object");
    }
    jqItemWidths($);
}

module.exports.initAll = initAll;
module.exports.itemWidths = require('./item-widths');
