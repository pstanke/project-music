import { templates } from '../settings.js';

class Search {
  constructor(element) {
    const thisSearch = this;

    thisSearch.render(element);
  }
  render(element) {
    const thisSearch = this;
    thisSearch.element = element;

    thisSearch.dom = {
      wrapper: thisSearch.element,
    };
    /* generate HTML based on template */
    const generatedHTML = templates.search();
    /* change wrapper content to generatedHTML */
    thisSearch.dom.wrapper.innerHTML = generatedHTML;
  }
}
export default Search;
