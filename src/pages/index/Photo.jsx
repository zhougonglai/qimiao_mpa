import React from 'react';
import './Photo.scss';
import { useKeenSlider } from "keen-slider/react"

import photo1 from '~/assets/img/index/photo-1.png';
import photo2 from '~/assets/img/index/photo-2.png';
import photo3 from '~/assets/img/index/photo-3.png';
import photo4 from '~/assets/img/index/photo-4.png';
import { useSetState } from 'ahooks';
const images1 = [
  "https://images.unsplash.com/photo-1590004953392-5aba2e72269a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=500&w=800&q=80",
  "https://images.unsplash.com/photo-1590004845575-cc18b13d1d0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=500&w=800&q=80",
  "https://images.unsplash.com/photo-1590004987778-bece5c9adab6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=500&w=800&q=80",
  "https://images.unsplash.com/photo-1590005176489-db2e714711fc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=500&w=800&q=80",
  photo1,
]
const images2 = [
  "https://images.unsplash.com/photo-1590004845575-cc18b13d1d0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=500&w=800&q=80",
  "https://images.unsplash.com/photo-1590004987778-bece5c9adab6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=500&w=800&q=80",
  "https://images.unsplash.com/photo-1590005176489-db2e714711fc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=500&w=800&q=80",
  photo1,
  "https://images.unsplash.com/photo-1590004953392-5aba2e72269a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=500&w=800&q=80",
]
const images3 = [
  "https://images.unsplash.com/photo-1590004987778-bece5c9adab6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=500&w=800&q=80",
  "https://images.unsplash.com/photo-1590005176489-db2e714711fc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=500&w=800&q=80",
  photo1,
  "https://images.unsplash.com/photo-1590004845575-cc18b13d1d0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=500&w=800&q=80",
  "https://images.unsplash.com/photo-1590004953392-5aba2e72269a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=500&w=800&q=80",
]
const images4 = [
  "https://images.unsplash.com/photo-1590005176489-db2e714711fc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=500&w=800&q=80",
  photo1,
  "https://images.unsplash.com/photo-1590004953392-5aba2e72269a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=500&w=800&q=80",
  "https://images.unsplash.com/photo-1590004845575-cc18b13d1d0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=500&w=800&q=80",
  "https://images.unsplash.com/photo-1590004987778-bece5c9adab6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=500&w=800&q=80",
]
const images5 = [
  photo1,
  "https://images.unsplash.com/photo-1590004953392-5aba2e72269a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=500&w=800&q=80",
  "https://images.unsplash.com/photo-1590004845575-cc18b13d1d0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=500&w=800&q=80",
  "https://images.unsplash.com/photo-1590004987778-bece5c9adab6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=500&w=800&q=80",
  "https://images.unsplash.com/photo-1590005176489-db2e714711fc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=500&w=800&q=80",
]

function Photo() {
  const [opacities, setOpacities] = useSetState([])
  const [sliderRef] = useKeenSlider({
    slides: images1.length,
    loop: true,
    duration: 3000,
    move(s) {
      const new_opacities = s.details().positions.map((slide) => slide.portion)
      setOpacities(new_opacities)
    },
  })

  return (
    <div className="photo-block" ref={sliderRef}>
      <div className="left-block">
        <div className="pup photo-box fader">
          {images1.map((src, idx) => (
            <div
              key={idx}
              className="fader__slide"
              style={{ opacity: opacities[idx] }}
            >
              <img src={src} />
            </div>
          ))}
        </div>
        <div className="sup photo-box fader">
          {images2.map((src, idx) => (
            <div
              key={idx}
              className="fader__slide"
              style={{ opacity: opacities[idx] }}
            >
              <img src={src} />
            </div>
          ))}
        </div>
      </div>
      <div className="middle-block photo-box fader">
          {images3.map((src, idx) => (
            <div
              key={idx}
              className="fader__slide"
              style={{ opacity: opacities[idx] }}
            >
              <img src={src} />
            </div>
          ))}
      </div>
      <div className="right-block">
        <div className="pup photo-box fader">
          {images4.map((src, idx) => (
            <div
              key={idx}
              className="fader__slide"
              style={{ opacity: opacities[idx] }}
            >
              <img src={src} />
            </div>
          ))}
        </div>
        <div className="sup photo-box fader">
          {images5.map((src, idx) => (
            <div
              key={idx}
              className="fader__slide"
              style={{ opacity: opacities[idx] }}
            >
              <img src={src} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Photo;
