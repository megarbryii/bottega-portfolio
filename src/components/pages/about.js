import React from "react";

import aboutImg from '../../../static/assets/images/about/ProfileCrop.jpg';

export default function() {
  return (
    <div className='about-wrapper'>
      <div 
        className='left-side'
        style={{
          backgroundImage: `url(${aboutImg})`
        }}
      />

      <div className='right-side'>
        About content goes here....
      </div>
    </div>
  ) 
}
