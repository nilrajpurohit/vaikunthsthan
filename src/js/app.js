$(document).ready(function(){
    activeButton();
    $(".menuList>a").click(function(){
        activeButton();
    })

    $(".footMenuList>a").click(function(){
        activeButton();
    })
   
    function activeButton(){
        setTimeout(()=>{
            var url = window.location.href;
            var path = url.split('3000/')[1];
            if(path){
                var setActive = 0;
                $(".menuList>a").each((i,menu)=>{
                    $(menu).children('span').removeClass('active');
                    if($(menu).attr('href')==path){
                        $(menu).children('span').addClass('active');
                        setActive = 1;
                    }
                });
            }else{
                $($('.menuList>a')[0]).children('span').addClass('active');
            }
        },00)
    }

    $('#submitBtn').click(function(){
        submitContactForm();
    })

    function submitContactForm(){
        var contactDetail = {
            name : $("#name").val().trim(),
            email : $("#email").val().trim(),
            phone : $("#phone").val().trim(),
            description : $("#description").val()
        }

        var validForm = true;

        if(/^[a-zA-Z ]{2,30}$/.test(contactDetail.name)){
            $('.nameError').css('display','none');
        }else{
            $('.nameError').css('display','block');
            validForm = false;
        }

        if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(contactDetail.email)){
            $('.emailError').css('display','none');
        }else{
            $('.emailError').css('display','block');
            validForm = false;
        }
        
        if(/^[0-9\+]{1,}[0-9\-]{9,15}$/.test(contactDetail.phone)){
            $('.phoneError').css('display','none');
        }else{
            $('.phoneError').css('display','block');
            validForm = false;
        }
        
        if(contactDetail.description){
            $('.desError').css('display','none');
        }else{
            $('.desError').css('display','block');
            validForm = false;
        }

        if(validForm){
            $.ajax({
                method : 'POST',
                url : '/contact',
                data : contactDetail,
                success : function(res){
                    console.log(res);
                },
            });
        }
    }
});
