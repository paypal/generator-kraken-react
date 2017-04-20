import React, { Component } from 'react';
import { connect } from 'react-redux';
import Task from './Task';
import { getTasks } from '../actions/tasks'

class TasksList extends Component {

    componentWillMount() {
        this.props.getTasks();

    }

    render() {
        return (
            <div style={styles.container}>
            {
                this.props.tasks.map(task => {
                    return <Task _csrf={this.props._csrf} key={task._id} {...task} />
                })
            }
            </div>
        );
    }
}

const styles = {
    container: {
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    }
}

const mapStateToProps = state => ({
    tasks: state.tasks
});

const mapDispatchToProps = dispatch => ({
    getTasks: () => {
        dispatch(getTasks());
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(TasksList);
