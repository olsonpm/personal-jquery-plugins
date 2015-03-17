"use strict";

//------------------------------------------------------------//
// Function
//   - setChildWidths
//
// Parameters
//   - selector_: string
//
// Returns
//   - void
//
// Description
//   - Parses the children of given 'selector_' for all their widths, then sets the widths of all children to
//     that of the maximum width per child index.  For example, if <li> is given as the selector, and each <li> 
//     within the parent <ul> contains 3 children, then this function will get the width of each child of <li>
//     and compare them with the corresponding children of subsequent <li>'s.  After this, it sets the width
//     of each child to the maximum found for that child's index.  This means the first child of each <li> will
//     be set to the maximum width found in all <li>'s first children.  <li>'s without the same number of children
//     as found in the first are ignored.  Taking the above axample, if one of the subsequent <li>'s had 2
//     children instead of 3, then their widths are not taken into account, nor are they set to anything.
//
// Throws
//   - If argument isn't typeof string: 'Invalid Argument'
//   - If 'this' isn't instanceof $: "Invalid 'this'"
//
//------------------------------------------------------------//

function init($) {
    if (!($ && $.fn && $.fn.jquery)) {
        throw new Error("Invalid Argument: The argument passed does not seem to be a jQuery object");
    }

    $.fn.setChildWidths = function(selector_) {
        if (typeof selector_ !== 'string') {
            throw new Error("Invalid Argument: setChildWidths expects 'selector_' to be typeof string");
        } else if (!(this instanceof $)) {
            throw new Error("Invalid 'this': setChildWidths expects 'this' to be a jquery object");
        }

        var first = this.find(selector_).eq(0);
        var parent = first.parent();
        var numChildren = first.children().length;
        var widths2d = [];
        for (var i = 0; i < numChildren; i++) {
            widths2d[i] = [];
        }
        this.css('display', 'block');
        parent.children(selector_).each(function() {
            // only modify widths of list elements that have the same number of children
            var childrenOfSelector = $(this).children();
            if (childrenOfSelector.length === numChildren) {
                childrenOfSelector.each(function(i) {
                    widths2d[i].push(parseFloat($(this).css('width')));
                });
            }
        });
        this.removeAttr('style');

        var maxWidths = [];
        widths2d.forEach(function(e) {
            maxWidths.push(Math.max.apply(Math, e));
        });

        parent.children(selector_).each(function() {
            var childrenOfSelector = $(this).children();
            if (childrenOfSelector.length === numChildren) {
                for (var i = 0; i < numChildren; i++) {
                    childrenOfSelector.eq(i).css('width', maxWidths[i] + 'px');
                }
            }
        });
    };
}

module.exports = init;
