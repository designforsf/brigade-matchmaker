module.exports = {

  parseObject: function(final_obj) {
    var name = final_obj.name;
    var email = final_obj.email;
    var personalMessage = final_obj['personal-message'];
    var skills = final_obj.matchingInfo.skills;
    var interests = final_obj.matchingInfo.interests;
    var learning = final_obj.matchingInfo.learning;

    var message = `Message from *${name}*\n*Email:* ${email}\n\n${personalMessage}\n\n*Skills:* ${skills}\n*Interests:* ${interests}\n*I'd like to learn:* ${learning}`;
    // ampersands, greater and lesser than signs need to be HTML encoded for slack
    return message.replace(/&/g, '&amp;').replace(/>/g, '&gt;').replace(/</g, '&lt;');
  }

}
