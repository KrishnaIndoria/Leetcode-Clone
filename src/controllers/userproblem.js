const {getIDbyLanguage,submitBatch,submitTokens} = require('../utils/problemUtility');
const Problem = require('../models/problems');

const CreateProblem = async(req,res)=>{
    
    const{title,description,difficulty,Tags,visibleTestCases,HiddenTestCases,startCode,referenceCode,problemCreator} = req.body;

    try{
        for(const {language,completeCode} of referenceCode){
            const lang_id = getIDbyLanguage(language);

            // here we create this submission for all 3 languages seperately
            // like c++ ke liye ek submission ,java ka ek , js ka ek
            // fir hum teeno submissions ko send karte hai to judge0
            const submissions = visibleTestCases.map(({input,output})=>({
                source_code : completeCode,
                language_id : lang_id,
                stdin:input,
                expected_output:output
            }));

            const submitResult = await submitBatch(submissions);

            const recievedTokens = submitResult.map(value=>value.token);
            const testResult = await submitTokens(recievedTokens);

            for(const result of testResult){
                if(result.status_id!=3)
                   return res.send("Error Occured");
            }
        }
        
        req.body.problemCreator = req.body._id;
        const createdProblem = await Problem.create(req.body);
        res.status(201).send("Problem created succesfully");
    }
    catch(err){
        res.send("Error:"+err);
    }
}

module.exports = CreateProblem;