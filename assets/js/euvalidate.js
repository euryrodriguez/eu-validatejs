class euvalidate {

    validateForm(form) {
        let error = 0,
            app = this;
        //iterate through inputs that have the form-control class
        form.find('.form-control').each(function (index, element) {
            let current = $(element),
                min = (current.is("[min]")) ? current.attr('min') : '', //minimum of characters allowed
                max = (current.is("[max]")) ? current.attr('max') : '', //maximum of characters allowed
                parent = current.parent('div').closest('div.form-group'),//parent
                label = parent.find('label').text();

            label = (label.trim().length === 0) ? current.closest('div.row').children("div:first").find('label').text() : label;
            label = (label.trim().length === 0) ? current.parents('div').closest('label').text() : label;
            parent = (parent.length == 0) ? current.parent() : parent;

            //check if the input is required
            if (current.is("[required]")) {
                if (current.is('input')) {
                    if (!$.trim(current.val()) || current.val() == 0 || current.val() == null) {
                        app.showErrors(element, parent, `${label} no puede ser nulo.`, 'Faltan Campos');
                        error++;
                        return false;
                    } else {
                        app.hideErrors(parent, element);
                    }
                } else if (current.is(':checkbox')) {
                    if (!current.is(':checked')) {
                        app.showErrors(element, parent, `Debe chequear la opción ${label}`, 'Faltan Campos');
                        error++;
                        return false;
                    }
                } else {
                    //validate select and textarea
                    if ($.trim(current.val()).length == 0 || current.val() == -1 || current.val() == null) {
                        app.showErrors(element, parent, `${label} no puede ser nulo.`, 'Faltan Campos');
                        error++;
                        return false;
                    } else {
                        app.hideErrors(parent, element);
                    }
                }

                if (current.hasClass('numeric')) {
                    let strNumber = current.val();
                    if (!app.strIsNumber(strNumber)) {
                        app.showErrors(element, parent, `${label} solo admite números.`, 'Formato incorrecto');
                        error++;
                        return false;
                    }
                } else {
                    app.hideErrors(parent, element);
                }
            }

            if (current.hasClass('numeric')) {
                if (current.val().length > 0) {
                    let strNumber = current.val();
                    if (!app.strIsNumber(strNumber)) {
                        app.showErrors(element, parent, `${label} solo admite números.`, 'Formato incorrecto');
                        error++;
                        return false;
                    }
                }
            }

            if (current.hasClass('email')) {
                if (current.val().length > 0) {
                    let strEmail = current.val();
                    if (!app.validateEmail(strEmail)) {
                        app.showErrors(element, parent, `${label} solo admite correos electrónicos.`, 'Formato incorrecto');
                        error++;
                        return false;
                    }
                }
            }

            if (current.hasClass('url')) {
                if (current.val().length > 0) {
                    let url = current.val();
                    if (!app.validateUrl(url)) {
                        app.showErrors(element, parent, `${label} no es un enlace válido.`, 'Formato incorrecto');
                        error++;
                        return false;
                    }
                }
            }

            if (min !== '') {
                if (app.strIsNumber(min)) {
                    if ($.trim(current.val()).length < min) {
                        app.showErrors(element, parent, `${label} no cumple con la cantidad de carácteres requerida.`, `Mínimo no alcanzado (${min})`);
                        error++;
                        return false;
                    } else {
                        app.hideErrors(parent, element);
                    }
                }
            }

            if (max !== '') {
                if (app.strIsNumber(max)) {
                    if ($.trim(current.val()).length > max) {
                        app.showErrors(element, parent, `${label} supera el máximo de carácteres permitidos.`, `Máximo superado (${max})`);
                        error++;
                        return false;
                    } else {
                        app.hideErrors(parent, element);
                    }
                }
            }
        }).promise().done(function () {
            form.find('input[type="checkbox"]').each(function (index, checkbox) {
                let current = $(checkbox),
                    parent = current.parent('div').closest('div.form-group'),//parent
                    label = parent.find('label').text();

                if (!current.is(':checked')) {
                    app.showErrors(checkbox, parent, `Debe chequear la opción ${label}`, 'Faltan Campos');
                    error++;
                    return false;
                }
            })
        });
        return (error <= 0);
    };

    showErrors(selector, parent, message, title) {

        if (!parent.hasClass('has-error'))
            parent.addClass('has-error');

        $(selector).focus();

        if (typeof toastr == 'object') {
            toastr.error(message, title);
        } else if (typeof swal == 'function') {
            swal(title, message, 'error');
        } else {
            $(selector).next('div').remove();
            $(selector).after(`<div class="text-error">${message}</div>`);
        }
    };

    hideErrors(parent, selector) {
        if (parent.hasClass('has-error')) {
            parent.removeClass('has-error');
            parent.addClass('has-success');
            $(selector).next('div').remove();
        }
    };

    strIsNumber(str) {
        let pattern = /^-{0,1}\d*\.{0,1}\d+$/;
        return (pattern.test(str));  // returns a boolean
    };

    validateEmail(correo) {
        return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(correo));
    };

    validateUrl(url) {
        return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(url);
    };
}