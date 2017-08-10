"use strict";



define('ember-client/adapters/application', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.JSONAPIAdapter.extend({
    namespace: 'api',
    host: 'http://localhost:5465'
  });
});
define('ember-client/app', ['exports', 'ember', 'ember-client/resolver', 'ember-load-initializers', 'ember-client/config/environment'], function (exports, _ember, _resolver, _emberLoadInitializers, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var App = void 0;

  _ember.default.MODEL_FACTORY_INJECTIONS = true;

  App = _ember.default.Application.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });

  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);

  exports.default = App;
});
define('ember-client/components/bs-accordion', ['exports', 'ember-bootstrap/components/bs-accordion'], function (exports, _bsAccordion) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsAccordion.default;
    }
  });
});
define('ember-client/components/bs-accordion/item', ['exports', 'ember-bootstrap/components/bs-accordion/item'], function (exports, _item) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _item.default;
    }
  });
});
define('ember-client/components/bs-accordion/item/body', ['exports', 'ember-bootstrap/components/bs-accordion/item/body'], function (exports, _body) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _body.default;
    }
  });
});
define('ember-client/components/bs-accordion/item/title', ['exports', 'ember-bootstrap/components/bs-accordion/item/title'], function (exports, _title) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _title.default;
    }
  });
});
define('ember-client/components/bs-alert', ['exports', 'ember-bootstrap/components/bs-alert'], function (exports, _bsAlert) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsAlert.default;
    }
  });
});
define('ember-client/components/bs-button-group', ['exports', 'ember-bootstrap/components/bs-button-group'], function (exports, _bsButtonGroup) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsButtonGroup.default;
    }
  });
});
define('ember-client/components/bs-button-group/button', ['exports', 'ember-bootstrap/components/bs-button-group/button'], function (exports, _button) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _button.default;
    }
  });
});
define('ember-client/components/bs-button', ['exports', 'ember-bootstrap/components/bs-button'], function (exports, _bsButton) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsButton.default;
    }
  });
});
define('ember-client/components/bs-collapse', ['exports', 'ember-bootstrap/components/bs-collapse'], function (exports, _bsCollapse) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsCollapse.default;
    }
  });
});
define('ember-client/components/bs-dropdown', ['exports', 'ember-bootstrap/components/bs-dropdown'], function (exports, _bsDropdown) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsDropdown.default;
    }
  });
});
define('ember-client/components/bs-dropdown/button', ['exports', 'ember-bootstrap/components/bs-dropdown/button'], function (exports, _button) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _button.default;
    }
  });
});
define('ember-client/components/bs-dropdown/menu', ['exports', 'ember-bootstrap/components/bs-dropdown/menu'], function (exports, _menu) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _menu.default;
    }
  });
});
define('ember-client/components/bs-dropdown/menu/divider', ['exports', 'ember-bootstrap/components/bs-dropdown/menu/divider'], function (exports, _divider) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _divider.default;
    }
  });
});
define('ember-client/components/bs-dropdown/menu/item', ['exports', 'ember-bootstrap/components/bs-dropdown/menu/item'], function (exports, _item) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _item.default;
    }
  });
});
define('ember-client/components/bs-dropdown/menu/link-to', ['exports', 'ember-bootstrap/components/bs-dropdown/menu/link-to'], function (exports, _linkTo) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _linkTo.default;
    }
  });
});
define('ember-client/components/bs-dropdown/toggle', ['exports', 'ember-bootstrap/components/bs-dropdown/toggle'], function (exports, _toggle) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _toggle.default;
    }
  });
});
define('ember-client/components/bs-form', ['exports', 'ember-bootstrap/components/bs-form'], function (exports, _bsForm) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsForm.default;
    }
  });
});
define('ember-client/components/bs-form/element', ['exports', 'ember-bootstrap/components/bs-form/element'], function (exports, _element) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _element.default;
    }
  });
});
define('ember-client/components/bs-form/element/control', ['exports', 'ember-bootstrap/components/bs-form/element/control'], function (exports, _control) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _control.default;
    }
  });
});
define('ember-client/components/bs-form/element/control/checkbox', ['exports', 'ember-bootstrap/components/bs-form/element/control/checkbox'], function (exports, _checkbox) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _checkbox.default;
    }
  });
});
define('ember-client/components/bs-form/element/control/input', ['exports', 'ember-bootstrap/components/bs-form/element/control/input'], function (exports, _input) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _input.default;
    }
  });
});
define('ember-client/components/bs-form/element/control/textarea', ['exports', 'ember-bootstrap/components/bs-form/element/control/textarea'], function (exports, _textarea) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _textarea.default;
    }
  });
});
define('ember-client/components/bs-form/element/errors', ['exports', 'ember-bootstrap/components/bs-form/element/errors'], function (exports, _errors) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _errors.default;
    }
  });
});
define('ember-client/components/bs-form/element/feedback-icon', ['exports', 'ember-bootstrap/components/bs-form/element/feedback-icon'], function (exports, _feedbackIcon) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _feedbackIcon.default;
    }
  });
});
define('ember-client/components/bs-form/element/help-text', ['exports', 'ember-bootstrap/components/bs-form/element/help-text'], function (exports, _helpText) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _helpText.default;
    }
  });
});
define('ember-client/components/bs-form/element/label', ['exports', 'ember-bootstrap/components/bs-form/element/label'], function (exports, _label) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _label.default;
    }
  });
});
define('ember-client/components/bs-form/element/layout/horizontal', ['exports', 'ember-bootstrap/components/bs-form/element/layout/horizontal'], function (exports, _horizontal) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _horizontal.default;
    }
  });
});
define('ember-client/components/bs-form/element/layout/horizontal/checkbox', ['exports', 'ember-bootstrap/components/bs-form/element/layout/horizontal/checkbox'], function (exports, _checkbox) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _checkbox.default;
    }
  });
});
define('ember-client/components/bs-form/element/layout/inline', ['exports', 'ember-bootstrap/components/bs-form/element/layout/inline'], function (exports, _inline) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _inline.default;
    }
  });
});
define('ember-client/components/bs-form/element/layout/inline/checkbox', ['exports', 'ember-bootstrap/components/bs-form/element/layout/inline/checkbox'], function (exports, _checkbox) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _checkbox.default;
    }
  });
});
define('ember-client/components/bs-form/element/layout/vertical', ['exports', 'ember-bootstrap/components/bs-form/element/layout/vertical'], function (exports, _vertical) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _vertical.default;
    }
  });
});
define('ember-client/components/bs-form/element/layout/vertical/checkbox', ['exports', 'ember-bootstrap/components/bs-form/element/layout/vertical/checkbox'], function (exports, _checkbox) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _checkbox.default;
    }
  });
});
define('ember-client/components/bs-form/group', ['exports', 'ember-bootstrap/components/bs-form/group'], function (exports, _group) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _group.default;
    }
  });
});
define('ember-client/components/bs-modal-simple', ['exports', 'ember-bootstrap/components/bs-modal-simple'], function (exports, _bsModalSimple) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsModalSimple.default;
    }
  });
});
define('ember-client/components/bs-modal', ['exports', 'ember-bootstrap/components/bs-modal'], function (exports, _bsModal) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsModal.default;
    }
  });
});
define('ember-client/components/bs-modal/body', ['exports', 'ember-bootstrap/components/bs-modal/body'], function (exports, _body) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _body.default;
    }
  });
});
define('ember-client/components/bs-modal/dialog', ['exports', 'ember-bootstrap/components/bs-modal/dialog'], function (exports, _dialog) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _dialog.default;
    }
  });
});
define('ember-client/components/bs-modal/footer', ['exports', 'ember-bootstrap/components/bs-modal/footer'], function (exports, _footer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _footer.default;
    }
  });
});
define('ember-client/components/bs-modal/header', ['exports', 'ember-bootstrap/components/bs-modal/header'], function (exports, _header) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _header.default;
    }
  });
});
define('ember-client/components/bs-modal/header/close', ['exports', 'ember-bootstrap/components/bs-modal/header/close'], function (exports, _close) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _close.default;
    }
  });
});
define('ember-client/components/bs-modal/header/title', ['exports', 'ember-bootstrap/components/bs-modal/header/title'], function (exports, _title) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _title.default;
    }
  });
});
define('ember-client/components/bs-nav', ['exports', 'ember-bootstrap/components/bs-nav'], function (exports, _bsNav) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsNav.default;
    }
  });
});
define('ember-client/components/bs-nav/item', ['exports', 'ember-bootstrap/components/bs-nav/item'], function (exports, _item) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _item.default;
    }
  });
});
define('ember-client/components/bs-nav/link-to', ['exports', 'ember-bootstrap/components/bs-nav/link-to'], function (exports, _linkTo) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _linkTo.default;
    }
  });
});
define('ember-client/components/bs-navbar', ['exports', 'ember-bootstrap/components/bs-navbar'], function (exports, _bsNavbar) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsNavbar.default;
    }
  });
});
define('ember-client/components/bs-navbar/content', ['exports', 'ember-bootstrap/components/bs-navbar/content'], function (exports, _content) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _content.default;
    }
  });
});
define('ember-client/components/bs-navbar/link-to', ['exports', 'ember-bootstrap/components/bs-navbar/link-to'], function (exports, _linkTo) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _linkTo.default;
    }
  });
});
define('ember-client/components/bs-navbar/nav', ['exports', 'ember-bootstrap/components/bs-navbar/nav'], function (exports, _nav) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _nav.default;
    }
  });
});
define('ember-client/components/bs-navbar/toggle', ['exports', 'ember-bootstrap/components/bs-navbar/toggle'], function (exports, _toggle) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _toggle.default;
    }
  });
});
define('ember-client/components/bs-popover', ['exports', 'ember-bootstrap/components/bs-popover'], function (exports, _bsPopover) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsPopover.default;
    }
  });
});
define('ember-client/components/bs-popover/element', ['exports', 'ember-bootstrap/components/bs-popover/element'], function (exports, _element) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _element.default;
    }
  });
});
define('ember-client/components/bs-progress', ['exports', 'ember-bootstrap/components/bs-progress'], function (exports, _bsProgress) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsProgress.default;
    }
  });
});
define('ember-client/components/bs-progress/bar', ['exports', 'ember-bootstrap/components/bs-progress/bar'], function (exports, _bar) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bar.default;
    }
  });
});
define('ember-client/components/bs-tab', ['exports', 'ember-bootstrap/components/bs-tab'], function (exports, _bsTab) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsTab.default;
    }
  });
});
define('ember-client/components/bs-tab/pane', ['exports', 'ember-bootstrap/components/bs-tab/pane'], function (exports, _pane) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _pane.default;
    }
  });
});
define('ember-client/components/bs-tooltip', ['exports', 'ember-bootstrap/components/bs-tooltip'], function (exports, _bsTooltip) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsTooltip.default;
    }
  });
});
define('ember-client/components/bs-tooltip/element', ['exports', 'ember-bootstrap/components/bs-tooltip/element'], function (exports, _element) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _element.default;
    }
  });
});
define('ember-client/components/ember-wormhole', ['exports', 'ember-wormhole/components/ember-wormhole'], function (exports, _emberWormhole) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _emberWormhole.default;
    }
  });
});
define('ember-client/components/project-edit', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _ember.default.Component.extend({
    store: _ember.default.inject.service(),

    init: function init() {
      this._super.apply(this, arguments);
      this.errors = [];
      _ember.default.Logger.log('init project-edit');
    },


    actions: {

      queryParams: ['updated'],
      updated: false,

      saveProject: function saveProject() {
        //alert(this.get("project.name"));
        //alert(this.get("project.id"));
        var ember = this;
        ember.get('store').findRecord('project', ember.get('project.id')).then(function (project) {

          // project fields
          project.set('name', ember.get('project.name'));

          // matching descr fragment
          //alert('set fragment ' + ember.get('project.matching-descr.summary'));
          project.set('matching-descr', {
            summary: ember.get('project.matching-descr.summary')
          });

          project.save().then(function () {

            /*
            Ember.getOwner(ember).lookup('router:main').transitionTo(
              'projects.edit',
              {queryParams: {update: true}}
            );
            */

            _ember.default.getOwner(ember).lookup('router:main').transitionTo('/projects/' + project.id + '?update=true');
          });
        });
      }
    }
  });
});
define('ember-client/components/welcome-page', ['exports', 'ember-welcome-page/components/welcome-page'], function (exports, _welcomePage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _welcomePage.default;
    }
  });
});
define('ember-client/helpers/app-version', ['exports', 'ember', 'ember-client/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _ember, _environment, _regexp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.appVersion = appVersion;
  var version = _environment.default.APP.version;
  function appVersion(_) {
    var hash = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (hash.hideSha) {
      return version.match(_regexp.versionRegExp)[0];
    }

    if (hash.hideVersion) {
      return version.match(_regexp.shaRegExp)[0];
    }

    return version;
  }

  exports.default = _ember.default.Helper.helper(appVersion);
});
define('ember-client/helpers/bs-contains', ['exports', 'ember-bootstrap/helpers/bs-contains'], function (exports, _bsContains) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsContains.default;
    }
  });
  Object.defineProperty(exports, 'bsContains', {
    enumerable: true,
    get: function () {
      return _bsContains.bsContains;
    }
  });
});
define('ember-client/helpers/bs-eq', ['exports', 'ember-bootstrap/helpers/bs-eq'], function (exports, _bsEq) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsEq.default;
    }
  });
  Object.defineProperty(exports, 'eq', {
    enumerable: true,
    get: function () {
      return _bsEq.eq;
    }
  });
});
define('ember-client/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _pluralize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _pluralize.default;
});
define('ember-client/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _singularize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _singularize.default;
});
define('ember-client/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'ember-client/config/environment'], function (exports, _initializerFactory, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _config$APP = _environment.default.APP,
      name = _config$APP.name,
      version = _config$APP.version;
  exports.default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
});
define('ember-client/initializers/container-debug-adapter', ['exports', 'ember-resolver/resolvers/classic/container-debug-adapter'], function (exports, _containerDebugAdapter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('ember-client/initializers/data-adapter', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'data-adapter',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('ember-client/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data'], function (exports, _setupContainer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-data',
    initialize: _setupContainer.default
  };
});
define('ember-client/initializers/export-application-global', ['exports', 'ember', 'ember-client/config/environment'], function (exports, _ember, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember.default.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports.default = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('ember-client/initializers/injectStore', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'injectStore',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('ember-client/initializers/load-bootstrap-config', ['exports', 'ember-client/config/environment', 'ember-bootstrap/config'], function (exports, _environment, _config) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() /* container, application */{
    _config.default.load(_environment.default['ember-bootstrap'] || {});
  }

  exports.default = {
    name: 'load-bootstrap-config',
    initialize: initialize
  };
});
define('ember-client/initializers/model-fragments', ['exports', 'ember-data-model-fragments/transforms/fragment', 'ember-data-model-fragments/transforms/fragment-array', 'ember-data-model-fragments/transforms/array', 'ember-data-model-fragments'], function (exports, _fragment, _fragmentArray, _array) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'fragmentTransform',
    before: 'ember-data',

    initialize: function initialize(application) {
      application.register('transform:fragment', _fragment.default);
      application.register('transform:fragment-array', _fragmentArray.default);
      application.register('transform:array', _array.default);
    }
  };
});
define('ember-client/initializers/store', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'store',
    after: 'ember-data',
    initialize: function initialize() {}
  };
});
define('ember-client/initializers/transforms', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'transforms',
    before: 'store',
    initialize: function initialize() {}
  };
});
define("ember-client/instance-initializers/ember-data", ["exports", "ember-data/instance-initializers/initialize-store-service"], function (exports, _initializeStoreService) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: "ember-data",
    initialize: _initializeStoreService.default
  };
});
define('ember-client/models/project-matching-descr', ['exports', 'ember-data', 'ember-data-model-fragments'], function (exports, _emberData, _emberDataModelFragments) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberDataModelFragments.default.Fragment.extend({
    thumbnailUrl: _emberData.default.attr('string'),
    summary: _emberData.default.attr('string'),
    contactName: _emberData.default.attr('string'),
    contactEmail: _emberData.default.attr('string'),
    contactRole: _emberData.default.attr('string'),
    contactThumbnailUrl: _emberData.default.attr('string'),
    tasks: _emberData.default.attr('array'),
    progress: _emberData.default.attr('array'),
    repository: _emberData.default.attr('string'),
    link: _emberData.default.attr('string')
  });
});
define('ember-client/models/project', ['exports', 'ember-data', 'ember-data-model-fragments/attributes'], function (exports, _emberData, _attributes) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    name: _emberData.default.attr('string'),
    description: _emberData.default.attr('string'),
    'matching-descr': (0, _attributes.fragment)('project-matching-descr', {
      //defaultValue: {summary: 'x'} 
    })

  });
});
define('ember-client/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberResolver.default;
});
define('ember-client/router', ['exports', 'ember', 'ember-client/config/environment'], function (exports, _ember, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var Router = _ember.default.Router.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  });

  Router.map(function () {
    this.route('projects', function () {
      this.route('new');
      this.route('list');
      this.route('edit', { path: '/:id' });
    });
  });

  exports.default = Router;
});
define('ember-client/routes/index', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _ember.default.Route.extend({
    beforeModel: function beforeModel() {
      this.replaceWith('/projects/list');
    }
  });
});
define('ember-client/routes/projects', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _ember.default.Route.extend({
    model: function model(args) {
      var projects = this.get('store').findAll('project');
      return projects;
    }
  });
});
define('ember-client/routes/projects/edit', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _ember.default.Route.extend({
    model: function model(args) {
      var project = this.get('store').findRecord('project', args.id);
      //Ember.Logger.log(project.name);
      return project;
    }
  });
});
define('ember-client/routes/projects/list', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _ember.default.Route.extend({
    model: function model(args) {
      var projects = this.get('store').findAll('project');
      return projects;
    }
  });
});
define('ember-client/routes/projects/new', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _ember.default.Route.extend({
    model: function model() {
      this.store.createRecord('project');
    }
  });
});
define('ember-client/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _ajax) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ajax.default;
    }
  });
});
define("ember-client/templates/application", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "wWW/FZ8Y", "block": "{\"statements\":[[0,\"\\n\"],[11,\"nav\",[]],[15,\"class\",\"navbar navbar-default\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"container-fluid\"],[13],[0,\"\\n    \"],[4,\" Brand and toggle get grouped for better mobile display \"],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"navbar-header\"],[13],[0,\"\\n      \"],[11,\"button\",[]],[15,\"type\",\"button\"],[15,\"class\",\"navbar-toggle collapsed\"],[15,\"data-toggle\",\"collapse\"],[15,\"data-target\",\"#bs-example-navbar-collapse-1\"],[15,\"aria-expanded\",\"false\"],[13],[0,\"\\n        \"],[11,\"span\",[]],[15,\"class\",\"sr-only\"],[13],[0,\"Toggle navigation\"],[14],[0,\"\\n        \"],[11,\"span\",[]],[15,\"class\",\"icon-bar\"],[13],[14],[0,\"\\n        \"],[11,\"span\",[]],[15,\"class\",\"icon-bar\"],[13],[14],[0,\"\\n        \"],[11,\"span\",[]],[15,\"class\",\"icon-bar\"],[13],[14],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"a\",[]],[15,\"class\",\"navbar-brand\"],[15,\"href\",\"#\"],[13],[0,\"Project Match\"],[14],[0,\"\\n    \"],[14],[0,\"\\n\\n    \"],[4,\" Collect the nav links, forms, and other content for toggling \"],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"collapse navbar-collapse\"],[15,\"id\",\"bs-example-navbar-collapse-1\"],[13],[0,\"\\n      \"],[11,\"ul\",[]],[15,\"class\",\"nav navbar-nav\"],[13],[0,\"\\n        \"],[11,\"li\",[]],[15,\"class\",\"active\"],[13],[0,\"\\n          \"],[11,\"a\",[]],[15,\"href\",\"#\"],[13],[0,\"Link \"],[11,\"span\",[]],[15,\"class\",\"sr-only\"],[13],[0,\"(current)\"],[14],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"li\",[]],[13],[0,\"\\n          \"],[6,[\"link-to\"],[\"projects.list\"],null,{\"statements\":[[0,\"Projects\"]],\"locals\":[]},null],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n      \\n      \"],[11,\"ul\",[]],[15,\"class\",\"nav navbar-nav navbar-right\"],[13],[0,\"\\n        \"],[11,\"li\",[]],[13],[11,\"a\",[]],[15,\"href\",\"#\"],[13],[0,\"Log In\"],[14],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[4,\" /.navbar-collapse \"],[0,\"\\n  \"],[14],[4,\" /.container-fluid \"],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[1,[26,[\"outlet\"]],false],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "ember-client/templates/application.hbs" } });
});
define("ember-client/templates/components/project-edit", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "hh/5Vge8", "block": "{\"statements\":[[18,\"default\"],[0,\"\\n\"],[1,[26,[\"outlet\"]],false],[0,\"\\n  \\n\"],[11,\"div\",[]],[15,\"class\",\"row\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"col-md-3\"],[13],[0,\"\\n  \\n    \"],[11,\"a\",[]],[15,\"href\",\"/projects/list\"],[13],[0,\"\\n      \"],[11,\"button\",[]],[15,\"type\",\"button\"],[15,\"class\",\"btn btn-default btn-default pull-right\"],[13],[0,\"\\n          \"],[11,\"span\",[]],[15,\"class\",\"glyphicon glyphicon-arrow-left\"],[15,\"aria-hidden\",\"true\"],[13],[14],[0,\" Back to Product List\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n          \\n  \"],[14],[0,\"\\n  \\n  \"],[11,\"div\",[]],[15,\"class\",\"col-md-6\"],[15,\"style\",\"text-align:center;\"],[13],[0,\"\\n    \\n\"],[6,[\"if\"],[[28,[\"project\"]]],null,{\"statements\":[[0,\"    \"],[11,\"h3\",[]],[13],[0,\"Edit Project\"],[14],[0,\"ID \"],[1,[28,[\"project\",\"id\"]],false],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"    \"],[11,\"h3\",[]],[13],[0,\"Create A New Project\"],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"    \\n  \"],[14],[0,\"\\n  \\n  \"],[11,\"div\",[]],[15,\"class\",\"col-md-3\"],[13],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[11,\"div\",[]],[15,\"class\",\"row\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"col-md-2\"],[13],[14],[0,\"\\n  \\n  \"],[11,\"div\",[]],[15,\"class\",\"col-md-8\"],[13],[0,\"\\n    \\n    \"],[11,\"div\",[]],[15,\"class\",\"panel panel-default\"],[15,\"style\",\"background-color:#eee;\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"panel-body\"],[13],[0,\"\\n        \\n        \"],[11,\"form\",[]],[15,\"class\",\"form-horizontal\"],[5,[\"action\"],[[28,[null]],\"saveProject\"],[[\"on\"],[\"submit\"]]],[13],[0,\"\\n        \"],[1,[33,[\"input\"],null,[[\"type\",\"value\"],[\"hidden\",[28,[\"project\",\"id\"]]]]],false],[0,\"\\n        \\n\"],[6,[\"if\"],[[28,[\"params\",\"updated\"]]],null,{\"statements\":[[0,\"          \"],[11,\"div\",[]],[15,\"class\",\"alert alert-success alert-dismissible\"],[15,\"role\",\"alert\"],[13],[0,\"\\n            \"],[11,\"button\",[]],[15,\"type\",\"button\"],[15,\"class\",\"close\"],[15,\"data-dismiss\",\"alert\"],[15,\"aria-label\",\"Close\"],[13],[11,\"span\",[]],[15,\"aria-hidden\",\"true\"],[13],[0,\"×\"],[14],[14],[0,\"\\n            \"],[11,\"strong\",[]],[13],[0,\"Record Updated\"],[14],[0,\"\\n          \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"    \\n          \"],[11,\"div\",[]],[15,\"class\",\"form-group\"],[13],[0,\"\\n            \"],[11,\"label\",[]],[15,\"for\",\"contactName\"],[15,\"class\",\"col-md-3 control-label\"],[13],[0,\"Project Name\"],[14],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"col-md-9\"],[13],[0,\"\\n              \"],[1,[33,[\"input\"],null,[[\"type\",\"value\",\"class\"],[\"text\",[28,[\"project\",\"name\"]],\"form-control\"]]],false],[0,\"\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n          \\n          \"],[11,\"div\",[]],[15,\"class\",\"form-group\"],[13],[0,\"\\n            \"],[11,\"label\",[]],[15,\"for\",\"summary\"],[15,\"class\",\"col-md-3 control-label\"],[13],[0,\"Summary\"],[14],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"col-md-9\"],[13],[0,\"\\n              \"],[1,[33,[\"textarea\"],null,[[\"value\",\"rows\",\"class\"],[[28,[\"project\",\"matching-descr\",\"summary\"]],3,\"form-control\"]]],false],[0,\"\\n              \"],[11,\"span\",[]],[15,\"id\",\"helpBlock\"],[15,\"class\",\"help-block\"],[13],[0,\"Short, descriptive sentence.\"],[14],[0,\"\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n          \\n          \"],[11,\"div\",[]],[15,\"class\",\"form-group\"],[13],[0,\"\\n            \"],[11,\"label\",[]],[15,\"for\",\"contactName\"],[15,\"class\",\"col-md-3 control-label\"],[13],[0,\"Contact Name\"],[14],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"col-md-9\"],[13],[0,\"\\n              \"],[1,[33,[\"input\"],null,[[\"type\",\"value\",\"class\"],[\"text\",[28,[\"project\",\"matching-descr\",\"contactName\"]],\"form-control\"]]],false],[0,\"\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n          \\n          \"],[11,\"div\",[]],[15,\"class\",\"form-group\"],[13],[0,\"\\n            \"],[11,\"label\",[]],[15,\"for\",\"contactEmail\"],[15,\"class\",\"col-md-3 control-label\"],[13],[0,\"Contact Email\"],[14],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"col-md-9\"],[13],[0,\"\\n              \"],[1,[33,[\"input\"],null,[[\"type\",\"value\",\"class\"],[\"text\",[28,[\"project\",\"matching-descr\",\"contactEmail\"]],\"form-control\"]]],false],[0,\"\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n          \\n          \"],[11,\"div\",[]],[15,\"class\",\"form-group\"],[13],[0,\"\\n            \"],[11,\"label\",[]],[15,\"for\",\"contactRole\"],[15,\"class\",\"col-md-3 control-label\"],[13],[0,\"Contact Role\"],[14],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"col-md-9\"],[13],[0,\"\\n              \"],[1,[33,[\"input\"],null,[[\"type\",\"value\",\"class\"],[\"text\",[28,[\"project\",\"matching-descr\",\"contactRole\"]],\"form-control\"]]],false],[0,\"\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n          \\n          \"],[11,\"div\",[]],[15,\"class\",\"form-group\"],[13],[0,\"\\n            \"],[11,\"label\",[]],[15,\"for\",\"contactThumbnailUrl\"],[15,\"class\",\"col-md-3 control-label\"],[13],[0,\"Contact Image\"],[14],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"col-md-9\"],[13],[0,\"\\n              \"],[1,[33,[\"input\"],null,[[\"type\",\"value\",\"class\"],[\"text\",[28,[\"project\",\"matching-descr\",\"contactThumbnailUrl\"]],\"form-control\"]]],false],[0,\"\\n              \\n\"],[6,[\"if\"],[[28,[\"project\",\"matching-descr\",\"contactThumbnailUrl\"]]],null,{\"statements\":[[0,\"\\n                \"],[11,\"figure\",[]],[15,\"style\",\"padding-top:10px;\"],[13],[0,\"\\n                  \"],[11,\"div\",[]],[15,\"style\",\"height:100px; width:100px; overflow:hidden;\"],[13],[0,\"\\n                    \"],[11,\"img\",[]],[15,\"class\",\"img-responsive\"],[16,\"src\",[34,[[28,[\"project\",\"matching-descr\",\"contactThumbnailUrl\"]]]]],[13],[14],[0,\"\\n                  \"],[14],[0,\"\\n                \"],[14],[0,\"\\n\\n\"]],\"locals\":[]},{\"statements\":[[0,\"                \"],[11,\"span\",[]],[15,\"id\",\"helpBlock\"],[15,\"class\",\"help-block\"],[13],[0,\"\\n                  URL, e.g. a GitHub profile image.\\n                \"],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"              \\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n          \\n          \"],[11,\"div\",[]],[15,\"class\",\"form-group\"],[13],[0,\"\\n            \"],[11,\"label\",[]],[15,\"for\",\"repository\"],[15,\"class\",\"col-md-3 control-label\"],[13],[0,\"Repository\"],[14],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"col-md-9\"],[13],[0,\"\\n              \"],[1,[33,[\"input\"],null,[[\"type\",\"value\",\"class\"],[\"text\",[28,[\"project\",\"matching-descr\",\"repository\"]],\"form-control\"]]],false],[0,\"\\n              \"],[11,\"span\",[]],[15,\"id\",\"helpBlock\"],[15,\"class\",\"help-block\"],[13],[0,\"\\n                URL, e.g. a GitHub repo page.\\n              \"],[14],[0,\"\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n          \\n          \"],[11,\"div\",[]],[15,\"class\",\"form-group\"],[13],[0,\"\\n            \"],[11,\"label\",[]],[15,\"for\",\"link\"],[15,\"class\",\"col-md-3 control-label\"],[13],[0,\"Website\"],[14],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"col-md-9\"],[13],[0,\"\\n              \"],[1,[33,[\"input\"],null,[[\"type\",\"value\",\"class\"],[\"text\",[28,[\"project\",\"matching-descr\",\"link\"]],\"form-control\"]]],false],[0,\"\\n              \"],[11,\"span\",[]],[15,\"id\",\"helpBlock\"],[15,\"class\",\"help-block\"],[13],[0,\"\\n                Project URL or documentation page.\\n              \"],[14],[0,\"\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n          \\n          \"],[11,\"div\",[]],[15,\"class\",\"form-group\"],[13],[0,\"\\n            \"],[11,\"label\",[]],[15,\"for\",\"tasks\"],[15,\"class\",\"col-md-3 control-label\"],[13],[0,\"Tasks\"],[14],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"col-md-9\"],[13],[0,\"\\n              \"],[1,[33,[\"textarea\"],null,[[\"value\",\"rows\",\"class\"],[[28,[\"project\",\"matching-descr\",\"tasks\"]],4,\"form-control\"]]],false],[0,\"\\n              \"],[11,\"span\",[]],[15,\"id\",\"helpBlock\"],[15,\"class\",\"help-block\"],[13],[0,\"\\n                Comma-delimited list. Describe what you're working on to a new member.\\n              \"],[14],[0,\"\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n          \\n          \"],[11,\"div\",[]],[15,\"class\",\"form-group\"],[13],[0,\"\\n            \"],[11,\"label\",[]],[15,\"for\",\"progress\"],[15,\"class\",\"col-md-3 control-label\"],[13],[0,\"Progress\"],[14],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"col-md-9\"],[13],[0,\"\\n              \"],[1,[33,[\"textarea\"],null,[[\"value\",\"rows\",\"class\"],[[28,[\"project\",\"matching-descr\",\"progress\"]],4,\"form-control\"]]],false],[0,\"\\n              \"],[11,\"span\",[]],[15,\"id\",\"helpBlock\"],[15,\"class\",\"help-block\"],[13],[0,\"\\n                Comma-delimited list. Describe what you've recently complete to a new member.\\n              \"],[14],[0,\"\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n          \\n          \"],[11,\"div\",[]],[15,\"class\",\"row\"],[15,\"style\",\"padding:10px;\"],[13],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"col-md-9\"],[13],[0,\"\\n              \\n            \"],[14],[0,\"\\n            \\n            \"],[11,\"div\",[]],[15,\"class\",\"col-md-3\"],[13],[0,\"\\n            \\n\"],[6,[\"if\"],[[28,[\"project\"]]],null,{\"statements\":[[0,\"              \"],[11,\"button\",[]],[15,\"type\",\"submit\"],[15,\"class\",\"btn btn-default pull-right\"],[13],[0,\"Update\"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"              \"],[11,\"button\",[]],[15,\"type\",\"submit\"],[15,\"class\",\"btn btn-default pull-right\"],[13],[0,\"Create\"],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"            \\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n        \\n        \"],[14],[0,\"\\n        \\n      \"],[14],[0,\"\\n      \\n    \"],[14],[0,\"\\n  \\n  \"],[14],[0,\"\\n  \\n  \"],[11,\"div\",[]],[15,\"class\",\"col-md-2\"],[13],[14],[0,\"\\n  \\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"hasPartials\":false}", "meta": { "moduleName": "ember-client/templates/components/project-edit.hbs" } });
});
define("ember-client/templates/index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "gvAu3HEk", "block": "{\"statements\":[[1,[26,[\"header-nav\"]],false],[0,\"\\n\\n\"],[1,[26,[\"outlet\"]],false],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "ember-client/templates/index.hbs" } });
});
define("ember-client/templates/projects", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "rroi+AXn", "block": "{\"statements\":[[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"container-fluid\"],[13],[0,\"\\n  \\n  \"],[11,\"div\",[]],[15,\"class\",\"row\"],[13],[0,\"\\n    \\n    \"],[11,\"div\",[]],[15,\"class\",\"col-md-1\"],[13],[14],[0,\"\\n    \\n    \"],[11,\"div\",[]],[15,\"class\",\"col-md-6\"],[13],[0,\"\\n      \"],[11,\"h2\",[]],[13],[0,\"Projects\"],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"col-md-4\"],[15,\"style\",\"text-align:right;\"],[13],[0,\"\\n      \"],[6,[\"link-to\"],[\"projects.new\"],null,{\"statements\":[[0,\"New Project\"]],\"locals\":[]},null],[0,\"\\n        \\n      \"],[6,[\"link-to\"],[\"projects.list\"],null,{\"statements\":[[0,\"List Projects\"]],\"locals\":[]},null],[0,\"\\n    \"],[14],[0,\"\\n    \\n    \"],[11,\"div\",[]],[15,\"class\",\"col-md-1\"],[13],[14],[0,\"\\n      \\n  \"],[14],[0,\"\\n  \\n  \"],[1,[26,[\"outlet\"]],false],[0,\"\\n\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "ember-client/templates/projects.hbs" } });
});
define("ember-client/templates/projects/edit", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "qmzB6Uch", "block": "{\"statements\":[[1,[26,[\"outlet\"]],false],[0,\"\\n\"],[6,[\"project-edit\"],null,[[\"project\"],[[28,[\"model\"]]]],{\"statements\":[],\"locals\":[]},null],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "ember-client/templates/projects/edit.hbs" } });
});
define("ember-client/templates/projects/list", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "cvWu8yEZ", "block": "{\"statements\":[[1,[26,[\"outlet\"]],false],[0,\"\\n\\n\"],[6,[\"each\"],[[28,[\"model\"]]],null,{\"statements\":[[0,\"  \"],[11,\"hr\",[]],[13],[14],[0,\"\\n\\n  \"],[11,\"div\",[]],[15,\"class\",\"row\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"col-md-1\"],[13],[14],[0,\"\\n    \\n    \"],[11,\"div\",[]],[15,\"class\",\"col-md-4\"],[15,\"style\",\"display: inline-block; vertical-align:top;\"],[13],[0,\"\\n      \"],[11,\"strong\",[]],[13],[1,[28,[\"project\",\"name\"]],false],[14],[0,\"\\n      \"],[11,\"br\",[]],[13],[14],[0,\"ID: \"],[1,[28,[\"project\",\"id\"]],false],[0,\"\\n    \"],[14],[0,\"\\n    \\n    \"],[11,\"div\",[]],[15,\"class\",\"col-md-4\"],[15,\"style\",\"display: inline-block; vertical-align:top;\"],[13],[0,\"\\n      \"],[1,[28,[\"project\",\"description\"]],false],[0,\"\\n    \"],[14],[0,\"\\n    \\n    \"],[11,\"div\",[]],[15,\"class\",\"col-md-2 pull-right\"],[15,\"style\",\"display: inline-block; vertical-align:top;\"],[13],[0,\"\\n      \"],[6,[\"link-to\"],[\"projects.edit\",[28,[\"project\",\"id\"]]],null,{\"statements\":[[0,\"Edit Project\"]],\"locals\":[]},null],[0,\"\\n    \"],[14],[0,\"\\n    \\n    \"],[11,\"div\",[]],[15,\"class\",\"col-md-1\"],[13],[14],[0,\"\\n    \\n  \"],[14],[0,\"\\n  \\n\"]],\"locals\":[\"project\"]},null]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "ember-client/templates/projects/list.hbs" } });
});
define("ember-client/templates/projects/new", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "hw7b6qrM", "block": "{\"statements\":[[1,[26,[\"outlet\"]],false],[0,\"\\n\"],[6,[\"project-edit\"],null,null,{\"statements\":[],\"locals\":[]},null],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "ember-client/templates/projects/new.hbs" } });
});
define('ember-client/transforms/array', ['exports', 'ember-data-model-fragments/transforms/array'], function (exports, _array) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _array.default;
});
define('ember-client/transforms/fragment-array', ['exports', 'ember-data-model-fragments/transforms/fragment-array'], function (exports, _fragmentArray) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _fragmentArray.default;
});
define('ember-client/transforms/fragment', ['exports', 'ember-data-model-fragments/transforms/fragment'], function (exports, _fragment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _fragment.default;
});


define('ember-client/config/environment', ['ember'], function(Ember) {
  var prefix = 'ember-client';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

if (!runningTests) {
  require("ember-client/app")["default"].create({"name":"ember-client","version":"0.0.0+67e8e953"});
}
//# sourceMappingURL=ember-client-6672c1b7561daf4dbb50aec6dbf61699.map
