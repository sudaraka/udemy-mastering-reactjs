import TestUtils from 'react-addons-test-utils';

const
  renderShallow = (component) => {
    const renderer = TestUtils.createRenderer();

    renderer.render(component);

    return renderer.getRenderOutput();
  };

export { renderShallow };
