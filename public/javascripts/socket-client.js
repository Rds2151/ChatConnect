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
		"img" : img,
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
    let imgSrc = data.img
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

socket.on('receive-message', (data) => receiveMessage(data))
