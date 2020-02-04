const getTasksActivities = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    return response.json();
};

const TaskActivities = {
    getTasksActivities
};

export default TaskActivities;