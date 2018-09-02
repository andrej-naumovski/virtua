import { TEXT_ELEMENT } from '../constants';

function createElement(type, passedProps, ...children) {
  const props = { ...passedProps };

  const newChildren = children.length > 0 ? [...children] : [];

  props.children = newChildren
    .filter(child => child != null && child !== false)
    .map(child => child instanceof Object ? child : createTextElement(child));

  return { type, props };
}

const createTextElement = value => createElement(TEXT_ELEMENT, { nodeValue: value });

export default createElement;
