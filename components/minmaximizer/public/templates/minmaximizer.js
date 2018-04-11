define(['handlebars'], function(Handlebars) {

this["MinMaximizer"] = this["MinMaximizer"] || {};
this["MinMaximizer"]["templates"] = this["MinMaximizer"]["templates"] || {};

this["MinMaximizer"]["templates"]["modal"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<!-- Modal -->\n<div class=\"modal mymodal\" id=\"minmaximizer-modal\" role=\"dialog\">\n  <div class=\"modal-dialog\">\n  \n    <!-- Modal content-->\n    <div class=\"modal-content\">\n      <div class=\"modal-header\" style=\"padding:35px 50px;\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" id=\"minmaximizer-button-close\"> <i class='glyphicon glyphicon-remove'></i> </button>   \n        <button class=\"close modalMinimize\" id=\"minmaximizer-button-toggle\"> <i class='glyphicon glyphicon-minus'></i> </button> \n\n        <h4 class=\"modal-title\">A demo of modal with min/max options</h4>\n      </div>\n\n      <div class=\"modal-body\"  style=\"padding:40px 50px;\">\n        <p>The content of the modal appears here</p>\n      </div>\n\n      <div class=\"modal-footer\"  style=\"padding:40px 50px;\">\n        <p>Place the footer options like Ok, Cancel buttons here</p>\n      </div>\n\n    </div>      \n  </div>\n</div>\n";
},"useData":true});

return this["MinMaximizer"];

});