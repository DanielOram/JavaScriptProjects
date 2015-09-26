'use strict';

describe('Service: gameGrid', function () {

  // load the service's module
  beforeEach(module('memorycardgameApp'));

  // instantiate service
  var gameGrid;
  beforeEach(inject(function (_gameGrid_) {
    gameGrid = _gameGrid_;
  }));

  it('should do something', function () {
    expect(!!gameGrid).toBe(true);
  });

});
