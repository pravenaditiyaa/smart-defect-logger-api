
const { connection } = require('./common')

exports.createBug = (req, res) => {
    //console.log(req.body)
    if (req.body.title && req.body.description) {  
      try {
        connection.getCoreApi()
        .then(coreApiObject =>{
            coreApiObject.getProject("Pwc Smart Nodejs")
            .then(project => {
                //console.log('Created project', project.name);
                const teamContext = {project: project.name,
                    projectId: project.id,
                    team: project.defaultTeam.name,
                    teamId: project.defaultTeam.id};
                    //console.log('teamContext template', teamContext);
                    connection.getWorkItemTrackingApi()
                    .then(witApi =>{
                        const templateToCreate = {fields: {},
                        description: 'a template',
                        id: null,
                        name: 'myTemplate2',
                        workItemTypeName: 'Bug',
                        _links: null,
                        url: null};
                        witApi.createWorkItem({}, [{ "op": "add", "path": "/fields/System.Title", "from": null, "value": req.body.title }, { "op": "add", "path": "/fields/System.Description", "from": null, "value": req.body.description }], project.id, 'Bug')
                        .then(data =>{
                            //console.log('Created template', data)                            
                            res.status(200).send({status: "done", data: data});
                        })
                    })
            })
        })

        } catch (err) {}
    } else {
      res.status(400).send({status: "error", data: null});
    }
  };