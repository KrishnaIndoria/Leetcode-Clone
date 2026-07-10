const Problem = require('../models/problems');
const Submission = require('../models/submission');
const {getIDbyLanguage,submitBatch,submitTokens} = require('../utils/problemUtility')

const submitCode = async(req,res)=>{
    try{
        const userId = req.user._id;
        const problemId = req.params.id;
        let {code,language} = req.body;

        if(!userId||!problemId||!code||!language)
            return res.status(400).send("Some feild is missing");

        if(language === 'cpp'){
            language = 'c++'
        }

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

        const accepted = (status == 'accepted')
        res.status(201).json({
            accepted,
            totaltestCases : submitedResult.testCasesTotal,
            passedTestCases : submitedResult.testCasesPassed,
            runtime,
            memory
        })

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
        let {code,language} = req.body;

        if(!userId||!problemId||!code||!language)
            return res.status(400).send("Some feild is missing");

        if(language === 'cpp'){
            language = 'c++'
        }

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
        let runtime = 0;
        let memory = 0;
        let status = true;

        for (const test of testResult) {
            runtime += parseFloat(test.time || 0);
            memory = Math.max(memory, test.memory || 0);

          if (test.status_id !== 3) {
            status = false;
          }
        }

        const finalResult = testResult.map((test, index) => ({
        stdin: problem.visibleTestCases[index].inputs,
        expected_output: problem.visibleTestCases[index].output,

        stdout: test.stdout,
        stderr: test.stderr,
        compile_output: test.compile_output,

        status_id: test.status_id,
        status: test.status,

        time: test.time,
        memory: test.memory
        }));

        res.status(201).json({
        success: status,
        testCases: finalResult,
        runtime,
        memory
        });

    }
    catch(err){
        res.status(500).send("Error:"+err);
    }
}


module.exports = {submitCode,runCode};