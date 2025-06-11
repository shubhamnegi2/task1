
        $(document).ready(function () {
            $('.form-control').on('keyup blur', function (e) {
                $(this).closest('.form-group').removeClass('has-error');
            });

            $("#photoValidatorForm").validate({
                ignore: [],
                errorClass: 'invalid',
                errorPlacement: function (error, element) {
                    var errorText = error.text();
                    if (element.closest('.form-group').find('.help-block').length < 1) {
                        element.closest('.form-group').append('<span class="help-block">');
                    }
                    element.closest('.form-group').addClass('has-error');
                    element.closest('.form-group').find('.help-block').html(errorText);
                },
                rules: {
                    minimumAllowedSize: {
                        required: true,
                        minlength: 1,
                        maxlength: 6,
                        number: true
                    },
                    numberOfPhotos: {
                        required: true,
                        minlength: 1,
                        maxlength: 2,
                        number: true
                    },
                },
                messages: {
                    minimumAllowedSize: {
                        required: "Please enter Minimum Allowed Size (L x L).",
                        minlength: "Minimum length should be 1 digit.",
                        maxlength: "Maximum length should be 6 digits.",
                        number: "Invalid input. Only numbers are allowed."
                    },

                    numberOfPhotos: {
                        required: "Please enter Number of Photos.",
                        minlength: "Minimum length should be 1 digit.",
                        maxlength: "Maximum length should be 2 digits.",
                        number: "Invalid input. Only numbers are allowed."
                    },
                },
                submitHandler: function (form) {
                    $('#showInputs').parent().hide();
                    $('#photoInputs').show();
                    $('#validatePhotos').show();

                    let count = parseInt($('#numberOfPhotos').val());
                    if (isNaN(count) || count < 1) {
                        count = '';
                        return;
                    }
                    $('#photoInputs').empty();
                    $('#photoInputs').append(`
                        <div class="col-12">
                            <h5 class="text-info text-sm">Please Enter Photos Width and Height saperatly</h5>
                        </div>
                    `);
                    for (let i = 0; i < count; i++) {
                        $('#photoInputs').append(`
                        <div class="row gx-2">
                            <div class="col-md-6 mb-2">
                                <div class="form-group">
                                    <input type="text" oninput="return numOnly(event);" autocomplete="off" required  onkeypress="return numOnly(event)"  class="form-control width" placeholder="Width (W)" name="width${i}">
                                </div>
                            </div>
                            <div class="col-md-6 mb-2">
                                <div class="form-group">
                                    <input type="text" oninput="return numOnly(event);" autocomplete="off" required onkeypress="return numOnly(event)"  class="form-control height" placeholder="Height (H)" name="height${i}">
                                </div>
                            </div>
                        </div>
                    `);
                    }
                    $('#validatePhotos').show();
                }
            });

            $('#minimumAllowedSize, #numberOfPhotos').on('keyup', function () {
                $('#resultList').empty();
                $('#showInputs').parent().show();
                $('#photoInputs').empty().hide();
                $('#validatePhotos').hide();
            });



            $('#validatePhotos').on('click', function () {
                const L = parseInt($('#minimumAllowedSize').val());
                $('#resultList').empty();

                $('#photoInputs .row').each(function (index) {
                    let W_val = $(this).find('.width').val().trim();
                    let H_val = $(this).find('.height').val().trim();

                    let error = false;

                    let isValidWidth = /^\d+$/.test(W_val);
                    let isValidHeight = /^\d+$/.test(H_val);

                    if (!isValidWidth) {
                        $(this).find('.width').closest('.form-group').addClass('has-error').find('.help-block').remove();
                        $(this).find('.width').closest('.form-group').append('<span class="help-block">Please enter valid Width</span>');
                        error = true;
                    }

                    if (!isValidHeight) {
                        $(this).find('.height').closest('.form-group').addClass('has-error').find('.help-block').remove();
                        $(this).find('.height').closest('.form-group').append('<span class="help-block">Please enter valid Height</span>');
                        error = true;
                    }

                    if (error) {
                        $('#resultList').append(`<li class="list-group-item my-2">Photo ${index + 1}: INVALID INPUT</li>`);
                        return;
                    }

                    // now safe to parse
                    let W = parseInt(W_val);
                    let H = parseInt(H_val);

                    let result = '';

                    if (W < L || H < L) {
                        result = 'UPLOAD ANOTHER';
                    } else if (W === H) {
                        result = 'ACCEPTED';
                    } else if ((W > L || H > L)) {
                        result = 'CROP IT';
                    } else {
                        result = 'INVALID INPUT';
                    }

                    $('#resultList').append(`<li class="list-group-item my-2">Photo ${index + 1}: ${result}</li>`);

                });

                $('html, body').animate({
                    scrollTop: 10000
                }, 300);
            });


            $(document).on('change', 'input', function (e) {
                numOnly(e)
            });
        });
        function numOnly(evt) {
            var k;
            document.all ? k = evt.keyCode : k = evt.which;
            const isValid = (k == 0 || k == 9 || k == 8 || k == 32 || (k >= 48 && k <= 57));
            if (isValid) {
                $(evt.target).closest('.form-group').removeClass('has-error').find('.help-block').remove();
            }
            return isValid;
        }
        $('#numberOfPhotos').on('keypress', function (e) {
            if (e.which == 13) {
                e.preventDefault(); // prevent form default submit
                $('#showInputs').click();
                $(this).blur();
            }
        });
