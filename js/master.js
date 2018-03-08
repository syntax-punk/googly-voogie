$(document).ready(function() {
    var url = "https://stiff-fog.glitch.me/visitors";
    if (typeof(Storage) !== "undefined") {
        var visited = localStorage.getItem("visited");
        if (!visited) {
            $.post(url, function( data ) {
                console.log(data);
                localStorage.setItem('visited', '1');
            });
        }
    }
    $.get( url, function( data ) {
        $( "#count" ).html( data.visits );
    }); 
    $(window).on('mousemove touchmove', movedamnEyes);
});

//  eyes motion
function movedamnEyes(event) {

    mouse_pos = {
        'x': event.pageX,
        'y': event.pageY
    }

    $(".eye-ball").each(function() {
        var eye_container = $(this).parent();
        var pos = $(eye_container).offset();
        var eye_pos = {
            'x': pos.left + ($(eye_container).width() / 2),
            'y': pos.top + ($(eye_container).height() / 2)
        }
        var toCenterDistance = get_distance(eye_pos, mouse_pos);
        var targetDistance = toCenterDistance - ($(eye_container).width() / 2) + 7;
        var slope = getSlope(eye_pos, mouse_pos);

        if (toCenterDistance > ($(eye_container).width() / 2)) {
            var x = Math.cos(Math.atan(slope)) * targetDistance;
            if (eye_pos.x > mouse_pos.x) {
                x += mouse_pos.x;
            } else if (eye_pos.x < mouse_pos.x) {
                x = -x + mouse_pos.x;
            }
            var y = Math.sin(Math.atan(slope)) * targetDistance;
            if (eye_pos.x > mouse_pos.x) {
                y += mouse_pos.y;
            } else if (eye_pos.x < mouse_pos.x) {
                y = -y + mouse_pos.y;
            }
            x -= ($(this).height() / 2) + eye_pos.x - ($(eye_container).width() / 2);
            y -= ($(this).height() / 2) + eye_pos.y - ($(eye_container).height() / 2);
        } else {
            x = mouse_pos.x - ($(this).width() / 2) - eye_pos.x + ($(eye_container).width() / 2);
            y = mouse_pos.y - ($(this).width() / 2) - eye_pos.y + ($(eye_container).height() / 2);
        }
        $(this).css({
            'left' : x + 'px',
            'top' : y + 'px',
        });
    });
}

// distance calc
function get_distance(loc1, loc2) {
    return Math.sqrt(Math.pow((loc1.x - loc2.x), 2) + Math.pow((loc1.y - loc2.y), 2));
}

//  slope calc
function getSlope(loc1, loc2) {
    return (loc1.y - loc2.y) / (loc1.x - loc2.x);
}