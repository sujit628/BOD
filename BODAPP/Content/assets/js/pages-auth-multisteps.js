"use strict";
$(function () {
    var e = $(".ddlSector");
    var f = $(".ddlBusinessType");
    var c = $(".ddlCountry");
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

    c.length &&
         c.each(function () {
             var c = $(this);
             c.wrap('<div class="position-relative"></div>'), c.select2({ placeholder: "Select A Country", dropdownParent: c.parent() });
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

    $('#txtIncorporationDate').on('change', function () {
        validateDate();
    });

}),
    document.addEventListener("DOMContentLoaded", function (e) {
        var n = document.querySelector("#multiStepsValidation");
        if (null !== n) {
            var a = n.querySelector("#multiStepsForm");
            const c = a.querySelector("#contactDetailsValidation");
            var i = a.querySelector("#companyInfoValidation"),
                s = a.querySelector("#legalEntityValidation"),
                //z = a.querySelector("#financialInfoValidation"),
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
                  txtContactFirstName: {
                            validators: {
                                notEmpty: { message: "Please enter Contact First Name" },

                            },
                        },

                        txtContactLastName: {
                            validators: {
                                notEmpty: { message: "Please enter Contact  Last Name" },

                            },
                        },

                    PrimaryContactNumber: {
                        validators: {
                            notEmpty: { message: "Please enter Primary Contact Number" },

                        },
                    },
                    
                    SecondaryContactEmail: { validators:  {emailAddress: { message: "The value is not a valid email address" } } },
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
                        },
                        ddlCountry: {
                            validators: {
                                notEmpty: {
                                    message: "Please Select Country"
                                }
                            }
                        },


                        txtCompanyName: {
                            validators: {
                                notEmpty: { message: "Please enter Primary Contact Number" },

                            },
                        },

                        

                    },                    plugins: {
                        trigger: new FormValidation.plugins.Trigger(),
                        bootstrap5: new FormValidation.plugins.Bootstrap5({ eleValidClass: "", rowSelector: ".col-sm-6" }),
                        autoFocus: new FormValidation.plugins.AutoFocus(),
                        submitButton: new FormValidation.plugins.SubmitButton(),
                    },
                }).on("core.form.valid", function () {
                    t.next();
                }),
                v = FormValidation.formValidation(s, {
                    //fields: { multiStepsCard: { validators: { notEmpty: { message: "Please enter card number" } } } },
                    //plugins: {
                    //    plugins: {
                    //        trigger: new FormValidation.plugins.Trigger(),
                    //        bootstrap5: new FormValidation.plugins.Bootstrap5({ eleValidClass: "", rowSelector: ".col-sm-6" }),
                    //        autoFocus: new FormValidation.plugins.AutoFocus(),
                    //        submitButton: new FormValidation.plugins.SubmitButton(),
                    //    },
                    //},
                    //init: (e) => {
                    //    e.on("plugins.message.placed", function (e) {
                    //        e.element.parentElement.classList.contains("input-group") && e.element.parentElement.insertAdjacentElement("afterend", e.messageElement);
                    //    });
                    //},
            }).on("core.form.valid", function () {
                SaveRecords();
            });
                        //  w = FormValidation.formValidation(z, {
            //    fields: { multiStepsCard: { validators: { notEmpty: { message: "Please enter card number" } } } },
            //    plugins: {
            //        trigger: new FormValidation.plugins.Trigger(),
            //        bootstrap5: new FormValidation.plugins.Bootstrap5({
            //            eleValidClass: "",
            //            rowSelector: function (e, t) {
            //                return "multiStepsCard" !== e ? ".col-dm-6" : ".col-md-12";
            //            },
            //        }),
            //        autoFocus: new FormValidation.plugins.AutoFocus(),
            //        submitButton: new FormValidation.plugins.SubmitButton(),
            //    },
            //    init: (e) => {
            //        e.on("plugins.message.placed", function (e) {
            //            e.element.parentElement.classList.contains("input-group") && e.element.parentElement.insertAdjacentElement("afterend", e.messageElement);
            //        });
            //    },
            //}).on("core.form.valid", function () {
            //    SaveRecords();
            //});
            r.forEach((e) => {
                e.addEventListener("click", (e) => {
                    switch (t._currentIndex) {
                       case 0:
                            p.validate();
                            break;
                        case 1:
                            g.validate();
                            break;
                        case 2:
                            v.validate();
                    }
                });
            }),
                a.forEach((e) => {
                    e.addEventListener("click", (e) => {
                        switch (t._currentIndex) {
                         
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








$("#ddlSector").change(function () {
    $(".ddlBusinessType").find("option").remove();
    var f = $(".ddlBusinessType");

     f.length &&
       f.each(function () {
           var f = $(this);
           f.wrap('<div class="position-relative"></div>'), f.select2({ placeholder: "Select A Type", dropdownParent: f.parent() });
       });

    DropdownBinder.DDLData = {
        tableName: "EnterpriseTypeSetUp_ETM",
        Text: 'ETM_EnterpriseType',
        Value: 'ETM_Id',
        PId : $(this).val(),
        ColumnName : 'ETM_IndustryId'
    };
    DropdownBinder.DDLElem = $("#ddlBusinessType");
    DropdownBinder.Execute();
});


$("#ddlCountry").change(function () {
    $(".ddlProvince").find("option").remove();
    var g = $(".ddlProvince");

    g.length &&
      g.each(function () {
          var g = $(this);
          g.wrap('<div class="position-relative"></div>'), g.select2({ placeholder: "Select A Province", dropdownParent: g.parent() });
      });
    DropdownBinder.DDLData = {
        tableName: "ProvinceSetUp_PM",
        Text: 'PM_Province',
        Value: 'PM_Id',
        PId: $(this).val(),
        ColumnName: 'PM_CountryId'
    };
    DropdownBinder.DDLElem = $("#ddlProvince");
    DropdownBinder.Execute(); 
});


//Formet Registration Number
document.getElementById('txtRegNum').addEventListener('input', function () {
    let value = this.value.replace(/\D/g, ''); // Remove non-digit characters
    // Format the input as YYYY/NNNNNN/NN
    if (value.length > 4) {
        value = value.slice(0, 4) + '/' + value.slice(4);
    }
    if (value.length > 11) {
        value = value.slice(0, 11) + '/' + value.slice(11, 13);
    }
    // Update the input field
    this.value = value;
});
function validateForm() {
    const input = document.getElementById('txtRegNum').value.trim();
    const regex = /^\d{4}\/\d{6}\/\d{2}$/;

    if (!regex.test(input)) {
        document.getElementById('error').innerText = 'Invalid format. Use YYYY/NNNNNN/NN.';
        document.getElementById('error').style.display = 'block';
        return false;
    }
    document.getElementById('error').style.display = 'none';
    return true;
}


//****************Start Date < End Date Always*************
function validateDate() {
    var valueFrom = $('#txtIncorporationDate').val();
    var valueTo = new Date();
    valueTo.setHours(0, 0, 0, 0);

    $('#error-message').text('');
    $('.dtcls').css('border', '');

    // Check if valueFrom is not empty
    if (valueFrom) {
        // Assuming the date format is DD-MM-YYYY
        var dateFromParts = valueFrom.split('-');
        // Create a new date object
        var dateFrom = new Date(dateFromParts[2], dateFromParts[1] - 1, dateFromParts[0]);

        if (dateFrom >= valueTo) {
            $('#error-message').text("Incorporation Date must be earlier than the current date");
            $('.dtcls').css('border', '1px solid red');
            $('#txtIncorporationDate').val('');
        }
    } else {
        // Handle the case where the input is empty
        $('#error-message').text("Date of Birth is required");
        $('.dtcls').css('border', '1px solid red');
    }
}
