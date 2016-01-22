import jsdom from 'jsdom';
import TestUtils from 'react-addons-test-utils';

const
  renderShallow = (component) => {
    const renderer = TestUtils.createRenderer();

    renderer.render(component);

    return renderer.getRenderOutput();
  },

  setupFakeDOM = () => {
    global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
    global.window = document.defaultView;
    global.navigator = window.navigator;
  };

export { renderShallow, setupFakeDOM };
