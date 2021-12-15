import React from 'react';
import {isForwardRefComponent, isMemoComponent, isClassComponent, isFunctionComponent} from './component-type-utils';
import {patchClassComponent} from './patches/class';
import {patchForwardRefComponent} from './patches/forward-ref';
import {patchFunctionalComponent} from './patches/function';
import {patchMemoComponent} from './patches/memo';

type RenderCountMap = Map<string, number>;
type ComponentMap = Map<any, any>;

let createElementOriginal: any;

export const startRenderCounter = () => {
  const renderCountMap: RenderCountMap = new Map<string, number>();
  const componentMap: ComponentMap = new Map<any, any>();

  createElementOriginal = React.createElement;

  //@ts-ignore
  React.createElement = function (type: React.ComponentType, ...args: any) {
    const Component = getPatchedComponent(componentMap, type, renderCountMap);

    return createElementOriginal.apply(React, [Component, ...args]);
  };

  Object.assign(React.createElement, createElementOriginal);

  return createMatchers(renderCountMap);
};

export const stopRenderCounter = () => {
  Object.assign(React, {
    createElement: createElementOriginal,
  });

  createElementOriginal = null;
};

const getPatchedComponent = (componentMap: ComponentMap, Component: React.ComponentType, renderCountMap: RenderCountMap) => {
  const displayName = getDisplayName(Component);

  if (componentMap.has(Component)) {
    return componentMap.get(Component);
  }

  const PatchedComponent = createPatchedComponent(Component, displayName, renderCountMap);

  componentMap.set(Component, PatchedComponent);

  return PatchedComponent;
};

function createPatchedComponent(Component: React.ComponentType, displayName: string, renderCountMap: RenderCountMap) {
  if (isMemoComponent(Component)) {
    return patchMemoComponent(Component, displayName, handleRenderCallback(renderCountMap));
  }

  if (isForwardRefComponent(Component)) {
    return patchForwardRefComponent(Component, displayName, handleRenderCallback(renderCountMap));
  }

  if (isClassComponent(Component)) {
    return patchClassComponent(Component, displayName, handleRenderCallback(renderCountMap));
  }

  if (isFunctionComponent(Component)) {
    return patchFunctionalComponent(Component, displayName, handleRenderCallback(renderCountMap));
  }

  return Component;
}

const createMatchers = (renderCountMap: RenderCountMap) => ({
  getRenderCountByTestID: (testID: string) => renderCountMap.get(testID) ?? 0,
  getRenderCountMap: () => renderCountMap,
});

const getDisplayName = (componentType: React.ComponentType) => componentType.displayName || componentType.name;

const handleRenderCallback = (renderCountMap: RenderCountMap) => (props: any) => increaseRenderCount(renderCountMap, props);

const increaseRenderCount = (renderCountMap: RenderCountMap, props: {testID?: string} = {}) => {
  const {testID} = props;
  if (!testID) {
    return;
  }

  if (renderCountMap.has(testID)) {
    const currentCount = renderCountMap.get(testID) ?? 0;
    renderCountMap.set(testID, currentCount + 1);
    return;
  }

  renderCountMap.set(testID, 1);
};
