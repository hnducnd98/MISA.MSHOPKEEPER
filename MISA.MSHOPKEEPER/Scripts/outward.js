/// <reference path="libraries/jquery.timepicker.min.js" />
//$(function () {
//    $("#account").selectmenu();
//});

//$(function () {
//    $("#typeVoucher").selectmenu({
//        change: function (event, data) {
//            var typeVoucher = data.item.value;
//            receipt.FilterRepeat('TypeVoucher', typeVoucher);
//        }
//    });
//});

//$(function () {
//    $("#nowmonth").selectmenu({
//        change: function (event, data) {
//            var valueTime = $(this).children("option:selected").val();
//            datePicker.getTime(valueTime);
//        }
//    });
//});

//$(function () {
//    $("#page").selectmenu();
//});

//Resize window sẽ thay đổi lại kích thước của bảng
function layoutReaderTable() {
    //$.fn.hasScrollBar = function () {
    //    return this.get(0).scrollHeight > this.height();
    //}
    $(window).on('resize', function () {

        //Resize lại bảng
        resizeAll();


    });
}

//Scroll ngang thì thanh footer sẽ scroll theo
//function scrollTable() {
//    $(".container-header-body").scroll(function () {
//        $(".tbl-footer").scrollLeft($(".master-body").scrollLeft());
//    });
//}

$(document).ready(function () {
    layoutReaderTable();
    //scrollTable();

    //Dialog chính
    dialog = $('#dialogAdd').dialog({
        width: 1000,
        height: 600,
        autoOpen: false,
        modal: true,
        title: 'Thêm phiếu xuất kho khác',
        resizable: true,
        fluid: true
    })

    //Dialog kiểm tra lưu
    dialog2 = $('#dialogCheckValidate').dialog({
        width: 410,
        height: 150,
        autoOpen: false,
        modal: true,
        title: 'MShopKeeper',
        resizable: false,
        fluid: true
    })

    //dialog close
    dialog3 = $('#dialogAccept').dialog({
        width: 380,
        height: 150,
        autoOpen: false,
        modal: true,
        title: 'Dữ liệu chưa được lưu',
        resizable: false,
        fluid: true
    })

    outward = new Outward();
    //Resize lại bảng
    resizeAll();
})

//Set up ô input time picker
$("input.timepicker").timepicker({ 'timeFormat': 'H:i', 'step': 15 });
$(document).on('click', '.icon-timepicker', function () {
    $(".timepicker").focus();
})

class Outward {
    constructor() {
        var me = this;

        //Filter theo loại chứng từ
        $("#typeVoucher").selectmenu({
            change: function (event, data) {
                var typeVoucher = data.item.value;
                me.FilterCombo(typeVoucher);
            }
        });

        //Set thời gian mặc định
        $('.timepicker').val(moment().format('hh:mm'));
        DateTimeNow($('.datepicker-differ'));

        this.loadData();
        //this.loadDataToSave();
        this.loadDataDetail();
        this.initEvent();

        //Resize lại bảng
        resizeAll();
    }

    initEvent() {

        /*
         *Sự kiện ngoài màn hình chính
         */
        //Click vào row trong bảng thì đổi màu
        $(document).on('click', '.content-table tbody tr', this.RowClicked);
        //Filter theo input
        $(document).on('keyup', '.tbl-header input', { scope: this }, this.FilterInputThead);
        //Filter cho ngày khi thay đổi
        $(document).on('change', '.header-th-1 .datepicker', { scope: this }, this.FilterInputThead);
        //Click vào nút thêm sẽ mở dialog add
        $(document).on('click', '.btn-add', { mode: 1, scope: this }, this.ShowDialogAdd.bind(this));
        //Click button see sẽ xem thông tin chi tiết của row đc chọn
        $(document).on('click', '.btn-see', { mode: 2, scope: this }, this.ShowDialogAdd.bind(this));
        //Click button edit sẽ show thông tin lên dialog Add để sửa
        $(document).on('click', '.border-table .btn-edit', { mode: 3, scope: this }, this.ShowDialogAdd.bind(this));
        //Click button nhân bản sẽ nhân bản dòng đc chọn theo yêu cầu
        $(document).on('click', '.btn-duplicate', { mode: 4, scope: this }, this.ShowDialogAdd.bind(this));
        //Click button xóa sẽ xóa dòng đc chọn
        $(document).on('click', '.btn-delete', { scope: this }, this.DeleteAOutWard);
        //Fake chức năng load
        $(document).on('click', '.bor-icon-pages', this.loadData.bind(this));
        //Click In sẽ show dialog chức năng đang thi công
        $(document).on('click', '.border-table .btn-print', { scope: this }, this.ShowDialogValidate);

        /*
         *Common
         */
        //định dạng tiền cho các ô input tiền
        $(document).on('keyup', '.padding-money', { scope: this }, this.FormatMoney);
        //định dạng tiền cho các ô input tiền
        $(document).on('keyup', 'thead .header-th-4 input', { scope: this }, this.FormatMoney);

        /*
         *Dialog
         */
        //Click vào radio mất chọn chị nhánh combo và thay đổi radio
        $(document).on('click', '.radio-check', this.ChangeRadio);
        //Click ra ngoài dialog sẽ reset input đối tượng
        $(document).on('click', '#dialogAdd', this.ResetVal);
        //Focusout khỏi dòng cuối sẽ thêm 1 dòng ms
        $(document).on('keydown', '.tbl-body-same input', { scope: this }, this.AddNewRowTableSame);
        //focus dòng sẽ add class row-selected 
        $(document).on('focus', '.tbl-body-same input', { scope: this }, this.AddClassRowSelected);
        //Change input sẽ tính lại thành tiền
        $(document).on('change', '.con-sum', { scope: this }, this.SumMoneySame);
        //Change input thành tiền sẽ tính lại đơn giá
        $(document).on('change', '.sum-money', { scope: this }, this.SumPriceItem);
        //Bấm vào icon delete sẽ xóa 1 row trong table chi tiết trong dialog
        $(document).on('click', '.icon-delete', { scope: this }, this.DeleteARow);
        //Click button Save save lại dữ liệu trong form
        $(document).on('click', '.btn-save', { scope: this }, this.Save);
        //hover vào combobox object sẽ bỏ class hover
        $(document).on('mouseenter', '.show-combo > div:last-child', { scope: this }, this.ReloadHover);
        //Focus vào 1 ô input sẽ đổi màu outline của nó
        $(document).on('focus', '.infor-same-add input', { scope: this }, this.ChangeColorOutlineInput);
        //Outfocus sẽ reload lại outline cho nó
        $(document).on('focusout', '.infor-same-add input', { scope: this }, this.ReloadColorOutlineInput);
        //Click icon close sẽ tắt dialog đó
        $(document).on('click', '.icon-close-same', { scope: this }, this.CloseDialogCorresponding);
        //Save khi bấm button lưu trong dialog accept
        $(document).on('click', '#dialogAccept .bor-btn-dialogAccept > span > button:first-child', { scope: this }, this.Save);
        //Click vào button không lưu sẽ tắt tất cả dialog
        $(document).on('click', '#dialogAccept .bor-btn-dialogAccept > span > button:first-child + button', this.CloseDialogAdd);
        //Check xem có phải tab không thì tắt tất cả combobox đi
        $(document).on('keydown', '.content-dialog-add input', this.CheckKeyDown);

        /*
         *Map dữ liệu chọn trong combobox vs các ô input bên ngoài
         */
        //Click 1 row map dữ liệu vào dòng input trên
        $(document).on('click', '.combobox-object > div:last-child > div', { scope: this }, this.MapValInputObject);
        //Click 1 row map dữ liệu item vào bảng trong dialog
        $(document).on('click', '.combo-deffer-item > div:last-child > div', { scope: this }, this.MapValInputItem);
        //Click 1 row map dữ liệu kho vào bảng trong dialog
        $(document).on('click', '.combo-deffer-stock > div:last-child > div', { scope: this }, this.MapValInputStock);

        /*
         *Validate
         */
        //Check validate khi nhập vào các ô input cần validate
        $(document).on('keyup', '.input-validate input', { scope: this }, this.CheckValidateInput);
        //blur khỏi ô input sẽ quay trở lại giá trị nhập gần nhất
        $(document).on('blur', '.input-validate input', { scope: this }, this.ReloadValueValidate);
        //Lưu giá trị trc khi thao tác
        $(document).on('focus', '.input-validate input', { scope: this }, this.SaveInputValidate);
        //Reload lại giá trị cho ô idobject
        $(document).on('blur', '.flex-row input[property="IdObject"]', { scope: this }, this.ReloadInputIdObjectValidate);
        //Reload lại giá trị cho ô CodeItem
        $(document).on('blur', '.tbl-body-same input[fieldname="CodeItem"]', { scope: this }, this.ReloadInputCodeItemValidate);

        /*
         *ShowCombobox
         */
        //Click vào icon-arrow xổ xuống combobox
        $(document).on('click', '.icon-arrow-same', { scope: this }, this.ShowCombobox);
        //Show Combobox Item
        $(document).on('click', '.thsame-header-1 .icon-dropdown', { scope: this }, this.ShowCombobox);
        //Show Combobox Stock
        $(document).on('click', '.cell-item-select .icon-dropdown', { scope: this }, this.ShowCombobox);

        /*
         *Autocomplete
         */
        //AutoComplete đối tượng
        $(document).on('keyup', '.id-object', { scope: this }, this.AutoCompleteInput);
        //AutoComplete mã SKU
        $(document).on('keyup', 'input[fieldname="CodeItem"]', { scope: this }, this.AutoCompleteInput);
        //AutoComplete mã kho
        $(document).on('keyup', 'input[fieldname="WardItem"]', { scope: this }, this.AutoCompleteInput);

        //Click vào hủy sẽ tắt dialog hiện tại
        //$(document).on('click', '#dialogAccept .bor-btn-dialogAccept > span > button:last-child', this.CloseDialogAccept);
        $('#dialogAccept .bor-btn-dialogAccept > span > button:last-child').click(function () {
            dialog3.dialog('close');
            dialog2.dialog('close');
        });
        //Close dialog accept
        $('#dialogCheckValidate .bor-btn-dialogAccept button').click(function (event) {
            event.preventDefault();
            dialog3.dialog('close');
            dialog2.dialog('close');
        })
        $('#dialogCheckValidate .bor-btn-dialogAccept button').click(function (event) {
            event.preventDefault();
            dialog3.dialog('close');
            dialog2.dialog('close');
        })
        //$('.btn-close').click(function (event) {
        //    event.preventDefault();
        //    dialog.dialog('close');
        //})
        //Click button đóng sẽ đóng dialog
        $(document).on('click', '.btn-close', { scope: this }, this.ShowDialogAccept);
    }

