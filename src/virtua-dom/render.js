const TEXT_ELEMENT = 'TEXT_ELEMENT';

const isListener = propName => propName.startsWith('on');

const isAttribute = propName => !isListener(propName) && propName !== 'children';

function addEventListenersToDomElement(dom, props) {
  Object.keys(props).filter(isListener).forEach(listenerName => {
    const eventType = listener.toLowerCase().substring(2);
    dom.addEventListener(eventType, props[listenerName]);
  });
}

function addAttributesToDomElement(dom, props) {
  Object.keys(props).filter(isAttribute).forEach(attribute => {
    dom[attribute] = props[attribute];
  });
}

function render(node, parentDom) {
  const { type, props } = node;

  const dom = type === TEXT_ELEMENT ? document.createTextNode('') : document.createElement(type);

  addEventListenersToDomElement(dom, props);

  addAttributesToDomElement(dom, props);

  const children = props.children || [];

  children.forEach(child => render(child, dom));
  parentDom.appendChild(dom);
}

export default render;
