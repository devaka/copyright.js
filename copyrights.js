/**
* @author Sergey Koksharov aka Devaka
* @plugin_page https://github.com/devaka/copyright.js
* @desc Script adds copyright link to the copied text
* @version 1.0
* @example
* $("article").copyright();
* @license free
**/
(function($){
    "use strict";
    
//$(document).on('copy', function(event){
//    console.log(event.target.tagName);
//    //if (event.target || event.target.tagName !== '')
//    
//    if (methods.isWinSelection()) {
//        var sel     = window.getSelection();
//        var rng     = sel.getRangeAt(0);
////        console.log(rng.intersectsNode($('div.content')[0]));
//    }
//});

    var methods = {
        opts:   {},
        elements: [],
        
        init: function(options) {
            methods.opts = $.extend({
                extratxt: 'Подробнее: %link%',
                length: 150,
                hide: true,
                allowcopy: true,
                first: false,
                sourcetxt: 'Источник',
                style: '',
                class: 'copyright-span'
            }, options || {});
            
            this.each(function(){
//                methods.elements.push(this);
                $(this).on('copy', function(event) {
                    console.log('oncopy');
                    return methods.beforeCopy(event);
                });
            });
                        
            return this;
        },
        
        isOpera: function() {
            return (!!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0);
        },
        
        isIE: function() {
            return (/*@cc_on!@*/false || !!document.documentMode);
        },
        
        isWinSelection: function() {
            return window.getSelection;
        },
        
        isDocSelection: function() {
            return (document.selection && document.selection.type !== "Control");
        },
        
        beforeCopy: function(event) {
            var text = methods.getSelection();

            if (!text || text.length < methods.opts.length) {
                return true;
            }
            
            if (text.length >= methods.opts.length && !methods.opts.allowcopy) {
                event.preventDefault();
                return;
            }
            
            // ------------------------------------------------------ 
            // Start Check Browser
            // ------------------------------------------------------ 
            if (methods.isWinSelection() && !methods.isOpera()) {
                methods.stdCopy(event);
            } else if (methods.isWinSelection() && methods.isOpera()) {
                methods.oprCopy(event);
            } else if (methods.isDocSelection()) {
                methods.docCopy(event);
            } else {
                event.preventDefault();
            }
            
        },
        
        stdCopy: function(event) {
            if (methods.opts.first) {
                var newtext = methods.getExtra() + '&nbsp;\n' + methods.getSelection();
            } else {
                var newtext = methods.getSelection() + '&nbsp;\n' + methods.getExtra();
            }

            var sel     = window.getSelection();
            var rng     = sel.getRangeAt(0);
            var rngClone= rng.cloneRange();
            
            var copyHolder = $('<div>', {html: newtext, style: "position:absolute;left:-99999em;"});
            $('body').append(copyHolder);
            
            window.getSelection().selectAllChildren( copyHolder[0] );
            
            window.setTimeout(function() {
                copyHolder.remove();
                sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange( rngClone );
            }, 0);  
        },
        
        docCopy: function(event) {
            if (methods.opts.first) {
                var newtext = methods.getExtra() + '&nbsp;\n' + methods.getSelection();
            } else {
                var newtext = methods.getSelection() + '&nbsp;\n' + methods.getExtra();
            }
            
            var sel     = document.selection;
            var rng     = sel.createRange();
            var rngClone= rng.duplicate();
            
            var copyHolder = $('<div>', {html: newtext, style: "position:absolute;left:-99999em;"});
            $('body').append(copyHolder);
            
            window.getSelection().selectAllChildren( copyHolder[0] );
            
            window.setTimeout(function() {
                copyHolder.remove();                
                rngClone.select();
            }, 0);            
        },
        
        oprCopy: function(event) {
            var sel     = window.getSelection();
            var rng     = sel.getRangeAt(0);
            var rngClone= rng.cloneRange();
                rngClone.collapse(methods.opts.first);
            
            var copyHolder = document.createElement('DIV');
            copyHolder.innerHTML = methods.getExtra();
            copyHolder.setAttribute('style', 'position:absolute;left:-99999em;');

            rngClone.insertNode(copyHolder);
            
            if (!methods.opts.first)
                rng.setEndAfter(copyHolder);
            
            
            window.setTimeout(function() {
                $(copyHolder).remove();                
                sel.removeAllRanges();
                sel.addRange( rng );
            }, 0);            
        },
        
        getSelection: function() {
            var text = "";
            
            if (methods.isWinSelection()) {
                text = window.getSelection().toString();
            } else if (methods.isDocSelection()) {
                text = document.selection.createRange().text;
            }
            
            return text;
        },
        
        getExtra: function() {
            var style = '';
            
            if (methods.opts.hide) {
                style += 'position:absolute;left:-9999em;top:0;';
            }
                        
            style += methods.opts.style;

            var before = '<span class="'+ methods.opts.class +'"' + (style ? ' style="'+ style +'"' : '') + '>';
            var after = '</span>';
            
            var text = methods.opts.extratxt
                    .replace('%link%', '<a href="' + document.location.href + '">' + document.location.href + '</a>')
                    .replace('%source%', '<a href="' + document.location.href + '">'+ methods.opts.sourcetxt +'</a>');
            
            return (before + text + after);
        },
        
        // #todo
        destroy: function() {
            
        }

    };
    
    $.fn.copyright = function(useroptions) {
        if (typeof useroptions === 'object' || !useroptions)
            return methods.init.apply(this, arguments);
    };
})(jQuery);