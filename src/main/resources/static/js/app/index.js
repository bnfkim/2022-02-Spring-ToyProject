var main = {
    init : function () {
        var _this = this;

        $('#btn-save').on('click', function () {
            _this.save();
        });

        $('#btn-update').on('click', function () {
            _this.update();
        });

        $('#btn-delete').on('click', function () {
            _this.delete();
        });

        $('#btn-reply-save').on('click', function () {
            _this.replySave();
        });

        $("#btn-heart-off").on("click", function () {
            _this.onLike();
        });

        $("#btn-heart-on").on("click", function () {
            _this.offLike();
        });
    },

    save : function () {
        var data = {
            title: $('#title').val(),
            author: $('#author').val(),
            content: $('#content').val()
        };

        $.ajax({
            type: 'POST',
            url: '/api/v1/posts',
            dataType: 'json',
            contentType:'application/json; charset=utf-8',
            data: JSON.stringify(data)
        }).done(function() {
            alert('글이 등록되었습니다.');
            window.location.href = '/';
        }).fail(function (error) {
            alert(JSON.stringify(error));
        });
    },
    update : function () {
        var data = {
            title: $('#title').val(),
            content: $('#content').val()
        };

        var id = $('#id').val();

        $.ajax({
            type: 'PUT',
            url: '/api/v1/posts/'+id,
            dataType: 'json',
            contentType:'application/json; charset=utf-8',
            data: JSON.stringify(data)
        }).done(function() {
            alert('글이 수정되었습니다.');
            window.location.href = '/posts/getDetail/'+id;
        }).fail(function (error) {
            alert(JSON.stringify(error));
        });
    },
    delete : function () {
        var id = $('#id').text();

        $.ajax({
            type: 'DELETE',
            url: '/api/v1/posts/'+id,
            dataType: 'json',
            contentType:'application/json; charset=utf-8'
        }).done(function() {
            alert('글이 삭제되었습니다.');
            window.location.href = '/';
        }).fail(function (error) {
            alert(JSON.stringify(error));
        });
    },
    replySave : function () {
        var data = {
            pid: $('#id').text(),
            email: $('#email').text(),
            replyContent: $('#replyContent').val()
        };

        $.ajax({
            type: 'POST',
            url: '/api/v1/reply',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data)
        }).done(function() {
            alert('댓글이 등록되었습니다.');
            window.location.href = '/posts/getDetail/'+data.pid;
        }).fail(function (error) {
            alert(JSON.stringify(error));
        })
    },
    replyDelete: function (rid) {
        var pid = $('#id').text();
        var email = $('#email').text();

        $.ajax({
            type: 'DELETE',
            url: '/api/v1/reply/' + rid + '?email='+email,
            dataType: 'json',
            contentType: 'application/json; charset=utf-8'
        }).done(function () {
            alert('댓글이 삭제되었습니다.');
            window.location.href = '/posts/getDetail/'+pid;
        }).fail(function (error) {
            alert(JSON.stringify(error));
        })
    },

    onLike : function () {
        var data = {
            pid: $('#id').text(),
            email: $('#email').text(),
        };

    	$.ajax({
            url: '/api/v1/like',
            type: 'POST',
            dataType: 'json',
            contentType:'application/json; charset=utf-8',
            data: JSON.stringify(data),
            success: function () {
                alert('좋아요 🤍');
                window.location.href = '/posts/getDetail/' + data.pid;
            }, error: function (error) {
                alert(data);
                alert(JSON.stringify(error));
            }
        });
    },

    offLike : function () {
        var data = {
            pid: $('#id').text(),
            email: $('#email').text(),
        };
        $.ajax({
            url: '/api/v1/like',
            type: 'DELETE',
            dataType: 'json',
            contentType:'application/json; charset=utf-8',
            data: JSON.stringify(data),
            success: function () {
                alert('좋아요 취소');
                window.location.href = '/posts/getDetail/' + data.pid;
            },error: function (error) {
                alert(JSON.stringify(error));
            }
        });
    }
};

main.init();