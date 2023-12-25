$(document).ready(function(){
    $('#loginBtn').click(function(){
        console.log("Hello");
        var loginDetail = {
            email : $("#email").val().trim(),
            password : $("#password").val().trim()
        }
        
        var validForm = true;
        
        if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(loginDetail.email)){
            $('.emailError').css('display','none');
        }else{
            $('.emailError').css('display','block');
            validForm = false;
        }
        
        if(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(loginDetail.password)){
            $('.passError').css('display','none');
        }else{
            $('.passError').css('display','block');
            validForm = false;
        }

        if(validForm){
            $.ajax({
                method : 'POST',
                url : '/login',
                data : loginDetail,
                success : function(res){
                    if(res.auth != false && res.token != undefined){
                        window.location.href = '/dashboard';
                    }else{
                        $('.emailError').css('display','block');
                        $('.passError').css('display','block');
                    }
                },
            });
        }
    });
});