$(".messages").animate({ scrollTop: $(document).height() }, "fast");

$("#profile-img").click(function() {
	$("#status-options").toggleClass("active");
});

$(".expand-button").click(function() {
  $("#profile").toggleClass("expanded");
	$("#contacts").toggleClass("expanded");
});

$("#status-options ul li").click(function() {
	$("#profile-img").removeClass();
	$("#status-online").removeClass("active");
	$("#status-away").removeClass("active");
	$("#status-busy").removeClass("active");
	$("#status-offline").removeClass("active");
	$(this).addClass("active");
	
	if($("#status-online").hasClass("active")) {
		$("#profile-img").addClass("online");
	} else if ($("#status-away").hasClass("active")) {
		$("#profile-img").addClass("away");
	} else if ($("#status-busy").hasClass("active")) {
		$("#profile-img").addClass("busy");
	} else if ($("#status-offline").hasClass("active")) {
		$("#profile-img").addClass("offline");
	} else {
		$("#profile-img").removeClass();
	};
	
	$("#status-options").removeClass("active");
});

function toggleSelectChatMessage(show) {
    if (show) {
        $("#selectChatMessage").show();
        $(".contact-profile").hide();
        $(".messages").hide();
        $(".message-input").hide();
    } else {
        $("#selectChatMessage").hide();
        $(".contact-profile").show();
        $(".messages").show();
        $(".message-input").show();
    }
}	

toggleSelectChatMessage(true);

$(document).ready(function() {
	$(document).keyup(function(e) {
	  if (e.key === "Escape") {
		toggleSelectChatMessage(true)
	  }
	});
});

function showUserInMainPanel(user) {
	toggleSelectChatMessage(false)
    if (user) {
    	$(".contact-profile img").attr("src", user.img);
		$(".contact-profile p .name").text(user.name);
		$(".contact-profile p .small.text.d-block.mt-3").text(user.contactNo);
    	$(".messages ul").empty();
    	$(".messages ul").append('<li class="sent"><img src="' + user.img + '" alt="" /><p>' + user.preview + '</p></li>');
    }
}

function logout() {
    window.location.href = 'http://localhost:3000/logout';
}

const socket = io();

socket.on('connect', () => {
	const from = $("#sidepanel #profile #expanded input").val();
	socket.emit('addPhoneNumber', from);
});

function sendMessage() {
	let message = $(".message-input input").val();
    let sendTo = $(".contact-profile .small.text.d-block").text();
	if($.trim(sendTo) == '') {
		sendTo = "room-"+$(".contact-profile .name.mt-2").text();
	}
    const from = $("#sidepanel #profile #expanded input").val();
	let img = $("#profile-img").attr("src");

	if($.trim(message) == '') {
		return false;
	}

    const data = {
		"from": from,
		"to": sendTo,
        "message": message,
        datetime: new Date()
    }

    socket.emit("send-message", data)
	let formattedTime = moment(data.datetime).format('hh:mm A');
	$(`
		<li class="replies">
		<img src="${img}" alt="" />
		<p>${data.message}<span class="float-right small text ml-2">${formattedTime}</span></p>
		</li>
      `).appendTo($('.messages ul'));
	$('.message-input input').val(null);
	if (data.to && !data.to.startsWith("room-")) {
		$('#contacts .contact .wrap .meta #'+data.to).html('<span>You: </span>' + data.message);
	}
	$(".messages").animate({ scrollTop: $(document).height() }, "fast");
};

function receiveMessage(data) {
    let imgSrc = $(".contact-profile img").attr("src");
    let formattedTime = moment(data.datetime).format('hh:mm A');
	let check = $(".contact-profile .small.text.d-block").text();
	if(!($.trim(check) == '') || data.to.startsWith("room-")) {
		let newMessage = $(
			`<li class="sent">
				<img src="${imgSrc}" alt="" />
				<p>${data.message}
					<span class="float-right small text ml-2">${formattedTime}</span>
				</p>
			</li>`
		);	
		// Append the new message to the messages list
		newMessage.appendTo($('.messages ul'));
	}


    // Update the preview in the active contact
	if (data.to && !data.to.startsWith("room-")) {
		$(`#${data.from}`).html('<span></span>' + data.message);
	}

    // Scroll to the bottom of the messages
    $(".messages").animate({ scrollTop: $(document).height() }, "fast");
};

$("#joinroom").on('click', () => {
    const roomName = prompt("Enter Room name:")
    if ($.trim(roomName) == '') {
        return false;
    }

    toggleSelectChatMessage(false)
    $(".contact-profile img").attr("src", "https://png.pngtree.com/png-clipart/20190921/original/pngtree-group-chat-icon-png-image_4763828.jpg");
    $(".contact-profile p .name").text(roomName).addClass("mt-2");
    $(".contact-profile p .small.text.d-block.mt-3").text('') // Hide the phone number
    $(".messages ul").empty();

    socket.emit('join-room', roomName)
});

$('.submit').click(function() {
    sendMessage();
});

$(window).on('keydown', function(e) {
  if (e.which == 13) {
    sendMessage();
    return false;
  }
});

socket.on('receive-message', (data) => {
    receiveMessage(data)
})