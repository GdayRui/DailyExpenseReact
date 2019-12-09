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
      category: {
        
      }
    };
  }

  onSubmitForm = () => {
    // option 1: get value of new record 
    // let currentRecord = {
    //   Date: document.getElementById('date').value,
    //   Description: document.getElementById('item-name').value,
    //   Amount: document.getElementById('amount').value,
    //   Category: document.getElementById('category').value,
    //   Comment: document.getElementById('comments').value
    // }
    // option 1: then inform <table>
    // this.props.onAddNewRecord(currentRecord);

    // option 2: 
    this.props.onAddNewRecord(this.state.newRecord);
    this.props.onShowMainPage();
  };

  // option 2: get value of new record using onChange fn
  handleInputChange = (e) => {
    let newRecord = this.state.newRecord;
    if (e.target.id == "date") { newRecord.Date = e.target.value };
    if (e.target.id == "category") { newRecord.Category = e.target.value };
    if (e.target.id == "item-name") { newRecord.Description = e.target.value };
    if (e.target.id == "amount") { newRecord.Amount = e.target.value };
    if (e.target.id == "comments") { newRecord.Comment = e.target.value };

    this.setState({ newRecord: newRecord });
  }

  render() {
    return (
      <div className="container">
        <form>
          <div className="form-group">
            <input id="date"
              className="form-control"
              type="date"
              value="2019-12-6"
              onChange={this.handleInputChange} />
          </div>
          <div className="form-group">
            <input id="category"
              className="form-control"
              type="text"
              placeholder="Category"
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <input id="item-name"
              className="form-control"
              type="text"
              placeholder="Item Name"
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <input id="amount"
              className="form-control"
              type="text"
              placeholder="Amount"
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <input id="comments"
              className="form-control"
              type="text"
              placeholder="Comments"
              onChange={this.handleInputChange}
            />
          </div>
          <button className="btn btn-success" onClick={this.onSubmitForm}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Form;
