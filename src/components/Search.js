import React from 'react';

class Search extends React.Component{
    render(){
        return(
            <div>
                <label htmlFor="keyword">검색</label> 
                <input type="text" name="keyword" id="keyword" placeholder="Search" value={this.props.keyword} onChange={this.props.onChange} />
            </div>
        );
    }
}

export default Search;