import { reconcile } from '../virtua-dom/render';

export default class Component {
  constructor(props) {
    this.props = props;
    this.state = this.state || {};
  }

  setState(partialState) {
    this.state = { ...this.state, ...partialState };
    updateInstance(this.__internalInstance);
  }

}

function updateInstance(internalInstance) {
  const parentDom = internalInstance.dom.parentNode;
  const { element } = internalInstance;
  reconcile(parentDom, internalInstance, element);
}