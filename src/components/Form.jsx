import React, { Component } from "react";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newRecord: {
        Date: "",
        Description: "",
        Amount: "",
        Category: "",
        Comment: ""
      },
      category: ["Grocery", "Petrol", "Education", "Insurance", "Others"],
      isError: false
    };
  }

  onSubmitForm = () => {
    // // option 1: get value of new record
    // let currentRecord = {
    //   Date: document.getElementById("date").value,
    //   Description: document.getElementById("item-name").value,
    //   Amount: document.getElementById("amount").value,
    //   Category: document.getElementById("category").value,
    //   Comment: document.getElementById("comments").value
    // };
    // // option 1: then inform <table>
    // this.props.onAddNewRecord(currentRecord);
    // this.props.onShowMainPage();

    // option 2:
    if (this.state.newRecord.Amount === "") {
      this.setState({ isError: true });
    } else {
      let r = this.state.newRecord;
      r.Category = document.getElementById("category").value;
      this.setState({ newRecord: r });
      this.props.onAddNewRecord(this.state.newRecord);
      this.props.onShowMainPage();
    }
  };

  // option 2: get value of new record using onChange fn
  handleInputChange = e => {
    let newRecord = this.state.newRecord;
    if (e.target.id === "date") {
      newRecord.Date = e.target.value;
    } else if (e.target.id === "category") {
      newRecord.Category = e.target.value;
    } else if (e.target.id === "item-name") {
      newRecord.Description = e.target.value;
    } else if (e.target.id === "amount") {
      newRecord.Amount = e.target.value;
    } else if (e.target.id === "comments") {
      newRecord.Comment = e.target.value;
    }

    this.setState({ newRecord: newRecord });
  };

  render() {
    // Alert will display when submit with input empty
    const alertDiv = this.state.isError ? (
      <div className="alert alert-danger" role="alert">
        Please fill in the blanks before you submit!
      </div>
    ) : (
      <div></div>
    );

    return (
      <div className="container">
        <form>
          <div className="form-group">
            <input
              id="date"
              className="form-control"
              type="date"
              value={this.state.newRecord.Date} // option 1: remove this line, otherwise the date will always be  ''
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <select
              id="category"
              className="form-control"
              value={this.state.newRecord.Category} // option 1: remove this line
              onChange={this.handleInputChange}
            >
              <option value="Grocery">Grocery</option>
              <option>Petrol</option>
              <option>Education</option>
              <option>Insurance</option>
              <option>Others</option>
            </select>
          </div>
          <div className="form-group">
            <input
              id="item-name"
              className="form-control"
              type="text"
              placeholder="Item Name"
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <input
              id="amount"
              className="form-control"
              type="number"
              placeholder="Amount"
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <input
              id="comments"
              className="form-control"
              type="text"
              placeholder="Comments"
              onChange={this.handleInputChange}
            />
          </div>
          {/* Alert when submit without input */}
          {alertDiv}
          <input
            className="btn btn-success"
            type="button"
            value="Submit"
            onClick={this.onSubmitForm}
          ></input>
        </form>
      </div>
    );
  }
}

export default Form;
