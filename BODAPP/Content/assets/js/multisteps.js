"use strict";
$(function () {
    var e = $(".ddlSector");
    var f = $(".ddlBusinessType");
    var g = $(".ddlProvince");
    var h = $(".ddlLegalEntity");
    e.length &&
        e.each(function () {
            var e = $(this);
            e.wrap('<div class="position-relative"></div>'), e.select2({ placeholder: "Select A Sector", dropdownParent: e.parent() });
        });

    f.length &&
       f.each(function () {
           var f = $(this);
           f.wrap('<div class="position-relative"></div>'), f.select2({ placeholder: "Select A Type", dropdownParent: f.parent() });
       });

    g.length &&
         g.each(function () {
             var g = $(this);
             g.wrap('<div class="position-relative"></div>'), g.select2({ placeholder: "Select A Province", dropdownParent: g.parent() });
         });
    h.length &&
        h.each(function () {
            var h = $(this);
            h.wrap('<div class="position-relative"></div>'), h.select2({ placeholder: "Select A LegalEntity", dropdownParent: h.parent() });
        });

}),
    document.addEventListener("DOMContentLoaded", function (e) {
        var n = document.querySelector("#multiStepsValidation");
        if (null !== n) {
            var a = n.querySelector("#multiStepsForm");
            const c = a.querySelector("#contactDetailsValidation");
            var i = a.querySelector("#companyInfoValidation"),
                s = a.querySelector("#legalEntityValidation"),
                z = a.querySelector("#financialInfoValidation"),
                r = [].slice.call(a.querySelectorAll(".btn-next")),
                a = [].slice.call(a.querySelectorAll(".btn-prev")),
                o = document.querySelector(".multi-steps-exp-date"),
                l = document.querySelector(".multi-steps-cvv"),
                m = document.querySelector(".multi-steps-mobile"),
                u = document.querySelector(".multi-steps-pincode"),
                d = document.querySelector(".multi-steps-card");
            o && new Cleave(o, { date: !0, delimiter: "/", datePattern: ["m", "y"] }),
                l && new Cleave(l, { numeral: !0, numeralPositiveOnly: !0 }),
                m && new Cleave(m, { phone: !0, phoneRegionCode: "US" }),
                u && new Cleave(u, { delimiter: "", numeral: !0 }),
                d &&
                    new Cleave(d, {
                        creditCard: !0,
                        onCreditCardTypeChanged: function (e) {
                            document.querySelector(".card-type").innerHTML = "" != e && "unknown" != e ? '<img src="' + assetsPath + "img/icons/payments/" + e + '-cc.png" height="28"/>' : "";
                        },
                    });
            let t = new Stepper(n, { linear: !0 });
            const p = FormValidation.formValidation(c, {
                fields: {
                    txtContactName: {
                        validators: {
                            notEmpty: { message: "Please enter username" },
                          
                           
                        },
                    },
                    PrimaryContactNumber: {
                        validators: {
                            notEmpty: { message: "Please enter Primary Contact Number" },

                        },
                    },
                    
                    
                    txtContactEmail: { validators: { notEmpty: { message: "Please enter email address" }, emailAddress: { message: "The value is not a valid email address" } } },
                    txtPassword: { validators: { notEmpty: { message: "Please enter password" } } },
                    txtConfirmPass: {
                        validators: {
                            notEmpty: { message: "Confirm Password is required" },
                            identical: {
                                compare: function () {
                                    return c.querySelector('[name="multiStepsPass"]').value;
                                },
                                message: "The password and its confirm are not the same",
                            },
                        },
                    },
                   
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    bootstrap5: new FormValidation.plugins.Bootstrap5({ eleValidClass: "", rowSelector: ".col-sm-6" }),
                    autoFocus: new FormValidation.plugins.AutoFocus(),
                    submitButton: new FormValidation.plugins.SubmitButton(),
                },
                init: (e) => {
                    e.on("plugins.message.placed", function (e) {
                        e.element.parentElement.classList.contains("input-group") && e.element.parentElement.insertAdjacentElement("afterend", e.messageElement);
                    });
        },
        }).on("core.form.valid", function () {
            t.next();
        }),
                g = FormValidation.formValidation(i, {      
                    fields: { 
                        txtRegNum: {
                            validators: {
                                notEmpty: {
                                    message: "Please enter registration number"
                                }
                            }
                        },
                        ddlSector: {
                            validators: {
                                notEmpty: {
                                    message: "Please Select sector"
                                }
                            }
                        },
                        ddlBusinessType: {
                            validators: {
                                notEmpty: {
                                    message: "Please Select business type"
                                }
                            }
                        },
                        ddlProvince: {
                            validators: {
                                notEmpty: {
                                    message: "Please Select Province"
                                }
                            }
                        },txtCompanyName: {
                            validators: {
                                notEmpty: { message: "Please enter Primary Contact Number" },

                            },
                        },
                    },
                    plugins: {
                        trigger: new FormValidation.plugins.Trigger(),
                        bootstrap5: new FormValidation.plugins.Bootstrap5({
                            eleValidClass: "",
                            rowSelector: ".col-sm-6"
                        }),
                        autoFocus: new FormValidation.plugins.AutoFocus(),
                        submitButton: new FormValidation.plugins.SubmitButton(),
                    },
                }).on("core.form.valid", function () {
                    t.next();
                }),
                v = FormValidation.formValidation(s, {
                    fields: { multiStepsCard: { validators: { notEmpty: { message: "Please enter card number" } } } },
                    plugins: {
                        trigger: new FormValidation.plugins.Trigger(),
                        bootstrap5: new FormValidation.plugins.Bootstrap5({
                            eleValidClass: "",
                            rowSelector: ".col-sm-6"
                        }),
                        autoFocus: new FormValidation.plugins.AutoFocus(),
                        submitButton: new FormValidation.plugins.SubmitButton(),
                    },
                    init: (e) => {
                        e.on("plugins.message.placed", function (e) {
                            e.element.parentElement.classList.contains("input-group") && e.element.parentElement.insertAdjacentElement("afterend", e.messageElement);
                        });
},
}).on("core.form.valid", function () {
    alert("Submitted..!!");
});
r.forEach((e) => {
    e.addEventListener("click", (e) => {
        switch (t._currentIndex) {
            case 0:
p.validate();
break;
                        case 1:
g.validate();
                            
}
});
}),
a.forEach((e) => {
    e.addEventListener("click", (e) => {
        switch (t._currentIndex) {
            case 4:
t.previous();
                            case 3:
t.previous();
                            case 2:
t.previous();
                            case 1:
t.previous();
}
});
});
}
});
