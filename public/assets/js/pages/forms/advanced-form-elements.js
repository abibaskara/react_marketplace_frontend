$(function () {
    //Masked Input =========
    var $demoMaskedInput = $('.masked-input');

    //Mobile Phone Number
    $demoMaskedInput.find('.mobile-phone-number').inputmask('+62 (999) 999-999-99', { placeholder: '+62 (___) ___-___-__' });
    // $("#phone_add").keyup(function() {
    //     var phone  = $("#phone_add").val();
    //     $("#phone_num").val(phone);
    // });
});