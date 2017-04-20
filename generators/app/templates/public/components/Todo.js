import React from 'react';
import TasksList from './TasksList';
import AddTask from './AddTask';

const Todo = props => (
    <div style={styles.container}>
        <AddTask _csrf={props._csrf} />
        <TasksList _csrf={props._csrf}  />
    </div>
);

const styles = {
    container: {
        margin: 10,
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'flex-start'
    }
}

export default Todo;
