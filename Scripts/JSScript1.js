function showPrevieImage(imgUpl, prevImg) {
    if (imgUpl.files && imgUpl.files[0]) {
        var r = new FileReader();
        r.onload = function (e) {
            $(prevImg).attr('src', e.target.result);
        }
        r.readAsDataURL(imgUpl.files[0]);
    }
}
function ajaxAddQuiz(addingForm) {
    $validator.unobtrusive.parse(addingForm);
    if ($(addingForm).valid()) {
        $.ajax({
            type: 'POST',
            url: addingForm.action,
            data: new FormData(addingForm),
            success: alert("Succes, you added correct")
        })
    }
}