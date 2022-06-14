const chai = require('chai');
const { expect } = chai;
const chaiHttp = require("chai-http");

const app = require('../index');
const util = require('../test/utils/bcrypt');

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
        var token = '';
        beforeEach(async function () {
            const hash = await util.getHash();
            token = `Bearer ${hash}`;
        });
        it("should return profile data", function(done) {
            chai
            .request(app)
            .get('/profile')
            .set('Authorization', token)
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
        it("should return 401 if hash not found", function(done) {
            chai
            .request(app)
            .get('/profile')
            .end((err, res) => {
                if (err) {
                    throw done(err);
                }
                
                expect(res.status).to.equal(401);
                expect(res.text).to.equal('Unauthorized Access, Hash Not Found');
                return done();
            })
        });
        it("should return 401 if invalid hash found", function(done) {
            chai
            .request(app)
            .get('/profile')
            .set('Authorization', 'Bearer InvalidHash')
            .end((err, res) => {
                if (err) {
                    throw done(err);
                }
                
                expect(res.status).to.equal(401);
                expect(res.text).to.equal('Invalid Hash');
                return done();
            })
        });
    });

    describe("POST /verification", function () {
        const salt = {
            salt: util.getSalt()
        };
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
        it("should return 404 if salt not sent", function(done) {
            chai
            .request(app)
            .post('/verification')
            .send()
            .end((err,res) => {
                if (err) {
                    throw done(err);
                }
                expect(res.status).to.equal(404);
                expect(res.text).to.equal("Salt not found");

                return done();
            });
        });
        it("should return 500 if invalid salt is recieved", function(done) {
            chai
            .request(app)
            .post('/verification')
            .send({salt: "invalidSalt"})
            .end((err,res) => {
                if (err) {
                    throw done(err);
                }
                expect(res.status).to.equal(500);
                expect(res.text).to.equal("Error while encryption");

                return done();
            });
        });
    });
});