    /**
     * Check xem có phải tab không thì tắt tất cả combobox đi
     * @param {any} sender
     */
    CheckKeyDown(sender) {
        if (sender.keyCode == 9) {
            $('.show-combo').removeAttr('style');
        }
    }

    /**
     * Click In sẽ show dialog chức năng đang thi công
     * */
    ShowDialogValidate() {
        dialog2.dialog('open');
        $('#dialogCheckValidate .detail-ques-dialogAccept').html('Chức năng đang được bảo trì');
    }

    /**
     * Outfocus sẽ reload lại outline cho nó
     * */
    ReloadColorOutlineInput() {
        $(this).parent().removeAttr('style');
    }

    /**
     * Focus vào 1 ô input sẽ đổi màu outline của nó
     * */
    ChangeColorOutlineInput() {
        $(this).parent().css('border-color', '#9696ff');
    }

    /**
     * Change input thành tiền sẽ tính lại đơn giá
     * */
    SumPriceItem() {
        //Ô số lượng
        var quan = $($(this).parents('tr').find('.con-sum')[0]);
        //Ô đơn giá
        var price = $($(this).parents('tr').find('.con-sum')[1]);
        //Ô thành tiền
        var sum = $(this);
        if (quan.val() && sum.val()) {
            //Đơn giá bằng thành tiền / số lượng
            price.val(parseInt(sum.val().split('.').join(""), 10) / parseInt(quan.val().split('.').join(""), 10));
            //Định dạng cho ô đơn giá
            InputMoneyVal(price.val().split('.')[0], price);
        }

        //Tính tổng tiền và tổng số lượng dười footer
        sumMoneyTableSame();
        sumNumberTableSame();
    }

    /**
     * Click vào hủy sẽ tắt dialog hiện tại
     * @param {any} event
     */
    CloseDialogAccept(event) {
        event.preventDefault();
        dialog3.dialog('close');
        dialog2.dialog('close');
    }

    /**
     * Click button đóng sẽ đóng dialog
     * */
    ShowDialogAccept(sender) {
        var me = sender.data['scope'];
        //Thay button close trên title bar của dialog
        ChangeButtonCloseAnother('#dialogAccept');
        dialog3.dialog('open');
        if (me.CheckForm == 2) {
            $('#dialogAccept .bor-btn-dialogAccept > span > button:first-child').css('pointer-events', 'none');
        } else {
            $('#dialogAccept .bor-btn-dialogAccept > span > button:first-child').removeAttr('style');
        }
    }

    /**
     * Click icon close sẽ tắt dialog đó
     * */
    CloseDialogCorresponding() {
        //Kiểm tra xem có phải dialog chính không
        if ($(this).parent().siblings().is('#dialogAdd')) {
            dialog.dialog('close');
        } else {
            dialog2.dialog('close');
            dialog3.dialog('close');
        }
    }

    /**
     * Reload lại giá trị cho ô CodeItem
     * */
    ReloadInputCodeItemValidate() {

        //Kiểm tra xem có bị dính validate không
        if ($(this).parents('td').attr('style')) {
            //Nếu có reset giá trị về rỗng và bỏ validate
            $(this).val('');
            $(this).parents('td').removeAttr('style');
        } else {

        }
    }

