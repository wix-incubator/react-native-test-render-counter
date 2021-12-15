import {isClassComponent, isForwardRefComponent, isMemoComponent} from '../component-type-utils';
import {patchClassComponent} from './class';
import {patchFunctionalComponent} from './function';
import React from 'react';

export const patchMemoComponent = (Component: any, displayName: string, renderCallback: (props: any) => void) => {
  const {type: InnerMemoComponent} = Component;

  const isInnerMemoComponentAClassComponent = isClassComponent(InnerMemoComponent);
  const isInnerMemoComponentForwardRef = isForwardRefComponent(InnerMemoComponent);
  const isInnerMemoComponentAnotherMemoComponent = isMemoComponent(InnerMemoComponent);

  const InnerComponent = isInnerMemoComponentForwardRef ? InnerMemoComponent.render : InnerMemoComponent;

  let PatchedInnerComponent: any;

  if (isInnerMemoComponentAClassComponent) {
    PatchedInnerComponent = patchClassComponent(InnerComponent, displayName, renderCallback);
  } else if (isInnerMemoComponentAnotherMemoComponent) {
    PatchedInnerComponent = patchMemoComponent(InnerComponent, displayName, renderCallback);
  } else {
    PatchedInnerComponent = patchFunctionalComponent(InnerComponent, displayName, renderCallback);
  }

  PatchedInnerComponent.displayName = displayName;

  const MemoComponent = React.memo(
    isInnerMemoComponentForwardRef ? React.forwardRef(PatchedInnerComponent) : PatchedInnerComponent,
    Component.compare
  );

  MemoComponent.displayName = displayName;

  return MemoComponent;
};
