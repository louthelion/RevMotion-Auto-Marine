'use strict';
// Pure server-side input validation. No storage or networking.
const allowed = new Set(['category','full_name','email','city_area','message','consent','consent_version','submission_token']);
function validate(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return {ok:false,reason:'invalid_payload'};
  if (Object.keys(input).some(k=>!allowed.has(k))) return {ok:false,reason:'unsupported_field'};
  const get=(key,max)=>typeof input[key]==='string' && input[key].trim().length>0 && input[key].trim().length<=max;
  if (!['buyer','seller'].includes(input.category)) return {ok:false,reason:'invalid_category'};
  if (!get('full_name',160)||!get('email',254)||!get('city_area',160)||!get('message',2000)) return {ok:false,reason:'invalid_field'};
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email.trim())) return {ok:false,reason:'invalid_email'};
  if (input.consent!==true || !get('consent_version',50)) return {ok:false,reason:'consent_required'};
  if (!get('submission_token',120)) return {ok:false,reason:'invalid_submission_token'};
  return {ok:true};
}
module.exports={validate};
