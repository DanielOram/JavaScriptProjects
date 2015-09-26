'use strict';

describe('Service: gameGridService', function () {

  // load the service's module
  beforeEach(module('memorycardgameApp'));

  // instantiate service
  var gameGridService;
  beforeEach(inject(function (_gameGridService_) {
    gameGridService = _gameGridService_;
  }));

  it('should do something', function () {
    expect(!!gameGridService).toBe(true);
  });

});
