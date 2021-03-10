import { random } from 'lodash'

const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
};


export const randomPhoneNumber = () => `1${random(3,8)}${random(9)}****${random(9)}${random(9)}${random(9)}${random(9)}`
