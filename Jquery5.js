$(function () {
    var li = $("#my-todos>li:first-child");
    li.remove();
    $("form").submit(function (event) {
        event.preventDefault();
        var text = $("input[type='text']", this).val();
        var send = {
            "text": text
        };
        $.ajax({
            type: "POST",
            url: "https://api.parse.com/1/classes/todo",
            data: JSON.stringify(send),
            headers: {
                "X-Parse-Application-Id": "ZBUEZB2qVsZeRIrjZ771coLUbi6SeVdDDMpiI1ko",
                "X-Parse-REST-API-Key": "hm0oHgayDQfUk3TgUN0SxiqKLDzyiiux2U8DjE6E"
            },
            success: function (data) {
                var nova = li.clone();
                $("span", nova).text(text);
                nova.appendTo("#my-todos");
                $("input[type='text']", this).val("");
            },
            error: function (event, status, error) {
                alert(error);
            }
        });


    });
});