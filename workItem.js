var fs = require("fs");
var path = require("path");
const { connection } = require('./common')

exports.createBug = (req, res) => {
    //console.log(req.body)
    if (req.body.title) {  
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
                var attachImg = fs.createReadStream(path.resolve('../smart-defect-logger-ui/cypress/screenshots/image.png'));

                // fs.readFile(path.resolve('../smart-defect-logger-ui/cypress/screenshots/image.png'), async (err, data) =>  {
                //   if (err) throw err;
                  // Encode to base64
                   //var encodedImage = new Buffer(data, 'binary').toString('base64');  
                  connection.getWorkItemTrackingApi()
                  .then(witApi =>{
                      witApi.createAttachment({}, attachImg,"ErrorScreenShot.png")
                      .then(attchObj =>{
                        witApi.createWorkItem({}, [{ "op": "add", "path": "/fields/System.Title", "from": null, "value": req.body.title }, { "op": "add", "path": "/fields/Microsoft.VSTS.TCM.ReproSteps", "from": null, "value": req.body.description },{
                          "op": "add",
                          "path": "/fields/System.AssignedTo",
                          "value": "Pooja x"
                        },  {
                          "op": "add",
                          "path": "/relations/-",
                          "value": {
                            "rel": "AttachedFile",
                            "url": attchObj.url,
                            "attributes": {
                              "comment": "Spec for the work"
                            }
                          }
                        }], project.id, 'Bug')
                        .then(data =>{
                            //console.log('Created template', data)                            
                            res.status(200).send({status: "done", data: data});
                        })
                      })                          
                  })                      
                // });                    
                // const stream = fs.createReadStream(path.resolve('../smart-defect-logger-ui/cypress/screenshots/image.png'));

                // stream.on("data", function(streamdata) {
                //   connection.getWorkItemTrackingApi()
                //   .then(witApi =>{
                //       witApi.createAttachment({}, streamdata,"ErrorScreenShot.png")
                //       .then(attchObj =>{
                //         witApi.createWorkItem({}, [{ "op": "add", "path": "/fields/System.Title", "from": null, "value": req.body.title }, { "op": "add", "path": "/fields/Microsoft.VSTS.TCM.ReproSteps", "from": null, "value": req.body.description },{
                //           "op": "add",
                //           "path": "/fields/System.AssignedTo",
                //           "value": "Pooja x"
                //         },  {
                //           "op": "add",
                //           "path": "/relations/-",
                //           "value": {
                //             "rel": "AttachedFile",
                //             "url": attchObj.url,
                //             "attributes": {
                //               "comment": "Spec for the work"
                //             }
                //           }
                //         }], project.id, 'Bug')
                //         .then(data =>{
                //             //console.log('Created template', data)                            
                //             res.status(200).send({status: "done", data: data});
                //         })
                //       })                          
                //   })                      
                
                // }); 
            
              })
        })

        } catch (err) {}
    } else {
      res.status(400).send({status: "error", data: null});
    }
  };

