//Ngày thu mặc định now
function DateTimeNow(classs) {
    var d = new Date();

    var date = d.getDate();

    var month = d.getMonth();

    var year = d.getFullYear();

    var months = new Array("01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12");

    if (date < 10) {
        date = '0' + date;
    }

    classs.val(date + "/" + months[month] + "/" + year);
};

//Định dạng html cho ô tiền
function InputMoneyHtml(valu, classs) {
    var data = valu;

    var price = data.replace(/\D+/g, "");
    var rs = price.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    classs.html(rs);
};

//Định dạng val cho ô tiền
function InputMoneyVal(valu, classs) {
    var data = valu;

    var price = data.replace(/\D+/g, "");
    var rs = price.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    classs.val(rs);
};

//Vẽ table detail
function addTableDetail(datas) {
    //Tìm những th có attr property
    var thProperties = $('tbl-header').find('property');
    $('.tbl-detail-body tbody').empty();
    $.each(datas, function (index, item) {
        $.ajax({
            method: 'GET',
            url: '/item/' + item['IDItem'],
            async: true,
            dataType: 'json'
        }).done(function (res) {
            var tr = '<tr>'
                + '<td class="thead-detail-th1">' + res['CodeItem'] + '</td>'
                + '<td class="thead-detail-th2">' + res['NameItem'] + '</td>'
                + '<td class="tbody-detail-th3">' + res['WardItem'] + '</td>'
                + '<td class="thead-detail-th4">' + res['UnitItem'] + '</td>'
                + '<td class="thead-detail-th5">' + res['PriceItem'] + '</td>'
                + '<td class="thead-detail-th6">' + item['AmountOutWardDetail'] + '</td>'
                + '<td class="thead-detail-th7">' + item['PriceOutWardDetail'] + '</td>'
                + '</tr>';
            $('.tbl-detail-body tbody').append(tr);
            //Resize lại bảng
            resizeAll();
        }).fail(function (res) {

        })
    })
    
}

//Vẽ table main
function addTableMain(datas) {
    //Tính tổng tiền
    var sum = 0;
    //Tìm những th có attr property
    var thProperties = $('tbl-header').find('property');
    $('.tbl-body tbody').empty();
    $.each(datas, function (index, item) {
        var tr = '<tr recordID="' + item['ID'] + '">'
            + '<td class="header-th-1">' + item['DateOutWard'] + '</td>'
            + '<td class="header-th-2">' + item['CodeOutWard'] + '</td>'
            + '<td class="header-th-3">' + item['NameObject'] + '</td>'
            + '<td class="header-th-4">' + item['TotalMoney'] + '</td>'
            + '<td class="tbody-td-5">' + item['Explain'] + '</td>'
            + '<td class="header-th-6">' + item['TypeOutWard'] + '</td>'
            + '</tr>';
        $('.tbl-body tbody').append(tr);
        sum += parseInt(item['TotalMoney'].split('.').join(""), 10);
    })

    //Add sum money vào bảng
    InputMoneyHtml(sum.toString(), $('.tbl-footer .header-th-4'));
    //Resize lại bảng
    resizeAll();

}

//Hàm tính tổng tiền cho table trong dialog add
function sumMoneyTableSame() {
    var trs = $('.tbl-body-same').find('tr');
    var sum = 0;

    $.each(trs, function (index, item) {
        sum += parseInt($(item).find('.sum-money').val().split('.').join(""), 10);
    })

    var sumMoney = $('.tbl-footer-same').find('[property="TotalMoney"]');
    InputMoneyHtml(sum.toString(), sumMoney);
}

function sumNumberTableSame() {
    var trs = $('.tbl-body-same').find('tr');
    var sum = 0;

    $.each(trs, function (index, item) {
        sum += parseInt($(item).find('[fieldname="AmountItem"]').val(), 10);
    })

    $('.tbl-footer-same').find('.thsame-header-5').html(sum);
}

//Thay button close trên title bar của dialog
function ChangeButtonCloseAnother(id) {
    $(id).siblings().find('button').remove();
    var but = '<span class="icon-close-title icon-close-same"></span>'
    $($(id).parent().children()[0]).find('.icon-close-same').remove('.icon-close-same');
    $($(id).parent().children()[0]).append(but);

};

/**
 * 
 * @param {any} container thằng bao to nhất gồm 3 cái header tbody footer
 * @param {any} masterHeader thằng bao header
 * @param {any} masterBody thằng bao tbody
 * @param {any} masterFooter thằng bao tfooter
 * @param {any} thDiffer thằng bao 1 thành phần để 100% ở header
 * @param {any} tdDiffer thằng bao 1 thành phần để 100% ở tbody
 */
function resize(container, masterHeader, masterBody, tblFooter, thDiffer, tdDiffer) {
    var tblContainer = $(container); //thằng bao to nhất gồm 3 cái header tbody footer
    $.each(tblContainer, function (index, elemnt) {
        var tblHeader = $(elemnt).find(masterHeader); //thằng bao header
        var tblBody = $(elemnt).find(masterBody);      //thằng bao tbody

        var tblHeader2 = tblHeader.find('table');  //thằng table header
        var tblBody2 = $(masterBody);    //thằng bao table tbody
        if (tblFooter) {
            var tblFooter2 = $(tblFooter); //thằng bao tfooter
            var firstFoot = $(tblFooter).find(tdDiffer);   //thằng bao 1 thành phần để 100% ở tfooter
        }

        var th = tblHeader.find(thDiffer);      //thằng bao 1 thành phần để 100% ở header
        var firstRow = tblBody.find(tdDiffer); //thằng bao 1 thành phần để 100% ở tbody

        $.each(firstRow, function (i, e) {
            $(e).css('min-width', $(th).innerWidth() + 2);  //code căn 1 thành phần
            $(e).css('max-width', $(th).innerWidth() + 2);
            $(e).css('width', $(th).innerWidth() + 2);

            $(tblBody2).css('min-width', $(tblHeader2).outerWidth());   //code căn table bằng nhau
            $(tblBody2).css('max-width', $(tblHeader2).outerWidth());
            $(tblBody2).css('width', $(tblHeader2).outerWidth());

            $(tblFooter2).css('min-width', $(tblHeader2).outerWidth());   //code căn table bằng nhau
            $(tblFooter2).css('max-width', $(tblHeader2).outerWidth());

            $(tblHeader).css('min-width', $(tblBody).outerWidth()); //Bao header = bao body

            if (tblFooter) {
                $(firstFoot).css('min-width', $(th).innerWidth() + 3);  //code căn 1 thành phần
                $(firstFoot).css('max-width', $(th).innerWidth() + 3);
                $(firstFoot).css('width', $(th).innerWidth() + 3);
                $(tblFooter2).css('width', $(tblHeader2).outerWidth());
            }

        });
    });
}

//Resize lại bảng
function resizeAll() {
    resize('.container-table', '.master-header', '.master-body', '.tbl-footer', '.header-th-5', '.tbody-td-5');
    resize('.table-detail', '.master-detail-header', '.master-detail-body', '', '.thead-detail-th3', '.tbody-detail-th3');
    resize('.content-table-same', '.master-header-same', '.master-body-same', '.footer-same', '.thsame-header-2', '.thsame-body-2');
}

//Validate date
function isDate(date) {
    var dateRegex = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
    return dateRegex.test(date);
}

//Validate time
function isTime(time) {
    var timeRegex = /^([0-1]\d|2[0-3]):([0-5]\d)$/;
    return timeRegex.test(time);
}