export const patchClassComponent = (ClassComponent: any, displayName: string, renderCallback: (props: any) => void) => {
  const PatchedComponent = class extends ClassComponent {
    constructor(props: any, context: any) {
      super(props, context);

      const origRender = super.render || this.render;

      // render is an arrow (anonymous) function or this.render.bind(this) was called on the original class
      const renderIsBindedFunction = origRender !== ClassComponent.prototype.render;
      if (renderIsBindedFunction) {
        this.render = () => {
          PatchedComponent.prototype.render.apply(this);
          return origRender();
        };
      }
    }

    render() {
      renderCallback(this.props);
      return super.render ? super.render() : null;
    }
  };

  PatchedComponent.displayName = displayName;

  return PatchedComponent;
};
