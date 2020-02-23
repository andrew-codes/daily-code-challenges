### Problem

Components often own the external spacing surrounding themselves. However, in doing so, it limits the components' capability to be re-used. Spacing around a component is most often directly related to the context in which the component is used. Create an abstraction that is responsible for providing (even) spacing between a group of components.

#### Spacing

- [ ] Given a spacing value, when rendering a group of components horizontally, then components are rendered with the predfined amount of space between each one.
- [ ] Given a spacing value, when rendering a group of components vertically, then components are rendered with the predfined amount of space between each one.
- [ ] Given a spacing value, when rendering a group of components, then there is the spacing value's amount of space before the first component
- [ ] Given a spacing value, when rendering a group of components, then there is the spacing value's amount of space after the last component

#### No Gutters

- [ ] Given no gutters are to be rendered, when rendering a group of components, then there is no spacing before the first component
- [ ] Given no gutters are to be rendered, when rendering a group of components, then there is no spacing after the last component

#### Spread

- [ ] Given the group is spread, when rendering a group of components horizontally, then the components are equally spaced within the width of their container
- [ ] Given group is spread, when rendering a group of components vertically, then the components are equally spaced within the height of their container

#### Centered

- [ ] Given the group is centered, when rendering the group of components horizontally, then the components are horizontally centered within their parent
- [ ] Given the group is centered, when rendering the group of components vertically, then the components are vertically centered within their parent

#### Changing Root Component

- [ ] Given a React component to be used as the root element, when rendering the group of components, the root component is rendered as the provided component.
