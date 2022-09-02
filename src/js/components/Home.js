import { templates } from '../settings.js';

class Home {
  constructor(element) {
    const thisHome = this;

    thisHome.render(element);
  }
  render(element) {
    const thisHome = this;
    thisHome.element = element;

    thisHome.dom = {
      wrapper: thisHome.element,
    };
    /* generate HTML based on template */
    const generatedHTML = templates.home();
    /* change wrapper content to generatedHTML */
    thisHome.dom.wrapper.innerHTML = generatedHTML;
  }
}
export default Home;
