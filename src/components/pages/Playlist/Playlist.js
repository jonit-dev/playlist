import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Playlist extends Component {

    // state = {playlistSongs: []};

    renderPlaylists() {
        return this.props.playlists.map(playlist => {

            return (
                <Link to={{pathname: `playlist/info/${playlist.id}`}} key={playlist.id}>
                    <div className="item">
                        <i className="fas fa-headphones icon"></i>
                        <div className="content">
                            <div className="header">{playlist.name}</div>
                            <div className="description">Playlist</div>
                        </div>
                    </div>
                </Link>

            )
        });
    }


    render() {
        return (
            <React.Fragment>

                <div className="ui list playlist">
                    {this.renderPlaylists()}
                </div>


            </React.Fragment>
        );
    }
}

export default Playlist;