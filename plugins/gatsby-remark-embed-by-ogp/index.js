'use strict';

const visit = require(`unist-util-visit`);
const fetch = require(`./fetchMeta`);

module.exports = ({ markdownAST }, options = {}) => {
  function isUrlValid(userInput) {
    var res = userInput.match(/^(http|https)(:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+)$/g);
    if (res == null) return false;else return true;
  }

  visit(markdownAST, `inlineCode`, node => {
    const { value } = node;

    if (value.startsWith(`card:`)) {
      const url = value.substr(5);

      if (isUrlValid(url)) {
        const data = fetch(url);

        if (data) {
          const domain = url.match(/^https?:\/{2,}(.*?)(?:\/|\?|#|$)/)[1];

          node.type = `html`;

          if (data["og:image"]) {
            node.value = `<div class="ogp_card">
                          <div class="ogp_image">
                            <img src=${data["og:image"]}>
                          </div>
                          <div class="ogp_content">
                            <h2>${data["og:title"] ? data["og:title"] : data.title}</h2>
                            <p class="description">${data["og:description"] ? data["og:description"].substr(0, 150) : ""}</p>
                            <p class="url">${domain}</p>
                          </div>
                          <a href="${url}"></a>
                        </div>`;
          } else {
            node.value = `<div class="ogp_card">
                          <div class="ogp_image no_image">
                            No Image
                          </div>
                          <div class="ogp_content">
                            <h2>${data["og:title"] ? data["og:title"] : data.title}</h2>
                            <p class="description">${data["og:description"] ? data["og:description"].substr(0, 150) : ""}</p>
                            <p class="url">${domain}</p>
                          </div>
                          <a href="${url}"></a>
                        </div>`;
          }
        }
      }
    }
  });

  return markdownAST;
};