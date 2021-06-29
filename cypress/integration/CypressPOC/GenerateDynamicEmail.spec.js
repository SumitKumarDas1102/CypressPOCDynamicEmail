/// <reference types="cypress"/>

import getUserName from './Utility/getUserName'

describe('Generate Dynamic Email', function(){

var requestPayload;
var userNameForTest;


before(function(){
    cy.fixture('apiRequest').then(function(data){
        requestPayload = data
    })
    
    const userName = new getUserName()
    userNameForTest = userName.getUserName()
    console.log(userNameForTest)

})

    it('Sent dynamic request data', function(){
        cy.request({
            method : 'POST',
            url:'https://dmsdev.simbiotiktech.com/api/dms/admin/v1/users',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : {
                'active': requestPayload.active,
                'branchCode': requestPayload.branchCode,
                'dateOfJoining': requestPayload.dateOfJoining,
                'dateOfLeaving': requestPayload.dateOfLeaving,
                'email' : userNameForTest + '@' + 'mailinator.com',
                'fullName': userNameForTest,
                'groupCode': requestPayload.groupCode,
                'id': requestPayload.id,
                'jobTitle': requestPayload.jobTitle,
                'name': userNameForTest,
                'password': requestPayload.password,
                'superiorId':requestPayload.superiorId,
                'type': requestPayload.type
            },
        }).then(function(res){
            console.log(res)
            expect(res.body.status).to.equal(201)
        })
    })
})