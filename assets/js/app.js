class App extends euvalidate {
    constructor() {
        super();
        window.$ = $;
        window.jQuery = jQuery;
        $.fn.init();
        this.validate = new euvalidate();
    }
}

let app = new App();

$(document).on('click', '#submit', function (e) {
    let selector = $(this),
        form = selector.closest('form'),
        data = form.serializeArray();
    if (app.validate.validateForm(form)) {
        console.log(data);
        form.submit();
    } else {
        console.log('No envio');
    }
});