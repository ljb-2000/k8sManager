/**
 *
 * @param msg
 * @param type:success\info\warning\error
 */
function showToast(title, msg, type, timeout, click) {
    var shortCutFunction = type ? type : 'success';
    var msg = msg;
    var title = title || '';
    var showDuration = 1000;
    var hideDuration = 1000;
    var timeOut = timeout >= 0 ? timeout : 5000;
    var extendedTimeOut = 1000;
    var showEasing = 'swing';
    var hideEasing = 'linear';
    var showMethod = 'fadeIn';
    var hideMethod = 'fadeOut';
    // var toastIndex = toastCount++;

    toastr.options = {
        closeButton : true,
        debug : true,
        positionClass : 'toast-top-right',
        onclick : click ? click : null
    };
    toastr.options.showDuration = showDuration;
    toastr.options.hideDuration = hideDuration;
    toastr.options.timeOut = timeOut;
    toastr.options.extendedTimeOut = extendedTimeOut;
    toastr.options.showEasing = showEasing;
    toastr.options.hideEasing = hideEasing;
    toastr.options.showMethod = showMethod;
    toastr.options.hideMethod = hideMethod;

    var $toast = toastr[shortCutFunction](msg, title); // Wire up an event
    // handler to a button
    // in the toast, if it
    // exists
    $toastlast = $toast;
    if ($toast.find('#okBtn').length) {
        $toast.delegate('#okBtn', 'click', function() {
            // alert('you clicked me. i was toast #' + toastIndex + '.
            // goodbye!');
            $toast.remove();
        });
    }
    if ($toast.find('#surpriseBtn').length) {
        $toast.delegate('#surpriseBtn', 'click', function() {
            alert('Surprise! you clicked me. i was toast #' + toastIndex
                + '. You could perform an action here.');
        });
    }
}

// wrMetronicer function to  block element(indicate loading)
var  blockUI = function(options) {
    options = $.extend(true, {}, options);
    var html = '';
    if (options.iconOnly) {
        html = '<div class="loading-message ' + (options.boxed ? 'loading-message-boxed' : '') + '"><i class="fa fa-refresh fa-spin"></i></div>';
    } else if (options.textOnly) {
        html = '<div class="loading-message ' + (options.boxed ? 'loading-message-boxed' : '') + '"><span>&nbsp;&nbsp;' + (options.message ? options.message : 'LOADING...') + '</span></div>';
    } else {
        html = '<div class="loading-message ' + (options.boxed ? 'loading-message-boxed' : '') + '"><i class="fa fa-refresh fa-spin"></i><span>&nbsp;&nbsp;' + (options.message ? options.message : 'LOADING...') + '</span></div>';
    }

    if (options.target) { // element blocking
        var el = $(options.target);
        if (el.height() <= ($(window).height())) {
            options.cenrerY = true;
        }
        el.block({
            message: html,
            baseZ: options.zIndex ? options.zIndex : 1000,
            centerY: options.cenrerY !== undefined ? options.cenrerY : false,
            css: {
                top: '10%',
                border: '0',
                padding: '0',
                backgroundColor: 'none'
            },
            overlayCSS: {
                backgroundColor: options.overlayColor ? options.overlayColor : '#555',
                opacity: options.boxed ? 0.05 : 0.1,
                cursor: 'wait'
            }
        });
    } else { // page blocking
        $.blockUI({
            message: html,
            baseZ: options.zIndex ? options.zIndex : 1000,
            css: {
                border: '0',
                padding: '0',
                backgroundColor: 'none'
            },
            overlayCSS: {
                backgroundColor: options.overlayColor ? options.overlayColor : '#555',
                opacity: options.boxed ? 0.05 : 0.1,
                cursor: 'wait'
            }
        });
    }
}

// wrMetronicer function to  un-block element(finish loading)
var unblockUI = function(target) {
    if (target) {
        $(target).unblock({
            onUnblock: function() {
                $(target).css('position', '');
                $(target).css('zoom', '');
            }
        });
    } else {
        $.unblockUI();
    }
}
