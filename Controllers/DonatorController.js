const Donator = require('../Models/DonatorSchema');

module.exports.createDon = async(req,res,next)=>{
    try{
        const {firstname,lastname,email,phone_number,city,state,amount} = req.body;


        if(!firstname || !email || !phone_number || !city || !state || !amount){
            return res.status(401).json({msg:'invalid fields',status:false});
        }
        const insertingDon = await Donator.create({
            firstname,lastname,email,phone_number,city,state,amount,time: new Date()
        })
        if(insertingDon){
            return res.status(200).json({msg:'donator created successfully',status:true,insertingDon});
        }
        else{
            return res.status(404).json({msg: 'donator not created',status:false});
        }
    }catch(ex){
        next(ex);
    }
}

module.exports.DonatorsDeets = async(req,res,next)=>{
    try{
        const donator = await Donator.find().sort({time:-1});
        
        if(donator) return res.status(201).json({msg:'donators found',status:true,donator});
        else return res.status(404).json({msg:'donator Invalid',status:false});
    }catch(ex){
        next(ex);
    }
}

module.exports.SearchedDon = async(req,res,next)=>{
    try{
        const firstname = req.params.firstname;
        if(firstname.length === 0){
            const donator = await Donator.find();
            return res.status(201).json({msg:'all users',status:true,donator});
        }
        const donator = await Donator.find({ firstname: { $regex: '^' + firstname, $options: 'i' } });
        
        if(donator){
            
            return res.status(200).json({msg:'users found',status:true, donator});
        }
        else{
            return res.status(404).json({msg:'user not found',status:false});
        }

    }catch(ex){
        next(ex);
    }
}