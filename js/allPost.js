let allPost =  {

    view : function() {
        let id = document.cookie.split('=')[1];
        let posts = JSON.parse(localStorage.getItem('posts'));
        let user = JSON.parse(localStorage.getItem('users'));
        if(!posts || posts.lenght === 0) $('.card-group').html("<h1 class='card-text text-danger'>No Post</h1>");

        $(posts).each(function() {
            let divCard = '<div class="item mr-lg-4 mb-lg-4" data-attribute="'+ this.postId +'">' +
                '   <div class="card">' +
                '       <img src="'+this.imgPath+'" alt="'+this.imgName+'" width="300" height="200">' +
                '       <div class="card-body"> ' +
                '           <h5 class="card-title show">' + this.title + '</h5>' +
                '           <p class="card-text">'+ this.desk +'</p>' +
                '           <p class="card-text"><span class="small text-muted">Author: '+ (user[this.owner_id]['name'].slice(0,1)) + ". " + (user[this.owner_id]['last_name']) +'</p>' +
                '           <a class="btn btn-success mr-3 text-white edit" role="button">Edit</a><a class="btn btn-danger text-white delete" role="button">Delete</a>' +
                '       </div>' +
                '   </div>' +
                '</div>';
            $('.card-group').append(divCard);

            if(this.owner_id !== id) {
                let card = $('.item[data-attribute='+ this.postId +']');
                card.find('.edit').remove();
                card.find('.delete').remove();
            }
            return true;
        });
    }
};

allPost.view();

$('.edit').on('click',function(e) {
    let postId = $(e.target).closest('.item').attr('data-attribute');
    document.cookie = "postId=" + postId;
    window.location.href = 'edit.html';
});

$('.show').on('click', function(event) {
    let postId = +$(event.target).closest('.item').attr('data-attribute');
    document.cookie = `postId=${postId}`;
    window.location.href = 'show.html';
});

$('.delete').on('click',function(e){
    let postId = $(e.target).closest('.item').attr('data-attribute');
    let card = $(e.target).closest('.item');
    let posts = JSON.parse(localStorage.getItem('posts'));
    $(posts).each(function(key) {
        if(this.postId === postId){
            posts.splice(key,1);
            localStorage.setItem('posts',JSON.stringify(posts));
            return false;
        }
    });
    card.remove();
});