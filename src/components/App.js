import React, {Component} from 'react';

import {BrowserRouter, Route} from 'react-router-dom';
import Main from "./pages/Main";
import Header from "./base/Header";
import './style.scss';
import PlaylistInfo from "./pages/Playlist/PlaylistInfo";


class App extends Component {

    // state = {librarySongs: []};


    render() {
        return (
            <BrowserRouter>
                <Header/>
                <Route path="/" exact component={Main}></Route>
                <Route path="/playlist/info/:id" exact component={PlaylistInfo}></Route>
            </BrowserRouter>
        )
            ;
    }
}

export default App;