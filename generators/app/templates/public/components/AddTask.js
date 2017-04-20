import React, { Component } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import { addTask } from '../actions/tasks';


class AddTask extends Component {
    constructor() {
        super();
        this.state = {
            errorText: ''
        }
    }

    componentDidMount() {
        this.input.focus();
    }

    render() {
        const errorText = 'Task is required...';
        return (
            <div style={styles.container}>
                <div style={styles.textFieldContainer}>
                    <TextField
                        id="task"
                        ref={e => this.input = e}
                        fullWidth={true}
                        floatingLabelText="What are you planning to do?"
                        errorText={this.state.errorText}
                        onChange={(e, newString) => {
                            if (newString) {
                                this.setState({
                                    errorText: ''
                                })
                            } else {
                                this.setState({
                                    errorText
                                })
                            }
                        }}
                    />
                </div>
                <div style={styles.buttonContainer}>
                    <RaisedButton
                        label="Add Task"
                        primary
                        onClick={() => {
                            if (this.input.input.value) {
                                this.props.addTask(this.input.input.value, this.props._csrf)
                                this.input.input.value = '';
                            } else {
                                 this.setState({
                                    errorText
                                })
                            }
                        }} 
                    />
                </div>
            </div>
        );
    }
}

const styles = {
    container: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    textFieldContainer: {
        flexGrow: 100
    },
    buttonContainer: {
        flexGrow: 1
    }
}

const mapDispatchToProps = dispatch => ({
    addTask: (text, _csrf) => {
        dispatch(addTask(text, _csrf));
    }
})

export default connect(null, mapDispatchToProps)(AddTask);