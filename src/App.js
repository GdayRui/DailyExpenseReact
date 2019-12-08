import React from "react";
import Table from "./components/Table";

import "./App.css";

class App extends React.Component {
  state = {
    isMainPage: true,
    newRecord: {
      Date: '',
            Description:'',
            Amount:'',
            Category:'',
            Comment:''
    }
  };


  onAddNew = (newRecord) => {
    this.setState({newRecord: newRecord});

  }

  render() {

    return (
      <div className="App" >
        <Table />
      </div>
    );
  }
}

export default App;
