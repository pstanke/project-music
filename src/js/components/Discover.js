import { templates } from '../settings.js';

class Discover {
  constructor(element) {
    const thisDiscover = this;

    thisDiscover.render(element);
  }
  render(element) {
    const thisDiscover = this;
    thisDiscover.element = element;

    thisDiscover.dom = {
      wrapper: thisDiscover.element,
    };
    /* generate HTML based on template */
    const generatedHTML = templates.discover();
    /* change wrapper content to generatedHTML */
    thisDiscover.dom.wrapper.innerHTML = generatedHTML;
  }
}
export default Discover;
