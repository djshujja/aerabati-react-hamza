import React from 'react';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

const AdminStatBadge = ( props ) => {
    return (
        <section 
            className="stat-badge-container" 
            style = { props.badgeStyle }>
             { props.iconComponent && 
                <div className="stat-badge-icon">
                    { props.iconComponent }
                </div>
            }
            <div className="stat-badge-info">
                <div className="stat-badge-count">
                    <Typography 
                        className="stat-badge-count-typo">
                            { props.badgeCounter }
                    </Typography>
                </div>
                <div className="stat-badge-text">
                    <Typography>
                        { props.badgeText }
                    </Typography>
                </div>
            </div>
        </section>
    )
}

AdminStatBadge.defaultProps = {
    badgeStyle:     { backgroundColor: '#cc0000' },
    badgeCounter:   0,
    badgeText:      "No Text"
}

AdminStatBadge.propTypes = {
    badgeStyle:     PropTypes.object,
    iconComponent:  PropTypes.node,
    badgeCounter:   PropTypes.string,
    badgeText:      PropTypes.string
}

export default AdminStatBadge;