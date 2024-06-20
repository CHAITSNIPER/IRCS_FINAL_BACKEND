const Projects = require('../Models/ProjectSchema');

module.exports.AddProjects = async(req,res,next)=>{
    try{
        const {title,description} = req.body;

        if (!title) {
            return res.status(400).json({ msg: 'All fields are required', status: false });
        }

        const createdProj = await Projects.create({
            title,
            description,
        })
        if(createdProj)
        return res.status(201).json({msg:'project created',status: true,createdProj});

        else return res.status(404).json({msg:'project not created',status: false});
    
    }catch(ex){
        console.log('error occured');
        next(ex);
    }
}

module.exports.getProjects = async(req,res,next)=>{
    try{
        const project = await Projects.find();

        if(project){
            return res.status(200).json({msg:'projects fetched successfully',status:true,project})
        }
        else{
            return res.status(404).json({msg:'projects not fetched',status:false});
        }
    }catch(ex){
        next(ex); 
    }
}
module.exports.getSelectedProjs = async(req,res,next)=>{
      try{
         const id = req.params;
    
         const project = await Projects.findById(id).select(['title','description']);
         
         if(project){
            return res.status(200).json({msg:'project retrieved',project,status:true})
         }
         else{
            return res.status(404).json({msg:'project not retrieved',status:false});
         }
      }catch(ex){
         next(ex);
      }
}

module.exports.deleteSelectedProject = async(req,res,next)=>{
    try{
       const id = req.params._id;
       const deletion = await Projects.findOneAndDelete({ _id:id });

       if(!deletion){
        return res.status(404).json({msg:'project not found',status:false});
       }
       else{
        return res.status(201).json({msg:'project deleted successfully',status:true});
       }
    }catch(error){
        next(error);
    }
}