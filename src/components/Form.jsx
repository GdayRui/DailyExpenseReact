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
      }
    };
  }

  onSubmitForm = e => {

    debugger;
    let currentRecord = {
      Date: document.getElementById('date').value,
      Description: document.getElementById('item-name').value,
      Amount: document.getElementById('amount').value,
      Category: document.getElementById('category').value,
      Comment: document.getElementById('comments').value
    }
    // then inform <table>
    this.props.onAddNewRecord(currentRecord);

    // this.props.onAddNewRecord(this.state.newRecord);

    // this.setState({newRecord: e.target.value});

    this.props.onShowMainPage();
  };

  handleDateChange = (event) => {
    let newRecord = this.state.newRecord;
    newRecord.Date = event.target.value;

    this.setState({newRecord: newRecord});
  }

  render() {
    return (
      <div className="container">
        <form>
          <div className="form-group">
            <input id="date" className="form-control" type="date" value="2019-12-6" 
            onChange={this.handleDateChange}/>
          </div>
          <div className="form-group">
            <input id="category"
              className="form-control"
              type="text"
              placeholder="Category"
            />
          </div>
          <div className="form-group">
            <input id="item-name"
              className="form-control"
              type="text"
              placeholder="Item Name"
              value="woolwroths"
            />
          </div>
          <div className="form-group">
            <input id="amount" className="form-control" type="text" placeholder="Amount" />
          </div>
          <div className="form-group">
            <input id="comments"
              className="form-control"
              type="text"
              placeholder="Comments"
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
