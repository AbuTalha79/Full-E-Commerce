const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      
    },
  });
  


  module.exports = {uniqueId,transporter}