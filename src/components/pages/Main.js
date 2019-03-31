import React, {Component} from 'react';
import axios from "axios";
import API from "../../classes/API";
import Playlist from "./Playlist/Playlist";
import Spinner from '../base/Spinner';
import SearchBar from "../base/SearchBar";
import SortButton from "../base/SortButton";

class Main extends Component {

    state = {
        librarySongs: [],
        newPlaylistName: "",
        newPlaylistSongs: [],
        playlists: []
    };

    componentDidMount() {
        console.log("app started... loading songs");

        // Trigger library and playlist loading on app Start

        this.onLoadLibrary();
        this.onLoadPlaylist();
    }


    /*#############################################################|
    |                        SONGS LIBRARY
    *##############################################################*/

    onLoadLibrary = async () => {

        this.setState({librarySongs: []});//refresh library

        // Load library: request to our node server the library list using axios

        const response = await axios.get(`${API.getConfig().baseUrl}/library/`);
        this.setState({librarySongs: response.data}) //update our state

    };

    onAddSongPlaylist(id) {
        // console.log(`Adding song ${id} to list`);

        // Compose new playlist after user clicks to add it (checkbox)

        let newSongId = this.state.librarySongs.find((album) => (album.id === id ? album : null)).id;

        if (newSongId === null) { //if user selected a song...
            window.alert('Please, select a song!');
        }

        //if song is not already on the playlist, lets add it
        if (!this.state.newPlaylistSongs.includes(newSongId)) {
            this.setState({newPlaylistSongs: [...this.state.newPlaylistSongs, newSongId]});
        } else {
            window.alert('This song is already in your list!')
        }
    }

    onCreateNewPlaylist() {

        //Trigger playlist creation

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
        this.onLoadLibrary(); //rerender library data (remove checkbox)

    };

    renderLibraryItems() {

        //Start loading library items, if there's something to load!
        if (this.state.librarySongs.length > 0) {
            return this.state.librarySongs.map(song => {
                return (
                    <div className="item" key={song.id}>


                        <div className="item">


                            <i className="fas fa-music playlist-icon"></i>
                            <div className="content">
                                <a className="header" href="# ">{song.album}</a>
                                <div className="description">Title: {song.title} <a
                                    href="# "><b>Artist: {song.artist}</b></a> Duration:{song.duration}
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
        } else { //if not, just show a spinner
            return (
                <Spinner/>
            )
        }


    }

    /* Bonus =========================================== */

    onSearch(keyword) {
        console.log(`Executing search for ${keyword}`);

        if (keyword === '') {
            //just fetch all songs again
            this.onLoadLibrary();
            return false;
        }

        let searchResults = this.state.librarySongs.filter((s) => s.album.toLowerCase().includes(keyword.toLowerCase()));

        if (searchResults.length > 0) {
            this.setState({librarySongs: searchResults});
        } else {
            window.alert('Album not found')
        }
    }

    onSortBy(type) {

        console.log(`Sorting by ${type}`);

        switch (type) {
            case 'album':
                this.setState({librarySongs: this.state.librarySongs.sort((x, y) => x.album > y.album ? 1 : -1)});
                break;
            case 'artist':
                this.setState({librarySongs: this.state.librarySongs.sort((x, y) => x.artist > y.artist ? 1 : -1)});
                break;

            case 'duration':
                this.setState({librarySongs: this.state.librarySongs.sort((x, y) => x.duration > y.duration ? 1 : -1)});
                break;
        }


    };


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

                    <p>Click on the <strong>check box</strong> to select songs to your new playlist. You can also user
                        the <strong>search bar</strong> below to filter for specific items. Click on <strong>Add to
                            playlist</strong> when you're done!</p>

                    <SearchBar onSearch={(k) => this.onSearch(k)}/>

                    <SortButton onSortBy={(type) => this.onSortBy(type)}/>


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