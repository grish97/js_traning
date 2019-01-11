let show = {
    users : JSON.parse(localStorage.getItem('users')),
    posts : JSON.parse(localStorage.getItem('posts')),
    comments : JSON.parse(localStorage.getItem('comments')),
    userId  : (document.cookie.split(';')[0]).split('=')[1],
    postId : (document.cookie.split(';')[1]).split('=')[1],

    viewPost : function() {
        if (this.posts) {
            $.each(this.posts, function () {
                if (show.postId === this.postId) {
                    let divCard = '<div class="item mr-lg-4 mb-lg-4" data-attribute="' + this.postId + '">' +
                        '   <div class="card">' +
                        '           <h5 class="card-title">' + this.title + '</h5>' +
                        '       <img src="' + this.imgPath + '" alt="photo" width="70%" height="400px">' +
                        '       <div class="card-body"> ' +
                        '           <p class="card-text">' + this.desk + '</p>' +
                        '           <p class="card-text"><span class="small text-muted">Author: ' + (show.users[this.owner_id]['name'].slice(0, 1)) + ". " + (show.users[this.owner_id]['last_name']) + '</p>' +
                        '           <a class="btn btn-success mr-3 text-white edit" role="button">Edit</a><a class="btn btn-danger text-white delete" role="button">Delete</a>' +
                        '       </div>' +
                        '   </div>' +
                        '</div>';
                    $('.card-group').append(divCard);
                }
            });
            this.viewComment();
        }
    },

    viewComment : function() {
        if (this.comments) {
            $.each(this.comments, function() {
                if(show.postId === this.postId) {
                    let showCommentElem =
                        '<div class="item">' +
                            '<div class="col-lg-10 d-inline-block">\n' +
                            '        <p class="border">\n' +
                            '            <span class="small text-muted">'+ this.created_at +'</span>\n' +
                            '            <span class="font-weight-bold ml-4">'+ show.users[this.userId].name +':</span>\n' +
                            '            <span>'+ this.comment +'</span>\n' +
                            '        </p>\n' +
                            '</div>\n' +
                            '<a class="reply"><i class="fas fa-reply disabled"></i></a>'+
                            '    <div class="commentReplyBlock border mb-4 col-lg-10">\n' +
                            '        <p class="">\n' +
                            '            <span class="small text-muted"></span>\n' +
                            '            <span class="font-weight-bold ml-4"></span>\n' +
                            '            <span></span>\n' +
                            '        </p>\n' +
                            '    </div>'+
                        '</div';
                    $('.commentBlock').append(showCommentElem);
                }
            });
        }
    },

    newComment  : function(event) {
      let date = new Date();
      let time = date.getHours() + ':' + (((date.getMinutes) < 10 ? '0' : '') + date.getMinutes()) + ':' + date.getSeconds();
      let input = $(event.target);
      let replyInputVal = '';
      let commentInputVal = '';
      if(input.val()) {
          if(input[0]['class'] === 'reply'){
              $('.replyBlock').removeClass('d-none');
              replyInputVal = input.val()
          }else {
              commentInputVal = input.val()
          }
          input.val('');
      }

      if(!this.comments) {
            this.comments = [];
      }

      (this.comments).push({
          id           : this.comments.length,
          comment      : commentInputVal,
          replyComment : replyInputVal,
          userId       : this.userId,
          postId       : this.postId,
          created_at   : time
      });

      localStorage.setItem('comments',JSON.stringify(this.comments));

      let showCommentElem =
              '<div class="col-lg-10 d-inline-block">\n' +
          '        <p class="">\n' +
          '            <span class="small text-muted">'+ time +'</span>\n' +
          '            <span class="font-weight-bold ml-4">'+ this.users[this.userId]['name'] +':</span>\n' +
          '            <span>'+ commentInputVal +'</span>\n' +
          '        </p>\n' +
          '    </div>\n' +
          '    <span class="border reply"><i class="fas fa-reply"></i></span>'+
          '    <div class="commentReplyBlock col-lg-10 border">\n' +
          '        <p class="">\n' +
          '            <span class="small text-muted"></span>\n' +
          '            <span class="font-weight-bold ml-4"></span>\n' +
          '            <span></span>\n' +
          '        </p>\n' +
          '    </div>';

      $('.commentBlock').append(showCommentElem);
    },
};

show.viewPost();

$('._comment').on('keyup',function(event) {
    if(event.which === 13) show.newComment(event);
});

$('.reply').bind('click', function(event) {
    $(this).addClass("disabled");
    let input = '<input type="text" class="form-control _comment mb-3 col-6 float-right" name="reply">';
    $(this).closest('.item').find('.commentReplyBlock').prepend(input);
});