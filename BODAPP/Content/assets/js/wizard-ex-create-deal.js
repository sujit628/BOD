"use strict";
!(function () {
    var e = document.querySelector("#dealDuration"),
        e = (e && e.flatpickr({ mode: "range" }), window.Helpers.initCustomOptionCheck(), document.querySelector("#wizard-create-deal"));
    if (null !== e) {
        var o = e.querySelector("#wizard-create-deal-form"),
            a = o.querySelector("#deal-type"),
            //i = o.querySelector("#deal-details"),
            //l = o.querySelector("#deal-usage"),
            n = o.querySelector("#review-complete"),
            r = [].slice.call(o.querySelectorAll(".btn-next")),
            o = [].slice.call(o.querySelectorAll(".btn-prev"));
        let t = new Stepper(e, { linear: !0 });
        const s = FormValidation.formValidation(a, {
            fields:
            {
               
                txtBusinessDesc: {
                    validators: {
                        notEmpty: { message: "Please Bussiness Description" }
                    }
                }
            },
            plugins: {
                trigger: new FormValidation.plugins.Trigger(),
                bootstrap5: new FormValidation.plugins.Bootstrap5({ eleValidClass: "", rowSelector: ".col-sm-12" }),
                autoFocus: new FormValidation.plugins.AutoFocus(),
                submitButton: new FormValidation.plugins.SubmitButton(),
            },
        }).on("core.form.valid", function () {
            t.next();
        }),
       
            u = FormValidation.formValidation(n, {
                fields: {},
                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    bootstrap5: new FormValidation.plugins.Bootstrap5({ eleValidClass: "", rowSelector: ".col-md-12" }),
                    autoFocus: new FormValidation.plugins.AutoFocus(),
                    submitButton: new FormValidation.plugins.SubmitButton(),
                },
            }).on("core.form.valid", function () {
                SaveRecords();
            });
        r.forEach((e) => {
            e.addEventListener("click", (e) => {
                switch (t._currentIndex) {
                    case 0:
                        s.validate();
                        break;
                    case 1:
                        u.validate();
                }
            });
        }),
            o.forEach((e) => {
                e.addEventListener("click", (e) => {
                    switch (t._currentIndex) {
                        case 2:
                        case 1:
                            t.previous();
                    }
                });
            });
    }
})();
