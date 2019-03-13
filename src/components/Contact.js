import React from 'react';
import ContactInfo from './ContactInfo';
import ContactDetail from './ContactDetail';
import Search from './Search';
import ContactInsert from './ContactInsert';
import update from 'immutability-helper';

class Contact extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selectedKey : -1,
            keyword : "",
            dataContact : [
                { id:0, name : "이민지", phone : "010-3050-1240",  addr : "정릉동 373-14" },
                { id:1, name : "신상규", phone : "010-3586-1240",  addr : "정릉동 402-15" },
                { id:2, name : "오명은", phone : "011-3150-1241",  addr : "정릉동 111-1" },
                { id:3, name : "오명은2", phone : "011-3150-1241",  addr : "정릉동 111-1" }
            ]
        }
        this.handlerChange = this.handlerChange.bind(this);
        this.handlerClick = this.handlerClick.bind(this);
        this.handlerInsert = this.handlerInsert.bind(this);
        this.handlerRemove = this.handlerRemove.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    handlerChange(e){
        this.setState({
            keyword : e.target.value
        });
    }

    handlerClick(key){
        //console.log(key);
        this.setState({
            selectedKey : key
        })
    }

    handlerInsert(contact){
        contact.id = this.state.dataContact.length;

        this.setState({
            dataContact : update(this.state.dataContact, {$push : [contact]} )
        })
    }

    handlerRemove(){
        if( this.state.selectedKey < 0) return;
        this.setState({
            dataContact : update(this.state.dataContact, {$splice : [[this.state.selectedKey, 1]]} ),
            selectedKey : -1
        });
    }

    handleEdit(name, phone, addr){
        this.setState({
            dataContact : update(this.state.dataContact, {
                [this.state.selectedKey] : {
                    name : {$set : name},
                    phone : {$set : phone},
                    addr : {$set : addr}
                }
            })
        });
    }

    render(){
        const mapToComponent = (data) =>{
            //data.sort();
            data = data.filter((contact)=>{
                return contact.name.toLowerCase().indexOf(this.state.keyword) > -1;
            });
            return data.map((contact, i)=>{
                return ( <ContactInfo contact={contact} key={i} onClick={() =>{this.handlerClick(contact.id)}} /> );
            });
        };

        return (
            <div>
                <Search onChange={this.handlerChange} keyword={this.state.keyword} />
                {mapToComponent(this.state.dataContact)}
                <ContactDetail 
                    isSelected = {this.state.selectedKey > -1} 
                    contact={this.state.dataContact[this.state.selectedKey]} 
                    onRemove={this.handlerRemove} 
                    onEdit={this.handleEdit}
                    />
                <ContactInsert onCreate={this.handlerInsert} />
            </div>
        )
    }
}

export default Contact;