import React from 'react';

const PortfolioSidebarList = (props) => {

    const portfolioList = props.data.map(portfolioItem => {
        return (
            
                <div key={portfolioItem.id} className='portfolio-item-thumb'>
                    <div className='portfolio-thumb-img'>
                        <img src={portfolioItem.thumb_image_url} />
                    </div>
                
                    <div className='actions'>
                        <div className='text-content'>
                            <div className='title'>{portfolioItem.name}</div>

                            <a className='edit-icon' onClick={() => props.handleEditClick(portfolioItem)}>
                                <i className="fas fa-user-edit"/>
                            </a>

                            <a className='delete-icon' onClick={() => props.handleDeleteClick(portfolioItem)}>
                                <i className="fas fa-folder-minus"/>
                            </a>
                        </div>
                    </div>
                </div>
            
        )
    })

    return (
        <div className='portfolio-sidebar-list-wrapper'>
            {portfolioList}
        </div>
    )
}

export default PortfolioSidebarList;