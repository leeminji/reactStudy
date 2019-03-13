import React from 'react';
import PropTypes from 'prop-types';

class ContactDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isEdit : false,
            name : "",
            phone : "",
            addr : ""
        };
        this.handleToggle = this.handleToggle.bind(this);
        this.handlerChange = this.handlerChange.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }
    
    handleEdit(){
        this.props.onEdit(this.state.name, this.state.phone, this.state.addr);
    }

    handlerChange(e){
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleToggle(){
        if( !this.state.isEdit){
            this.setState({
                name : this.props.contact.name,
                phone : this.props.contact.phone,
                addr : this.props.contact.addr
            })
        }else{
            this.handleEdit();
        }
        this.setState({
            isEdit : !this.state.isEdit
        });
    }

    render(){
        const detail = ( 
            <div>
                <div>이름:{this.props.contact.name}</div>
                <div>번호:{this.props.contact.phone}</div>
                <div>주소:{this.props.contact.addr}</div>
            </div> 
        );
        const blank = ( 
            <div>none</div> 
        );
      
        const edit = (
            <div>
                 <div>
                    <input type="text" name="name" placeholder="이름" value={this.state.name} onChange={this.handlerChange} />
                </div>
                <div>
                    <input type="text" name="phone" placeholder="전화번호" value={this.state.phone} onChange={this.handlerChange} />
                </div>
                <div>
                    <input type="text" name="addr" placeholder="주소" value={this.state.addr} onChange={this.handlerChange} />
                </div>               
            </div>
        );
        const view = this.state.isEdit ? edit : detail ;

        return (
            <div>
                <h2>상세정보</h2>
                {this.props.isSelected ? view : blank }
                <button onClick={this.props.onRemove}>DELETE</button>
                <button onClick={this.handleToggle}>{ !this.state.isEdit ? "edit" : "ok" }</button>
            </div>
        );
    }
}

ContactDetail.defaultProps = {
    contact : {
        name : "",
        phone : "",
        addr : ""
    },
    onRemove : () => {console.log('onRemove not defined')},
    onEdit : () => {console.log('onEdit not defined')}
}
ContactDetail.prototypes = {
    contact : PropTypes.object,
    onRemove : PropTypes.func,
    onEdit : PropTypes.func
}
export default ContactDetail;