import React, {Component} from 'react';

class SearchBar extends Component {

    state = {keyword: ""};

    onSearch(e) {
        e.preventDefault();

        this.props.onSearch(this.state.keyword);
    }


    render() {
        return (
                <form onSubmit={(e) => this.onSearch(e)} className="search-form">
                    <div className="ui category search">
                        <div className="ui icon input fluid">
                            <input className="prompt" type="text" placeholder="Search for an album..."
                                   value={this.state.keyword}
                                   onChange={(e) => this.setState({keyword: e.target.value})}/>
                            <i className="search icon"></i>
                        </div>
                        <div className="results"></div>
                    </div>
                </form>
        );
    }
}

export default SearchBar;