    /**
     * Filter theo input
     * */
    FilterInputThead(sender) {
        var meSum = sender.data['scope'];
        var me = this;
        meSum.Resul = [];
        //Lấy roperty name và filter
        var propertyName = $(this).parents('th').attr('property');
        $.each(meSum.ListOutWardDto, function (index, item) {
            //valu : Giá trị nhập ở ô input theo từng trường hợp
            //valuItem : Giá trị trong list danh sách
            if (propertyName == 'DateOutWard') {

                var valu = $(me).val().split('/').join("").split('_').join("");
                var valuItem = item[propertyName].split('/').join("");
            } else {
                if (propertyName == 'TotalMoney') {
                    var valu = $(me).val().split('.').join("");
                    var valuItem = item[propertyName].split('.').join("");
                } else {
                    var valu = $(me).val();
                    var valuItem = item[propertyName];
                }
            }
            //So sánh nếu có thì add vào mảng meSum.Resul
            if (valuItem.search(valu) > -1) {
                meSum.Resul.push(item);
            }
        })

        //Vẽ lại bảng vs list meSum.Resul
        addTableMain(meSum.Resul);

        //Resize lại bảng
        resizeAll();
    }

    /**
     * định dạng tiền cho các ô input tiền
     * */
    FormatMoney() {
        InputMoneyVal($(this).val(), $(this));
    }

    /**
     * hover vào combobox object sẽ bỏ class hover
     * */
    ReloadHover() {
        $('.hover').removeClass('hover');
    }

    /**
     * Reload lại giá trị cho ô idobject
     * */
    ReloadInputIdObjectValidate() {
        //Kiểm tra xem có bị dính validate không
        if ($(this).parent().siblings().attr('style')) {
            //Nếu có thì reset lại giá trị về rỗng và bỏ validate
            $(this).parent().parent().children().removeAttr('style');
            $(this).val();
        } else {

        }
    }

    /**
     * Lưu giá trị trc khi thao tác
     * @param {any} sender
     */
    SaveInputValidate(sender) {

        var me = sender.data['scope'];
        //me.SaveInput : Giá trị gần nhất trc khi rỗng để reload lại giá trị bị validate
        me.SaveInput = $(this).val();
    }

    /**
     * blur khỏi ô input sẽ quay trở lại giá trị nhập gần nhất
     * @param {any} sender
     */
    ReloadValueValidate(sender) {

        var me = sender.data['scope'];
        if ($(this).hasClass('datepicker-differ')) {
            //Kiểm tra xem có nhập vớ vẩn không
            if (isDate($(this).val())) {

            } else {

                //Gán ngày hiện tại

                var d = new Date();

                var date = d.getDate();

                var month = d.getMonth();

                var year = d.getFullYear();

                var months = new Array("01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12");

                if (date < 10) {
                    date = '0' + date;
                }

                var datetime = date + "/" + months[month] + "/" + year;

                $(this).parent().parent().children().removeAttr('style');
                $(this).val(datetime);
            }

        } else {
            //Nếu không phải input ngày tháng năm thì sẽ gán cho giá trị gần nhất khác rỗng

            if ($(this).hasClass('timepicker')) {
                if (isTime($(this).val())) {

                } else {
                    $('.timepicker').val(moment().format('hh:mm'));
                    $(this).parent().parent().children().removeAttr('style');
                    $(this).val(me.SaveInput);
                }
            } else {
                if (!$(this).val()) {
                    $(this).parent().parent().children().removeAttr('style');
                    $(this).val(me.SaveInput);
                }
            }
        }
    }

    /**
     * Check validate khi nhập vào các ô input cần validate
     * @param {any} sender
     */
    CheckValidateInput(sender) {

        var me = sender.data['scope'];
        //Kiểm tra xem có rỗng không
        if ($(this).val().length) {
            //Nếu không rỗng thì bỏ validate và gán giá trị lưu
            $(this).parent().parent().children().removeAttr('style');
            me.SaveInput = $(this).val();
        } else {
            //Nếu rỗng thì gán validate vào
            $(this).parent().css({
                'width': '80%',
                'border-color': 'red'
            });
            $(this).parent().siblings().css('display', 'unset');
        }
    }

    /**
     * Click button xóa sẽ xóa dòng đc chọn
     * @param {any} sender
     */
    DeleteAOutWard(sender) {

        //Lấy id bản ghi đc chọn
        var recordId = $('.row-selected').attr('recordid');
        var me = sender.data['scope'];

        var confirm = window.confirm("Bạn có muốn xóa không?");
        if (confirm) {
            //Xóa outward
            $.ajax({
                method: 'DELETE',
                url: '/outward/' + recordId,
                async: true
            }).done(function (res) {
                alert('Bạn đã xóa thành công');
                me.loadData();
            }).fail(function (res) {

            })

            //Xóa outward detail
            $.ajax({
                method: 'DELETE',
                url: '/outwarddetail/' + recordId,
                async: true
            }).done(function (res) {
                me.loadDataDetail();
            }).fail(function (res) {

            })
        }

    }

    /**
     * Click vào button không lưu sẽ tắt tất cả dialog
     * */
    CloseDialogAdd() {

        dialog2.dialog('close');
        dialog3.dialog('close');
        dialog.dialog('close');
    }

