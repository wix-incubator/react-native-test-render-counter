export const patchFunctionalComponent = (Component: any, displayName: string, renderCallback: (props: any) => void) => {
  const PatchedComponent = function (props: any, context: any) {
    renderCallback(props);

    return Component(props, context);
  };

  PatchedComponent.displayName = displayName;
  PatchedComponent.contextTypes = Component.contextTypes;

  return PatchedComponent;
};
