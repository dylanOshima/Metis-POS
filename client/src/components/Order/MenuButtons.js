import React, { Component } from 'react';
import {Button} from 'react-bootstrap';

class MenuButtons extends Component {
    
    // Takes the information regarding the item that was clicked, places it in an array, then passes it back to Order page to be processed
    addOrder = (event) => {
        const itemToAdd = {
            name: event.target.innerText, 
            _id: event.target.id,
            quantity: 1, 
        };
        this.props.addToOrder(itemToAdd);
    }

    // Calls renderButtons to prcess items to be displayed
    render () {
        let buttons;

        // Loops through list of items to be displayed based on the category choosen
        // If category is blank don't display anything
        let { menu, category } = this.props;
        if(category !== ""){
            buttons = (
                menu.map((items,index) => {  
                    if (items.category.toLowerCase() === category){
                        return <Button key={items._id} id={items._id} onClick={(event) => this.addOrder(event)}>{items.name}</Button>
                    }
                })
            );     
        } else {
            buttons = <p></p>
        }

        return(
            <div>
                {buttons}
            </div>
        )
    }
};

export default MenuButtons;