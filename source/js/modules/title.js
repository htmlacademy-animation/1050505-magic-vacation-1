export const getOffsetDefault = (num) => Math.round(Math.sin(num * Math.PI / 1.5) + num) * 70;
export const getOffsetSinFn = (num) => Math.round(Math.sin(num * Math.PI / 1.5)) * 100;

export class AnimationSettings {
  constructor(options = {}) {
    const {property = `transform`, duration = 500, getOffset, timingFunction = `ease`} = options;
    this.property = property;
    this.duration = duration;
    this.timingFunction = timingFunction;
    this.getOffset = getOffset || getOffsetDefault;
  }

  getNode(node, index) {
    if (!node) {
      return node;
    }
    node.style.transition = `${this.property} ${this.duration}ms ${this.timingFunction} ${this.getOffset(index)}ms`;
    return node;
  }
}

export class TextAniMaker {
  constructor(taglineNode, animationSettings) {
    if (!taglineNode || !animationSettings) {
      return;
    }

    this.element = taglineNode;
    this.text = taglineNode.innerText.trim();
    this._currentIndex = 0;
    this._animationSettings = animationSettings;

    this.init();
  }

  _wrapElement(el, className = ``) {
    const span = document.createElement(`span`);
    if (el.nodeName === undefined) {
      span.textContent = el;
    } else {
      span.appendChild(el);
    }
    if (className) {
      span.classList.add(className);
    }
    return span;
  }

  _getWordFragment(word) {
    return Array.from(word).reduce((fragment, letter) => {
      const letterWrapped = this._wrapElement(letter);
      const letterWithAnimation = this._animationSettings.getNode(letterWrapped, this._currentIndex);
      fragment.appendChild(letterWithAnimation);
      this._currentIndex++;
      return fragment;
    }, document.createDocumentFragment());
  }

  init() {
    const lines = this.text.split(` `);
    const linesFragment = lines.reduce((fragment, word) => {
      const wordFragment = this._getWordFragment(word);
      fragment.appendChild(this._wrapElement(wordFragment, `text__word`));
      return fragment;
    }, document.createDocumentFragment());

    this.element.innerHTML = ``;
    this.element.appendChild(linesFragment);
  }

  runAnimation(delay = 0) {
    setTimeout(() => this.element.classList.add(`animate`), delay);
  }
}