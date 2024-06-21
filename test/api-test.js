const chai = require('chai');
const supertest = require('supertest');
const fs = require('fs')
const chaiJsonSchema = require('chai-json-schema')
const baseURL = "https://reqres.in/api";
chai.use(chaiJsonSchema)
const expect = chai.expect;

describe('reqres.in API Test', () => {
    it('TC1 - GET Single User', async () => {
        const schema = JSON.parse(fs.readFileSync("resource/schema/get_single_user_schema.json", 'utf8'));
        const response = await supertest(baseURL)
            .get("/users/2");

        console.log(response.body);
        expect(response.status).to.equal(200)
        expect(response.body.data.id).to.equal(2)
        expect(response.body).to.be.jsonSchema(schema)
    });

    it('TC2 - POST Object', async () => {
        const schema = JSON.parse(fs.readFileSync("resource/schema/post_create_schema.json", 'utf8'));
        const postData = {
            name: "Haqim",
            job: "peserta bootcamp"
        };
        const response = await supertest(baseURL)
            .post("/users")
            .send(postData)
            .set('Accept', 'application/json');

        const responseBody = response.body;
        console.log(responseBody);
        
        expect(responseBody).to.have.property('name').eql(postData.name);
        expect(responseBody).to.have.property('job').eql(postData.job);
        expect(response.status).to.be.oneOf([201, 202]);
        expect(responseBody).to.be.jsonSchema(schema);
    });

    it('TC3 - PUT Update Object', async () => {
        const schema = JSON.parse(fs.readFileSync("resource/schema/put_update_schema.json", 'utf8'));
        const putData = {
            name: "Haqim update",
            job: "quality update"
        };
        const response = await supertest(baseURL)
            .put("/users/2")
            .send(putData)
            .set('Accept', 'application/json');

        const responseBody = response.body;
        console.log(responseBody);
        
        expect(responseBody).to.have.property('name').eql(putData.name);
        expect(responseBody).to.have.property('job').eql(putData.job);
        expect(response.status).to.equal(200);
        expect(responseBody).to.be.jsonSchema(schema);
    });

    it('TC4 - DELETE User', async () => {
        const response = await supertest(baseURL)
            .delete("/users/2")
            .set('Accept', 'application/json');

        expect(response.status).to.equal(204);
    });
});

