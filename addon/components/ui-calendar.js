import Ember from 'ember';
import Base from 'semantic-ui-ember/mixins/base';
import layout from '../templates/components/ui-calendar';

const { Component, computed, isEmpty } = Ember;

/**
 * @class UiCalendar
 * @extends Ember.Component
 * @namespace Semantic
 * @see https://github.com/mdehoog/Semantic-UI-Calendar
 */
export default Component.extend(Base, {
  layout,

  module: 'calendar',
  classNames: ['ui', 'calendar'],

  /**
   * Name of an icon to display in the input. You can pass `false` to not show an icon.
   *
   * @property icon
   * @type String|Boolean
   * @default 'calendar'
   * @public
   * @see http://semantic-ui.com/elements/icon.html
   */
  icon: 'calendar',

  /**
   * Placeholder for the input.
   *
   * @property placeholder
   * @type String
   * @default ''
   * @public
   */
  placeholder: '',

  /**
   * If the user can clear the value using a clear button inside the input.
   *
   * @property allowClear
   * @type Boolean
   * @default false
   * @public
   */
  allowClear: false,

  /**
   * Name of the icon to use as a button the clear the input value.
   *
   * @property clearIcon
   * @type String
   * @default 'clear'
   * @public
   */
  clearIcon: 'remove',

  /**
   * @property showClearButton
   * @type Boolean
   * @private
   */
  showClearButton: computed('date', 'allowClear', function() {
    let { date, allowClear } = this.getProperties('date', 'allowClear');
    let showClearButton = (allowClear && !isEmpty(date));
    return showClearButton;
  }),

  /**
   * Class names used in .ui.input element to configure icon visibility.
   *
   * @property inputIconsClassNames
   * @type String
   * @private
   */
  inputIconsClassNames: computed('icon', 'showClearButton', function() {
    let { icon, showClearButton } = this.getProperties('icon', 'showClearButton');
    let hasLeftIcon = !isEmpty(icon) && icon !== false;
    let classNames = [];

    if (hasLeftIcon) {
      classNames.push('left');
    }

    if (showClearButton) {
      classNames.push('right');
    }

    if (hasLeftIcon || showClearButton) {
      classNames.push('icon');
    }

    return classNames.join(' ');
  }),

  getSemanticIgnorableAttrs() {
    return ['icon', 'placeholder'];
  },

  didInitSemantic() {
    this._super(...arguments);

    let date = this.get('date');
    if (date) {
      this.$().calendar('set date', date);
    }
  }
});