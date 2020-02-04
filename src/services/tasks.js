const getTasks = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    return response.json();
};

const Task = {
    getTasks
};

export default Task;