    /**
     * Click 1 row map dữ liệu item vào bảng trong dialog
     * @param {any} sender
     */
    MapValInputItem(sender) {
        var me = this;

        //Nếu có class hover thì sẽ sử dụng class hover thay cho this
        if ($('.hover').hasClass('hover')) {
            me = $('.hover');
        }
        var meSum = sender.data["scope"];
        meSum.thisRow.find('[itemmodel="CodeItem"]').data('id', $(me).attr('iditem'));
        //Thêm id Item vào ô input đầu tiền của dòng đấy để dùng cho vc Save
        //meSum.thisRow.find('[itemmodel="CodeItem"]').attr('idItem', $(this).attr('iditem'));
        $.ajax({
            method: 'GET',
            url: '/item/' + $(me).attr('iditem'),
            async: false
        }).done(function (res) {

            //load dữ liệu item vào bảng
            var itemModels = meSum.thisRow.find('[itemModel]');
            $.each(itemModels, function (index, item) {
                var itemModelName = $(item).attr('itemModel');
                $(item).val(res[itemModelName]);
            })

            //Tính thành tiền

            var quan = meSum.thisRow.find('[fieldname="AmountItem"]');
            var price = res['PriceItem'];
            var sum = meSum.thisRow.find('.sum-money');
            if (quan.val() && price) {
                sum.val(parseInt(quan.val().split('.').join(""), 10) * parseInt(price.split('.').join(""), 10));
                InputMoneyVal(sum.val(), sum);
            }

            //Thêm class row-selected-same để check xem mình có phải vừa map dữ liệu vào dòng cuối cùng của bảng chi tiết hay không
            meSum.thisRow.addClass('row-selected-same');
            meSum.thisRow.find('*').addClass('row-selected-same');

            //Khi bấm vào button edit sẽ gán attr idItemDetail = id của item
            if (meSum.CheckForm == 3) {
                meSum.thisRow.attr('idItemDetail', $(me).attr('iditem'));
            }
        }).fail(function (res) {

        })

        //Add 1 row ms
        if ($('.tbl-body-same').find('tbody').children().last().hasClass('row-selected-same')) {
            var tr = '<tr>'
                + '<td class="cell-item-input thsame-header-1">'
                + '<div class="td-flex">'
                + '<input autocomplete="off" type="text" name="SKU" value="" fieldName="CodeItem" placeholder="Tìm mã hoặc tên" itemModel="CodeItem" />'
                + '<div class="td-flex ">'
                + '<div class="icon-dropdown" combobox="CodeItem"></div>'
                + '<div class="icon-quicksearch"></div>'
                + '</div>'
                + '</div>'
                + '</td>'
                + '<td class="text-left disable thsame-body-2">'
                + '<input fieldName="NameItem" disabled style="width:100%;background-color:#F0F0F0" itemModel="NameItem" />'
                + '</td>'
                + '<td class="text-left cell-item-select thsame-header-3">'
                + '<div class="center"><input autocomplete="off" type="text" name="name" value="" fieldName="WardItem" itemModel="WardItem" /><div class="icon-dropdown" combobox="WardItem"></div></div>'
                + '</td>'
                + '<td class="text-left cell-input-type thsame-header-4">'
                + '<div><input type="text" name="name" value="" fieldName="UnitItem" itemModel="UnitItem" /></div><!--combobox="UnitItem"-->'
                + '</td>'
                + '<td class="thsame-header-5">'
                + '<div>'
                + '<input type="number" max="100" min="1" name="name" fieldName="AmountItem" value="0" style="width:100%" class="text-center con-sum" />'
                + '</div>'
                + '</td>'
                + '<td class="text-right thsame-header-6">'
                + '<input type="text" fieldName="PriceOutWardDetail" name="name" value="" style="width:100%" class="padding-money con-sum" itemModel="PriceItem" />'
                + '</td>'
                + '<td class="text-right thsame-header-7"><input type="text" name="name" value="0" fieldName="Money" style="width:100%" class=" padding-money sum-money" /></td>'
                + '<td class="item-center btnDelete thsame-header-8"><div class="icon-delete"></div></td>'
                + '</tr>';
            $('.tbl-body-same tbody').append(tr);
        }

        //Tính tổng tiền và tổng số lượng dười footer
        sumMoneyTableSame();
        sumNumberTableSame();
        $('.tbl-footer-same .thsame-header-1').html('Số dòng = ' + $('.tbl-body-same').find('tr').length);

    }

    /**
     * Click 1 row map dữ liệu vào dòng input trên
     * */
    MapValInputObject() {

        if ($('.hover').hasClass('hover')) {
            //map dữ liệu object vào các ô input tương ứng
            $('[fieldname="IdObject"]').val($('.hover').children()[0].innerText);
            $('[fieldname="IdObject"]').data('id', $('.hover').attr('IdObject'));
            $('[fieldname="DeliverOutWard"]').val($('.hover').children()[1].innerText);
            $($('.grid-input-sameinfor input')[1]).val($('.hover').children()[1].innerText);
        } else {
            //map dữ liệu object vào các ô input tương ứng
            $('[fieldname="IdObject"]').val($(this).children()[0].innerText);
            $('[fieldname="IdObject"]').data('id', $(this).attr('IdObject'));
            $('[fieldname="DeliverOutWard"]').val($(this).children()[1].innerText);
            $($('.grid-input-sameinfor input')[1]).val($(this).children()[1].innerText);
        }
    }

    /**
     * Click 1 row map dữ liệu kho vào bảng trong dialog
     * @param {any} sender
     */
    MapValInputStock(sender) {

        var me = sender.data['scope'];
        if ($('.hover').hasClass('hover')) {
            //map dữ liệu stock vào các ô input tương ứng
            me.thisRow.find('[fieldname="WardItem"]').val($('.hover').children()[1].innerText);
        } else {
            //map dữ liệu stock vào các ô input tương ứng
            debugger
            me.thisRow.find('[fieldname="WardItem"]').val($(this).children()[1].innerText);
        }
    }

    /**
     * Click button Save save lại dữ liệu trong form
     * @param {any} sender
     */
    Save(sender) {

        dialog3.dialog('close');
        //Check các validate cần có khi save
        if ($('[property="IdObject"]').val() == "" || $($('[fieldname="CodeItem"]')[0]).val() == "") {
            if ($($('[fieldname="CodeItem"]')[0]).val() == "") {
                //Nếu code item = "" sẽ mở dialog validate
                $('#dialogCheckValidate .detail-ques-dialogAccept').html('Phải có ít nhất một dòng chi tiết. Vui lòng kiểm tra lại!');
                dialog2.dialog('open');
                ChangeButtonCloseAnother('#dialogCheckValidate');
            } else {
                //Nếu code object = "" sẽ mở dialog validate
                $('#dialogCheckValidate .detail-ques-dialogAccept').html('Nhập thiếu đối tượng!');
                dialog2.dialog('open');
                ChangeButtonCloseAnother('#dialogCheckValidate');
            }
        } else {
            //Nếu không dính validate
            var me = sender.data['scope'];

            var check = 0;

            //Tạo và add dữ liệu vào biến outWard
            var outWard = {};
            var fields = $('.content-dialog-add [property]');
            $.each(fields, function (index, item) {
                var propertyName = $(item).attr('property');
                if (propertyName == 'TotalMoney') {
                    outWard[propertyName] = $(item).html();
                } else {
                    outWard[propertyName] = $(item).val();
                }
            })
            outWard['IdObject'] = $('[property="IdObject"]').data('id');
            outWard['TypeOutWard'] = "Phiếu xuất kho kiểm kê";

            //Cài đặt phương thức động cho ajax
            if (me.CheckForm == 1 || me.CheckForm == 4) {
                var method = 'POST';
                var methodDetail = 'POST';
            } else {
                var method = 'PUT';
                var methodDetail = 'PUT';
                //Nếu là sửa thì thêm id cho outward
                outWard['ID'] = $('.row-selected').attr('recordid');
            }

            $.ajax({
                method: method,
                url: '/outward',
                data: outWard
            }).done(function (res) {
                var trs = $('.tbl-body-same').find('tr');

                var check = 0;
                var outWardDetails = []

                //Lấy các outwarđetail theo từng dòng trong bảng
                $.each(trs, function (index, item) {
                    var outWardDetail = {};
                    outWardDetail['IDOutWard'] = res;
                    //outWardDetail['IDItem'] = $(item).children().first().find('input').attr('iditem');
                    outWardDetail['IDItem'] = $(item).children().first().find('input').data('id');

                    //if (me.CheckForm == 4 && !outWardDetail['IDItem']) {
                    //    
                    //    outWardDetail['IDItem'] = $(item).children().first().find('input').attr('iditem');
                    //}

                    outWardDetail['PriceOutWardDetail'] = $(item).find('input[fieldname="Money"]').val();
                    outWardDetail['AmountOutWardDetail'] = $(item).find('input[fieldname="AmountItem"]').val();

                    if (me.CheckForm == 3 && !$(item).children().first().find('input').data('id')) {
                        outWardDetail['IDItem'] = $(item).attr('idItemDetail');
                        outWardDetail['IDOutWardDetail'] = $(item).attr('idOutwardDetail');
                    }
                    if (me.CheckForm == 4 && !$(item).children().first().find('input').data('id')) {

                        outWardDetail['IDItem'] = $(item).attr('idItemDetail');
                    }
                    outWardDetails.push(outWardDetail);

                    //Add outWardDetail vào mảng outWardDetails để đẩy lên server

                })
                if (me.CheckForm == 1 || me.CheckForm == 4) {
                    //Add outwarddetail
                    $.ajax({
                        method: methodDetail,
                        url: '/outwarddetail',
                        data: JSON.stringify(outWardDetails),
                        async: false,
                        contentType: 'application/json;charset=utf-8',
                        dataType: 'json'
                    }).done(function (respon) {

                        check = respon;
                    }).fail(function (respon) {
                    })

                    if (check == 1) {
                        me.nextCodeVor = $('input[property="CodeOutWard"]').val();

                        alert('Thêm thành công');
                        dialog.dialog('close');
                        me.loadData();
                        //me.loadDataDetail();
                    } else {
                        alert('Thêm thất bại');
                        dialog.dialog('close');
                    }
                } else {
                    //Delete các outward detail theo record ID
                    $.ajax({
                        method: 'DELETE',
                        url: '/outwarddetail/' + $('.row-selected').attr('recordid'),
                        async: false
                    }).done(function (respon) {
                    }).fail(function (respon) {
                    })

                    //Add lại từ đầu
                    $.ajax({
                        method: 'POST',
                        url: '/outwarddetail',
                        data: JSON.stringify(outWardDetails),
                        async: false,
                        contentType: 'application/json;charset=utf-8',
                        dataType: 'json'
                    }).done(function (respon) {
                        check = respon;
                    }).fail(function (respon) {
                    })

                    if (check == 1) {
                        me.nextCodeVor = $('input[property="CodeOutWard"]').val();

                        alert('Thêm thành công');
                        dialog.dialog('close');
                        me.loadData();
                        //me.loadDataDetail();
                    } else {
                        alert('Thêm thất bại');
                        dialog.dialog('close');
                    }
                }



            }).fail(function (res) {

            })
        }
    }

