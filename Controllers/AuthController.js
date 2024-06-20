const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.CheckAdmin=async(req,res,next)=>{
    try{
        const { username,password } = req.body;
         
        if(!username || !password) return res.status(404).json({msg:'not found',status:false});
        if(username !== process.env.MONGO_USERNAME){
            return res.status(401).json({msg:'unauthorized user access',status:false});
        }
        
        const passwordIsCorrect = await bcrypt.compare(password,process.env.PASSWORD_MONG);
        
        if(!passwordIsCorrect) return res.status(401).json({msg:'unauthorized users access',status:false});

        const token = jwt.sign({
            username:username,
        },process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN});

        res.status(200).json({msg:'user is admin',status:true,token});

        next();
    }catch(ex){
        next(ex);
    }
}

module.exports.isValidToken=(req,res,next)=>{
    try{
      const token = req.params.token;
      const decoded = jwt.verify(token,process.env.JWT_SECRET);
      const currentTime = Math.floor(Date.now() / 1000);

      if(decoded.exp && decoded.exp < currentTime) return res.status(200).json({msg:'token is expired',status:false});

      return res.status(200).json({msg:'token is not expired',status:true});
    }catch(ex){
        next(ex);
    }
}

