this["Messages"] = this["Messages"] || {};
this["Messages"]["templates"] = this["Messages"]["templates"] || {};

this["Messages"]["templates"]["messages"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams) {
    return "                        <div class=\"tag interest-tag\">"
    + container.escapeExpression(container.lambda(blockParams[0][0], depth0))
    + "</div>\n";
},"3":function(container,depth0,helpers,partials,data,blockParams) {
    return "                        <div class=\"tag opportunities-tag\">"
    + container.escapeExpression(container.lambda(blockParams[0][0], depth0))
    + "</div>\n";
},"5":function(container,depth0,helpers,partials,data,blockParams) {
    return "                        <div class=\"tag skills-tag\">"
    + container.escapeExpression(container.lambda(blockParams[0][0], depth0))
    + "</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<div class=\"container\">\n    <div class=\"contact-header\">Contact WeVote Project Lead</div>\n    <form class=\"form-class\">\n        <div class=\"input-container\">\n            <div class='control-label'>Your Name:</div>\n            <input class=\"form-control\" type=\"text\" name=\"name\"\n                   required>\n        </div>\n        <div class=\"input-container\">\n            <div class='control-label'>Your Email:</div>\n            <input class=\"form-control\"  type=\"email\"\n                   name=\"email\" required>\n        </div>\n        <div class=\"personal-info\">\n            <div class=\"personal-message-header\">Include a Personal\n                Message:</div>\n            <div class=\"personal-message-info\">For example, ask a\n                question or introduce yourself.</div>\n            <textarea id=\"personal-message\" name=\"personal-message\"\n                      class=\"slack-message\"></textarea>\n            <div class=\"attachment-title-container\">\n                <div class=\"attachment-header\">Attachment</div>\n                <div class=\"attachment-info-text\">Tags not editable here. Edit the tags in the selector above.</div>\n            </div>\n            <div class=\"attachment-container\">\n                <div class=\"skills-container\">\n                    <div class=\"skills-title\">Skills to contribute</div>\n                    <div class=\"tag-container\">\n"
    + ((stack1 = helpers.each.call(alias1,((stack1 = (depth0 != null ? depth0.skills : depth0)) != null ? stack1.interests : stack1),{"name":"each","hash":{},"fn":container.program(1, data, 1, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "                    </div>\n                </div>\n                <div class=\"skills-container\">\n                    <div class=\"skills-title\">Skills to learn</div>\n                    <div class=\"tag-container\">\n"
    + ((stack1 = helpers.each.call(alias1,((stack1 = (depth0 != null ? depth0.skills : depth0)) != null ? stack1.learning : stack1),{"name":"each","hash":{},"fn":container.program(3, data, 1, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "                    </div>\n                </div>\n                <div class=\"skills-container\">\n                    <div class=\"skills-title\">Civic Interests</div>\n                    <div class=\"tag-container\">\n"
    + ((stack1 = helpers.each.call(alias1,((stack1 = (depth0 != null ? depth0.skills : depth0)) != null ? stack1.skills : stack1),{"name":"each","hash":{},"fn":container.program(5, data, 1, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "                    </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"submit-container\">\n            <input class=\"submit-btn\" type=\"submit\" value=\"Submit\">\n        </div>\n    </form>\n</div>";
},"useData":true,"useBlockParams":true});