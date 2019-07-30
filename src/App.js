import React, { Component } from 'react';
import './App.css';
import Snake from './Snake';
import Food from './Food';
const getRandomCoordinates = () => {
  let x =  Math.floor(Math.random()*Math.floor(50))*2;
  let y = Math.floor(Math.random()*Math.floor(50))*2;
  return [x,y];
}
const intialState = {
  direction :'',
  speed: 200,
  snakeDots :[
    [0,0], [2,0], [4,0]
  ],
  dot : getRandomCoordinates()
}

class App extends Component {
  constructor(){
    super();
    
    this.state = intialState;
    
  }
  componentDidMount (){
    setInterval(this.moveSnake, this.state.speed);
    document.onkeydown = this.onkeydown;
  }

  checkIfOutOfBorders =() => {
    let snake = [...this.state.snakeDots];
    let head = snake[snake.length - 1];
    if (head[0] >100 || head[1] >100 || head[0]<0 || head[1]<0){
      this.gameover();
    }
  }

  checkIfCollapsed = () => {
    let snake = [...this.state.snakeDots];
    let snakeHead = snake[snake.length -1];
    snake.pop();
    snake.forEach(dot =>{
      if(snakeHead[0]===dot[0] && snakeHead[1] ===dot[1]){
        this.gameover();
      }
    })
  }

  gameover = () => {
    alert("Gameover");
    this.setState(intialState);
  }

  componentDidUpdate(){
    this.checkIfOutOfBorders();
    this.checkIfFoodIsTaken();
    this.checkIfCollapsed();
  }
  
  checkIfFoodIsTaken = () => {
    let snake = [...this.state.snakeDots];
    let snakeHead = snake[snake.length - 1];
    let food = this.state.dot;
    if(snakeHead[0] === food[0] && snakeHead[1] === food[1]){
      this.setState({dot : getRandomCoordinates()});
      this.enlargeSnake();
      this.increaseSpeed();
    }
  }

  enlargeSnake =() => {
    let snake = [...this.state.snakeDots];
    snake.unshift([]);
    this.setState({snakeDots: snake});
  }
  
  increaseSpeed = () => {
    if(this.state.speed >20){
      this.setState({speed:this.state.speed-10});
    }
  }

  moveSnake = ()=>{
    let dots = [...this.state.snakeDots];
    let head = dots[dots.length -1];
    switch(this.state.direction){
      case 'UP':
        head = [head[0], head[1]-2];
        break;
      case 'DOWN':
        head = [head[0], head[1]+2];
        break;
      case 'LEFT':
        head = [head[0]-2, head[1]];
        break;
      case 'RIGHT':
        head = [head[0]+2, head[1]]
        break;
      case '':
        return;
    }
    dots.push(head);
    dots.shift();
    this.setState({snakeDots : dots});

  }

  onkeydown = (e) => {
    e = e || window.event;
    switch(e.keyCode) {
      case 38:
        this.setState({direction :'UP'});
        break;
      case 40:
        this.setState({direction : 'DOWN'});
        break;
      case 37:
        this.setState({direction: 'LEFT'});
        break;
      case 39:
        this.setState({direction: 'RIGHT'});
        break;
    }
  }

  render() {
    return (
      <div className="game-arena">
        <Snake snakeDots={this.state.snakeDots} />
        <Food dot={this.state.dot} />
      </div>
    );
  }

}

export default App;
