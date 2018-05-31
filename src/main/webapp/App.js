import React, { Component } from 'react';
// import { Grid } from 'react-bootstrap';
// import AppNav from './AppNav';
//
// import grailsLogo from './images/grails-cupsonly-logo-white.svg';
// import reactLogo from './images/logo.svg';
// import { SERVER_URL, CLIENT_VERSION, REACT_VERSION } from './config';
import 'whatwg-fetch';

class App extends Component {

  // constructor() {
  //   super();
  //
  //   this.state = {
  //     serverInfo: {},
  //     clientInfo: {
  //       version: CLIENT_VERSION,
  //       react: REACT_VERSION
  //     }
  //   }
  // }
  //
  // componentDidMount() {
  //   fetch(SERVER_URL + '/application')
  //     .then(r => r.json())
  //     .then(json => this.setState({serverInfo: json}))
  //     .catch(error => console.error('Error connecting to server: ' + error));
  //
  // }
  //
  // render() {
  //   const serverInfo = this.state.serverInfo;
  //   const clientInfo = this.state.clientInfo;
  //
  //   return (
  //     <div>
  //       <AppNav serverInfo={serverInfo} clientInfo={clientInfo}/>
  //       <div className="grails-logo-container">
  //         <img className="grails-logo" src={grailsLogo} alt="Grails" />
  //         <span className="plus-logo">+</span>
  //         <img className="hero-logo" src={reactLogo} alt="React" />
  //       </div>
  //
  //       <Grid>
  //         <div id="content">
  //           <section className="row colset-2-its">
  //             <h1 style={{textAlign: 'center'}}>Welcome to Grails</h1>
  //             <br/>
  //             <p>
  //               won't re-render live :(
  //             </p>
  //
  //             <div id="controllers" role="navigation">
  //               <h2>Available Controllers:</h2>
  //               <ul>
  //                 {serverInfo.controllers ? serverInfo.controllers.map(controller => {
  //                   return <li key={controller.name}><a href={SERVER_URL + controller.logicalPropertyName}>{ controller.name }</a></li>;
  //                 }) : null }
  //               </ul>
  //             </div>
  //           </section>
  //
  //         </div>
  //       </Grid>
  //     </div>
  //   );
  // }

   render() {
     return(
         <h1>hi.</h1>
     );
   }
}

export default App;
