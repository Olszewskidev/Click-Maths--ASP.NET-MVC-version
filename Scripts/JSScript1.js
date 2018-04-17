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
        snackBarPopUP('Correct answer','forestgreen');

    }
    else
        snackBarPopUP('Wrong answer', 'tomato');
         
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
    var firsttime = false;
    function setGender(gT, srcToPng) {
        if (firsttime == false) {
            genderType = gT;
            divWithInputs.hide(750);
            genderImg.attr('src', srcToPng);
            genderImg.fadeIn(1000);
            firsttime = true;
        }
        else {
            genderType = gT;
            divWithInputs.hide();
            genderImg.attr('src', srcToPng);
            genderImg.show();
        }      
    }

   
////Set cookie with user info if he want to do this before exit 
    $('input[name="cookieyes"]').click(function () {
        if ($("#checkbox").prop("checked", true) && genderType != "") {
            createCookie("gender", genderType, 20);
            createCookie("score", GameScore, 20);
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
//Get cookies with User score, when page was reloaded
    function getCookie(cookieGet) {
            var pairs = cookieGet.split(";");
            var cookies = {};
            for (var i = 0; i < pairs.length; i++) {
                var pair = pairs[i].split("=");
                cookies[(pair[0] + '').trim()] = unescape(pair[1]);
            }
            if (cookies.gender == "male")
                setGender("male", "../../AppFile/Img/geekM.png");
            else if (cookies.gender == "female")
                setGender("female", "../../AppFile/Img/geek.png");
            GameScore = parseInt(cookies.score);
            $('#ScoreText').html(GameScore);
        }
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
               success: function (data) {
                   Snackbar.show({ showAction: false, text: "You added a new quiz", backgroundColor: "forestgreen", pos: 'bottom-right', duration: '3000' });
               },
               error: function () {
                   Snackbar.show({ showAction: false, text: "Bad new's something went wrong", backgroundColor: "tomato", pos: 'bottom-right', duration: '3000' });
               }
           });
       }
       return false;
   }
//Pop up SnackBar, when answer is correct or incorrect
   function snackBarPopUP(textM,color) {
       Snackbar.show({ showAction: false, text: textM, backgroundColor: color, pos: 'bottom-right', duration: '3000'});
   }