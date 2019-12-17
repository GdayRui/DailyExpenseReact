import React from "react";
import Table from "./components/Table";

import "./App.css";

class App extends React.Component {
  state = {
    isMainPage: true,
    tableTitle: "Daily Expense 2021 Jan"
  };

  render() {

    return (
      <div className="App" >
        <Table title={this.state.tableTitle} />
      </div>
    );
  }
}

export default App;
