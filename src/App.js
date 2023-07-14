import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';

export default class App extends Component {
  name = 'Om';
  pageSize = 6;

  state = {
    progress: 0
  }
  setProgress = (progress) => {
    this.setState({progress: progress})
  }
  render() {
    return (
      <div>
        <Router>

          <Navbar />
          <LoadingBar
            height= {3}
            color='#f11946'
            progress={this.state.progress}
          />

          <Routes>
            <Route exact path="/" element={<News setProgress={this.setProgress} key="general" pageSize={this.pageSize} country='in' category='general' />}></Route>
            <Route exact path="/business" element={<News setProgress={this.setProgress} key="business" pageSize={this.pageSize} country='in' category='business' />}></Route>
            <Route exact path="/entertainment" element={<News setProgress={this.setProgress} key="entertainment" pageSize={this.pageSize} country='in' category='entertainment' />}></Route>
            <Route exact path="/health" element={<News setProgress={this.setProgress} key="health" pageSize={this.pageSize} country='in' category='health' />}></Route>
            <Route exact path="/science" element={<News setProgress={this.setProgress} key="science" pageSize={this.pageSize} country='in' category='science' />}></Route>
            <Route exact path="/sports" element={<News setProgress={this.setProgress} key="sports" pageSize={this.pageSize} country='in' category='sports' />}></Route>
            <Route exact path="/technology" element={<News setProgress={this.setProgress} key="technology" pageSize={this.pageSize} country='in' category='technology' />}></Route>
          </Routes>

        </Router>
      </div>
    )
  }
}