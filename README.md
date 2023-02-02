# Sshtress

By Arthur Chaudoreille

## Description

A Javascritp implementation of the noble and ancient Chess game, with some twists:

- no take-backs. A move is final
- no rocking, it's making the teacher mad
- no en-passant, nobody does that anyways
- you can discover a check on your own king when you move a piece. It's legal, you can do it. And lose.

Build using: HTML; CSS; And JavaScript, as Project no 1 of the Ironhack WebDev Bootcamp.

## Implementation

- A ChessBoard object contains
  - 2 lists of chess pieces (for each color)
  - 2 Kings for easy access to check situation detection
  - a collision board to calculate legal moves
  - The ChessBoard's responsability is:
    - handling the display
    - registering to events
    - allowing or disallowing pieces to move based on their legal moves
    - dispatching instructions to chess pieces
    - being the access hub for chess pieces
- A ChessPiece object contains
  - a square object representing it's position on the board
  - a list of legal moves
  - a list of squares it targets on the board
  - a list of check breakers indicating to other pieces which positions they can target to resolve a check they are causing
  - A ChessPiece object's responsabilities are:
    - moving on the board
    - updating it's legal moves
    - filtering it's legal moves with the checking pieces' check breakers
    - providing the squares it targets to allow the King check checking
    - checking if it's move creates a checkmate situation
    - putting itself in prison once it has been taken
- The King piece's responsability is:
  - being a regular chess piece
  - indicating checks

**[DEMO](https://chaudoreille.github.io/chess/)**

## What's next ?

### Logic

- Implementing pawn promotion, these little guys do a very important and often underrated job, they deserve it
- Implementing pins
  - if moving your piece discovers a check on the king, the move is not allowed
  - as of now, if you discover a check, tough luck, you lose.
- implementing rock
- implementing en-passant

### Bonus Fun

- implementing a clock to force a faster game, nobody ain't got time for that
- implementing a game interface allowing to change starting pieces, set the clock, etc..
- drag & drop for piece movement
- implementing move cancelation to take back a blunder
- implementing a theming mechanic to change website's color codes
- implementing a game replay to revisite your best and worst moves
- linking the game to an AI API to play solo
- deploying a server to enable online duels

## Biggest challenges

    - check situations and resolution
    - Debugging without proper tests
    - Overconfidence is a slow and insidious killer
    - Sshtress management & organisation (hence the name)

## There was an attempt

- to develop it using a Test Driven Development approach.
- to remain calm and collected and do it in an orderly fashion

### Credits

[Chess Sprites: SVG chess pieces by Maurizio Monge](https://commons.wikimedia.org/wiki/Category:SVG_chess_pieces/Maurizio_Monge)
