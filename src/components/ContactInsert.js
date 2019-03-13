import React from 'react';
import PropTypes from 'prop-types';

class ContactInsert extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name : "",
            phone : "",
            addr : ""
        }
        
        this.handlerChange = this.handlerChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handlerChange(e){
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleClick(){
        const contact = {
            name : this.state.name,
            phone : this.state.phone,
            addr : this.state.addr
        }
        this.props.onCreate(contact);
        this.setState({
            name : "",
            phone : "",
            addr : ""
        })
    }

    render(){
        return (
            <div>
                <h2>추가</h2>
                <div>
                    <input type="text" name="name" placeholder="이름" value={this.state.name} onChange={this.handlerChange} />
                </div>
                <div>
                    <input type="text" name="phone" placeholder="전화번호" value={this.state.phone} onChange={this.handlerChange} />
                </div>
                <div>
                    <input type="text" name="addr" placeholder="주소" value={this.state.addr} onChange={this.handlerChange} />
                </div>               
                <button onClick={this.handleClick}>CREATE</button>
            </div>
        );
    }
}

ContactInsert.propTypes = {
    onCreate : PropTypes.func
};

ContactInsert.defaultProps = {
    onCreate : () => {console.log("not defined onCreate");}
};

export default ContactInsert;