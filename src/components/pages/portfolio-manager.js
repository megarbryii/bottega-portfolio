import React, { Component } from 'react';
import axios from 'axios';

import PortfolioSidebarList from '../portfolio/portfolio-sidebar-list';
import PortfolioForm from '../portfolio/portfolio-form';


export default class PortfolioManager extends Component {
    constructor() {
        super();

        this.state = {
            portfolioItems: [],
            portfolioToEdit: {}
        }
    }

    clearPortfolioToEdit = () => {
        this.setState({
            portfolioToEdit: {}
        })
    }

    handleEditClick = (portfolioItem) => {
        this.setState({
            portfolioToEdit: portfolioItem
        })
    }

    handleDeleteClick = (portfolioItem) => {
        axios.delete(`https://api.devcamp.space/portfolio/portfolio_items/${portfolioItem.id}`, { withCredentials:true })
        .then(response => {
            this.setState({
                portfolioItems: this.state.portfolioItems.filter(item => {
                    return item.id !== portfolioItem.id;
                })
            });

            return response.data;
        }).catch(error => {
            console.log('Handle Delete Click error', error);
        });
    }

    handleNewFormSubmit = (portfolioItem) => {
        this.setState({
            portfolioItems: [portfolioItem].concat(this.state.portfolioItems)
        })
    }

    handleEditFormSubmit = () => {
        this.getPortfolioItems();
    }

    handleSubmitFormErr = (error) => {
        console.log('handleSubmitFormErr error', error);
    }

    getPortfolioItems = () => {
        axios.get('https://mauricegarbryii.devcamp.space/portfolio/portfolio_items?order_by=created_at&direction=desc', { withCredentials: true })
        .then(response => {
            this.setState({
                portfolioItems: [...response.data.portfolio_items]
            })
        })
        .catch(error => {
            console.log('getPortfolioItems error', error);
        })
    }

    componentDidMount = () => {
        this.getPortfolioItems();
    }

    render() {
        return (
            <div className='portfolio-manager-wrapper'>
                <div className='left-column'>
                    <PortfolioForm 
                        handleNewFormSubmit={this.handleNewFormSubmit}
                        handleEditFormSubmit={this.handleEditFormSubmit}
                        handleSubmitFormErr={this.handleSubmitFormErr}
                        clearPortfolioToEdit={this.clearPortfolioToEdit}
                        portfolioToEdit={this.state.portfolioToEdit}
                    />
                </div>

                <div className='right-column'>
                    <PortfolioSidebarList 
                        data={this.state.portfolioItems}
                        handleDeleteClick={this.handleDeleteClick}
                        handleEditClick={this.handleEditClick}
                    />
                </div>
            </div>
        )
    }
}