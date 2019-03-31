import React from 'react';
import {Link} from 'react-router-dom';

const Header = (props) => {
    return (
        <React.Fragment>

            <div className="ui fixed inverted menu">
                <div className="ui container">
                    <Link to='/' className="header item">
                        <i className="far fa-lightbulb logo find-logo"></i>
                        Innovative Playlist
                    </Link>
                    {/*<a href=" #" className="item">Home</a>*/}
                    {/*<div className="ui simple dropdown item">*/}
                        {/*Dropdown <i className="dropdown icon"></i>*/}
                        {/*<div className="menu">*/}
                            {/*<a className="item" href=" #">Link Item</a>*/}
                            {/*<a className="item" href=" #">Link Item</a>*/}
                            {/*<div className="divider"></div>*/}
                            {/*<div className="header">Header Item</div>*/}
                            {/*<div className="item">*/}
                                {/*<i className="dropdown icon"></i>*/}
                                {/*Sub Menu*/}
                                {/*<div className="menu">*/}
                                    {/*<a className="item" href=" #">Link Item</a>*/}
                                    {/*<a className="item" href=" #">Link Item</a>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                            {/*<a className="item" href=" #">Link Item</a>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                </div>
            </div>
        </React.Fragment>

    )
};

export default Header;