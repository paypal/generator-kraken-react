import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ActionDone from 'material-ui/svg-icons/action/done';
import { deleteTask } from '../actions/tasks';

class Task extends Component {
    render() {
        return (
            <div style={styles.container}>
                <Card containerStyle={styles.card}>
                    <CardTitle title={this.props.text} />
                    <CardActions>
                        <FloatingActionButton>
                            <ActionDone onClick={() => this.props.deleteTask(this.props._id, this.props._csrf)} />
                        </FloatingActionButton>
                    </CardActions>
                 </Card>
            </div>
        );
    }
}

const styles = {
    container: {
        flexGrow: 1,
        maxWidth: '30%',
        minWidth: '22%',
        margin: 10
    },
    card: {
        backgroundColor: '#717fdd'
    }
}

const mapDispatchToProps = dispatch => ({
    deleteTask: (_id, _csrf) => {
        dispatch(deleteTask(_id, _csrf))
    }
}) 

export default connect(null, mapDispatchToProps)(Task);