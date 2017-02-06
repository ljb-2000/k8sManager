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