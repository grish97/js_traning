let accessConfirm = {
    email    : $('input').eq(0),
    password : $('input ').eq(1),
    data     : JSON.parse(localStorage.getItem('users')),


    getAccount : function () {
        let data  = JSON.parse(localStorage.getItem('users'));
        let email    = $('input').eq(0);
        let password = $('input ').eq(1);

        $(data).each(function(key) {
            if(email.val() === this.email && password.val() === this.password) {
                document.cookie = "id="+key;
                window.location.href = 'index.html';
                return false
            }else if (email.val() !== this.email && password.val() !== this.password) {
                $('.wrong').addClass('d-block');
                email.addClass('is-invalid');
                password.addClass('is-invalid');
            }
        });
    }
};

$('.btn').click(function () {
    accessConfirm.getAccount();
});