    /**
     * Bấm vào icon delete sẽ xóa 1 row trong table chi tiết trong dialog
     * */
    DeleteARow() {

        if ($('.tbl-body-same tbody').children().length > 1) {
            $(this).parents('tr').remove();
        }
        //Resize lại bảng
        resizeAll();

        //Tính tổng tiền và tổng số lượng dười footer
        sumMoneyTableSame();
        sumNumberTableSame();

        $('.tbl-footer-same .thsame-header-1').html('Số dòng = ' + $('.tbl-body-same').find('tr').length);
    }

    /**
     * Change input sẽ tính lại thành tiền
     * */
    SumMoneySame() {

        var quan = $($(this).parents('tr').find('.con-sum')[0]);
        var price = $($(this).parents('tr').find('.con-sum')[1]);
        var sum = $(this).parents('tr').find('.sum-money');
        if (quan.val() && price.val()) {
            sum.val(parseInt(quan.val().split('.').join(""), 10) * parseInt(price.val().split('.').join(""), 10));
            InputMoneyVal(sum.val(), sum);
        }

        //Tính tổng tiền và tổng số lượng dười footer
        sumMoneyTableSame();
        sumNumberTableSame();
    }

    /**
     * focus dòng sẽ add class row-selected 
     * */
    AddClassRowSelected() {
        //Add class row-selected vào tr
        $('.row-selected-same').removeClass('row-selected-same');
        $(this).parents('tr').addClass('row-selected-same');
        $(this).parents('tr').find('*').addClass('row-selected-same');

        //add class back-white vào input this
        $('.back-white').removeClass('back-white');
        $(this).parents('td').addClass('back-white');
        $(this).parents('td').find('*').addClass('back-white');
    }


    /**
     * Focusout khỏi dòng cuối sẽ thêm 1 dòng ms
     * */
    AddNewRowTableSame(event) {
        var valur = $(this).val();
        if (event.keyCode == 13 || event.keyCode == 9) {
            if (valur != "" && $('.tbl-body-same tbody').children().last().hasClass('row-selected-same') && valur != "0") {
                var tr = '<tr>'
                    + '<td class="cell-item-input thsame-header-1">'
                    + '<div class="td-flex">'
                    + '<input autocomplete="off" type="text" name="SKU" value="" fieldName="CodeItem" placeholder="Tìm mã hoặc tên" itemModel="CodeItem" />'
                    + '<div class="td-flex ">'
                    + '<div class="icon-dropdown" combobox="CodeItem"></div>'
                    + '<div class="icon-quicksearch"></div>'
                    + '</div>'
                    + '</div>'
                    + '</td>'
                    + '<td class="text-left disable thsame-body-2">'
                    + '<input fieldName="NameItem" disabled style="width:100%;background-color:#F0F0F0" itemModel="NameItem" />'
                    + '</td>'
                    + '<td class="text-left cell-item-select thsame-header-3">'
                    + '<div class="center"><input autocomplete="off" type="text" name="name" value="" fieldName="WardItem" itemModel="WardItem" /><div class="icon-dropdown" combobox="WardItem"></div></div>'
                    + '</td>'
                    + '<td class="text-left cell-input-type thsame-header-4">'
                    + '<div><input type="text" name="name" value="" fieldName="UnitItem" itemModel="UnitItem" /></div><!--combobox="UnitItem"-->'
                    + '</td>'
                    + '<td class="thsame-header-5">'
                    + '<div>'
                    + '<input type="number" max="100" min="1" name="name" fieldName="AmountItem" value="0" style="width:100%" class="text-center con-sum" />'
                    + '</div>'
                    + '</td>'
                    + '<td class="text-right thsame-header-6">'
                    + '<input type="text" fieldName="PriceOutWardDetail" name="name" value="" style="width:100%" class="padding-money con-sum" itemModel="PriceItem" />'
                    + '</td>'
                    + '<td class="text-right thsame-header-7"><input type="text" name="name" value="0" fieldName="Money" style="width:100%" class=" padding-money sum-money" /></td>'
                    + '<td class="item-center btnDelete thsame-header-8"><div class="icon-delete"></div></td>'
                    + '</tr>';
                $('.tbl-body-same tbody').append(tr);
            }
        }
        $('.tbl-footer-same .thsame-header-1').html('Số dòng = ' + $('.tbl-body-same').find('tr').length);
    }

    /**
     * Click ra ngoài dialog sẽ reset input đối tượng
     * */
    ResetVal() {
        $('[combobox]').hide();
        $('[combobox]').removeAttr('style');
    }

