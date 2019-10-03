document.addEventListener('DOMContentLoaded', function () {
    var datePicker = new DatePicker();

    $(function () {
        $("#nowmonth").selectmenu({
            change: function (event, data) {
                var valueTime = $(this).children("option:selected").val();
                datePicker.getTime(valueTime);
            }
        });
    });
})

/**
 * Decription: class DatePicker để sử dụng date picker
 * Author: TQDat(4/7/2019);
 * */
class DatePicker {
    constructor() {
        this.setDatePickerDisplay();
        this.getValueOption();
    }

    /**
    * Decription: Hàm setDatePickerDispkay để hiển thị dialog khi click vào icon calendar
    * Author: TQDat(4/7/2019)
    * */
    setDatePickerDisplay() {
        $(".datepicker").datepicker({
            showOn: "button",
            monthNames: ["Tháng Một", "Tháng Hai", "Tháng Ba", "Tháng Tư",
                "Tháng Năm", "Tháng Sáu", "Tháng Bảy", "Tháng Tám",
                "Tháng Chín", "Tháng Mười", "Tháng Mười Một", "Tháng Mười Hai"],
            dayNamesMin: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
            dateFormat: "dd/mm/yy",
            buttonImage: "/Contents/Icons/common-icon.png",
            buttonImageOnly: true,
            buttonText: "Select date",
            altField: "#datepicker-to",
            altFormat: "dd/mm/yy",
            yearRange: "1900:2099",
            showOtherMonths: true,
            showButtonPanel: true,
            changeMonth: true,
            changeYear: true

        }).mask("99/99/9999");

        $(".datepicker-differ").datepicker({
            showOn: "button",
            monthNames: ["Tháng Một", "Tháng Hai", "Tháng Ba", "Tháng Tư",
                "Tháng Năm", "Tháng Sáu", "Tháng Bảy", "Tháng Tám",
                "Tháng Chín", "Tháng Mười", "Tháng Mười Một", "Tháng Mười Hai"],
            dayNamesMin: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
            dateFormat: "dd/mm/yy",
            buttonImage: "/Contents/Icons/common-icon.png",
            buttonImageOnly: true,
            buttonText: "Select date",
            altField: "#datepicker-to",
            altFormat: "dd/mm/yy",
            yearRange: "1900:2099",
            showOtherMonths: true,
            showButtonPanel: true,
            changeMonth: true,
            changeYear: true

        });

        this.getTime(3);
    }

    /**
    * Decription: Hàm getValueOption để lấy value của option khi click vào select
    * Author: TQDat(4/7/2019)
    * */
    getValueOption() {
        var me = this;

        //change
        $('#nowmonth-button').change(function () {
            var valueTime = $(this).children("option:selected").val();
            me.getTime(valueTime);
        })
    }

    /**
    * Decription: Hàm getTime để hiển thị thời gian tương ứng với giá trị của option
    * Author: TQDat(4/7/2019)
    * */
    getTime(val) {
        const start = document.querySelector('#datepicker-from');
        const end = document.querySelector('#datepicker-to');
        if (val == 1) {
            start.value = moment(new Date()).format("DD/MM/YYYY");
            end.value = moment(new Date()).format("DD/MM/YYYY");
        }
        else if (val == 2) {
            start.value = moment(new Date()).add(-1, 'days').format("DD/MM/YYYY");
            end.value = moment(new Date()).add(-1, 'days').format("DD/MM/YYYY");
        }

        else if (val == 3) {
            start.value = moment().startOf('isoWeek').format('DD/MM/YYYY');
            end.value = moment().endOf('isoWeek').format('DD/MM/YYYY');
        }

        else if (val == 4) {
            start.value = moment().subtract(1, 'weeks').startOf('isoWeek').format('DD/MM/YYYY');
            end.value = moment().subtract(1, 'weeks').endOf('isoWeek').format('DD/MM/YYYY');
        }

        else if (val == 5) {
            start.value = moment().startOf('month').format('DD/MM/YYYY');
            end.value = moment().endOf('month').format('DD/MM/YYYY');
        }

        else if (val == 6) {
            start.value = moment().subtract(1, 'months').startOf('month').format('DD/MM/YYYY');
            end.value = moment().subtract(1, 'months').endOf('month').format('DD/MM/YYYY');
        }

        else if (val == 7) {
            start.value = moment().startOf('quarter').format('DD/MM/YYYY');
            end.value = moment().endOf('quarter').format('DD/MM/YYYY');
        }

        else if (val == 8) {
            start.value = moment().subtract(1, 'quarters').startOf('quarter').format('DD/MM/YYYY');
            end.value = moment().subtract(1, 'quarters').endOf('quarter').format('DD/MM/YYYY');
        }

        else if (val == 9) {
            start.value = moment().subtract(6, 'months').startOf('month').format('DD/MM/YYYY');
            end.value = moment().subtract(1, 'months').endOf('month').format('DD/MM/YYYY');
        }

        else if (val == 10) {
            start.value = moment().startOf('year').format('DD/MM/YYYY');
            end.value = moment().endOf('year').format('DD/MM/YYYY');
        }

        else if (val == 11) {
            start.value = moment().subtract(1, 'years').startOf('year').format('DD/MM/YYYY');
            end.value = moment().subtract(1, 'years').endOf('year').format('DD/MM/YYYY');
        }

        else {
            start.value = '';
            end.value = '';
        }
    }
}