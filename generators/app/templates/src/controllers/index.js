import Task from '../models/task';

const requestURI = require('../../config/config.json').requestURI;

export default router => {
    router.get('/', (req, res) => {
        Task.getAll((err, tasks) => {
            //for server side rendering of material-ui
            global.navigator = {
                userAgent: req.headers['user-agent']
            }
            res.render(`${requestURI}`, { tasks });
        })
    })
}