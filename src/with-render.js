// @flow

import { HTMLElement, sym } from './util';

const _shadowRoot = sym();

const attachShadowOptions = { mode: 'open' };

function attachShadow (elem) {
  return elem.attachShadow ? elem.attachShadow(attachShadowOptions) : elem;
}

export const withRender = (Base?: Class<HTMLElement>): Class<HTMLElement> =>
  class extends (Base || HTMLElement) {
    propsUpdatedCallback (next: Object, prev: Object) {
      super.propsUpdatedCallback(next, prev);
      this[_shadowRoot] = this[_shadowRoot] || (this[_shadowRoot] = attachShadow(this));
      this.rendererCallback(this[_shadowRoot], () => this.renderCallback(this));
      this.renderedCallback();
    }

    // Called to render the component.
    renderCallback () {}

    // Called after the component has rendered.
    renderedCallback () {}
  };
