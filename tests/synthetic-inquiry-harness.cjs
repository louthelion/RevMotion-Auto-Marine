'use strict';
// Synthetic, process-local harness ONLY. Not a production persistence implementation.
// A caller-supplied transaction adapter must provide atomicity before deployment.
const {validate}=require('../netlify/functions/revmotion-inquiry-validation');
function makeHarness(){
 const byToken=new Map(),tasks=new Map();
 let seq=0;
 function submit(input){
  const check=validate(input);
  if(!check.ok)return {ok:false,error:check.reason};
  if(byToken.has(input.submission_token))return {ok:true,duplicate:true,reference:byToken.get(input.submission_token).reference};
  const reference='SYN-RM-'+String(++seq).padStart(4,'0');
  const inquiry={reference,category:input.category,department:'REV-D04',status:'new'};
  const task={reference,department:'REV-D04',status:'open'};
  byToken.set(input.submission_token,inquiry);tasks.set(reference,task);
  return {ok:true,duplicate:false,reference};
 }
 return {submit,counts:()=>({inquiries:byToken.size,tasks:tasks.size}),getTask:ref=>tasks.get(ref)};
}
module.exports={makeHarness};
