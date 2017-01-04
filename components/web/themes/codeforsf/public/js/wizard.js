//fieldsets
var current_fs
var next_fs
var previous_fs
//fieldset properties which we will animate
var left
var opacity
var scale 
//flag to prevent quick multi-click glitches
var animating
// JSON object with user's data 
var user_data = {}
user_data.step = 1

$(document).ready(function () {
  if ($(".alert-info")[0]) {
    console.log('GITHUB')
    user_data.step += 1
    nextStep($("#firstNext"))
  }
});

$(".next").click(function(){
  if (user_data.step === 1) {
    location.href = 'auth/github'
    return
  }
  user_data.step += 1

	console.log("current step: " + user_data.step)
	if(animating) return false
	animating = true
	
	current_fs = $(this).parent()
	next_fs = $(this).parent().next()
	
	//activate next step on progressbar using the index of next_fs
	$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active")
	
	//show the next fieldset
	next_fs.show()
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale current_fs down to 80%
			scale = 1 - (1 - now) * 0.2
			//2. bring next_fs from the right(50%)
			left = (now * 50)+"%"
			//3. increase opacity of next_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({
        'transform': 'scale('+scale+')',
        'position': 'absolute'
      })
			next_fs.css({'left': left, 'opacity': opacity})
		}, 
		duration: 800, 
		complete: function(){
			current_fs.hide()
			animating = false
		},
	})
})

$(".previous").click(function(){
	if (user_data.step === 5) {
		user_data.step -= 1
		$("#matching_li").removeClass("active")
	}
	user_data.step -= 1
	console.log("current step: " + user_data.step)
	if(animating) return false
	animating = true
	
	current_fs = $(this).parent()
	previous_fs = $(this).parent().prev()
	
	//de-activate current step on progressbar
	$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active")
	
	//show the previous fieldset
	previous_fs.show()
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale previous_fs from 80% to 100%
			scale = 0.8 + (1 - now) * 0.2
			//2. take current_fs to the right(50%) - from 0%
			left = ((1-now) * 50)+"%"
			//3. increase opacity of previous_fs to 1 as it moves in
			opacity = 1 - now
			current_fs.css({'left': left})
			previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity})
		}, 
		duration: 800, 
		complete: function(){
			current_fs.hide()
			animating = false
		},
	})
})

$(".submit").click(function(){
	user_data.step += 1
	console.log("current step: " + user_data.step)
	if(animating) return false
	animating = true
	
	current_fs = $(this).parent()
	next_fs = $(this).parent().next()
	
	//activate next step on progressbar using the index of next_fs
	$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active")
	
	//show the next fieldset
	next_fs.show()
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale current_fs down to 80%
			scale = 1 - (1 - now) * 0.2
			//2. bring next_fs from the right(50%)
			left = (now * 50)+"%"
			//3. increase opacity of next_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({
        'transform': 'scale('+scale+')',
        'position': 'absolute'
      })
			next_fs.css({'left': left, 'opacity': opacity})
		}, 
		duration: 800, 
		complete: function(){
			current_fs.hide()
			animating = false
		},
	})
	return false
})

$(".chosen-select").chosen()
$(".chosen-container").css("width", "350px")

function nextStep (curr) {
  console.log("current step: " + user_data.step)
  if(animating) return false
  animating = true
  
  current_fs = curr.parent()
  next_fs = curr.parent().next()
  
  //activate next step on progressbar using the index of next_fs
  $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active")
  
  //show the next fieldset
  next_fs.show()
  //hide the current fieldset with style
  current_fs.animate({opacity: 0}, {
    step: function(now, mx) {
      //as the opacity of current_fs reduces to 0 - stored in "now"
      //1. scale current_fs down to 80%
      scale = 1 - (1 - now) * 0.2
      //2. bring next_fs from the right(50%)
      left = (now * 50)+"%"
      //3. increase opacity of next_fs to 1 as it moves in
      opacity = 1 - now;
      current_fs.css({
        'transform': 'scale('+scale+')',
        'position': 'absolute'
      })
      next_fs.css({'left': left, 'opacity': opacity})
    }, 
    duration: 800, 
    complete: function(){
      current_fs.hide()
      animating = false
    },
  })
}


// URL="http://localhost:5465/api/user/create_and_login"
// echo "Calling $URL"
// wget -qO- \
// --save-cookies cookies-$EPOCH.txt \
// --keep-session-cookies \
// --post-data "email=designforsf#$EPOCH@gmail.com&username=designforsf#$EPOCH@gmail.com&password=$EPOCH" \
// $URL


// function send() {
//         var person = {
//             name: $("#id-name").val(),
//             address:$("#id-address").val(),
//             phone:$("#id-phone").val()
//         }

//         $('#target').html('sending..');

//         $.ajax({
//             url: '/test/PersonSubmit',
//             type: 'post',
//             dataType: 'json',
//             success: function (data) {
//                 $('#target').html(data.msg);
//             },
//             data: person
//         });
//     }