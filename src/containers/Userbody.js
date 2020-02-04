import React from 'react';
import Task from '../services/tasks';
import TaskActivities from "../services/taskActivities";
import '../Styles/App.css';
import { Table, Input,Card, Button, Icon } from 'antd';
import AddBooks from "./AddBooks";

class Userbody extends React.Component{

    state ={
        cards:[],
        searchText: '',
        searchedColumn: '',
        Activities: [],
        idUser:1,
        titleBook: "",
    };
    async componentDidMount() {
        this.setState({cards: await Task.getTasks()});
        this.setState({Activities: await TaskActivities.getTasksActivities()})
    }
    handleChangeText = (es, input) =>{
        const newState = {};
        newState[input] = es.target.value;
        this.setState(newState);
    };

    handleClickFind = (es) =>{
        this.setState(state =>({ idUser: state.idUser = es}))

    };
    handleAddTitle= () => {
        this.setState((currentState) => ({
            Activities: [
                    ...currentState.Activities,
                    {
                        title: currentState.titleBook,
                        userId:currentState.idUser
                    }
                ]
            })
        )
    };



    render() {
        const {cards, Activities, idUser,titleBook} = this.state;
        const columns = [
            {
                title: 'Id',
                dataIndex: 'id',
                defaultSortOrder: 'descend',
                sorter: (a, b) => a.project - b.project,

            },
            {
                title: 'Name',
                dataIndex: 'name',

            },
            {
                title: 'User Name',
                dataIndex: 'username',

            },
            {
                title: 'Email',
                dataIndex: 'email',

            },
            {
                title: 'Adress',
                dataIndex: 'address',

            },
            {
                title: 'Phone',
                dataIndex: 'phone',

            },
            {
                title: 'Website',
                dataIndex: 'website',

            },
            {
                title: 'Company',
                dataIndex: 'company: {name}',

            },
        ];
        const columnsActivities = [
            {
                title: 'USER ID',
                dataIndex: 'userId',
                defaultSortOrder: 'descend',
                sorter: (a, b) => a.project - b.project,

            },
            {
                title: 'BOOK ID',
                dataIndex: 'id',

            },
            {
                title: 'Title',
                dataIndex: 'title',

            },
            {
                title: 'COMPLETED',
                dataIndex: 'completed',

            },


        ];

        return(
            <div className='Table1' >
                <h1>USERS</h1>
                <div className="Task-table">
                    {
                        <Table columns={columns} dataSource={this.state.cards}  />
                    }

                </div>
                <div className="task-item">

                    {

                        cards.map((item) => (
                            <div>

                                <button onClick={()=> this.handleClickFind(item.id)}>Buscar Actividades</button>

                            </div>

                        ))
                    }
                </div>

                <div className="task-user">
                    {this.state.idUser}

                </div>
                <h1>ACTIVIDADES</h1>
                <div className="Task-table">
                    {
                        <Table columns={columnsActivities} dataSource={this.state.Activities}  />
                    }
                </div>
                <div className='actividad'>
                    <h1>ADD ACT</h1>
                    <input onChange={(es)=>this.handleChangeText(es, 'titleBook')} value={titleBook} />
                    <Button onClick={this.handleAddTitle}>Agregar</Button>

                </div>


            </div>
        );
    }

}

export default Userbody;