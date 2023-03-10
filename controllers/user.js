const _ = require("lodash")
const User = require("../models/user");

exports.userById = (req, res, next, id) =>{
    User.findById(id).exec((err, user)=>{
        if(err || !user){
            return res.status(400).json({
                error : "user not found"
            })
        }
        req.profile = user // adds profile object in req with user info
        next();
    })
};

exports.hasAuthorization = (req, res, next) =>{
    const authorized = req.profile && req.auth && req.profile._id == req.auth._id
    if(!authorized){
        return res.status(403).json({
            error: "User is not authorized to perform this action"
        })
    }
};

exports.allUsers = (req, res) => {
    User.find((err, users)=>{
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        res.json({ users });
    }).select("name email updated created");
};

exports.getUser = (req, res) =>{
    req.profile.hashedpassword = undefined;
    return res.json(req.profile);
};


exports.deleteUser = (req, res, next) =>{
    let user = req.profile;
    user.remove((err, user)=>{
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        res.json({message : "User has been deleted successfully"});
    })
}