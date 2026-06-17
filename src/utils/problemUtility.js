const axios = require('axios');

const getIDbyLanguage = (lang)=>{
    const language={
        "c++":54,
        "java":62,
        "javascript":102
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
  const tokenString = resultTokens.join(",");
  console.log(tokenString);
  const options = {
     method: 'GET',
     url: 'https://ce.judge0.com/submissions/batch',
     timeout: 5000,
     params: {
        tokens: tokenString,
        base64_encoded: 'false',
        fields: 'stdout,stderr,status_id,status,compile_output,time,memory'
     }
  };

  while (true) {
    try{
      console.log("Sending GET request");
      const response = await axios.request(options);
      console.log("Response:");
      console.log(JSON.stringify(response.data,null,2));
      const results = response.data.submissions;
      const isFinished = results.every((r) => r.status_id > 2);
      console.log("Finished:", isFinished);
      if (isFinished) {
        return results;
      }
      console.log("Still processing... waiting 1 second");
      await waiting(1000);
    }
    catch(error){
      console.log(error.response?.data);
      console.log(error.message);
      throw error;
    }
  }
};
  

     
module.exports = {getIDbyLanguage,submitBatch,submitTokens};
