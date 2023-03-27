function insertSvgImg({src, target}) {
    const img = document.createElement(`img`);
    const hash = `${Date.now()}`;
    img.src = `${src}?dummy=${hash}`;
    img.onload = function imgOnLoad() {
      const container = document.querySelector(target);
      container.innerHTML = ``;
      container.appendChild(img);
    };
  }
  
  function insertByScreenId(screenId) {
    if (screenId === 2) {
      [
        {src: `img/animated/award.svg`, target: `.prizes__icon`}
      ].forEach(insertSvgImg);
    }
  }
  
  export default function init(screenId) {
    insertByScreenId(screenId);
  
    document.body.addEventListener(`screenChanged`, ({detail}) => {
      insertByScreenId(detail.screenId);
    });
  }
  