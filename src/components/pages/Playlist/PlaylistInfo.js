import React, {Component} from 'react';
import axios from 'axios';
import API from '../../../classes/API';
import {Link} from 'react-router-dom';
import Spinner from '../../base/Spinner';

class PlaylistInfo extends Component {

    state = {playlistId: null, playlistInfo: {}, songs: []};


    componentDidMount() {
        const {id} = this.props.match.params || null;
        console.log(`Loading playlist info id ${id}`);
        if (id) {
            this.setState({playlistId: id}, () => {

                //fetch new playlist data once state is updated
                this.onGetPlaylist();


            });

        }
    }


    onGetPlaylist = async () => {

        // Get playlist basic info

        const response = await axios.get(`${API.getConfig().baseUrl}/playlist/${this.state.playlistId}/`);
        console.log(response.data);
        this.setState({playlistInfo: response.data}, () => {
            //get songs information
            this.state.playlistInfo.songs.forEach((song) => {

                console.log(song);
                this.onGetSong(song).then((s) => {
                    console.log(s);
                    this.setState({songs: [...this.state.songs, s]})
                });
            });
        });

        // Now lets fetch songs info


    };

    onGetSong = async (song) => {
        const response = await axios.get(`${API.getConfig().baseUrl}/library/${song}/`);
        return response.data;
    };

    onRenderSongs() {

        if(this.state.songs.length > 0){


            return this.state.songs.map(song => {
                return (
                    <div className="item" key={song.id}>

                        <i className="fas fa-music playlist-icon"></i>
                        <div className="content">
                            <a className="header" href="# ">{song.artist}</a>
                            <div className="description">{song.title} <a href="# "><b>{song.album}</b></a> Duration:
                                {song.duration}
                            </div>
                        </div>
                    </div>


                )
            });
        } else {
            return <Spinner/>
        }


    }

    onRenderPlaylistInfo() {
        return (this.state.playlistInfo ?
            <React.Fragment>
                <h1>{this.state.playlistInfo.name}</h1>
                <div className="ui relaxed list playlist-internal">
                    {this.onRenderSongs()}
                </div>

            </React.Fragment>
            : null);


    }


    render() {
        return (
            <main>

                <div className="playlist-internal-container">
                    {this.onRenderPlaylistInfo()}

                    <Link to={'/'} className="ui secondary button">
                        Back
                    </Link>
                </div>

            </main>
        );
    }
}

export default PlaylistInfo;