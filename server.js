//The modules needed in the project
const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

//Creating the server
let app = express();

app.use(bodyparser.urlencoded());
app.use(bodyparser.json());
app.use(express.json());

mongoose.connect("mongodb://0.0.0.0:27017/eLearning")

//Creating the students collection in the database
const studentsSchema = mongoose.Schema({
    student_id : Number,
    level : Number,
    student_name : String,
    phone : String,
    department : String
});

let studentsModel = mongoose.model("Students",studentsSchema);

//POST endpoint for students collection
app.post('/eLearning/Students',async(req,res)=>{
    const newStudent = new studentsModel({
        student_id : req.body.student_id,
        level : req.body.level,
        student_name : req.body.student_name,
        phone : req.body.phone,
        department : req.body.department
    });
    const val = await newStudent.save();
    res.status(200).json(val);
})

//GET all students endpoint for the students collection
app.get('/eLearning/Students', async(req,res)=>{
    let allStudents = await studentsModel.find();
    res.status(201).json(allStudents);
})

//PATCH update a certain student in the students collection
app.patch('/eLearning/Students/:_id', async(req,res)=>{
    await studentsModel.findByIdAndUpdate({_id:req.params._id},{$set:{
        student_id : req.body.student_id,
        level : req.body.level,
        student_name : req.body.student_name,
        phone : req.body.phone,
        department : req.body.department
    }},{new:true})
    const updatedStudent = await studentsModel.findById({_id:req.params._id})
    res.status(202).json(updatedStudent)
})

// --------------------------------------------------------------------------

//Creating the levels collection in the database
const levelsSchema = mongoose.Schema({
    department : String,
    level : Number
});

let levelsModel = mongoose.model("Levels", levelsSchema);

//POST endpoint for levels collection
app.post('/eLearning/Levels',async(req,res)=>{
    const newLevel = new levelsModel({
    department : req.body.department,
    level : req.body.level
    });
    const val = await newLevel.save();
    res.status(200).json(val);
})

//GET all levels endpoint for the levels collection
app.get('/eLearning/Levels', async(req,res)=>{
    let allLevels = await levelsModel.find();
    res.status(201).json(allLevels);
})

//PATCH update a certain level in the levels collection
app.patch('/eLearning/Levels/:_id', async(req,res)=>{
    await levelsModel.findByIdAndUpdate({_id:req.params._id},{$set:{
        department : req.body.department,
        level : req.body.level
    }},{new:true})
    const updatedLevel = await levelsModel.findById({_id:req.params._id})
    res.status(202).json(updatedLevel)
})

// --------------------------------------------------------------------------

//Creating the materials collection in the database
const materialsSchema = mongoose.Schema({
    department : String,
    material_name : String,
    level : Number
});

let materialsModel = mongoose.model("Materials", materialsSchema);

//POST endpoint for materials collection
app.post('/eLearning/Materials',async(req,res)=>{
    const newMaterial = new materialsModel({
        department : req.body.department,
        material_name : req.body.material_name,
        level : req.body.level
    });
    const val = await newMaterial.save();
    res.status(200).json(val);
})

//GET all materials endpoint for the materials collection
app.get('/eLearning/Materials', async(req,res)=>{
    let allMaterials = await materialsModel.find();
    res.status(201).json(allMaterials);
})

//PATCH update a certain material in the materials collection
app.patch('/eLearning/Materials/:_id', async(req,res)=>{
    await materialsModel.findByIdAndUpdate({_id:req.params._id},{$set:{
        department : req.body.department,
        material_name : req.body.material_name,
        level : req.body.level
    }},{new:true})
    const updatedMaterial = await materialsModel.findById({_id:req.params._id})
    res.status(202).json(updatedMaterial)
})

// --------------------------------------------------------------------------

app.listen(3000, function(){
    console.log("Server is now open.")
})