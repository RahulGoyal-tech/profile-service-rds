const chai = require('chai');
const { expect } = chai;
const chaiHttp = require("chai-http");

const app = require('../index');

const salt = {
    salt:"$2b$10$X4T2iflikVYGsCmJxHP8Y."
};

chai.use(chaiHttp);

describe("Profile Service", function () {
    describe("GET /health", function() {
        it("should return successful status", function(done) {
            chai
            .request(app)
            .get('/health')
            .end((err, res) => {
                if(err) {
                    throw done(err);
                }
                expect(res).to.have.status(200);

                return done();
            });
        });
    });

    describe("GET /profile", function() {
        it("should return profile data", function(done) {
            chai
            .request(app)
            .get('/profile')
            .end((err, res) => {
                if (err) {
                    throw done(err);
                }
                res.body = JSON.parse(res.text);
                expect(res.status).to.equal(200);
                expect(res.body.first_name).to.be.a("string");
                expect(res.body.last_name).to.be.a("string");
                expect(res.body.email).to.be.a("string");
                expect(res.body.phone).to.be.a("string");
                expect(res.body.yoe).to.be.a("number");
                expect(res.body.company).to.be.a("string");
                expect(res.body.designation).to.be.a("string");
                expect(res.body.github_id).to.be.a("string");
                expect(res.body.linkedin_id).to.be.a("string");
                expect(res.body.twitter_id).to.be.a("string");
                expect(res.body.instagram_id).to.be.a("string");
                expect(res.body.website).to.be.a("string");

                return done();
            })
        });
    });

    describe("POST /verification", function () {
        it("should return a string containing hash based on salt", function(done) {
            chai
            .request(app)
            .post('/verification')
            .send(salt)
            .end((err,res) => {
                if (err) {
                    throw done(err);
                }
                res.body = JSON.parse(res.text);
                expect(res.status).to.equal(200);
                expect(res.body.hash).to.be.a('string');

                return done();
            });
        });
    });
});