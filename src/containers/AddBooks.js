import React from 'react';
import '../Styles/App.css'

class AddBooks extends React.Component{

    state ={
        titleBook: "",

    };

    handleChangeText = (es, input) =>{
        const newState = {};
        newState[input] = es.target.value;
        this.setState(newState);
    };

    handleAddTask = () => {
        this.setState((currentState) => ({
                cards: [
                    ...currentState.cards,
                    {
                        title: currentState.taskTitle,
                        desc: currentState.taskDesc
                    }
                ]
            })
        )
    };



    render(){
        const {titleBook} = this.state;

        return(
            <div className='calculator'>
                <h1>ADD BOOK</h1>
                <input onChange={(es)=>this.handleChangeText(es, 'titleBook')} value={titleBook} />

            </div>

        );
    }

}

export default AddBooks;