import React from "react";

import contactImg from '../../../static/assets/images/auth/login.jpg';

export default function() {
  return (
    <div className='contact-wrapper'>
      <div className='left-side'
           style={{
             backgroundImage: `url(${contactImg})`,
             backgroundSize: 'cover',
             backgroundPosition: 'center'
           }} 
      />

      <div className='right-side'>
        <div className='contact-bullet-points'>
        <div className='contact-bullet-group'>
            <div className='icon'>
              <i className='fas fa-signature' />
            </div>

            <div className='text'>
              Maurice E. Garbry II
            </div>

          </div>

          <div className='contact-bullet-group'>
            <div className='icon'>
              <i className='fas fa-mobile-alt' />
            </div>

            <div className='text'>
              (575) 288-0364
            </div>

          </div>

          <div className='contact-bullet-group'>
            <div className='icon'>
              <i className='fas fa-at' />
            </div>

            <div className='text'>
              <a href='mailto:megarbry@gmail.com'>megarbry@gmail.com</a>
            </div>

          </div>

          <div className='contact-bullet-group'>
            <div className='icon'>
              <i className="fab fa-linkedin"/>
            </div>

            <div className='text'>
              <a href='https://www.linkedin.com/in/maurice-garbry-ii-8898581a4/'>LinkdIn</a>
            </div>
          </div>

            <div className='contact-bullet-group'>
            <div className='icon'>
              <i className='fab fa-facebook-square' />
            </div>

            <div className='text'>
              <a href='https://www.facebook.com/maurice.garbry.9'>Facebook</a>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
