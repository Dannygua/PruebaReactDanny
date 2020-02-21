import React from 'react';
import Task from '../services/tasks';
import TaskActivities from "../services/taskActivities";
import '../Styles/App.css';
import { Table, Input,Card, Button, Icon } from 'antd';
import AddBooks from "./AddBooks";

class Userbody extends React.Component{

    //Declarar Variables
    state ={
        cards:[],
        tempcards:[],
        searchText: '',
        searchedColumn: '',
        Activities: [],
        idUser:1,
        titleBook: "",
        completed: true
    };
    async componentDidMount() {

        //Codigo Para consumir api generada con symfony y apiplatform
        {/*
        this.setState({tempcards: await Task.getTasks()});
        this.setState({cards: this.state.tempcards['hydra:member']});
        */}

        //Codigo para consumir api publica
        this.setState({cards: await Task.getTasks()});
        this.setState({Activities: await TaskActivities.getTasksActivities()})
    }

    //Funcion: Para que funciones el Input
    handleChangeText = (es, input) =>{
        const newState = {};
        newState[input] = es.target.value;
        this.setState(newState);
    };

    // Funcion: Buscar y Mostrar Id de Usuario
    handleClickFind = (es) =>{
        this.setState(state =>({ idUser: state.idUser = es}))

    };

    //Funcion: Buscar y Mpstrar Tarea segun el id de Usuario
    showTareas=async(userId)=>{
        const tasks = await TaskActivities.getTasksActivities();
        //console.log(this.state.arrTar);
        const userTasks = [];
        tasks.forEach((tarea)=>{
            if(tarea.userId==userId){
                userTasks.push(tarea);
            }
        })
        this.setState({cards:userTasks})

        this.setState({
            visible: true,
        });
    }

    //Funcion: Añadir Elementos al Arreglo
    handleAddTitle= () => {
        this.setState((currentState) => ({
            Activities: [
                    ...currentState.Activities,
                    {
                        title: currentState.titleBook,
                        userId:currentState.idUser,
                        completed:currentState.completed
                    }
                ]
            })
        )
    };



    render() {
        //Declarar Todas las Variables en el const
        const {cards, Activities, idUser,titleBook,completed} = this.state;
        //Tabla de Usuarios
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
        //Tabla de Actividades
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

                {/*
                Mapear el arreglo y mostrar sus elementos
                */}
                <div className="task-item">

                    {

                        cards.map((item) => (
                            <div>
                                <ol>
                                    <li>{item.name}</li>
                                    <li>{item.username}</li>
                                    <li><Button type="primary" onClick={()=>this.showTareas(item.id)}>Ver tareas</Button></li>
                                    <li><button onClick={()=> this.handleClickFind(item.id)}>Buscar ID Usuario</button></li>
                                </ol>


                            </div>

                        ))
                    }
                </div>

                <div className="task-user">
                    {this.state.idUser}

                </div>
                <div>
                    {this.state.cards.map((item)=>(


                            <li>{item.title}</li>



                    ))}
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
                    <input onChange={(es)=>this.handleChangeText(es, 'completed')} value={completed} />
                    <Button onClick={this.handleAddTitle}>Agregar</Button>

                </div>


            </div>
        );
    }

}

export default Userbody;