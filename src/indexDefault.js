import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
function Square(props){
return (
	<button className="square" onClick={props.onClick}>
		{props.value}
	</button>
	);
}

class Board extends React.Component {



  renderSquare(i) {
    return (
    	<Square
    		value={this.props.squares[i]}
    		onClick={() => this.props.onClick(i)}
    	/>
     );
  }

  render() {
  var tableSize = 3;
  var loopTable = Array(tableSize).fill(Array(tableSize).fill(null));
  var board = [];
  var line = [];
    for(let i=0;i<tableSize;i++)
    {
    	for(let j=0;j<tableSize;j++)
    	{loopTable[i][j]=i*j+j}
	}
	loopTable.forEach((row,loopTable) =>{
		board.push(<div key={index}>{row}</div>)
		});
	line[i] = loopTable[i].map((row, loopTable)=> <div className="board-row">
					{this.renderSquare(0)}
					</div>)





    return(
        <div>
			{line}
        </div>
    );
}

class Game extends React.Component {
  constructor(props){
  	super(props);
  	this.state = {
  		history: [{
  			squares: Array(9).fill(null),
  			}],
  			stepNumber: 0,
  			xIsNext: true,
  		};
  }
  handleClick(i){
  		const history = this.state.history.slice(0, this.state.stepNumber + 1);
  		const current = history[history.length - 1];
		const squares = current.squares.slice();
		const coordx = i % 3;
		const coordy = (i-coordx)/3;
		if (calculateWinner(squares) || squares[i]){
		 	return;
		 }
		squares[i] = this.state.xIsNext ? 'X' : 'O';
		this.setState({
			history: history.concat([{
			squares: squares,
			coordx: coordx,
			coordy: coordy,
			}]),
			stepNumber: history.length,
		xIsNext: !this.state.xIsNext,
		});
	}
	jumpTo(step){
	  this.setState({
	  	stepNumber: step,
	  	xIsNext: (step % 2) === 0,
		});
	}

  render() {
  const history = this.state.history;
  const current = history[this.state.stepNumber];
  const winner = calculateWinner(current.squares);
  const moves = history.map((step, move) => {
  	const desc = move ?
  		'Go to move #' + move  + ' by ' + (move % 2 ? 'X' : 'O') + ' at ('+step.coordx+','+step.coordy+')'   :
  		'Go to game start';

  	return (
  		move === this.state.stepNumber ?
  		<b><li key={move}>
  			<button style={{fontWeight:'bold'}} onClick={() => this.jumpTo(move)}>{desc}</button>
  		</li>
  		</b>
		:
  		<li key={move}>
  			<button onClick={() => this.jumpTo(move)}>{desc}</button>
  		</li>
  	);

  });
  let status;
  if(winner){
  		status = 'Winner: ' + winner;
  	} else {
  		status = 'Next player: ' + (this.state.xIsNext ? 'X' : '0');
  	}

    return (
      <div className="game">
        <div className="game-board">
          <Board
          	squares={current.squares}
          	onClick={(i) => this.handleClick(i)}
           />
        </div>
        <div className="game-info">
          <div>{ status }</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares){
const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
		{
			return squares[a];
		}
	}
	return null;
}
