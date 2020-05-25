import React, { Component } from "react";
import axios from 'axios';

export default class PortfolioDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      portfolioItem: {}
    }
  }

  getPortfolioItem = () => {
    axios.get(`https://mauricegarbryii.devcamp.space/portfolio/portfolio_items/${this.props.match.params.slug}`, { withCredentials: true })
    .then(res => {
      this.setState({
        portfolioItem: res.data.portfolio_item
      })
    }).catch(error => {
      console.log('get portfolio item error', error);
    })
  }

  componentWillMount = () => {
    this.getPortfolioItem();
  }

  render() {
    const { name, description, url, category, thumb_image_url, banner_image_url, logo_url } = this.state.portfolioItem;
    const bannerStyles = {
      backgroundImage: 'url(' + banner_image_url + ')',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center'
    }

    const logoStyles = {
      width: '200px'
    }
    
    return (
      <div className='portfolio-detail-wrapper'>
        <div className='portfolio-banner' style={bannerStyles}>
          <img src={logo_url} style={logoStyles}/>
        </div>

        <div className='portfolio-description-wrapper'>  
          <div className='portfolio-description'>
            <p>{description}</p>
          </div>

          <div className='bottom-content-wrapper'>
            <a  className='site-link' href={url} target='_blank'>Visit {name}</a>  
          </div>

        </div>
          
      </div>
    );
  } 
}
