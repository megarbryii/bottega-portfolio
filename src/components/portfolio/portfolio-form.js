import React, { Component } from 'react';
import axios from 'axios';
import DropzoneComponent from 'react-dropzone-component';

import '../../../node_modules/react-dropzone-component/styles/filepicker.css';
import '../../../node_modules/dropzone/dist/min/dropzone.min.css';


export default class PortfolioForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            description: '',
            url: '',
            category: 'eCommerce',
            position: '',
            thumb_img: '',
            banner_img: '',
            logo: '',
            editMode: false,
            apiUrl: 'https://mauricegarbryii.devcamp.space/portfolio/portfolio_items',
            apiAction: 'post'
        }

        this.thumbRef = React.createRef();
        this.bannerRef = React.createRef();
        this.logoRef = React.createRef();
    }

    deleteImage = (imageType) => {
        axios.delete(`https://api.devcamp.space/portfolio/delete-portfolio-image/${this.state.id}?image_type=${imageType}`,
        { withCredentials: true })
        .then(response => {
            this.setState({
                [`${imageType}_url`]: ''
            })
        })
        .catch(error => {
            console.log('Delete image error', error);
        })
    }

    handleThumbDrop = () => {
        return {
            addedfile: file => this.setState({ thumb_img: file })
        }
    }

    handleBannerDrop = () => {
        return {
            addedfile: file => this.setState({ banner_img: file })
        }
    }

    handleLogoDrop = () => {
        return {
            addedfile: file => this.setState({ logo: file })
        }
    }

    componentConfig = () => {
        return {
            iconFiletypes: ['.jpg', '.png'],
            showFiletypeIcon: true,
            postUrl: 'https://httpbin.org/post'
        }
    }

    djsConfig = () => {
        return {
            addRemoveLinks: true,
            maxFiles: 1
        }
    }

    buildForm = () => {
        let formData = new FormData();

        formData.append('portfolio_item[name]', this.state.name);
        formData.append('portfolio_item[description]', this.state.description);
        formData.append('portfolio_item[url]', this.state.url);
        formData.append('portfolio_item[category]', this.state.category);
        formData.append('portfolio_item[position]', this.state.position);

        if(this.state.thumb_img) {
            formData.append('portfolio_item[thumb_image]', this.state.thumb_img);
        }

        if(this.state.banner_img) {
            formData.append('portfolio_item[banner_image]', this.state.banner_img);
        }

        if(this.state.logo) {
            formData.append('portfolio_item[logo]', this.state.logo);
        }

        return formData;
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = (event) => {
        axios({
            method: this.state.apiAction,
            url: this.state.apiUrl,
            data: this.buildForm(),
            withCredentials: true
        })
            .then(response => {
                
                if(this.state.editMode) {
                    this.props.handleEditFormSubmit();
                } else {
                    this.props.handleNewFormSubmit(response.data.portfolio_item);               
                }

                this.setState({
                    name: '',
                    description: '',
                    url: '',
                    category: 'eCommerce',
                    position: '',
                    thumb_img: '',
                    banner_img: '',
                    logo: '',
                    editMode: false,
                    apiUrl: 'https://mauricegarbryii.devcamp.space/portfolio/portfolio_items',
                    apiAction: 'post'
                    
                });
                
                [this.thumbRef, this.bannerRef, this.logoRef].forEach(ref => {
                    ref.current.dropzone.removeAllFiles();
                });    
            }).catch(error => {
                console.log('handleSubmit', error);
            })
        event.preventDefault();
    }

    componentDidUpdate = () => {
        if(Object.keys(this.props.portfolioToEdit).length > 0) {
            const {
                id,
                name,
                description,
                category,
                position,
                url,
                thumb_image_url,
                banner_image_url,
                logo_url
            } = this.props.portfolioToEdit;

            this.props.clearPortfolioToEdit();

            this.setState({
                    id: id,
                    name: name || '',
                    description: description || '',
                    url: url || '',
                    category: category || 'eCommerce',
                    position: position || '',
                    editMode: true,
                    apiUrl: `https://mauricegarbryii.devcamp.space/portfolio/portfolio_items/${id}`,
                    apiAction: 'patch',
                    thumb_img_url: thumb_image_url || '',
                    banner_img_url: banner_image_url || '',
                    logo_url: logo_url || ''
            })
        }
    }

    render() {
        return (
                <form  className='portfolio-form-wrapper' onSubmit={this.handleSubmit}>
                    <div className='two-column'>
                        <input 
                            type='text' 
                            name='name' 
                            placeholder='Portfolio Item Name'
                            value={this.state.name}
                            onChange={this.handleChange}
                        />

                        <input
                            type='text'
                            name='url'
                            placeholder='Url'
                            value={this.state.url}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className='two-column'>
                        <input
                            type='text'
                            name='position'
                            placeholder='Position (number only)'
                            value={this.state.position}
                            onChange={this.handleChange}
                        />

                        <select
                            className='select-element'
                            name='category'
                            value={this.state.category}
                            onChange={this.handleChange}
                        >
                            <option value='eCommerce'>eCommerce</option>
                            <option value='Scheduling'>Scheduling</option>
                            <option value='Enterprise'>Enterprise</option>
                            <option value='Social Media'>Social Media</option>
                            <option value='Technology'>Technology</option>
                        </select>
                    </div>

                    <div className='one-column'>
                        <textarea
                            type='text'
                            name='description'
                            placeholder='Description'
                            value={this.state.description}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className='image-uploaders'>

                    {this.state.thumb_img_url && this.state.editMode ? (
                        <div className='portfolio-manager-image-wrapper'>
                            <img src={this.state.thumb_img_url} />

                            <div className='image-removal-link'>
                                <a onClick={() => this.deleteImage('thumb_img')}>
                                    <i className="fas fa-folder-minus"/>
                                </a>
                            </div>
                        </div>
                        )
                        : 
                        <DropzoneComponent 
                            ref={this.thumbRef}
                            config={this.componentConfig()}
                            djsConfig={this.djsConfig()}
                            eventHandlers={this.handleThumbDrop()}    
                        >
                            <div className='dz-message'>Thumb Image</div>
                        </DropzoneComponent>
                    }

                    {this.state.banner_img_url && this.state.editMode ? (
                        <div className='portfolio-manager-image-wrapper'>
                            <img src={this.state.banner_img_url} />

                            <div className='image-removal-link'>
                                <a onClick={() => this.deleteImage('banner_img')}>
                                    <i className="fas fa-folder-minus"/>
                                </a>
                            </div>
                        </div>
                        )
                        :
                        <DropzoneComponent
                            ref={this.bannerRef}
                            config={this.componentConfig()}
                            djsConfig={this.djsConfig()}
                            eventHandlers={this.handleBannerDrop()}
                        >
                          <div className='dz-message'>Banner Image</div>  
                        </DropzoneComponent>
                        }

                        {this.state.logo_url && this.state.editMode ? (
                            <div className='portfolio-manager-image-wrapper'>
                                <img src={this.state.logo_url} />

                                <div className='image-removal-link'>
                                    <a onClick={() => this.deleteImage('logo')}>
                                        <i className="fas fa-folder-minus"/>
                                    </a>
                                </div>
                            </div>
                        )
                        :
                        <DropzoneComponent 
                            ref={this.logoRef}
                            config={this.componentConfig()}
                            djsConfig={this.djsConfig()}
                            eventHandlers={this.handleLogoDrop()}
                        >
                            <div className='dz-message'>Logo Image</div>
                        </DropzoneComponent>
                        }
                    </div>

                    <div>
                        <button  className='btn' type='submit' >Save</button>
                    </div>
                </form>
        )
    }
}