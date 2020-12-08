const Board = require("../models/board");
const expect = require("chai").expect;
const BoardController = require("../controller/board");
const sequelize = require("../utils/database");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Column = require("../models/column");
const Card = require("../models/card");
const sinon = require("sinon");
const users = require("./dummy/dummy-users");
describe("Board Controller", function () {
  const boardName = "My board";
  let dummyBoard = {
    name: "My board",
  };
  let dummyUser;
  before(function (done) {
    Column.hasMany(Card);
    Board.hasMany(Column);
    User.hasMany(Board, {
      onUpdate: "CASCADE",
    });
    sequelize
      .sync({ force: true })
      .then(() => {
        console.log("connected");
      })
      .then(() => {
        return User.create(users.firstDummyUser, {
          raw: true,
        });
      })
      .then((createdUser) => {
        dummyUser = createdUser.dataValues;
        done();
      })
      .catch((error) => console.log(error));
  });
  it("Should create a board", function () {
    const req = {
      body: {
        name: dummyBoard.name,
      },
      userId: dummyUser.id,
    };
    const res = {
      statusCode: 500,
      message: "",
      status: function (code) {
        this.statusCode = code;
        return this;
      },
      json: function (data) {
        this.message = data.message;
        this.boardId = data.boardId;
        return this;
      },
    };
    return BoardController.addBoard(req, res, () => {}).then((response) => {
      expect(response.statusCode).to.be.equal(201);
      expect(response.message).to.be.equal("Board created");
      expect(response).to.have.property("boardId");
      dummyBoard.id = response.boardId;
    });
  });
  it("Should get all boards related to an user", function () {
    const req = {
      userId: dummyUser.id,
    };
    const res = {
      statusCode: 500,
      message: "",
      status: function (code) {
        this.statusCode = code;
        return this;
      },
      json: function (data) {
        this.boards = data.boards;
        return this;
      },
    };
    return BoardController.getBoards(req, res, () => {}).then((response) => {
      expect(response.statusCode).to.be.equal(200);
      expect(response.boards).to.be.an.instanceOf(Array);
    });
  });
  it("Should update a board", () => {
    // ENDPOINT IS WORKING BUT TEST NO, CHECK WHY IS IT NOT WORKING
    const req = {
      body: {
        name: "updated board",
      },
      params: {
        id: dummyBoard.id,
      },
      userId: dummyUser.id,
    };
    const res = {
      statusCode: 500,
      message: "",
      status: function (code) {
        this.statusCode = code;
        return this;
      },
      json: function (data) {
        this.message = data.message;
        return this;
      },
    };
    return BoardController.updateBoard(req, res, () => {}).then((response) => {
      expect(response.statusCode).to.be.equal(201);
      expect(response.message).to.be.equal("Board updated");
    });
  });
  it("Should delete a board", () => {
    const req = {
      userId: dummyUser.id,
      params: {
        id: dummyBoard.id,
      },
    };
    const res = {
      statusCode: 500,
      message: "",
      status: function (code) {
        this.statusCode = code;
        return this;
      },
      json: function (data) {
        this.message = data.message;
        return this;
      },
    };

    return BoardController.removeBoard(req, res, () => {}).then((response) => {
      expect(response.statusCode).to.be.equal(201);
    });
  });
  after(function () {
    return Board.destroy({
      where: {
        name: boardName,
      },
    })
      .then(() => {
        return User.destroy({
          where: {
            email: users.firstDummyUser.email,
          },
        });
      })
      .catch((error) => console.log(error));
  });
});
