const {getIDbyLanguage,submitBatch,submitTokens} = require('../utils/problemUtility');
const Problem = require('../models/problems');
const User = require('../models/user');

const CreateProblem = async(req,res)=>{
    
    const{title,description,difficulty,Tags,visibleTestCases,HiddenTestCases,startCode,referenceCode,problemCreator} = req.body;

    try{
        for(const {language,completeCode} of referenceCode){
            const lang_id = getIDbyLanguage(language);

            // here we create this submission for all 3 languages seperately
            // like c++ ke liye ek submission ,java ka ek , js ka ek
            // fir hum teeno submissions ko send karte hai to judge0
            const submissions = visibleTestCases.map((testcase)=>({
                source_code : completeCode,
                language_id : lang_id,
                stdin:testcase.inputs,
                expected_output:testcase.output
            }));

            const submitResult = await submitBatch(submissions);
            console.log(submitResult);
            const recievedTokens = submitResult.map(value=>value.token);
            const testResult = await submitTokens(recievedTokens);
            console.log(testResult);

            for(const result of testResult){
                if(result.status_id!=3)
                   return res.send("Error Occured");
            }
        }
        
        req.body.problemCreator = req.user._id;
        const createdProblem = await Problem.create(req.body);
        res.status(201).send("Problem created succesfully");
    }
    catch(err){
        res.status(500).send("Error:"+err);
    }
}

const UpdateProblem = async(req,res)=>{
    const{title,description,difficulty,Tags,visibleTestCases,HiddenTestCases,startCode,referenceCode,problemCreator} = req.body;

    try{
        for(const {language,completeCode} of referenceCode){
            const lang_id = getIDbyLanguage(language);

            // here we create this submission for all 3 languages seperately
            // like c++ ke liye ek submission ,java ka ek , js ka ek
            // fir hum teeno submissions ko send karte hai to judge0
            const submissions = visibleTestCases.map((testcase)=>({
                source_code : completeCode,
                language_id : lang_id,
                stdin:testcase.inputs,
                expected_output:testcase.output
            }));

            const submitResult = await submitBatch(submissions);
            console.log(submitResult);
            const recievedTokens = submitResult.map(value=>value.token);
            const testResult = await submitTokens(recievedTokens);
            console.log(testResult);

            for(const result of testResult){
                if(result.status_id!=3)
                   return res.send("Error Occured");
            }
        }

        const id = req.params.id;
        if(!id)
            return res.status(404).send("Id is missing");

        const updatedProblem = await Problem.findByIdAndUpdate(id,req.body,{runValidators:true,new:true});
        if(!updatedProblem)
            return res.status(404).send("ID(problem) does not exist");

        res.status(200).send(updatedProblem);

    }
    catch(err){
        res.status(500).send("Error:"+err);
    }
}

const DeleteProblem = async(req,res)=>{
   try{
    const id = req.params.id;
    if(!id)
        return res.status(404).send("Id is missing");

    const deletedProblem = await Problem.findByIdAndDelete(id);
    if(!deletedProblem)
        return res.status(404).send("Problem does not exist");

    res.status(200).send("Deleted problem succesfully");
   }
   catch(err){
    res.status(500).send("Error:"+err);
   }
}

const getProblembyID = async(req,res)=>{
    try{
    const id = req.params.id;
    if(!id)
       return res.status(404).send("ID is missing");
    const result = await Problem.findById(id).select('_id title description difficulty Tags visibleTestCases startCode referenceCode');
    if(!result)
       return res.status(404).send("Problem not found");

    res.status(200).send(result);
    }
    catch(err){
        res.status(500).send("Error:"+err);
    }
}

const getAllProblem = async(req,res)=>{
    try{
        const result = await Problem.find().select('_id title difficulty Tags');
        if(result.length==0)
            return res.status(404).send("Problems not found");
        res.status(200).send(result);
    }
    catch(err){
        res.status(500).send("Error:"+err);
    }
}

const SolvedProblembyUser = async(req,res)=>{
    try{
        const userID = await req.user._id;
        const user = await User.findById(userID).populate({
            path:"problemsolved",
            select:"_id title difficulty Tags"
        });
        res.status(200).send(user.problemsolved);
    }
    catch(err){
        res.status(500).send("Error:"+err);
    }
}
module.exports = {CreateProblem,UpdateProblem,DeleteProblem,getProblembyID,getAllProblem,SolvedProblembyUser};