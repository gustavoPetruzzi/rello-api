const sinon = require('sinon');
const User = require('../models/user');
const expect = require('chai').expect;
const AuthController = require('../controller/auth');
const sequelize = require('../utils/database');
const users = require('./dummy/dummy-user');
describe('Auth Controller',  function() {
    before(function(done) {
        sequelize.sync()
        .then( () => {
            console.log('se conecto');
            done();
        })
        .catch( (error) => console.log('che, se rompio esto', error));
    });
    it('Should create a new user', function() {
        const req = {
            body: {
                email: 'test@test.com',
                name: 'John',
                lastName: 'tester',
                password: '1161544761'
            }
        };
        const res = {
            statusCode : 500,
            message: '',
            status: function(code) {
                this.statusCode = code;
                return this;
            },
            json: function(data) {
                this.message = data.message;
                return this;
            }
        };

        return AuthController.signup(req, res, () => {})
            .then((response) => {
                expect(response.statusCode).to.be.equal(201);
                expect(response.message).to.be.equal('User created!');
            });
    });
    it('Should throw an error if an email is already registered', function() {
        const req = {
            body: users['firstDummyUser'],
        };
        const res = {
            statusCode : 500,
            message: '',
            status: function(code) {
                this.statusCode = code;
                return this;
            },
            json: function(data) {
                this.message = data.message;
                return this;
            }
        };

        return AuthController.signup(req,res, () =>{})
            .then(response => {
                expect(response.statusCode).to.be.equal(409);
                expect(response.message).to.be.equal('Email already registered');
            })

    })
    it('Should Login if email and password are registered', function() {
        const req = {
            body: {
                email: users['firstDummyUser'].email,
                password: users['firstDummyUser'].password,
            }
        };
        const res = {
            statusCode : 500,
            message: '',
            status: function(code) {
                this.statusCode = code;
                return this;
            },
            json: function(data) {
                this.message = data.message;
                return this;
            }
        };

        return AuthController.login(req, res, () => {})
            .then( (response) => {
                console.log(response);    
                expect(response.statusCode).to.be.equal(200);
                //TODO --> CHECK JWT
                //TODO --> CHECK USERID
            });
    })
    it('Should throw an error if the password is wrong', function() {
        const req = {
            body: {
                email: users['firstDummyUser'].email,
                password: 'bad password',
            }
        };
        const res = {
            statusCode : 500,
            message: '',
            status: function(code) {
                this.statusCode = code;
                return this;
            },
            json: function(data) {
                this.message = data.message;
                return this;
            }
        };

        return AuthController.login(req, res, () =>{})
            .then(response => {
                expect(response.statusCode).to.be.equal(401);
                expect(response.message).to.be.equal('Wrong password');
            })
    })
    after(function() {
        return User.destroy({
            where: {
                email: 'test@test.com',
            }
        })
        .then(() => sequelize.close())
        .then(() => {})
        .catch(error => console.log(error))
    })
});