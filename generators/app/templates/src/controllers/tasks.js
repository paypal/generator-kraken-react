import Task from '../models/task';

export default router => {
    router
    .route('/')
    .get((req, res) => {
        Task.getAll((err, tasks) => {
            res.send({ tasks });
        })
    })
    .post((req, res) => {
        const { text } = req.body.task;
        const task = new Task(text);
        task.insert((err, createdTask) => {
            res.send({ task: createdTask })
        })
    })
    
    router.delete('/:taskId', (req, res) => {
       Task.remove(req.params.taskId, () => {
           res.sendStatus(204);
       })
    })

} 