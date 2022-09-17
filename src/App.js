// import { useEffect, useState } from 'react';
// import './App.css';

// const App = () =>  {

//   const [totalTime, setTotalTime] = useState(undefined)
//   const [seconds , setSecods] = useState(0)
//   const [minutes, setMinutes] = useState(0)
//   const [click, setClick] = useState(false)

//   useEffect(() => {
//       if(totalTime === 0){
//         console.log('oi')
//         return
//       }
//       if(totalTime >= 0 && click){
//         setTimeout(() => {
//         setTotalTime(totalTime - 1)
//         setMinutes( Math.floor(totalTime / 60))
//         setSecods(totalTime % 60)
//       },1000)
//       }
//   },[totalTime, click])

//   return (
//     <div className="App">
//      <h1>TIMER</h1>

//       <input
//         placeholder='Minutos'
//         type='number'
//         onChange={ (e) => setTotalTime(Number(e.target.value) * 60)}
//       />

//     <button onClick={() => setClick(true)}> Iniciar </button>
//     <button onClick={() =>  setClick(!click)}> Pausar / Despausar </button>
//     <button onClick={() =>  setTotalTime(0)}> Limpar </button>

//      <div className='timer'>
//       <span>{minutes.toString().padStart(2,"0")}</span>
//       <span>:</span>
//       <span>{seconds.toString().padStart(2,"0")}</span>
//      </div>

//     </div>
//   );
// }

// export default App;

// import { useEffect, useState } from 'react';

// const App = () => {

//   const [totalTime, setTotalTime] = useState(0)
//   const [click, setClick] = useState(false)
//   const [minutes, setMinutes] = useState(0)
//   const [seconds, setSeconds] = useState(0)

//   useEffect(() => {
//     if(click && totalTime > 0){
//       setTimeout(() => {
//         setTotalTime(totalTime - 1)
//         setMinutes(Math.floor(totalTime / 60))
//         setSeconds(totalTime % 60)
//       },1000)
//     }
//   }, [totalTime, click])

//   return (
//     <div className='App'>
//       <h1>TIMER</h1>
//       <input
//       onChange={(e) => setTotalTime(Number(e.target.value) * 60)}
//         type='number'
//       />
//       <button onClick={() => setClick(true)}>INICIAR</button>

//       <div className='timer'>
//         <span>{minutes.toString().padStart(2,'0')}</span>
//         <span>:</span>
//         <span>{seconds.toString().padStart(2,'0')}</span>
//       </div>
//     </div>
//   )
// }

// export default App;

//padStart => string.padStart(2,"0")


import React, { Component } from "react";
import './App.css'
import contagem from './audio.mp3'

class App extends Component {

  state = {
    totalTime: 0,
    minutes: 0,
    seconds: 0,
    click: false,
    pause: false
  }

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({
      totalTime: Number(value) * 60,
      input: Number(value) * 60
    },() => {
      setTimeout(() => {
        target.value = ''
      },10000)
    })
  }

  timer = () => {
    this.setState({ click: true })
    const { totalTime, pause } = this.state;
    if(!this.idTimer || (this.idTimer && pause) ) {
      if (totalTime > 0)
        this.idTimer = setInterval(() => {
          this.setState(({ totalTime }) => ({
            totalTime: totalTime - 1,
            pause: false,
          }))
        }, 1000)
    }
  }

  componentDidUpdate() {
    const { totalTime, click } = this.state;
    if (totalTime === 12 && click) {
      const audio = new Audio(contagem);
      audio.play()
    }
    if (totalTime < 0 && click) {
      clearInterval(this.idTimer)
      this.setState({totalTime: 0})
      setTimeout(() => {
        this.setState({click: false })
      },2100)
    }
  }

  // restart = () => {
  //   const { input } = this.state;
  //   clearInterval(this.idTimer)
  //   if (typeof input === 'number') {
  //     this.setState({
  //       totalTime: input,
  //       click: true,
  //     }, () => {
  //       this.timer() //para somente apos o valor ja estar setado , se nao daria erro
  //     })
  //   }
  // }

  clear = () => {
    const { pause } = this.state;
    this.setState(({ pause }) =>({
      pause: !pause,
    }))
    if (pause){
      clearInterval(this.idTimer)
      this.timer()
      return
    }
    clearInterval(this.idTimer)
  }

  limpaTudo = () => {
    clearInterval(this.idTimer)
    this.setState( { click: false , totalTime: 0})
  }

  render() {
    const { totalTime, click } = this.state;
    const minutes = Math.floor(totalTime / 60) //pois se nao daria um numero quebrado por exemplo 4.98888 nos minutos , os segundo iariam permanecer normais
    const seconds = totalTime % 60
    
    return (
      <>
        <h1>Timer</h1>
          <input
            name="totalTime"
            type='number'
            placeholder="Minutos"
            onChange={this.handleChange}
          />
        <div className="timer">
          <span>{minutes.toString().padStart(2, "0")}</span>
          <span>:</span>
          <span>{seconds.toString().padStart(2, "0")}</span>
        </div>
        <div className="App">
          <div className="functions">

            <button onClick={this.timer}>Iniciar</button>

            <button onClick={this.clear}>Pausar</button>

            <button onClick={this.limpaTudo}>Limpar</button>

            {/* <button 
            // style={{color:'blue'}} //tem que passar um obj para a chave styles
            onClick={this.restart}>Recomeçar</button> */}
          </div>

          </div>
          {
            totalTime === 0 && click && <h4>Obrigado  :)</h4>
          }
      </>
    )
  }
}

export default App