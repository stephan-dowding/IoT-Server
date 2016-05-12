var CelloGame = require('../public/js/cello-game.js');
var expect = require('chai').expect
var sinon = require('sinon')

describe("CelloGame", function() {
  var game;
  sinon.stub(Math, 'random').returns(0.5);

  before(function() {
    game = new CelloGame();
  });

  describe("randomized correct answer", function(){
    it("should contains 0, 1, 2 and 3", function() {
      expect(game.answer).to.include(0);
      expect(game.answer).to.include(1);
      expect(game.answer).to.include(2);
      expect(game.answer).to.include(3);
    });

    it("should contains only 4 values", function() {
      expect(game.answer).to.have.lengthOf(4);
    });

    it("should return a randomized answer", function(){
      expect(game.answer).to.eql([0, 3, 1, 2]);
    });
  });

  describe("select random question set", function() {
    beforeEach(function(){
      Math.random.restore();
    });

    it("should return 1 when random is 0.5", function(){
        sinon.stub(Math, 'random').returns(0.5);
        expect(game.selectQuestionSet()).to.equal(1);
    });

    it("should return 3 when random is 1", function(){
        sinon.stub(Math, 'random').returns(1);
        expect(game.selectQuestionSet()).to.equal(3);
    });

    it("should return 0 when random is 0", function(){
        sinon.stub(Math, 'random').returns(0);
        expect(game.selectQuestionSet()).to.equal(0);
    });
  });

  describe("selectIconInQuestionSet", function(){
    it("should contains only 4 values", function() {
      expect(game.selectIconInQuestionSet()).to.have.lengthOf(4);
    });

    it("should contains only values defined", function() {
      Math.random.restore();
      expect(game.selectIconInQuestionSet()).to.have.any.keys('0', '1', '2', '3', '4', '5');
    });
  });

});
