const express = require('express');

// TODO Export to separate file
let Project = require('../models/project.model');
const projectRoutes = express.Router();

projectRoutes.route('/').get( (req, res) => {
    Project.find((err, projects) => {
        if(err){
            console.log(err);
        }else{
            res.json(projects);
        }
    });
});

projectRoutes.get('/image/:id', (req, res) => {
    const project = Project.findById({_id: req.params.id}, (err, project) => {
        if(err){
            console.log(err);
            return res.status(404);
        }else{
            // Setting content type header
            res.type('Content-Type', project.image.ContentType);
            res.status(200).send(project.image.Data);
        }
    });
})

projectRoutes.route('/:id').get( (req, res) => {
    Project.findById(req.params.id, (err, project) => {
        if(err){
            console.log(err);
        }else{
            res.json(project);
        }
    })
});

projectRoutes.route('/add').post( (req, res) => {

    const { title, description, repo, technology} = req.body;
    let project = new Project({
        title,
        description,
        repo,
        technology
    });

    // Extract data and mimetypes
    const {data, mimetype} = req.files.file;
    project.image.Data = data;
    project.image.ContentType = mimetype;

    // let project = new Project(req.body);
    project.save()
        .then(project => {
            res.status(200).json({'project': 'Project added'});
        })
        .catch(err => {
            res.status(400).send('Error: Adding project failed.');
        })
});

projectRoutes.route('/delete/:id').delete( (req, res) => {
    Project.findByIdAndDelete(req.params.id, (err) => {
        if(err){
            res.status(400).send('Error: Removing project failed.');
        }else{
            res.status(200).json({'project': 'Project Removed'});
        }
    });
});

projectRoutes.route('/update/:id').post((req, res) => {
    Project.findById(req.params.id, (err, project) => {
        if(!project){
            res.status(404).send("Project not found.");
        }else{
            project.title = req.body.title;
            project.description = req.body.description;
            project.repo = req.body.repo;
            project.technology = req.body.technology;

            project.save()
                .then(project => {
                    res.json('Project Updated');
                })
                .catch(err => {
                    res.status(400).send("Project update failed.");
                });
        }
    });
});

module.exports = projectRoutes; 