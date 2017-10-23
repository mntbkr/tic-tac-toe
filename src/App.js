import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import Styled from 'styled-components'

const StyledPiece = Styled.div`
width: 100px;
height: 100px;
float: left;
`

const GameBoard = Styled.div`
  width: 300px;
`

class App extends Component {
  constructor() {
    super()

    this.state = {
      game: [[2, 2, 2], [2, 2, 2], [2, 2, 2]],
      currentPlayer: 'X',
      win: false
    }
  }

  handlePlayerClick(rowIndex, pieceIndex) {
    let pieceValue = this.state.game[rowIndex][pieceIndex]

    if (pieceValue === 'X' || pieceValue === '0') {
      return
    }

    let game = this.state.game

    game[rowIndex][pieceIndex] = this.state.currentPlayer

    this.setState({
      game,
      currentPlayer: this.state.currentPlayer === 'X' ? 'O' : 'X'
    })

    this.checkForWin()
  }

  resetGameBoard = () => {
    this.setState({
      game: [[2, 2, 2], [2, 2, 2], [2, 2, 2]],
      currentPlayer: 'X',
      win: false
    })
  }

  checkForWin() {
    let game = this.state.game
    //check for horizontal lines
    this.state.game.map(row => {
      if (row[0] + row[1] + row[2] === 'XXX') {
        this.setState({
          win: 'X'
        })
      }

      if (row[0] + row[1] + row[2] === 'OOO') {
        this.setState({
          win: 'O'
        })
      }
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Tic Tac Toe</h1>
        </header>
        <GameBoard>
          {this.state.win ? (
            <div>
              Game won by <bold>{this.state.win}</bold>
            </div>
          ) : null}
          {this.state.game[0].map((piece, index) => (
            <Piece
              piece={piece}
              onClick={() => this.handlePlayerClick(0, index)}
            />
          ))}

          {this.state.game[1].map((piece, index) => (
            <Piece
              piece={piece}
              onClick={() => this.handlePlayerClick(1, index)}
            />
          ))}

          {this.state.game[2].map((piece, index) => (
            <Piece
              piece={piece}
              onClick={() => this.handlePlayerClick(2, index)}
            />
          ))}
        </GameBoard>

        <div>
          <button onClick={this.resetGameBoard}>Reset Game</button>
        </div>
      </div>
    )
  }
}

class Piece extends Component {
  render() {
    console.log('piece')
    return (
      <StyledPiece onClick={this.props.onClick}>
        {this.props.piece === '2' ? '+' : this.props.piece}
      </StyledPiece>
    )
  }
}

export default App