    /**
     * AutoComplete đối tượng
     * @param {any} sender
     */
    AutoCompleteInput(sender) {

        sender.stopPropagation();
        var me = sender.data["scope"];
        var fieldName = $(this).attr('fieldName');
        var classs = '';
        var limit;

        //Tắt hết các combobox trc khi chạy autocomplete
        $('.show-combo').removeAttr('style');
        if (sender.keyCode == 9) {
            $('.show-combo').removeAttr('style');
        }

        switch (fieldName) {
            case 'IdObject':
                var posParent = $(this).parent().position();
                classs = '.combobox-object';
                limit = 3;
                break;
            case 'CodeItem':
                var posParent = $(this).parents('td').position();
                classs = '.combo-deffer-item';
                limit = 4;
                //me.thisRow : trỏ đến thằng tr đang thao tác
                me.thisRow = $(this).parents('tr');
                break;
            case 'WardItem':
                var posParent = $(this).parents('td').position();
                classs = '.combo-deffer-stock';
                me.thisRow = $(this).parents('tr');
                limit = 4;
                break;
            default:
                break;
        }

        var height = $(classs).height();


        if (!$(this).val()) {

            //Reset lại bảng ban đầu
            var value = $(this).val();
            //filter theo nhân viên
            $(classs + ' > div:last-child > div').filter(function () {
                $(this).toggle($(this).text().indexOf(value) > -1)
            });

            //Height auto
            if ($(classs + ' > div:last-child > div[style="display: none;"]').length >= limit) {
                $(classs).css('height', 'auto');
            } else {
                $(classs).css('height', height);
            }

            //Lấy vị trí ô đó
            var left = posParent.left;
            if (classs == '.combobox-object') {
                var top = posParent.top + 33;
            } else {
                var top = posParent.top - $(classs).height() - 1;
            }
            $(classs).hide();
            $(classs).removeAttr('style');
        } else {
            var value = $(this).val();
            //filter theo nhân viên
            $(classs + ' > div:last-child > div').filter(function () {
                $(this).toggle($(this).text().indexOf(value) > -1)
            });

            //Height auto
            if ($(classs + ' > div:last-child > div[style="display: none;"]').length >= limit) {
                $(classs).css('height', 'auto');
            } else {
                $(classs).css('height', height);
            }

            var divstyles = $(classs + ' > div:last-child > div[style="display: none;"]');

            //Lấy vị trí ô đó
            var left = posParent.left;
            if (fieldName == 'IdObject') {
                var top = posParent.top + 33;
            } else {
                var top = posParent.top - $(classs).height() - 1;
            }
            $(classs).show();
            $(classs).css({
                top: top,
                left: left
            })
            if (fieldName == 'IdObject') {
                $(this).parent().parent().children().removeAttr('style');
            }
            if (fieldName == 'CodeItem') {
                $(this).parents('td').removeAttr('style');
            }


            if (divstyles.length == $(classs + ' > div:last-child > div').length) {
                $(classs).removeAttr('style');
                $(classs).hide();

                //Validate code đối tượng
                //$('.div-first-validate')
                if (fieldName == 'IdObject') {
                    $(this).parent().css({
                        'width': '80%',
                        'border-color': 'red'
                    });
                    $(this).parent().siblings().css('display', 'unset');
                }
                if (fieldName == 'CodeItem') {
                    $(this).parents('td').css('border', '1px solid red');
                }
            } else {
                var arrayJS = [];
                var rows = $(classs + ' > div:last-child').children();
                //di thằng đầu tiên
                var checkHover = 0;
                $.each(rows, function (index, item) {
                    if (!$(item).is('[style="display: none;"]')) {
                        arrayJS.push($(item));
                    }
                })

                $.each(arrayJS, function (index, item) {
                    if ($(item).hasClass('hover')) {
                        //Di lên, di xuống
                        checkHover = 1;
                    }
                })

                //Kiểm tra xem ấn lên hay xuống
                if (sender.keyCode == 40 || sender.keyCode == 38) {
                    //Kiểm tra đã ấn lên hoặc xuống lần nào chức
                    if (checkHover == 0) {
                        //Nếu chưa thì sẽ thay màu dòng đầu hoặc cuối của combobox hiện lên
                        if (sender.keyCode == 38) {
                            $(arrayJS[arrayJS.length - 1]).addClass('hover');
                        } else {
                            $(arrayJS[0]).addClass('hover');
                        }
                    } else {
                        //Nếu có rồi
                        $.each(arrayJS, function (index, item) {

                            if (checkHover == 1) {
                                if ($(item).hasClass('hover')) {
                                    $(item).removeClass('hover');
                                    if (sender.keyCode == 38) {
                                        if (index == 0) {
                                            $(arrayJS[arrayJS.length - 1]).addClass('hover');       /*$(arrayJS[arrayJS.length - 1])*/
                                            checkHover = 0;
                                        } else {
                                            $(arrayJS[index - 1]).addClass('hover');
                                            checkHover = 0;
                                        }
                                    } else {
                                        if (index == arrayJS.length - 1) {
                                            $(arrayJS[0]).addClass('hover');            /*$(arrayJS[0])*/
                                            checkHover = 0;
                                        } else {
                                            $(arrayJS[index + 1]).addClass('hover');
                                            checkHover = 0;
                                        }
                                    }
                                }
                            }
                        })
                    }
                }

                //Kiểm tra xem có bấm enter hay không
                if (sender.keyCode == 13) {
                    //Nếu có thì sẽ map dữ liệu theo ô input mình đang thao tác
                    if ($('.hover').length) {
                        switch (fieldName) {
                            case 'IdObject':
                                me.MapValInputObject();
                                break;
                            case 'CodeItem':
                                me.thisRow = $(this).parents('tr');
                                me.MapValInputItem(sender);
                                break;
                            case 'WardItem':
                                me.thisRow = $(this).parents('tr');
                                me.MapValInputStock(sender);
                                break;
                            default:
                                break;
                        }
                        //me.MapValInputObject();
                        $('.show-combo').removeAttr('style');
                        $('.hover').removeClass('hover');
                        $('.show-combo').find('*').removeAttr('style');
                    }
                }
            }

        }
    }

