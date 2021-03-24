import React from 'react';
import './Photo.scss';
import { useKeenSlider } from "keen-slider/react"

import APEX from '~/assets/img/index/APEX.png';
import Battlefield from '~/assets/img/index/Battlefield.png';
import CODM from '~/assets/img/index/CODM.png';
import CSGO from '~/assets/img/index/CSGO.png';
import escapefromtarkov from '~/assets/img/index/escapefromtarkov.png';
import GTA5 from '~/assets/img/index/GTA5.png';
import LOL from '~/assets/img/index/LOL.png';
import PUBG from '~/assets/img/index/PUBG.png';
import siege from '~/assets/img/index/siege.png';
import warthunder from '~/assets/img/index/warthunder.png';
import wf from '~/assets/img/index/wf.png';


import { useSetState } from 'ahooks';
const images1 = [ APEX, Battlefield, CODM, CSGO, escapefromtarkov, GTA5, LOL, PUBG, siege, warthunder, wf ];
const images2 = [ Battlefield, CODM, CSGO, escapefromtarkov, GTA5, LOL, PUBG, siege, warthunder, wf, APEX ];
const images3 = [ CODM, CSGO, escapefromtarkov, GTA5, LOL, PUBG, siege, warthunder, wf, APEX, Battlefield ];
const images4 = [ CSGO, escapefromtarkov, GTA5, LOL, PUBG, siege, warthunder, wf, APEX, Battlefield, CODM, ];
const images5 = [ escapefromtarkov, GTA5, LOL, PUBG, siege, warthunder, wf, APEX, Battlefield, CODM, CSGO,  ];

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
