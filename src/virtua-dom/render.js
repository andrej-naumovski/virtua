import { TEXT_ELEMENT } from '../constants';

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

let rootInstance = null;

function render(element, parentDom) {
  const prevInstance = rootInstance;
  const newInstance = reconciliate(parentDom, prevInstance, element);
  rootInstance = newInstance;
}

function reconciliate(parentDom, prevInstance, element) {
  const nextInstance = instantiate(element);
  if (prevInstance == null) {
    parentDom.appendChild(nextInstance.dom);
  } else {
    parentDom.replaceChild(nextInstance.dom, prevInstance.dom);
  }
  return nextInstance;
}

function instantiate(element) {
  const { type, props } = element;

  const dom = type === TEXT_ELEMENT ? document.createTextNode('') : document.createElement(type);

  addEventListenersToDomElement(dom, props);

  addAttributesToDomElement(dom, props);

  const children = props.children || [];

  const childInstances = children.map(instantiate);
  const childDoms = childInstances.map(childInstance => childInstance.dom);

  childDoms.forEach(childDom => dom.appendChild(childDom));

  return { dom, element, childInstances };
}

export default render;
