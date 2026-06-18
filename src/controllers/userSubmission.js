const Problem = require('../models/problems');
const Submission = require('../models/submission');
const {getIDbyLanguage,submitBatch,submitTokens} = require('../utils/problemUtility')

const submitCode = async(req,res)=>{
    try{
        const userId = req.user._id;
        const problemId = req.params.id;
        const {code,language} = req.body;

        if(!userId||!problemId||!code||!language)
            return res.status(400).send("Some feild is missing");

        const problem = await Problem.findById(problemId);

        const submitedResult = await Submission.create({
            userId,
            problemId,
            code,
            language,
            status:'pending',
            testCasesTotal : problem.HiddenTestCases.length
        })

        const lang_id = getIDbyLanguage(language);

        const submissions = problem.HiddenTestCases.map((testcase)=>({
            source_code : code,
            language_id : lang_id,
            stdin:testcase.inputs,
            expected_output:testcase.output
        }));

        const submitResult = await submitBatch(submissions);
        const recievedTokens = submitResult.map(value=>value.token);
        const testResult = await submitTokens(recievedTokens);

        let testCasesPassed = 0;
        let runtime = 0;
        let memory = 0;
        let status = 'accepted';
        let errorMessage = 'null';
        for(const test of testResult){
            if(test.status_id==3){
                testCasesPassed++;
                runtime = runtime+parseFloat(test.time);
                memory = Math.max(memory,test.memory);
            }
            else{
                if(test.status_id==4){
                    status = 'error';
                    errorMessage = test.stderr;
                }
                else{
                    status = 'wrong';
                    errorMessage = test.stderr;
                }
            }


        }

        submitedResult.status = status;
        submitedResult.runtime = runtime;
        submitedResult.memory = memory;
        submitedResult.errorMessage = errorMessage;
        submitedResult.testCasesPassed = testCasesPassed;

        await submitedResult.save();

        if(!req.user.problemsolved.includes(problemId)){
            req.user.problemsolved.push(problemId);
            await req.user.save();
        }

        res.status(201).send(submitedResult);

    }
    catch(err){
        res.status(500).send("Error:"+err);
    }
}

// here we only check code , but do not save it in DB.
const runCode = async(req,res)=>{
        try{
        const userId = req.user._id;
        const problemId = req.params.id;
        const {code,language} = req.body;

        if(!userId||!problemId||!code||!language)
            return res.status(400).send("Some feild is missing");

        const problem = await Problem.findById(problemId);

        const lang_id = getIDbyLanguage(language);

        const submissions = problem.visibleTestCases.map((testcase)=>({
            source_code : code,
            language_id : lang_id,
            stdin:testcase.inputs,
            expected_output:testcase.output
        }));

        const submitResult = await submitBatch(submissions);
        const recievedTokens = submitResult.map(value=>value.token);
        const testResult = await submitTokens(recievedTokens);

        res.status(201).send(testResult);

    }
    catch(err){
        res.status(500).send("Error:"+err);
    }
}


module.exports = {submitCode,runCode};