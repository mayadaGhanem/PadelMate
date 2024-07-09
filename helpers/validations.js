 function checkEmailValidation(value) {
   //  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   // console.log(emailRegex.test(value),'shshsh')
   //  return emailRegex.test(value);
   return true
     
 }
 
  function checkPhoneValidation(value) {
    const mobileRegex = /^(011|012|010|015)\d*$/;
    return mobileRegex.test(value);

 }
 
 module.exports={
    checkEmailValidation,
    checkPhoneValidation
 }