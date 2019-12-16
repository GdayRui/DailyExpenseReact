import React, { Component } from "react";
import Form from "./Form";

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMainPage: true,
      data: [],
      storageKey: "expenseList"
    };
  }

  static getDerivedStateFromProps() {}

  handleShowForm = () => {
    this.setState({ isMainPage: false });
  };

  handleShowMainPage = () => {
    this.setState({ isMainPage: true });
  };

  handleAddNewRecord = newRecord => {
    let currentData = this.state.data;
    currentData.push(newRecord);

    window.localStorage.setItem(
      this.state.storageKey,
      JSON.stringify(currentData)
    );

    this.setState({ data: currentData });
  };

  readStorage = () => {
    let storedDataJson = window.localStorage.getItem(this.state.storageKey);

    let storedData = JSON.parse(storedDataJson);
    if (storedData) {
      //this.setState({ data: storedData });
      //return { data: storedData };
      this.state.data = storedData;
    }
  };

  render() {
    this.readStorage();

    let tbodyContent = this.state.data.map(item => (
      <tr>
        <td>{item.Date}</td>
        <td>{item.Description}</td>
        <td>{item.Amount}</td>
        <td>{item.Category}</td>
        <td>{item.Comment}</td>
        <td>
          <input type="checkbox" />
          <span className="success" />
        </td>
      </tr>
    ));

    let mainPage = (
      <div className="container">
        <div className="container my-5">
          <h2>Daily Expense 2019</h2>
        </div>
        <table className="table table-striped my-2">
          <thead>
            <tr>
              <th>Date</th>
              <th>Item</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Comment</th>
            </tr>
          </thead>
          <tbody>{tbodyContent}</tbody>
        </table>

        <input
          className="btn btn-primary pr-5 pl-5 my-3 mx-2"
          onClick={this.handleShowForm}
          value="Add Expense"
        />
        <input
          className="btn btn-danger pr-5 pl-5 my-3 mx-2"
          value="Delete Expense"
        />
      </div>
    );

    if (this.state.isMainPage) {
      return mainPage;
    } else {
      return (
        <Form
          onShowMainPage={this.handleShowMainPage}
          onAddNewRecord={this.handleAddNewRecord}
        />
      );
    }
  }
}

export default Table;
