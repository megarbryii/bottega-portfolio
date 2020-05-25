import React, { Component } from 'react';
import axios from 'axios';
import DropzoneComponent from 'react-dropzone-component';

import RichTextEditor from '../forms/rich-text-editor';

export default class BlogForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            blog_status: '',
            content: '',
            featured_image: '',
            apiUrl: 'https://mauricegarbryii.devcamp.space/portfolio/portfolio_blogs',
            apiAction: 'post'
        }

        this.featuredImageRef = React.createRef()
    }

    componentWillMount = () => {
        if(this.props.editMode) {
            this.setState({
                id: this.props.blog.id,
                title: this.props.blog.title,
                blog_status: this.props.blog.blog_status,
                content: this.props.blog.content,
                apiUrl: `https://mauricegarbryii.devcamp.space/portfolio/portfolio_blogs/${this.props.blog.id}`,
                apiAction: 'patch'
            })
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

    handleFeaturedImageDrop = () => {
        return {
            addedfile: file => this.setState({ featured_image: file })
        }
    }

    handleRichTextEditorChange = (content) => {
        this.setState({
            content
        })
    }

    buildForm = () => {
        let formData = new FormData();

        formData.append('portfolio_blog[title]', this.state.title);
        formData.append('portfolio_blog[blog_status]', this.state.blog_status);
        formData.append('portfolio_blog[content]', this.state.content);

        if(this.state.featured_image) {
            formData.append('portfolio_blog[featured_image]', this.state.featured_image);
        }

        return formData;
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        axios({
            method: this.state.apiAction,
            url: this.state.apiUrl,
            data: this.buildForm(),
            withCredentials: true
        })
        .then(response => {
            if(this.state.featured_image) {
                this.featuredImageRef.current.dropzone.removeAllFiles();
            }

            this.setState({
                id: '',
                title: '',
                blog_status: '',
                content: '',
                featured_image: ''
            });


            if(this.props.editMode) {
                // UPdate blog detail
                this.props.handleUpdateFormSubmit(response.data.portfolio_blog);
            } else {
                this.props.handleFormSubmit(response.data.portfolio_blog);
            }

           
        }).catch(error => {
            console.log('handle submit error', error);
        });

        event.preventDefault();
    }

    deleteImage = (imageType) => {
        axios.delete(`https://api.devcamp.space/portfolio/delete-portfolio-blog-image/${this.props.blog.id}?image_type=${imageType}`,
        { withCredentials: true })
        .then(response => {
            this.props.handleFeatureImageDelete();
        })
        .catch(error => {
            console.log('Delete image error', error);
        })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className='blog-form-wrapper'>
                <div className='two-column'>
                <input
                    type='text'  
                    onChange={this.handleChange} 
                    name='title'
                    placeholder='Title'
                    value={this.state.title}
                />
                
                <input 
                    type='text'
                    onChange={this.handleChange}
                    name='blog_status'
                    placeholder='Blog status (Draft or Published)'
                    value={this.state.blog_status}
                />
                </div>

                <div className='one-column'>
                    <RichTextEditor 
                        handleRichTextEditorChange={this.handleRichTextEditorChange}
                        editMode={this.props.editMode}
                        contentToEdit={this.props.editMode && this.props.blog.content
                        ? this.props.blog.content : null }
                    />
                </div>
                {this.props.editMode && this.props.blog.featured_image_url ? 
                <div className='portfolio-manager-image-wrapper'>
                <img src={this.props.blog.featured_image_url} />

                <div className='image-removal-link'>
                    <a onClick={() => this.deleteImage('featured_image')}>
                        <i className="fas fa-folder-minus"/>
                    </a>
                </div>
            </div>
                :
                <div className='image-uploaders'>
                    <DropzoneComponent
                        ref={this.featuredImageRef}
                        config={this.componentConfig()}
                        djsConfig={this.djsConfig()}
                        eventHandlers={this.handleFeaturedImageDrop()}
                    >
                        <div className='dz-message'>Featured Image</div>  
                    </DropzoneComponent>
                </div>
                }
                <button className='btn'>Save</button>
            </form>
        )
    }
}