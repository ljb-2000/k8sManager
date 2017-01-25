/***
Wrapper/Helper Class for datagrid based on jQuery Datatable Plugin
***/
var Datatable = function() {

    var tableOptions; // main options
    var dataTable; // datatable object
    var table; // actual table jquery object
    var tableContainer; // actual table container object
    var tableWrapper; // actual table wrapper jquery object
    var el = $(".wrapper > .content-wrapper > .content");
    var tableInitialized = false;
    var ajaxParams = {}; // set filter mode
    var the;
    var ajaxUrl;

    var countSelectedRecords = function() {
        var selected = $('tbody > tr > td:nth-child(1) input[type="checkbox"]:checked', table).size();
        var text = tableOptions.dataTable.language.metronicGroupActions;
        if (selected > 0) {
            //$('.table-group-actions > span', tableWrapper).text(text.replace("_TOTAL_", selected));
        } else {
            //$('.table-group-actions > span', tableWrapper).text("");
        }
    };

    return {

        //main function to initiate the module
        init: function(options) {

            if (!$().dataTable) {
                return;
            }

            the = this;

            // default settings
            options = $.extend(true, {
                src: "", // actual table  
                loadingMessage: '加载中...',
                searchEle:"",
                lazyload:false,
                dataTable: {
                    "pageLength": 13, // default records per page
                    "searching": false,
		            "ordering":  false,
		            "stateSave": false,
		            "info": true,
		            "lengthChange":false,
                    "language": { // language settings
                        // data tables spesific
                    	"info": "共 _TOTAL_ 条记录",
                    	"infoEmpty":"共 0 条记录",
                    	"sEmptyTable":"没有可用的数据",
                        "paginate": {
		                    "previous":"上一页",
		                    "next": "下一页",
		                    "last": "尾页",
		                    "first": "首页"
		                }
                    },
                    "processing": false, // enable/disable display message box on record load
                    "serverSide": true, // enable/disable server side ajax loading

                    "ajax": { // define ajax settings
                        "url": "", // ajax URL
                        "type": "POST", // request type
                        "timeout": 20000,
                        "data": function(data) { // add request parameters before submit
                        	the.getParam();
                            $.each(ajaxParams, function(key, value) {
                                data[key] = value;
                            });
                            data['limit']=data.length;
                            var  page = (data.start/data.length)>=1?(data.start/data.length)+1:1;
                            data['page']=page;
                            /*Metronic.blockUI({
                                message: tableOptions.loadingMessage,
                                target: tableContainer,
                                overlayColor: 'none',
                                cenrerY: true,
                                boxed: true
                             });*/
                        },
                        "dataSrc": function(res) { // Manipulate the data returned from the server
                    		if(!res.items || !res){
                        		showToast('载入数据出错','', 'error');
                                //Metronic.unblockUI(tableContainer);
                        		return [];
                        	}                        	
                            if ($('.group-checkable', table).size() === 1) {
                                $('.group-checkable', table).attr("checked", false);
                                $.uniform.update($('.group-checkable', table));
                            }

                            if (tableOptions.onSuccess) {
                                tableOptions.onSuccess.call(undefined, the);
                            }
                            //Metronic.unblockUI(tableContainer);

                           res.recordsTotal=res.totalCount;
                           res.recordsFiltered=res.totalCount;
                           res.length=res.limit;
                            
                            return res.items;
                        },
                        "error": function(xhr,status,e) { // handle general connection errors
                        	if(options.dataTable.ajax.url!=''){
                        		if (tableOptions.onError) {
                                    tableOptions.onError.call(undefined, the);
                                }
                                showToast('载入数据出错','', 'error');
                        	}else{
                        		dataTable.ajax.url(ajaxUrl);
                        	}
                            //Metronic.unblockUI(tableContainer);
                        }
                    },

                    "drawCallback": function(oSettings) { // run some code on table redraw
                        if (tableInitialized === false) { // check if table has been initialized
                            tableInitialized = true; // set table initialized
                            table.show(); // display table
                        }
                        // Metronic.initUniform($('input[type="checkbox"]', table)); // reinitialize uniform checkboxes on each table reload
                        countSelectedRecords(); // reset selected records indicator

                        // callback for ajax data load
                        if (tableOptions.onDataLoad) {
                            tableOptions.onDataLoad.call(undefined, the);
                        }
                    }
                }
            }, options);

            tableOptions = options;
       
            if(tableOptions.lazyload){
            	ajaxUrl = options.dataTable.ajax.url;
                options.dataTable.ajax.url='';
            }

            // create table's jquery object
            table = $(options.src);
            tableContainer = $(".wrapper > .content-wrapper > .content");//table.parents(".table-container");

            // apply the special class that used to restyle the default datatable
            var tmp = $.fn.dataTableExt.oStdClasses;

            $.fn.dataTableExt.oStdClasses.sWrapper = $.fn.dataTableExt.oStdClasses.sWrapper + " dataTables_extended_wrapper";
            $.fn.dataTableExt.oStdClasses.sFilterInput = "form-control input-small input-sm input-inline";
            $.fn.dataTableExt.oStdClasses.sLengthSelect = "form-control input-xsmall input-sm input-inline";

            // initialize a datatable
            dataTable = table.DataTable(options.dataTable);

            // revert back to default
            $.fn.dataTableExt.oStdClasses.sWrapper = tmp.sWrapper;
            $.fn.dataTableExt.oStdClasses.sFilterInput = tmp.sFilterInput;
            $.fn.dataTableExt.oStdClasses.sLengthSelect = tmp.sLengthSelect;

            // get table wrapper
            tableWrapper = table.parents('.dataTables_wrapper');

            // build table group actions panel
            if ($('.table-actions-wrapper', tableContainer).size() === 1) {
                $('.table-group-actions', tableWrapper).html($('.table-actions-wrapper', tableContainer).html()); // place the panel inside the wrapper
                $('.table-actions-wrapper', tableContainer).remove(); // remove the template container
            }
            // handle group checkboxes check/uncheck
            $('.group-checkable', table).change(function() {
                var set = $('tbody > tr > td:nth-child(1) input[type="checkbox"][disabled!="disabled"]', table);
                var checked = $(this).is(":checked");
                $(set).each(function() {
                    $(this).attr("checked", checked);
                });
                $.uniform.update(set);
                countSelectedRecords();
            });

            // handle row's checkbox click
            table.on('change', 'tbody > tr > td:nth-child(1) input[type="checkbox"]', function() {
                countSelectedRecords();
            });

            //搜索按钮
            if(options.searchEle){
            	$(".filter-submit",$(options.searchEle)).click(function(e){
            		 e.preventDefault();
                     the.submitFilter();
            	});
            	
            	$(".filter-cancel",$(options.searchEle)).click(function(e){
            		e.preventDefault();
                    the.resetFilter();
            	});
            }

            // handle filter cancel button click
            /*table.on('click', '.filter-cancel', function(e) {
                e.preventDefault();
                the.resetFilter();
            });*/
            //dataTable.off( 'xhr' );
        },

        submitFilter: function(search_param) {
            //the.setAjaxParam("action", tableOptions.filterApplyAction);
        	the.getParam(search_param);
        	
            //dataTable.ajax.reload();
        	the.reload(true);
        },
        
        getParam:function(search_param){
        	var param;
        	if(search_param){
        		param = $(search_param);
        	}else if(tableOptions.searchEle){
        		param = $(tableOptions.searchEle);
        		//param =  $(".filter-submit",root);
        	}
            // get all typeable inputs
            $('textarea.form-filter, select.form-filter, input.form-filter:not([type="radio"],[type="checkbox"])', param).each(function() {
                the.setAjaxParam($(this).attr("name"), $(this).val());
            });

            // get all checkboxes
            $('input.form-filter[type="checkbox"]:checked', param).each(function() {
                the.addAjaxParam($(this).attr("name"), $(this).val());
            });

            // get all radio buttons
            $('input.form-filter[type="radio"]:checked', param).each(function() {
                the.setAjaxParam($(this).attr("name"), $(this).val());
            });
        },

        resetFilter: function(search_param) {
        	var param;
        	if(search_param){
        		param = $(search_param);
        	}else if(tableOptions.searchEle){
        		param = $(tableOptions.searchEle);
        		//param =  $(".filter-submit",root);
        	}
            $('textarea.form-filter, select.form-filter, input.form-filter', param).each(function() {
                $(this).val("");
            });
            $('input.form-filter[type="checkbox"]', param).each(function() {
                $(this).attr("checked", false);
            });
            the.clearAjaxParams();
            //the.addAjaxParam("action", tableOptions.filterCancelAction);
            //dataTable.ajax.reload();
        },
        
        reload:function(resetPaging){
        	dataTable.ajax.reload(null,resetPaging);
        },

        getSelectedRowsCount: function() {
            return $('tbody > tr > td:nth-child(1) input[type="checkbox"]:checked', table).size();
        },

        getSelectedRows: function() {
            var rows = [];
            $('tbody > tr > td:nth-child(1) input[type="checkbox"]:checked', table).each(function() {
                rows.push($(this).val());
            });

            return rows;
        },

        setAjaxParam: function(name, value) {
            ajaxParams[name] = value;
        },
        
        getAjaxParam:function(search_param){
        	the.getParam(search_param);
        	return ajaxParams;
        },

        addAjaxParam: function(name, value) {
            if (!ajaxParams[name]) {
                ajaxParams[name] = [];
            }

            skip = false;
            for (var i = 0; i < (ajaxParams[name]).length; i++) { // check for duplicates
                if (ajaxParams[name][i] === value) {
                    skip = true;
                }
            }

            if (skip === false) {
                ajaxParams[name] = value;
            }
        },

        clearAjaxParams: function(name, value) {
            ajaxParams = {};
        },

        getDataTable: function() {
            return dataTable;
        },

        getTableWrapper: function() {
            return tableWrapper;
        },

        gettableContainer: function() {
            return tableContainer;
        },

        getTable: function() {
            return table;
        },
        getDataTableTotal:function(){
        	var info = the.getDataTable().page.info();
        	if(info==null||info==''||info==undefined){
        		return 0;
        	} else{
        		return info.recordsTotal;
        	}
        }

    };

};