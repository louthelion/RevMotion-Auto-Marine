'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const {makeHarness}=require('./synthetic-inquiry-harness.cjs');
const input={category:'buyer',full_name:'Synthetic Only',email:'nobody@example.invalid',city_area:'Test Area',message:'Testing',consent:true,consent_version:'test-v1',submission_token:'synthetic-001'};
test('buyer creates exactly one REV-D04 synthetic task',()=>{
 const h=makeHarness(),r=h.submit(input);
 assert.equal(r.ok,true);assert.equal(h.counts().inquiries,1);assert.equal(h.counts().tasks,1);
 assert.deepEqual(h.getTask(r.reference),{reference:r.reference,department:'REV-D04',status:'open'});
});
test('identical retry does not duplicate inquiry or task',()=>{
 const h=makeHarness(),a=h.submit(input),b=h.submit(input);
 assert.equal(a.reference,b.reference);assert.equal(b.duplicate,true);assert.deepEqual(h.counts(),{inquiries:1,tasks:1});
});
test('seller gets separate reference and scoped task',()=>{
 const h=makeHarness(),a=h.submit(input),b=h.submit({...input,category:'seller',submission_token:'synthetic-002'});
 assert.notEqual(a.reference,b.reference);assert.equal(h.getTask(b.reference).department,'REV-D04');
});
test('invalid consent does not write a record',()=>{
 const h=makeHarness(),r=h.submit({...input,consent:false});
 assert.equal(r.ok,false);assert.deepEqual(h.counts(),{inquiries:0,tasks:0});
});
