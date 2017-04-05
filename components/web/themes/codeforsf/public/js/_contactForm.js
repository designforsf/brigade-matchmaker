//Control for the contact Team email form
function sendMsg(e) {
  var myURL="http://localhost:5465/messaging/api/send"
  var userMsg = {"email":{"to":[{"name":"Pete Test","email":"james.pitts@gmail.com"}],"from":[{"name":"Hello Volunteery","email":"welcome.sfbrigade+2938@gmail.com"}], "subject": "RE: World", "text":"Hello, from the Team Contact form!"}}

var jSONstr = JSON.stringify(userMsg);
console.log(jSONstr);

setTimeout(
  $.ajax({
    url : myURL,
    data : userMsg,
    type: "POST",
    error: function(a,b,c) {
      console.log("Error thrown: ", c )
    }
  }), 2000);

}   
