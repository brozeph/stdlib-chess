/* Import dependencies, declare constants */
const
  cryto = require('crypto'),

  chess = require('chess');

/**
* Your function call
* @param {Object} params Execution parameters
*   Members
*   - {Array} args Arguments passed to function
*   - {Object} kwargs Keyword arguments (key-value pairs) passed to function
*   - {String} remoteAddress The IPv4 or IPv6 address of the caller
*
* @param {Function} callback Execute this to end the function call
*   Arguments
*   - {Error} error The error to show if function fails
*   - {Any} returnValue JSON serializable (or Buffer) return value
*/
module.exports = (params, callback) => {
  let
    client = chess.create(),
    context = [null];

  try {
    // define the parts of the identifer
    if (params.kwargs.stateCode) {
      // format <board hash>:<move 1>:<move 2>:<move X>
      context = new Buffer(params.kwargs.stateCode, 'base64')
        .toString('utf8')
        .split(/\:/g);
    }

    // hydrate the game
    if (context.length > 1) {
      context.slice(1).forEach((notation) => client.move(notation));
    }

    // check for a move and apply it
    if (params.kwargs.notation) {
      client.move(params.kwargs.notation);
      context.push(params.kwargs.notation);
    }
  } catch (ex) {
    return callback(ex);
  }

  // assign leading identifier as the board hash
  context[0] = client.game.getHashCode();

  // reply to caller with results
  return callback(null, {
    stateCode : new Buffer(context.join(':')).toString('base64'),
    notations : client.notatedMoves,
    history : client.game.moveHistory,
    squares : client.game.board.squares,
    state : {
      check : client.isCheck,
      mate : client.isCheckmate,
      repetition : client.isRepetition,
      stalemate : client.isStalemate
    }
  });
};