    /**
     * Click vào icon-arrow xổ xuống combobox
     * */
    ShowCombobox(sender) {
        sender.stopPropagation();
        var me = sender.data["scope"];
        var combobox = $(this).attr('combobox');
        var classs = '';
        var input;
        //Kiểm tra lại điều kiện combobox
        switch (combobox) {
            case 'IdObject':
                classs = '.combobox-object';
                input = $('.id-object');
                var posParent = $(this).parent().position();
                break;
            case 'CodeItem':
                classs = '.combo-deffer-item';
                input = $(this).parents('td').find('input');
                var posParent = $(this).parents('td').position();
                me.thisRow = $(this).parents('tr');

                //Đổi màu tường ứng của dòng
                $('.row-selected-same').removeClass('row-selected-same');
                $(this).parents('tr').addClass('row-selected-same');
                $(this).parents('tr').find('*').addClass('row-selected-same');
                $('.back-white').removeClass('back-white');
                $(this).parents('td').addClass('back-white');
                $(this).parents('td').find('*').addClass('back-white');
                break;
            case 'WardItem':
                classs = '.combo-deffer-stock';
                input = $(this).parent().find('input');
                var posParent = $(this).parents('td').position();
                me.thisRow = $(this).parents('tr');

                //Đổi màu tường ứng của dòng
                $('.row-selected-same').removeClass('row-selected-same');
                $(this).parents('tr').addClass('row-selected-same');
                $(this).parents('tr').find('*').addClass('row-selected-same');
                $('.back-white').removeClass('back-white');
                $(this).parents('td').addClass('back-white');
                $(this).parents('td').find('*').addClass('back-white');
                break;
            default:
                break;
        }

        var value = "";
        //filter theo nhân viên
        $(classs + ' > div:last-child > div').filter(function () {
            $(this).toggle(input.text().indexOf(value) > -1)
        });

        //Lấy vị trí ô đó
        var left = posParent.left;
        if (combobox == 'IdObject') {
            var top = posParent.top + 33;
        } else {
            var top = posParent.top - 177;
        }

        if (($('[combobox]').attr('style') && $(classs).attr('style')) || $(classs).attr('style')) {
            $('[combobox]').hide();
            $('[combobox]').removeAttr('style');
        } else {
            $('[combobox]').hide();
            $('[combobox]').removeAttr('style');

            $(classs).show();
            $(classs).css({
                top: top,
                left: left
            })
        }

    }

    /**
     * Click vào nút thêm sẽ mở dialog add
     * */
    ShowDialogAdd(sender) {

        //Các biến để kiểm tra và gọi các hàm bên ngoài
        var me = sender.data['scope'];
        var mode = sender.data['mode'];

        dialog.dialog('open');
        ChangeButtonCloseAnother('#dialogAdd');

        //Reset lại các thuộc tính ban đầu của dialog
        $('[disabled]').removeAttr('disabled');
        $('.disableClass').removeClass('disableClass');
        $('#dialogAdd .toolbar-menu-item').removeAttr('style');
        $('[itemmodel="NameItem"]').attr('disabled', 'disabled');
        $('.show-combo').removeAttr('style');
        $('.radio-check').removeAttr('style');

        if (mode == 1) {
            me.CheckForm = mode;
            //Reset form
            $('.content-dialog-add')[0].reset();

            //Mặc định số phiếu thu kế tiếp
            var outWardLast = this.ListOutWardDto[this.ListOutWardDto.length - 1];
            var idOutWardLast = outWardLast['CodeOutWard'];
            if (this.nextCodeVor) {
                var numLastNext = parseInt(me.nextCodeVor.split('NTTK').join(""), 10) + 1;
            } else {
                var numLastNext = parseInt(idOutWardLast.split('NTTK').join(""), 10) + 1;
            }
            var nextIdOutWard = 'NTTK0000' + numLastNext;
            if (this.NextCodeOutWard) {
                nextIdOutWard = this.NextCodeOutWard;
            }
            $('[value="PT000010"]').val(nextIdOutWard);

            //Mặc định date
            DateTimeNow($('input[property="DateOutWard"]'));

            //Mặc định time
            $('.timepicker').val(moment().format('hh:mm'));

            //Reset table
            $('.tbl-body-same tbody').empty();
            var tr = '<tr>'
                + '<td class="cell-item-input thsame-header-1">'
                + '<div class="td-flex">'
                + '<input autocomplete="off" type="text" name="SKU" value="" fieldName="CodeItem" placeholder="Tìm mã hoặc tên" itemModel="CodeItem" />'
                + '<div class="td-flex ">'
                + '<div class="icon-dropdown" combobox="CodeItem"></div>'
                + '<div class="icon-quicksearch"></div>'
                + '</div>'
                + '</div>'
                + '</td>'
                + '<td class="text-left disable thsame-body-2">'
                + '<input fieldName="NameItem" disabled style="width:100%;background-color:#F0F0F0" itemModel="NameItem" />'
                + '</td>'
                + '<td class="text-left cell-item-select thsame-header-3">'
                + '<div class="center"><input autocomplete="off" type="text" name="name" value="" fieldName="WardItem" itemModel="WardItem" /><div class="icon-dropdown" combobox="WardItem"></div></div>'
                + '</td>'
                + '<td class="text-left cell-input-type thsame-header-4">'
                + '<div><input type="text" name="name" value="" fieldName="UnitItem" itemModel="UnitItem" /></div><!--combobox="UnitItem"-->'
                + '</td>'
                + '<td class="thsame-header-5">'
                + '<div>'
                + '<input type="number" max="100" min="1" name="name" fieldName="AmountItem" value="0" style="width:100%" class="text-center con-sum" />'
                + '</div>'
                + '</td>'
                + '<td class="text-right thsame-header-6">'
                + '<input type="text" fieldName="PriceOutWardDetail" name="name" value="" style="width:100%" class="padding-money con-sum" itemModel="PriceItem" />'
                + '</td>'
                + '<td class="text-right thsame-header-7"><input type="text" name="name" value="0" fieldName="Money" style="width:100%" class=" padding-money sum-money" /></td>'
                + '<td class="item-center btnDelete thsame-header-8"><div class="icon-delete"></div></td>'
                + '</tr>';
            $('.tbl-body-same tbody').append(tr);

        } else {
            var rowSelected = $('.tbl-body').find('.row-selected');
            var recordId = rowSelected.attr('recordid');
            var dataOutWardDto;
            //Lấy outwarddto theo id outward
            $.ajax({
                method: 'GET',
                url: '/outward/' + recordId,
                dataType: 'json',
                async: false
            }).done(function (res) {
                dataOutWardDto = res;
            }).fail(function (res) {
            })

            //Lấy mảng outward detail theo id outward
            $.ajax({
                method: 'GET',
                url: '/outwarddetail/' + recordId,
                async: false
            }).done(function (res) {
                var dataOutWardDetails = res;

                $('.tbl-body-same tbody').empty();
                $.each(dataOutWardDetails, function (index, item) {
                    $.ajax({
                        method: 'GET',
                        url: '/item/' + item['IDItem'],
                        async: false
                    }).done(function (respon) {
                        //Add dữ liệu vào các input của OutWarđto
                        var properties = $('.content-dialog-add').find('input[property]');
                        $.each(properties, function (index2, item2) {
                            var propertyName = $(item2).attr('property');
                            if (propertyName == 'TotalMoney') {
                                $(item2).html(dataOutWardDto[propertyName]);
                            } else {
                                if (propertyName == 'IdObject') {
                                    $(item2).val(dataOutWardDto['CodeObject']);
                                    $(item2).data('id', dataOutWardDto['IDObject']);
                                } else {
                                    $(item2).val(dataOutWardDto[propertyName]);
                                }
                            }
                        })

                        $('.name-object').val(dataOutWardDto['NameObject']);

                        me.IDItem = item['IDItem'];
                        me.idOutwardDetail = item['IDOutWardDetail'];

                        //Add dữ liệu vào bảng dưới
                        var tr = '<tr idOutwardDetail=' + item['IDOutWardDetail'] + ' idItemDetail=' + item['IDItem'] + '>'
                            + '<td class="cell-item-input thsame-header-1">'
                            + '<div class="td-flex">'
                            + '<input autocomplete="off" type="text" name="SKU" value="' + respon['CodeItem'] + '" fieldName="CodeItem" placeholder="Tìm mã hoặc tên" itemModel="CodeItem" />'
                            + '<div class="td-flex ">'
                            + '<div class="icon-dropdown" combobox="CodeItem"></div>'
                            + '<div class="icon-quicksearch"></div>'
                            + '</div>'
                            + '</div>'
                            + '</td>'
                            + '<td class="text-left disable thsame-body-2">'
                            + '<input fieldName="NameItem" disabled style="width:100%;background-color:#F0F0F0" itemModel="NameItem" value="' + respon['NameItem'] + '" />'
                            + '</td>'
                            + '<td class="text-left cell-item-select thsame-header-3">'
                            + '<div class="center"><input autocomplete="off" type="text" name="name" value="' + respon['WardItem'] + '" fieldName="WardItem" itemModel="WardItem" /><div class="icon-dropdown" combobox="WardItem"></div></div>'
                            + '</td>'
                            + '<td class="text-left cell-input-type thsame-header-4">'
                            + '<div><input type="text" name="name" value="' + respon['UnitItem'] + '" fieldName="UnitItem" itemModel="UnitItem" /></div><!--combobox="UnitItem"-->'
                            + '</td>'
                            + '<td class="thsame-header-5">'
                            + '<div>'
                            + '<input type="number" max="100" min="1" name="name" fieldName="AmountItem" value="' + item['AmountOutWardDetail'] + '" style="width:100%" class="text-center con-sum" />'
                            + '</div>'
                            + '</td>'
                            + '<td class="text-right thsame-header-6">'
                            + '<input type="text" fieldName="PriceOutWardDetail" name="name" value="' + respon['PriceItem'] + '" style="width:100%" class="padding-money con-sum" itemModel="PriceItem" />'
                            + '</td>'
                            + '<td class="text-right thsame-header-7"><input type="text" name="name" value="' + item['PriceOutWardDetail'] + '" fieldName="Money" style="width:100%" class=" padding-money sum-money" /></td>'
                            + '<td class="item-center btnDelete thsame-header-8"><div class="icon-delete"></div></td>'
                            + '</tr>';
                        $('.tbl-body-same tbody').append(tr);



                    }).fail(function (respon) {

                    })
                })
            }).fail(function (res) {

            })

            //Xét thuộc tính cho các item của dialog theo từng chức năng
            if (mode == 2) {
                $('.content-dialog-add').find('input').attr('disabled', 'disabled');
                $('.div-first-validate').find('*').addClass('disableClass');
                $('.tbl-body-same tbody').find('*').addClass('disableClass');
                $('.input-recept-dia > div:last-child').find('*').addClass('disableClass');
                $('#dialogAdd .toolbar-menu-item').css('pointer-events', 'none');
                $('.btn-close').removeAttr('style');
                me.CheckForm = mode;
            } else {
                if (mode == 3) {
                    $('.radio-check').css('pointer-events', 'none');
                    me.CheckForm = mode;
                } else {
                    if (mode == 4) {
                        me.CheckForm = mode;

                        //Mặc định số phiếu thu kế tiếp
                        var outWardLast = this.ListOutWardDto[this.ListOutWardDto.length - 1];
                        var idOutWardLast = outWardLast['CodeOutWard'];
                        if (this.nextCodeVor) {
                            var numLastNext = parseInt(me.nextCodeVor.split('NTTK').join(""), 10) + 1;
                        } else {
                            var numLastNext = parseInt(idOutWardLast.split('NTTK').join(""), 10) + 1;
                        }
                        var nextIdOutWard = 'NTTK0000' + numLastNext;
                        if (this.NextCodeOutWard) {
                            nextIdOutWard = this.NextCodeOutWard;
                        }
                        $('[value="PT000010"]').val(nextIdOutWard);
                    }
                }
            }
        }

        //Resize lại bảng
        resizeAll();

        //Tính số dòng
        $('.tbl-footer-same .thsame-header-1').html('Số dòng = ' + $('.tbl-body-same').find('tr').length);

        //Tính tổng tiền và tổng số lượng dười footer
        sumMoneyTableSame();
        sumNumberTableSame();

    }

