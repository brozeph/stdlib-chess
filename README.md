# Chess Board Service

This service exists to validate and track board movements and provide a valid set of moves (in Algebraic Notation) for the consumer. The underlying functionality is provided by the open source NPM module, [`chess`](https://brozeph.github.io/node-chess/).

# Parameters

## Keyword arguments

* `stateCode` - this is the identifer for the board at the current state (this value is returned as `stateCode` after each move)
* `notation` - the notation for the next move to apply to the board

# Usage

When an initial request is made to the API with no keyword arguments specified (`stateCode` or `notation`), a new game will be created and a response is returned highlighting available moves for the `white` side to make. The `stateCode` returned in the response represents that board at that state (for a new game, this value of `stateCode` is `cWFtVUExd0hFUFBhd2RDSzFMMUtZQT09`).

In order to make a subsequent move, the `stateCode` of the game along with the appropriate `notation` value must be supplied to the service. This will return a response with a new `stateCode` that must be used in conjunction with the next move to continue to move pieces on the game's board.

All requests to the service will result in either the creation of a new game board or continuation of an existing game board. Each response will contain the following top-level properties (in a JSON payload):

* `stateCode` - the identifier required to resume the game at the current state (this value changes after each move)
* `notations`
  * { algebraic notation of move } (i.e. `a4`, `Nf3`, etc.)
    * `src`
      * `file` - the file where the piece that can be moved currently sits (`a`, `b`, `c`, `d`, `e`, `f` or `g`)
      * `rank` - the rank where the piece that can be moved currently sites (`1`, `2`, `3`, `4`, `5`, `6`, `7` or `8`)
      * `piece`
        * `moveCount` - a number representing the number of times the piece has been moved
        * `side`
          * `name` - a string indicating the color of the piece: `white` or `black`
        * `type` - a string indicating the type of the piece: `pawn`, `bishop`, `knight`, `rook`, `queen` or `king`
    * `dest`
      * `file` - the file where the piece that can be moved would move to (`a`, `b`, `c`, `d`, `e`, `f` or `g`)
      * `rank` - the rank where the piece that can be moved would move to (`1`, `2`, `3`, `4`, `5`, `6`, `7` or `8`)
      * `piece`
        * `moveCount` - a number representing the number of times the piece has been moved
        * `side`
          * `name` - a string indicating the color of the piece: `white` or `black`
        * `type` - a string indicating the type of the piece: `pawn`, `bishop`, `knight`, `rook`, `queen` or `king`
* `history` - an array of objects with the following properties:
  * `capturedPiece` - if a piece was captured, it would be noted here
  * `hashCode` - the identifier of the board piece position after this move
  * `algebraic` - the algebraic notation of the move
  * `promotion` - `true` or `false` depending on whether the move resulted in a promotion of a piece
  * `piece`
    * `moveCount` - a number representing the number of times the piece has been moved
    * `side`
      * `name` - a string indicating the color of the piece: `white` or `black`
    * `type` - a string indicating the type of the piece: `pawn`, `bishop`, `knight`, `rook`, `queen` or `king`
  * `prevFile` - the previous file where the piece once lived prior to the move
  * `prevRank` - the previous rank where the piece once lived prior to the move
  * `postFile` - the file where the piece lives after the move
  * `postRank` - the rank where the piece lives after the move
* `squares` - an array of objects with the following properties
  * `file` - a lower case letter value that notes the `column` of the chess board: `a`, `b`, `c`, `d`, `e`, `f` or `g`, `h`
  * `rank` - a number that notes the `row` of chess board: `1`, `2`, `3`, `4`, `5`, `6`, `7` or `8`
  * `piece` - an object that represents the piece
    * `moveCount` - a number representing the number of times the piece has been moved
    * `side`
      * `name` - a string indicating the color of the piece: `white` or `black`
    * `type` - a string indicating the type of the piece: `pawn`, `bishop`, `knight`, `rook`, `queen` or `king`
* `state`
  * `check` - `true` or `false` indicating whether or not a King on the board is in check
  * `mate` - `true` or `false` indicating whether or not a King on the board is in check mate
  * `repetition` - `true` or `false` indicating whether a 3 fold repetition has occurred on the board
  * `stalemate` - `true` or `false` indicating whether or not the board is in stalemate

## Command line

Each call returns a JSON payload that provides insight into available moves (`notations`), the history of moves to this point (`history`), each square on the board (`squares`), the current state of the game (`state`) and an identifier necessary for making the next move (`stateCode`).

```bash
f brozeph/chess/game --stateCode "anBwRVB3RkdxVXR0L00wN3JFTmV2UT09OmIz" --notation a5
```

The above command returns the following:

```json
{
  "stateCode": "dlNRWDhtalVSaUpiVnFWVnQzVDNndz09OmIzOmE1",
  "notations": {
    "Na3": {
      "src": {
        "file": "b",
        "rank": 1,
        "piece": {
          "moveCount": 0,
          "side": {
            "name": "white"
          },
          "type": "knight",
          "notation": "N"
        }
      },
      "dest": {
        "file": "a",
        "rank": 3,
        "piece": null
      }
    },
    "Nc3": {
      "src": {
        "file": "b",
        "rank": 1,
        "piece": {
          "moveCount": 0,
          "side": {
            "name": "white"
          },
          "type": "knight",
          "notation": "N"
        }
      },
      "dest": {
        "file": "c",
        "rank": 3,
        "piece": null
      }
    },
    "Bb2": {
      "src": {
        "file": "c",
        "rank": 1,
        "piece": {
          "moveCount": 0,
          "side": {
            "name": "white"
          },
          "type": "bishop",
          "notation": "B"
        }
      },
      "dest": {
        "file": "b",
        "rank": 2,
        "piece": null
      }
    },
    "Ba3": {
      "src": {
        "file": "c",
        "rank": 1,
        "piece": {
          "moveCount": 0,
          "side": {
            "name": "white"
          },
          "type": "bishop",
          "notation": "B"
        }
      },
      "dest": {
        "file": "a",
        "rank": 3,
        "piece": null
      }
    },
    "Nf3": {
      "src": {
        "file": "g",
        "rank": 1,
        "piece": {
          "moveCount": 0,
          "side": {
            "name": "white"
          },
          "type": "knight",
          "notation": "N"
        }
      },
      "dest": {
        "file": "f",
        "rank": 3,
        "piece": null
      }
    },
    "Nh3": {
      "src": {
        "file": "g",
        "rank": 1,
        "piece": {
          "moveCount": 0,
          "side": {
            "name": "white"
          },
          "type": "knight",
          "notation": "N"
        }
      },
      "dest": {
        "file": "h",
        "rank": 3,
        "piece": null
      }
    },
    "a3": {
      "src": {
        "file": "a",
        "rank": 2,
        "piece": {
          "moveCount": 0,
          "side": {
            "name": "white"
          },
          "type": "pawn",
          "notation": ""
        }
      },
      "dest": {
        "file": "a",
        "rank": 3,
        "piece": null
      }
    },
    "a4": {
      "src": {
        "file": "a",
        "rank": 2,
        "piece": {
          "moveCount": 0,
          "side": {
            "name": "white"
          },
          "type": "pawn",
          "notation": ""
        }
      },
      "dest": {
        "file": "a",
        "rank": 4,
        "piece": null
      }
    },
    "c3": {
      "src": {
        "file": "c",
        "rank": 2,
        "piece": {
          "moveCount": 0,
          "side": {
            "name": "white"
          },
          "type": "pawn",
          "notation": ""
        }
      },
      "dest": {
        "file": "c",
        "rank": 3,
        "piece": null
      }
    },
    "c4": {
      "src": {
        "file": "c",
        "rank": 2,
        "piece": {
          "moveCount": 0,
          "side": {
            "name": "white"
          },
          "type": "pawn",
          "notation": ""
        }
      },
      "dest": {
        "file": "c",
        "rank": 4,
        "piece": null
      }
    },
    "d3": {
      "src": {
        "file": "d",
        "rank": 2,
        "piece": {
          "moveCount": 0,
          "side": {
            "name": "white"
          },
          "type": "pawn",
          "notation": ""
        }
      },
      "dest": {
        "file": "d",
        "rank": 3,
        "piece": null
      }
    },
    "d4": {
      "src": {
        "file": "d",
        "rank": 2,
        "piece": {
          "moveCount": 0,
          "side": {
          "name": "white"
          },
          "type": "pawn",
          "notation": ""
        }
      },
      "dest": {
        "file": "d",
        "rank": 4,
        "piece": null
      }
    },
    "e3": {
      "src": {
        "file": "e",
        "rank": 2,
        "piece": {
          "moveCount": 0,
          "side": {
            "name": "white"
          },
          "type": "pawn",
          "notation": ""
        }
      },
      "dest": {
        "file": "e",
        "rank": 3,
        "piece": null
      }
    },
    "e4": {
      "src": {
        "file": "e",
        "rank": 2,
        "piece": {
          "moveCount": 0,
          "side": {
            "name": "white"
          },
          "type": "pawn",
          "notation": ""
        }
      },
      "dest": {
        "file": "e",
        "rank": 4,
        "piece": null
      }
    },
    "f3": {
      "src": {
        "file": "f",
        "rank": 2,
        "piece": {
          "moveCount": 0,
          "side": {
            "name": "white"
          },
          "type": "pawn",
          "notation": ""
        }
      },
      "dest": {
        "file": "f",
        "rank": 3,
        "piece": null
      }
    },
    "f4": {
      "src": {
        "file": "f",
        "rank": 2,
        "piece": {
          "moveCount": 0,
          "side": {
            "name": "white"
          },
          "type": "pawn",
          "notation": ""
        }
      },
      "dest": {
        "file": "f",
        "rank": 4,
        "piece": null
      }
    },
    "g3": {
      "src": {
        "file": "g",
        "rank": 2,
        "piece": {
          "moveCount": 0,
          "side": {
            "name": "white"
          },
          "type": "pawn",
          "notation": ""
        }
      },
        "dest": {
        "file": "g",
        "rank": 3,
        "piece": null
      }
    },
    "g4": {
      "src": {
        "file": "g",
        "rank": 2,
        "piece": {
          "moveCount": 0,
          "side": {
            "name": "white"
          },
          "type": "pawn",
          "notation": ""
        }
      },
      "dest": {
        "file": "g",
        "rank": 4,
        "piece": null
      }
    },
    "h3": {
      "src": {
        "file": "h",
        "rank": 2,
        "piece": {
          "moveCount": 0,
          "side": {
            "name": "white"
          },
          "type": "pawn",
          "notation": ""
        }
      },
      "dest": {
        "file": "h",
        "rank": 3,
        "piece": null
      }
    },
    "h4": {
      "src": {
        "file": "h",
        "rank": 2,
        "piece": {
          "moveCount": 0,
          "side": {
            "name": "white"
          },
          "type": "pawn",
          "notation": ""
        }
      },
      "dest": {
        "file": "h",
        "rank": 4,
        "piece": null
      }
    },
    "b4": {
      "src": {
        "file": "b",
        "rank": 3,
        "piece": {
          "moveCount": 1,
          "side": {
            "name": "white"
          },
          "type": "pawn",
          "notation": ""
        }
      },
      "dest": {
        "file": "b",
        "rank": 4,
        "piece": null
      }
    }
  },
  "history": [
    {
      "capturedPiece": null,
      "hashCode": "jppEPwFGqUtt/M07rENevQ==",
      "algebraic": "b3",
      "promotion": false,
      "piece": {
        "moveCount": 1,
        "side": {
          "name": "white"
        },
        "type": "pawn",
        "notation": ""
      },
      "prevFile": "b",
      "prevRank": 2,
      "postFile": "b",
      "postRank": 3
    },
    {
      "capturedPiece": null,
      "hashCode": "vSQX8mjURiJbVqVVt3T3gw==",
      "algebraic": "a5",
      "promotion": false,
      "piece": {
        "moveCount": 1,
        "side": {
          "name": "black"
        },
        "type": "pawn",
        "notation": ""
      },
      "prevFile": "a",
      "prevRank": 7,
      "postFile": "a",
      "postRank": 5
    }
  ],
  "squares": [
    {
      "file": "a",
      "rank": 1,
      "piece": {
        "moveCount": 0,
        "side": {
          "name": "white"
        },
        "type": "rook",
        "notation": "R"
      }
    },
    {
      "file": "b",
      "rank": 1,
      "piece": {
        "moveCount": 0,
        "side": {
          "name": "white"
        },
        "type": "knight",
        "notation": "N"
      }
    },
    {
      "file": "c",
      "rank": 1,
      "piece": {
        "moveCount": 0,
        "side": {
          "name": "white"
        },
        "type": "bishop",
        "notation": "B"
      }
    },
    {
      "file": "d",
      "rank": 1,
      "piece": {
        "moveCount": 0,
        "side": {
          "name": "white"
        },
        "type": "queen",
        "notation": "Q"
      }
    },
    {
      "file": "e",
      "rank": 1,
      "piece": {
        "moveCount": 0,
        "side": {
          "name": "white"
        },
        "type": "king",
        "notation": "K"
      }
    },
    {
      "file": "f",
      "rank": 1,
      "piece": {
        "moveCount": 0,
        "side": {
          "name": "white"
        },
        "type": "bishop",
        "notation": "B"
      }
    },
    {
      "file": "g",
      "rank": 1,
      "piece": {
        "moveCount": 0,
        "side": {
          "name": "white"
        },
        "type": "knight",
        "notation": "N"
      }
    },
    {
      "file": "h",
      "rank": 1,
      "piece": {
        "moveCount": 0,
        "side": {
          "name": "white"
        },
        "type": "rook",
        "notation": "R"
      }
    },
    {
      "file": "a",
      "rank": 2,
      "piece": {
        "moveCount": 0,
        "side": {
          "name": "white"
        },
        "type": "pawn",
        "notation": ""
      }
    },
    {
      "file": "b",
      "rank": 2,
      "piece": null
    },
    {
      "file": "c",
      "rank": 2,
      "piece": {
        "moveCount": 0,
        "side": {
          "name": "white"
        },
        "type": "pawn",
        "notation": ""
      }
    },
    {
      "file": "d",
      "rank": 2,
      "piece": {
        "moveCount": 0,
        "side": {
          "name": "white"
        },
        "type": "pawn",
        "notation": ""
      }
    },
    {
      "file": "e",
      "rank": 2,
      "piece": {
        "moveCount": 0,
        "side": {
          "name": "white"
        },
        "type": "pawn",
        "notation": ""
      }
    },
    {
      "file": "f",
      "rank": 2,
      "piece": {
        "moveCount": 0,
        "side": {
          "name": "white"
        },
        "type": "pawn",
        "notation": ""
      }
    },
    {
      "file": "g",
      "rank": 2,
      "piece": {
        "moveCount": 0,
        "side": {
          "name": "white"
        },
        "type": "pawn",
        "notation": ""
      }
    },
    {
      "file": "h",
      "rank": 2,
      "piece": {
        "moveCount": 0,
        "side": {
          "name": "white"
        },
        "type": "pawn",
        "notation": ""
      }
    },
    {
      "file": "a",
      "rank": 3,
      "piece": null
    },
    {
      "file": "b",
      "rank": 3,
      "piece": {
        "moveCount": 1,
        "side": {
          "name": "white"
        },
        "type": "pawn",
        "notation": ""
      }
    },
    {
      "file": "c",
      "rank": 3,
      "piece": null
    },
    {
      "file": "d",
      "rank": 3,
      "piece": null
    },
    {
      "file": "e",
      "rank": 3,
      "piece": null
    },
    {
      "file": "f",
      "rank": 3,
      "piece": null
    },
    {
      "file": "g",
      "rank": 3,
      "piece": null
    },
    {
      "file": "h",
      "rank": 3,
      "piece": null
    },
    {
      "file": "a",
      "rank": 4,
      "piece": null
    },
    {
      "file": "b",
      "rank": 4,
      "piece": null
    },
    {
      "file": "c",
      "rank": 4,
      "piece": null
    },
    {
      "file": "d",
      "rank": 4,
      "piece": null
    },
    {
      "file": "e",
      "rank": 4,
      "piece": null
    },
    {
      "file": "f",
      "rank": 4,
      "piece": null
    },
    {
      "file": "g",
      "rank": 4,
      "piece": null
    },
    {
      "file": "h",
      "rank": 4,
      "piece": null
    },
    {
      "file": "a",
      "rank": 5,
      "piece": {
        "moveCount": 1,
        "side": {
          "name": "black"
        },
        "type": "pawn",
        "notation": ""
      }
    },
    {
      "file": "b",
      "rank": 5,
      "piece": null
    },
    {
      "file": "c",
      "rank": 5,
      "piece": null
    },
    {
      "file": "d",
      "rank": 5,
      "piece": null
    },
    {
      "file": "e",
      "rank": 5,
      "piece": null
    },
    {
      "file": "f",
      "rank": 5,
      "piece": null
    },
    {
      "file": "g",
      "rank": 5,
      "piece": null
    },
    {
      "file": "h",
      "rank": 5,
      "piece": null
    },
    {
      "file": "a",
      "rank": 6,
      "piece": null
    },
    {
      "file": "b",
      "rank": 6,
      "piece": null
    },
    {
      "file": "c",
      "rank": 6,
      "piece": null
    },
    {
      "file": "d",
      "rank": 6,
      "piece": null
    },
    {
      "file": "e",
      "rank": 6,
      "piece": null
    },
    {
      "file": "f",
      "rank": 6,
      "piece": null
    },
    {
      "file": "g",
      "rank": 6,
      "piece": null
    },
    {
      "file": "h",
      "rank": 6,
      "piece": null
    },
    {
      "file": "a",
      "rank": 7,
      "piece": null
    },
    {
      "file": "b",
      "rank": 7,
      "piece": {
        "moveCount": 0,
        "side": {
          "name": "black"
        },
        "type": "pawn",
        "notation": ""
      }
    },
    {
      "file": "c",
      "rank": 7,
      "piece": {
        "moveCount": 0,
        "side": {
          "name": "black"
        },
        "type": "pawn",
        "notation": ""
      }
    },
    {
      "file": "d",
      "rank": 7,
      "piece": {
        "moveCount": 0,
        "side": {
          "name": "black"
        },
        "type": "pawn",
        "notation": ""
      }
    },
    {
      "file": "e",
      "rank": 7,
      "piece": {
        "moveCount": 0,
        "side": {
          "name": "black"
        },
        "type": "pawn",
        "notation": ""
      }
    },
    {
      "file": "f",
      "rank": 7,
      "piece": {
        "moveCount": 0,
        "side": {
          "name": "black"
        },
        "type": "pawn",
        "notation": ""
      }
    },
    {
      "file": "g",
      "rank": 7,
      "piece": {
        "moveCount": 0,
        "side": {
          "name": "black"
        },
        "type": "pawn",
        "notation": ""
      }
    },
    {
      "file": "h",
      "rank": 7,
      "piece": {
        "moveCount": 0,
        "side": {
          "name": "black"
        },
        "type": "pawn",
        "notation": ""
      }
    },
    {
      "file": "a",
      "rank": 8,
      "piece": {
        "moveCount": 0,
        "side": {
          "name": "black"
        },
        "type": "rook",
        "notation": "R"
      }
    },
    {
      "file": "b",
      "rank": 8,
      "piece": {
        "moveCount": 0,
        "side": {
          "name": "black"
        },
        "type": "knight",
        "notation": "N"
      }
    },
    {
      "file": "c",
      "rank": 8,
      "piece": {
        "moveCount": 0,
        "side": {
          "name": "black"
        },
        "type": "bishop",
        "notation": "B"
      }
    },
    {
      "file": "d",
      "rank": 8,
      "piece": {
        "moveCount": 0,
        "side": {
          "name": "black"
        },
        "type": "queen",
        "notation": "Q"
      }
    },
    {
      "file": "e",
      "rank": 8,
      "piece": {
        "moveCount": 0,
        "side": {
          "name": "black"
        },
        "type": "king",
        "notation": "K"
      }
    },
    {
      "file": "f",
      "rank": 8,
      "piece": {
        "moveCount": 0,
        "side": {
          "name": "black"
        },
        "type": "bishop",
        "notation": "B"
      }
    },
    {
      "file": "g",
      "rank": 8,
      "piece": {
        "moveCount": 0,
        "side": {
          "name": "black"
        },
        "type": "knight",
        "notation": "N"
      }
    },
    {
      "file": "h",
      "rank": 8,
      "piece": {
        "moveCount": 0,
        "side": {
          "name": "black"
        },
        "type": "rook",
        "notation": "R"
      }
    }
  ],
  "state": {
    "check": false,
    "mate": false,
    "repetition": false,
    "stalemate": false
  }
}
```

## HTTP GET

To create a new game:

```bash
curl https://f.stdlib.com/brozeph/chess/game
```

To make a move:

```bash
curl https://f.stdlib.com/brozeph/chess/game?stateCode=anBwRVB3RkdxVXR0L00wN3JFTmV2UT09OmIz&notation=a5
```

## Web and Node.js

Utilizing the `f` NPM module (`npm install f --save`):

```javascript
const f = require('f');

f('brozeph/chess/game')({
  stateCode : 'anBwRVB3RkdxVXR0L00wN3JFTmV2UT09OmIz',
  notation : 'a5'
}, (err, response) => {
  // handle error or response...
});
```
