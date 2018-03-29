////// GamePanel on left center// must have on the top of js script, its the bast way to not showing the pane when page loading on start.
$('#UserPanel').tabSlideOut({
    tabLocation: 'left',
    action: 'hover'
});

$(document).ready(function () {
    var cookieGet = document.cookie;
    if (cookieGet !=null) {
        getCookie(cookieGet);
    }
    else{}
});
//Working functions using only for testing 
var GameScore = 0;
function checkJsFun(correct, points) {
    var value = $('#answer');
    if (correct == value.val()) {
        GameScore += parseInt(points);
        value.val("");
        $('#ScoreText').html(GameScore);

    }
    else
        alert("Niee");
      
}
/////Gender checking in Game Panel
    //var cookieGender = getCookie("gender");
    //var cookieScore = getCookie("score");
var genderType;
var divWithInputs = $('#inputGender');
var genderImg = $('#GenderImg');
    $('input[name="Gen"]').click(function (obj) {

        if (obj.target.id == "male")
        {
            setGender("male", "../../AppFile/Img/geekM.png");
        }
        else
        {
            setGender("female", "../../AppFile/Img/geek.png");
        }
    });
    function setGender(gT, srcToPng) {
        genderType = gT;
        divWithInputs.hide(750);
        genderImg.attr('src', srcToPng);
        genderImg.fadeIn(1000);
    }

   
////Set cookie with user info if he want to do this before exit 
    $('input[name="cookieyes"]').click(function () {
        if ($("#checkbox").prop("checked", true) && genderType != "") {
            createCookie("gender", genderType, 20);
            createCookie("score", GameScore.toString(), 20);
        }
        else if ($("#checkbox").prop("checked", false)) {
            ;
        }

/// Cookies functions
     function createCookie(name, value, days) {
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                var expires = "; expires=" + date.toGMTString();
            }
            else var expires = "";
            document.cookie = name + "=" + value + expires + "; path=/";
        }
    });
    function getCookie(cookieEx) {
        cookieEx = cookieEx.split("; ");
        for (var i = 0; i < cookieEx.length; i++) {
            var spltedArray = cookieEx[i].split("=");
            if (spltedArray[0] == "gender") {
                if (spltedArray[1] == "male") {
                    setGender("male", "../../AppFile/Img/geekM.png");
                }
                else {
                    setGender("female", "../../AppFile/Img/geek.png");
                }
            }
            else { }
            //GameScore = parseInt(spltedArray[3]);
            //$('#ScoreText').html(GameScore);
        }
    }
/////Monitor LogoCM scrolling //not working yet/// Start page
   (function ($) {
        var x = 0; var y = 0;
        var ekran = $("#ekranmoinitora");
        ekran.css('backgroundPosition', x + 'px' + ' ' + y + 'px');
        window.setInterval(function () {
            ekran.css("backgroundPosition", x + 'px' + ' ' + y + 'px');
            y--;
        }, 90);
    });
// //Previe when user upload img file// ADD NEW page
   function showPrevieImage(imgUpl, prevImg) {
       if (imgUpl.files && imgUpl.files[0]) {
           var r = new FileReader();
           r.onload = function (e) {
               $(prevImg).attr('src', e.target.result);
           }
           r.readAsDataURL(imgUpl.files[0]);
       }
   }
   //
   function ajaxAddQuiz(addingForm) {
       $validator.unobtrusive.parse(addingForm);
       if ($(addingForm).valid()) {
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