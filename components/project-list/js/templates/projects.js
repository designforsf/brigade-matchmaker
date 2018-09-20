this["ProjectList"] = this["ProjectList"] || {};
this["ProjectList"]["templates"] = this["ProjectList"]["templates"] || {};

this["ProjectList"]["templates"]["projects"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, helper, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing, alias5="function";

  return "\n    <div class=\"project\">\n\n        <div class=\"flex-container\">\n\n            <div class=\"project-left\">\n                <div class=\"project-title\">"
    + alias2(alias1(((stack1 = ((stack1 = blockParams[0][0]) != null ? stack1.attributes : stack1)) != null ? stack1.name : stack1), depth0))
    + "</div>\n                <div class=\"description\">"
    + alias2(alias1(((stack1 = ((stack1 = blockParams[0][0]) != null ? stack1.attributes : stack1)) != null ? stack1.description : stack1), depth0))
    + "</div>\n                <div id=\"contact-btn"
    + alias2(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"index","hash":{},"data":data,"blockParams":blockParams}) : helper)))
    + "\" class=\"contact-btn\">\n                    Contact Project Lead\n                </div>\n            </div>\n            <div class=\"divider\"></div>\n            <div class=\"project-right\">\n                <div class=\"project-info\">Project Needs & Interests</div>\n                <div id=\"skills"
    + alias2(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"index","hash":{},"data":data,"blockParams":blockParams}) : helper)))
    + "\" class=\"skills\">\n                    <div class=\"tag-title\">Skills Needed:</div>\n                    <div class=\"tag-container\">\n"
    + ((stack1 = helpers.each.call(alias3,((stack1 = ((stack1 = ((stack1 = blockParams[0][0]) != null ? stack1.attributes : stack1)) != null ? stack1.matchingConfig : stack1)) != null ? stack1.skillsNeeded : stack1),{"name":"each","hash":{},"fn":container.program(2, data, 1, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "                    </div>\n                </div>\n                <div id=\"goals"
    + alias2(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"index","hash":{},"data":data,"blockParams":blockParams}) : helper)))
    + "\" class=\"opportunities\">\n                    <div class=\"tag-title\">Learning Opportunities:</div>\n                    <div class=\"tag-container\">\n"
    + ((stack1 = helpers.each.call(alias3,((stack1 = ((stack1 = ((stack1 = blockParams[0][0]) != null ? stack1.attributes : stack1)) != null ? stack1.matchingConfig : stack1)) != null ? stack1.goalsNeeded : stack1),{"name":"each","hash":{},"fn":container.program(4, data, 1, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "                    </div>\n                </div>\n                <div id=\"interests"
    + alias2(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"index","hash":{},"data":data,"blockParams":blockParams}) : helper)))
    + "\" class=\"interests\">\n                    <div class=\"tag-title\">Civic Interests:</div>\n                    <div class=\"tag-container\">\n"
    + ((stack1 = helpers.each.call(alias3,((stack1 = ((stack1 = ((stack1 = blockParams[0][0]) != null ? stack1.attributes : stack1)) != null ? stack1.matchingConfig : stack1)) != null ? stack1.interests : stack1),{"name":"each","hash":{},"fn":container.program(6, data, 1, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "                    </div>\n                </div>\n            </div>\n        </div>\n\n    \n        <div class=\"details\" id=\"details-"
    + alias2(alias1(((stack1 = ((stack1 = blockParams[0][0]) != null ? stack1.attributes : stack1)) != null ? stack1._id : stack1), depth0))
    + "\">\n\n            <div class=\"details-flex\">\n                <div class=\"left\">\n                    Pending Tasks\n                    <div class=\"details-container\">\n"
    + ((stack1 = helpers["if"].call(alias3,((stack1 = ((stack1 = blockParams[0][0]) != null ? stack1.attributes : stack1)) != null ? stack1.todoItems : stack1),{"name":"if","hash":{},"fn":container.program(8, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "                    </div>\n                </div>\n                <div class=\"divider\"></div>\n                <div class=\"center\">\n                    Progress Made\n                    <div class=\"details-container\">\n"
    + ((stack1 = helpers["if"].call(alias3,((stack1 = ((stack1 = blockParams[0][0]) != null ? stack1.attributes : stack1)) != null ? stack1.progressItems : stack1),{"name":"if","hash":{},"fn":container.program(11, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "                    </div>\n                </div>\n                <div class=\"divider\"></div>  \n                <div class=\"right\">\n                    Additional Info\n                    <div class=\"details-container\">\n                        \n                    </div>\n                </div>\n            </div>\n\n        </div>\n\n        <div class=\"details-footer\" id=\"details-button-"
    + alias2(alias1(((stack1 = ((stack1 = blockParams[0][0]) != null ? stack1.attributes : stack1)) != null ? stack1._id : stack1), depth0))
    + "\">\n            Show project details\n        </div>\n\n    </div>\n\n";
},"2":function(container,depth0,helpers,partials,data,blockParams) {
    return "                        <div class=\"tag skills-tag\">"
    + container.escapeExpression(container.lambda(blockParams[0][0], depth0))
    + "</div>\n";
},"4":function(container,depth0,helpers,partials,data,blockParams) {
    return "                        <div class=\"tag opportunities-tag\">"
    + container.escapeExpression(container.lambda(blockParams[0][0], depth0))
    + "</div>\n";
},"6":function(container,depth0,helpers,partials,data,blockParams) {
    return "                        <div class=\"tag interest-tag\">"
    + container.escapeExpression(container.lambda(blockParams[0][0], depth0))
    + "</div>\n";
},"8":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return "                        <ul>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = ((stack1 = blockParams[1][0]) != null ? stack1.attributes : stack1)) != null ? stack1.todoItems : stack1),{"name":"each","hash":{},"fn":container.program(9, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "                        </ul>\n";
},"9":function(container,depth0,helpers,partials,data) {
    return "                            <li>"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</li>\n";
},"11":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return "                        <ul>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = ((stack1 = blockParams[1][0]) != null ? stack1.attributes : stack1)) != null ? stack1.progressItems : stack1),{"name":"each","hash":{},"fn":container.program(9, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "                        </ul>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return "<div class=\"container\">\n    <div class=\"project-header\">Project List</div>\n\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.data : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 1, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "    <!--\n    <button class=\"changeList\">Change List</button>\n    //-->\n\n</div>";
},"useData":true,"useBlockParams":true});