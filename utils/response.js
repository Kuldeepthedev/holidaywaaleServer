exports.jsonResponse = (res, status, data) => {
    if (status === 200) {
      return res.status(status).json({
          message:'success',
          data:data
      });
    } else {
      let responseData = {};
      if (data && (data.error || typeof data === 'string')) {
        responseData.error = data.error || data;
      } else {
        responseData.errorMessage = 'Unknown error';
      }
      return res.status(status).json(responseData);
    }
  };
  