    /**
     * Click vào radio mất chọn chị nhánh combo và thay đổi radio
     * */
    ChangeRadio() {
        if ($(this).hasClass('condition-icon-check')) {

        } else {
            //Các radio button
            var radioHide = $('.condition-icon-uncheck');
            var radioSet = $('.condition-icon-check');

            //Thay đổi check giữa các radio
            radioHide.removeClass('condition-icon-uncheck').addClass('condition-icon-check');
            radioSet.removeClass('condition-icon-check').addClass('condition-icon-uncheck');

            if (radioHide.hasClass('differ')) {
                $('.pick-order-give').hide();
                $('#dialogAdd').siblings().children().first().html('Thêm phiếu xuất kho khác');
            } else {
                $('.pick-order-give').show();
                $('#dialogAdd').siblings().children().first().html('Thêm phiếu xuất kho điều chuyển');
            }
        }
    }

    /**
     * Click vào row trong bảng thì đổi màu
     * */
    RowClicked() {
        //Thay màu cho row
        $('.row-selected').removeClass('row-selected');
        $(this).addClass('row-selected');

        var me = this;
        //Load dữ liệu bảng chi tiết
        $.ajax({
            method: 'GET',
            url: '/outwarddetail/' + $(me).attr('recordID'),
            async: true
        }).done(function (res) {
            addTableDetail(res);

        }).fail(function (res) {

        })
    }

    //Lọc theo combobox
    FilterCombo(valu) {
        var me = this;
        //mảng để lưu các dữ liệu thỏa mãn
        this.Resul = [];

        if (valu != 'Tất cả') {
            $.each(this.ListOutWardDto, function (index, item) {

                if (item['TypeOutWard'] == valu) {
                    me.Resul.push(item);
                }
            })
        } else {
            me.Resul = this.ListOutWardDto;
        }
        addTableMain(this.Resul);
        //Resize lại bảng
        resizeAll();

    }







    loadDataDetail() {
        var me = this;
        $.ajax({
            method: 'GET',
            url: '/outwarddetail',
            async: true,
            dataType: 'json',

        }).done(function (res) {
            me.ListOutWardDetail = res;
            addTableDetail(res);
            //Resize lại bảng
            resizeAll();
        }).fail(function (res) {
        })
    }

    loadData() {
        var me = this;
        $('.tbl-body tbody').empty();
        $.ajax({
            method: 'GET',
            url: '/outward',
            async: true,
            dataType: 'json',
            beforeSend: function () {
                // Show image container
                $("#wait").css("display", "block");
            },
            complete: function () {
                $("#wait").css("display", "none");
            }

        }).done(function (res) {
            me.ListOutWardDto = res;
            addTableMain(res);
            $('.row-selected').removeClass('row-selected');
            $('.tbl-body tbody > tr:first-child').addClass('row-selected');
            //Resize lại bảng
            resizeAll();
        }).fail(function (res) {
        })
    }

    fakeData() {

    }

}