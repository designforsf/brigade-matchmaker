this["Selector"] = this["Selector"] || {};
this["Selector"]["templates"] = this["Selector"]["templates"] || {};

this["Selector"]["templates"]["selector"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var helper, alias1=container.lambda, alias2=container.escapeExpression;

  return "                <div tabName=\""
    + alias2(alias1((depths[1] != null ? depths[1].component_name : depths[1]), depth0))
    + "-"
    + alias2(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"key","hash":{},"data":data}) : helper)))
    + "\"\n                     class=\"tab-name\">"
    + alias2(alias1((depth0 != null ? depth0.title : depth0), depth0))
    + "</div>\n";
},"3":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {});

  return "            <div id=\""
    + alias2(alias1((depths[1] != null ? depths[1].component_name : depths[1]), depth0))
    + "-"
    + alias2(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias3,{"name":"key","hash":{},"data":data}) : helper)))
    + "\" class=\"tab-view tab-view-inactive\">\n                <div class=\"category\">\n                    <div class=\"category-title\">"
    + alias2(alias1((depth0 != null ? depth0.title : depth0), depth0))
    + "</div>\n                    <div class=\"tag-container\">\n"
    + ((stack1 = helpers.each.call(alias3,(depth0 != null ? depth0.items : depth0),{"name":"each","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                    </div>\n                </div>\n            </div>\n";
},"4":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "                            <div id=\""
    + alias2(alias1((depths[2] != null ? depths[2].component_name : depths[2]), depth0))
    + "-"
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "\"\n                                 class=\"tag\">"
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "</div>\n";
},"6":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "                <div class=\"category\">\n                    <div class=\"category-title\">"
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.title : depth0), depth0))
    + "</div>\n                    <div class=\"tag-container\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.items : depth0),{"name":"each","hash":{},"fn":container.program(7, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                    </div>\n                </div>\n";
},"7":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "                            <div id=\""
    + alias2(alias1((depths[1] != null ? depths[1].name : depths[1]), depth0))
    + "/"
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "\"\n                                 class=\"tag\">"
    + alias2(alias1((depth0 != null ? depth0.title : depth0), depth0))
    + "</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div id=\""
    + alias4(((helper = (helper = helpers.component_name || (depth0 != null ? depth0.component_name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"component_name","hash":{},"data":data}) : helper)))
    + "-btn\" class=\"selector-btn\">\n    <div class=\"selector-btn-header\">\n        <div class=\"name\">"
    + alias4(((helper = (helper = helpers["display-title"] || (depth0 != null ? depth0["display-title"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"display-title","hash":{},"data":data}) : helper)))
    + "</div>\n        <a data-toggle=\"modals\" class=\"add-btn\">Add Items</a>\n\n    </div>\n    <div class=\"selector-tag-container\"></div>\n</div>\n\n<!-- Modal content-->\n<div id=\""
    + alias4(((helper = (helper = helpers.component_name || (depth0 != null ? depth0.component_name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"component_name","hash":{},"data":data}) : helper)))
    + "_modals\" class=\"modals\">\n    <div class=\"selector-container\">\n        <div class=\"tabs\">\n            <div tabName=\""
    + alias4(((helper = (helper = helpers.component_name || (depth0 != null ? depth0.component_name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"component_name","hash":{},"data":data}) : helper)))
    + "-allCategories\" class=\"tab-name tab-name-active\">All\n                Categories</div>\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.itemsBySection : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </div>\n\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.itemsBySection : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n        <div id=\""
    + alias4(((helper = (helper = helpers.component_name || (depth0 != null ? depth0.component_name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"component_name","hash":{},"data":data}) : helper)))
    + "-allCategories\"\n             class=\"tab-view\n         tab-view-active\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.itemsBySection : depth0),{"name":"each","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </div>\n    </div>\n    <div class=\"footer\">\n        <div class=\"close-btn\">Close</div>\n    </div>\n</div>\n\n\n";
},"useData":true,"useDepths":true});