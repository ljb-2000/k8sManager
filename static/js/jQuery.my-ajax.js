;(function ($) {

    var myAjax = {
        ajax: function (opt) {
            //save the old success callback  
            var fn = {
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                },
                success: function (data, textStatus) {
                },
                beforeSend: function (jqXHR) {
                },
                complete: function (XHR, TS) {
                }
            }
            if (opt.error) {
                fn.error = opt.error;
            }
            if (opt.success) {
                fn.success = opt.success;
            }
            if (opt.beforeSend) {
                fn.beforeSend = opt.beforeSend;
            }
            if (opt.complete) {
                fn.complete = opt.complete;
            }

            var el = $(".page-container > .page-content-wrapper > .page-content");
            if (opt.el) {
                el = $(opt.el);
            }

            opt.beforeSend = function (jqXHR) {
                $(el).activateBox();
                fn.beforeSend(jqXHR);
            };
            opt.complete = function (XHR, TS) {
                fn.complete(XHR, TS);
                $(el).removeBox();
            };
            opt.error = function (XHR, textStatus, error) {
                $(el).removeBox();
                fn.error(XHR, textStatus, error);
            }
            jQuery.ajax(opt);
        }
    };


    jQuery.myAjax = {
        get: function (url, data, callback, type, element) {
            if (jQuery.isFunction(data)) {
                type = type || callback;
                callback = data;
                data = undefined;
            }
            return myAjax.ajax({
                url: url,
                type: 'get',
                dataType: 'json',
                data: data,
                success: callback,
                el: element
            });
        },
        post: function (url, data, callback, type, element) {
            if (jQuery.isFunction(data)) {
                type = type || callback;
                callback = data;
                data = undefined;
            }
            return myAjax.ajax({
                url: url,
                type: 'post',
                dataType: 'json',
                data: data,
                success: callback,
                el: element
            });
        }
    };
})(jQuery);