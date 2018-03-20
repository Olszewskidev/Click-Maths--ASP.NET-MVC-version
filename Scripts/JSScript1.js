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
    if ($(addingForm).valid())
    {
        $.ajax({
            type: 'POST',
            url: 'HomeController/AddQuiz',
            data: new FormData(addingForm),
            success: function () {
                alert("We did it");
            }
        });
    }
return false;
}
function checkJsFun(correct) {
    var value = document.getElementById("UsAnswer").value;
    if (correct == val) {
        alert("Zgadza sie");
    }
    else
        alert("Niee");
      
}
function spr(c) {
    alert(c);

}