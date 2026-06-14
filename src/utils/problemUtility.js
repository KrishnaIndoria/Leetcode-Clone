const axios = require('axios');

const getIDbyLanguage = (lang)=>{
    const language={
        "c++":54,
        "java":62,
        "javascript":63
    }
    return language[lang.toLowerCase()];  //ex: language[java] , returns 62
};

const submitBatch = async(submissions)=>{

    const options = {
    method: 'POST',
    url: 'https://ce.judge0.com/submissions/batch',
    params: {
        base64_encoded: 'false'
    },
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
       submissions
    }
};

async function fetchData() {
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

return await fetchData();
};

const waiting = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const submitTokens = async (resultTokens) => {
  const tokenString = resultTokens.map(t => t.token).join(",");
  const options = {
     method: 'GET',
     url: 'https://ce.judge0.com/submissions/batch',
     params: {
        tokens: tokenString,
        base64_encoded: 'false',
        fields: 'stdout,stderr,status_id,status,compile_output'
     }
  };

  while (true) {
    try{
      const response = await axios.request(options);
      const results = response.data.submissions;
      const isFinished = results.every((r) => r.status_id > 2);
      if (isFinished) {
        return results;
      }
      console.log("Still processing... waiting 1 second");
      await waiting(1000);
    }
    catch (error){
      throw new Error("error:"+error);
      break;
    }
  }
};
  

     
module.exports = {getIDbyLanguage,submitBatch,submitTokens};
