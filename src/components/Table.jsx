import React, { Component } from "react";
import Form from "./Form";

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMainPage: true,
      data: []
    };
  }

  handleShowForm = () => {
    this.setState({ isMainPage: false });
  };

  handleShowMainPage = () => {
    this.setState({ isMainPage: true });
  };

  handleAddNewRecord = newRecord => {
    let currentData = this.state.data;
    currentData.push(newRecord);

    this.setState({ data: currentData });
  };

  render() {
    let tbodyContent = this.state.data.map(item => (
      <tr>
        <td>{item.Date}</td>
        <td>{item.Description}</td>
        <td>{item.Amount}</td>
        <td>{item.Category}</td>
        <td>{item.Comment}</td>
      </tr>
    ));

    let mainPage = (
      <div className="container">
        <table className="table table-striped">
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

        <button
          className="btn btn-primary pr-5 pl-5"
          onClick={this.handleShowForm}
        >
          Add Expense
        </button>
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
