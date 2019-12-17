import React, { Component } from "react";
import Form from "./Form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

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
    // ***
    newRecord.Id = this.state.data.length + 1;
    let currentData = this.state.data;
    currentData.push(newRecord);

    window.localStorage.setItem(
      this.state.storageKey,
      JSON.stringify(currentData)
    );

    this.setState({ data: currentData });
  };

  handleSelected = (id) => {
    for(let i=0; i<this.state.data.length; i++){
      if (id===this.state.data[i].Id){

        let tmpData = this.state.data;
        tmpData[i].isSelected = !tmpData[i].isSelected;
        this.setState({data:tmpData});

        console.log(this.state.data[i]);

        //this.setState({data: this.state.data});

        return;
      }
    }
  }

  // Read local storage data
  readStorage = () => {
    let storedDataJson = window.localStorage.getItem(this.state.storageKey);

    let storedData = JSON.parse(storedDataJson);
    if (storedData) {
      this.setState({ data: storedData });
      //return { data: storedData };
      //this.state.data = storedData;
    }
  };

  componentDidMount(){
    this.readStorage();
  }

  render() {
    
    let tbodyContent = this.state.data.map(item => {
      let selectIcon = item.isSelected ? <td><FontAwesomeIcon icon={faCheckCircle} /></td> : <td></td>;
      return (
        <tr onClick={() => this.handleSelected(item.Id)} >
          <td>{item.Date}</td>
          <td>{item.Description}</td>
          <td>{item.Amount}</td>
          <td>{item.Category}</td>
          <td>{item.Comment}</td>
          {selectIcon}
        </tr>
      )
    });

    let mainPage = (
      <div className="container">
        <div className="container my-5">
          <h2>{this.props.title}</h2>
        </div>
        <table className="table table-striped my-2">
          <thead>
            <tr>
              <th>Date</th>
              <th>Item</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Comment</th>
              <th className="Table-th"></th>
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
          disabled
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
