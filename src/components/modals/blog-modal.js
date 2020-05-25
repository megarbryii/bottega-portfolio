import React, { Component } from 'react';
import ReactModal from 'react-modal';

import BlogForm from '../blog/blog-form';

ReactModal.setAppElement('.app-wrapper');

export default class BlogModal extends Component {
    constructor(props) {
        super(props);

        this.customStyles = {
            content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
                width: '800px',
                backgroundColor: 'rgba(232, 253, 228, 1)'
            },
            overlay: {
                backgroundColor: 'rgba(24, 18, 75, 0.75)'
            }
        }
    }

    handleFormSubmit = (blog) => {
        this.props.handleNewBlogSubmit(blog);
    }

    render() {
        return (
            <div>
                <ReactModal 
                    style={this.customStyles}
                    isOpen={this.props.modalIsOpen}
                    onRequestClose={() => {
                        this.props.handleModalClose();
                    }}
                >
                   <BlogForm  handleFormSubmit={this.handleFormSubmit} />
                </ReactModal>

            </div>
        )
    }
}