class Dialog {
    constructor(classs, width, height, title) {
        this.Dialog = $(classs).dialog({
            width: width,
            height: height,
            autoOpen: false,
            modal: true,
            title: title,
            resizable: false,
            fluid: true
        })
    }

    Show() {
        this.Dialog.dialog('open');
    }

    Close() {
        this.Dialog.dialog('close');
    }
}