const Furniture = require("../models/Furniture");
const Category = require("../models/Category");

exports.getPanelPage = async (req, res) => {
    if(req.session.userID === process.env.ADMIN_ID){
        const furnitures = await Furniture.find({}).populate("category").sort({dateCreated: -1});
        const categories = await Category.find({});
        res.render("panel", { furnitures, categories });
    }else{
        req.flash("homeMessage", {msg:"Erişim engeli!!",type: "error"});
        res.redirect("/");
    }
}

exports.createFurniture = async (req, res) => {
    const furniture = await Furniture.create({...req.body, reservedBy: null});
    const categories = await Category.findOne({_id: req.body.category});

    categories.furnitures.push(furniture._id);
    await categories.save();
    
    res.redirect("/panel");
}

exports.updateFurniture = async (req, res) => {
    console.log("data", req.body);
    const furniture = await Furniture.findByIdAndUpdate({_id: req.params.id}, req.body);
    res.redirect("/panel");
}

exports.deleteFurniture = async (req, res) => {
    await Furniture.findByIdAndDelete({_id: req.params.id});
    res.redirect("/panel");
}