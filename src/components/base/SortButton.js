import React, {Component} from 'react';

class SortButton extends Component {

    // state = {key:value};

    onSortBy(type) {
        console.log('sending sort by event');

        this.props.onSortBy(type); //pass event to parent

    }


    render() {
        return (
            <React.Fragment>
                <div className="ui small basic icon buttons playlist-sort-buttons">
                    <button className="ui button" onClick={() => this.onSortBy('album')}><i
                        className="sort icon"></i> Album
                    </button>
                    <button className="ui button" onClick={() => this.onSortBy('artist')}><i
                        className="sort icon"></i> Artist
                    </button>

                    <button className="ui button" onClick={() => this.onSortBy('duration')}><i
                        className="sort icon"></i> Duration
                    </button>


                </div>
            </React.Fragment>
        );
    }
}

export default SortButton;