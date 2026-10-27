'use strict';
const assert=require('node:assert/strict');
const {test}=require('node:test');
const {validate}=require('../netlify/functions/revmotion-inquiry-validation');
const {handler}=require('../netlify/functions/revmotion-inquiry');
const valid={category:'buyer',full_name:'Synthetic Person',email:'synthetic@example.invalid',city_area:'Test City',message:'Synthetic only',consent:true,consent_version:'draft-1',submission_token:'synthetic-idempotency-key'};
test('valid minimal buyer/seller inputs',()=>{assert.equal(validate(valid).ok,true);assert.equal(validate({...valid,category:'seller'}).ok,true)});
test('rejects sensitive unexpected fields',()=>{assert.equal(validate({...valid,title_photo:'fake'}).ok,false);assert.equal(validate({...valid,credit_range:'700'}).ok,false)});
test('rejects missing consent and malformed emails',()=>{assert.equal(validate({...valid,consent:false}).ok,false);assert.equal(validate({...valid,email:'bad'}).ok,false)});
test('never produces success even on valid request',async()=>{const x=await handler({httpMethod:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(valid)});assert.equal(x.statusCode,503);assert.equal(JSON.parse(x.body).code,'inquiry_intake_not_activated')});
test('rejects GET and non-JSON',async()=>{assert.equal((await handler({httpMethod:'GET'})).statusCode,405);assert.equal((await handler({httpMethod:'POST',headers:{'content-type':'text/plain'},body:'x'})).statusCode,415)});

test('rejects oversized, missing and unknown categories',()=>{
 assert.equal(validate({...valid,message:'x'.repeat(2001)}).ok,false);
 assert.equal(validate({...valid,category:'brokerage'}).ok,false);
 assert.equal(validate({...valid,submission_token:''}).ok,false);
});
test('rejects bad JSON, oversize bodies and unexpected fields without success',async()=>{
 const ev=(body)=>({httpMethod:'POST',headers:{'content-type':'application/json'},body});
 assert.equal((await handler(ev('{bad'))).statusCode,400);
 assert.equal((await handler(ev('x'.repeat(8193)))).statusCode,413);
 assert.equal((await handler(ev(JSON.stringify({...valid,extra_documents:'none'})))).statusCode,422);
});
