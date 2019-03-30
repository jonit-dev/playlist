import React, {Component} from 'react';
import axios from "axios";
import API from "../../classes/API";
import Playlist from "./Playlist/Playlist";

class Main extends Component {

    state = {
        librarySongs: [],
        newPlaylistName: "",
        newPlaylistSongs: [],
        playlists: []
    };

    componentDidMount() {
        console.log("app started... loading songs");

        this.onLoadLibrary();
        this.onLoadPlaylist();
    }


    /*#############################################################|
    |                        SONGS LIBRARY
    *##############################################################*/

    onLoadLibrary = async () => {
        const response = await axios.get(`${API.getConfig().baseUrl}/library/`);
        this.setState({librarySongs: response.data})
    };

    onAddSongPlaylist(id) {
        console.log(`Adding song ${id} to list`);

        let newSongId = null;
        this.state.librarySongs.forEach((song) => {
            if (song.id === id) {
                newSongId = id;
            }
        });

        if (newSongId === null) {
            window.alert('Please, select a song!');
        }

        if (!this.state.newPlaylistSongs.includes(newSongId)) {
            this.setState({newPlaylistSongs: [...this.state.newPlaylistSongs, newSongId]});
        } else {
            window.alert('This song is already in your list!')
        }
    }

    onCreateNewPlaylist() {
        console.log('Creating new playlist');

        this.onSavePlaylist();
    }

    onSavePlaylist = async () => {

        //Do a post request to our backend and save our playlist

        await axios.post(`${API.getConfig().baseUrl}/playlist/`, {
            name: this.state.newPlaylistName,
            songs: this.state.newPlaylistSongs
        });

        //then fetch new server data
        this.onLoadPlaylist();

    };

    renderLibraryItems() {
        return this.state.librarySongs.map(song => {
            return (
                <div className="item" key={song.id}>


                    <div className="item">


                        <i className="fas fa-music playlist-icon"></i>
                        <div className="content">
                            <a className="header" href="# ">{song.artist}</a>
                            <div className="description">{song.title} <a><b>{song.album}</b></a> Duration:
                                {song.duration}
                            </div>
                            <div className="ui checkbox add-to-playlist-check"
                                 onClick={() => this.onAddSongPlaylist(song.id)}>
                                <input type="checkbox" name="example"/>
                                <label></label>
                            </div>

                        </div>


                    </div>


                </div>

            )
        });
    }

    /*#############################################################|
    |                        PLAYLIST
    *##############################################################*/


    onLoadPlaylist = async () => {

        const response = await axios.get(`${API.getConfig().baseUrl}/playlist/`);
        console.log(response.data);
        this.setState({playlists: response.data})
    };


    render() {
        return (
            <main>

                <div className="col-left">

                    <h2 className="ui header">Playlists</h2>

                    <p>Choose a playlist below to see more details</p>

                    <Playlist playlists={this.state.playlists}/>
                </div>

                <div className="col-right">

                    <h2 className="ui header">Library of Songs</h2>

                    <p>Click on the <strong>check box</strong> to select songs to your new playlist. Then, click on
                        save, to save it!</p>


                    <div className="ui relaxed list library-songs-list">

                        {this.renderLibraryItems()}

                    </div>


                    <div className="ui action input fluid">

                        <input type="text" placeholder="New playlist name" value={this.state.newPlaylistName}
                               onChange={(e) => this.setState({newPlaylistName: e.target.value})}/>
                        <button className="ui button black" onClick={() => {
                            this.onCreateNewPlaylist()
                        }}>Add to Playlist
                        </button>
                    </div>

                </div>


            </main>
        );
    }
}

export default Main;