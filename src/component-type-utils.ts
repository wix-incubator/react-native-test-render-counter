const hasSymbol = typeof Symbol === 'function' && Symbol.for;

const REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
const REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;

export const isMemoComponent = (Component: any) => Component.$$typeof === REACT_MEMO_TYPE;
export const isForwardRefComponent = (Component: any) => Component.$$typeof === REACT_FORWARD_REF_TYPE;
export const isClassComponent = (Component: any) => Component.prototype && !!Component.prototype.isReactComponent;
export const isFunctionComponent = (Component: any) => typeof Component === 'function';
