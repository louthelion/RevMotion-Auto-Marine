'use strict';
const {validate}=require('./revmotion-inquiry-validation');
const json=(statusCode,code)=>({statusCode,headers:{'Content-Type':'application/json','Cache-Control':'no-store'},body:JSON.stringify({status:'unavailable',code})});
exports.handler=async(event)=>{
  if(event.httpMethod!=='POST') return json(405,'method_not_allowed');
  const type=event.headers?.['content-type']||event.headers?.['Content-Type']||'';
  if(!/^application\/json(?:\s*;|\s*$)/i.test(type)) return json(415,'json_required');
  if(typeof event.body!=='string'||Buffer.byteLength(event.body,'utf8')>8192) return json(413,'payload_rejected');
  let input;try{input=JSON.parse(event.body)}catch{return json(400,'invalid_json')}
  const checked=validate(input);
  if(!checked.ok) return json(422,checked.reason);
  // FAIL CLOSED: no database write, task creation or successful intake receipt.
  // Replace only after server-side persistence, abuse controls and RLS tests pass.
  return json(503,'inquiry_intake_not_activated');
};
