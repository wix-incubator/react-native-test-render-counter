import React from 'react';
import {isMemoComponent} from '../component-type-utils';
import {patchFunctionalComponent} from './function';

export const patchForwardRefComponent = (Component: any, displayName: string, renderCallback: (props: any) => void) => {
  const {render: InnerForwardRefComponent} = Component;

  const isInnerComponentMemoized = isMemoComponent(InnerForwardRefComponent);
  const InnerComponent = isInnerComponentMemoized ? InnerForwardRefComponent.type : InnerForwardRefComponent;

  const PatchedInnerComponent = patchFunctionalComponent(InnerComponent, displayName, renderCallback);

  PatchedInnerComponent.displayName = displayName;

  const ForwardRefComponent = React.forwardRef(
    isInnerComponentMemoized ? React.memo(PatchedInnerComponent, InnerForwardRefComponent.compare) : PatchedInnerComponent
  );

  ForwardRefComponent.displayName = displayName;

  return ForwardRefComponent;
};
