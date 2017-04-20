const Datastore = require('nedb')
const path = require('path');

const db = new Datastore({ filename: path.join(__dirname, '../../data/tasks'), autoload: true });

class Task {
    constructor(text) {
        this.text = text;
        this.isCompleted = false;
        this.createdAt = Date.now();
    }

    insert(cb) {
        db.insert(this, cb);
    }

    static getAll(cb) {
        db.find({}, (err, tasks) => {
            tasks.sort((task1, task2) => {
                const { createdAt: ca1 } = task1;
                const { createdAt: ca2 } = task2;
                if(ca1 < ca2) return -1;
                if(ca1 > ca2) return 1;
                return 0;
            })
            cb(err, tasks);
        });
    }

    static remove(taskId, cb) {
        db.remove({ _id: taskId }, {}, cb);
    }
};

export default Task;