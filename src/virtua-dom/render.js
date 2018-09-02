import { TEXT_ELEMENT } from '../constants';

const isListener = propName => propName.startsWith('on');

const isAttribute = propName => !isListener(propName) && propName !== 'children';

function updateEventListenersOnDomElement(dom, prevProps, nextProps) {
  Object.keys(prevProps).filter(isListener).forEach(listenerName => {
    const eventType = listenerName.toLowerCase().substring(2);
    dom.removeEventListener(eventType, prevProps[listenerName]);
  })

  Object.keys(nextProps).filter(isListener).forEach(listenerName => {
    const eventType = listener.toLowerCase().substring(2);
    dom.addEventListener(eventType, props[listenerName]);
  });
}

function updateAttributesOnDomElement(dom, prevProps, nextProps) {
  Object.keys(prevProps).filter(isAttribute).forEach(attribute => {
    dom[attribute] = null;
  });

  Object.keys(nextProps).filter(isAttribute).forEach(attribute => {
    dom[attribute] = props[attribute];
  });
}

let rootInstance = null;

function render(element, parentDom) {
  const prevInstance = rootInstance;
  const newInstance = reconcile(parentDom, prevInstance, element);
  rootInstance = newInstance;
}

function reconcile(parentDom, prevInstance, element) {
  if (prevInstance == null) {
    const nextInstance = instantiate(element);
    parentDom.appendChild(nextInstance.dom);
  } else if (prevInstance.element.type === element.type) {
    updateEventListenersOnDomElement(prevInstance.dom, prevInstance.element.props, element.props);
    updateAttributesOnDomElement(prevInstance.dom, prevInstance.element.props, element.props);
    prevInstance.childInstances = reconcileChildren(prevInstance, element);
    prevInstance.element = element;
    return prevInstance;
  } else if (element === null) {
    parentDom.removeChild(prevInstance.dom);
    return null;
  } else {
    const nextInstance = instantiate(element);
    parentDom.replaceChild(nextInstance.dom, prevInstance.dom);
  }
  return nextInstance;
}

const reconcileChildren(instance, element) {
  const dom = instance.dom;

  const childrenInstances = instance.childInstances;
  const nextChildren = element.props.children || [];
  const maxChildrenLength = Math.max(childrenInstances.length, nextChildren.length);
  const nextChildrenInstances = [];

  for(let i = 0; i < count; i++) {
    const childInstance = childrenInstances[i];
    const nextChild = nextChildren[i];
    const nextChildInstance = reconcile(dom, childInstance, nextChild);
    nextChildrenInstances.push(nextChildInstance);
  }
  
  return nextChildrenInstances;
}

function instantiate(element) {
  const { type, props } = element;

  const dom = type === TEXT_ELEMENT ? document.createTextNode('') : document.createElement(type);

  updateEventListenersOnDomElement(dom, {}, props);

  updateEventListenersOnDomElement(dom, {}, props);

  const children = props.children || [];

  const childInstances = children.map(instantiate);
  const childDoms = childInstances.map(childInstance => childInstance.dom);

  childDoms.forEach(childDom => dom.appendChild(childDom));

  return { dom, element, childInstances };
}

export default render;
