import React, { Component } from "react";
import Form from "./Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faArrowUp,
  faChevronDown,
  faCaretUp
} from "@fortawesome/free-solid-svg-icons";

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ascending: false,
      isMainPage: true,
      data: [],
      storageKey: "expenseList",
      numSelectedRecords: 0,
      sortingColumn: ""
    };
  }

  static getDerivedStateFromProps() {}

  handleShowForm = () => {
    this.setState({ isMainPage: false });
  };

  handleShowMainPage = () => {
    this.setState({ isMainPage: true });
  };

  handleSelected = id => {
    for (let i = 0; i < this.state.data.length; i++) {
      if (id === this.state.data[i].Id) {
        let tmpData = this.state.data;
        tmpData[i].isSelected = !tmpData[i].isSelected;
        tmpData[i].isSelected
          ? this.state.numSelectedRecords++
          : this.state.numSelectedRecords--;
        this.setState({ data: tmpData });

        return;
      }
    }
  };
  // Delete selected records
  handleDelete = () => {
    // let items = this.state.data;
    // for (let i=0; i<this.state.data.length; i++) {

    //   if (items[i].isSelected) {
    //     items.splice(i, 1);
    //     i--;
    //     this.state.numSelectedRecords--;
    //   }
    // }

    // option 2
    let resultList = this.state.data.filter(item => !item.isSelected);
    this.setState({ data: resultList });

    window.localStorage.setItem(
      this.state.storageKey,
      JSON.stringify(resultList)
    );
    this.setState({ data: resultList });
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

  // Sort the data
  handleSort = type => {
    const compareItem = (a, b) => {
      const itemA = a.Description.toUpperCase();
      const itemB = b.Description.toUpperCase();
      // * cannot compare 2 strings. this compare fn only return
      // return itemA>itemB?1:-1;
      let comparison = 0;
      if (itemA > itemB) {
        this.state.ascending ? (comparison = 1) : (comparison = -1);
      } else if (itemA < itemB) {
        this.state.ascending ? (comparison = -1) : (comparison = 1);
      }
      return comparison;
    };

    const compareAmount = (a, b) => {
      return this.state.ascending ? a.Amount - b.Amount : b.Amount - a.Amount;
    };

    const compareComment = (a, b) => {
      const commentA = a.Comment.toUpperCase();
      const commentB = b.Comment.toUpperCase();
      let comparison = 0;
      if (commentA > commentB) {
        this.state.ascending ? (comparison = 1) : (comparison = -1);
      } else if (commentA < commentB) {
        this.state.ascending ? (comparison = -1) : (comparison = 1);
      }
      return comparison;
    };

    const compareCategory = (a, b) => {
      const categoryA = a.Category.toUpperCase();
      const categoryB = b.Category.toUpperCase();
      let comparison = 0;
      if (categoryA > categoryB) {
        this.state.ascending ? (comparison = 1) : (comparison = -1);
      } else if (categoryA < categoryB) {
        this.state.ascending ? (comparison = -1) : (comparison = 1);
      }
      return comparison;
    };

    const compareDate = (a, b) => {
      const dateA = new Date(a.Date);
      const dateB = new Date(b.Date);
      let comparison = 0;
      if (dateA > dateB) {
        this.state.ascending ? (comparison = 1) : (comparison = -1);
      } else if (dateA < dateB) {
        this.state.ascending ? (comparison = -1) : (comparison = 1);
      }
      return comparison;
    };

    let sortedData;
    // debugger;
    if (type === "Amount") {
      sortedData = this.state.data.sort(compareAmount);
    } else if (type === "Item") {
      sortedData = this.state.data.sort(compareItem);
    } else if (type === "Comment") {
      sortedData = this.state.data.sort(compareComment);
    } else if (type === "Category") {
      sortedData = this.state.data.sort(compareCategory);
    } else if (type === "Date") {
      sortedData = this.state.data.sort(compareDate);
    }
    this.state.ascending = !this.state.ascending;

    this.setState({
      data: sortedData,
      sortingColumn: type,
      ascending: this.state.ascending
    });
  };

  //  Sort
  // tmpSort = (arr) => {
  //   if(arr.length <= 1){
  //     return arr;
  //   }

  //   let key = arr[0];
  //   let arrSmall = [];
  //   let arrBig = [];

  //   for(let i=1; i<arr.length; i++){
  //     if(arr[i] <= key ){
  //       arrSmall.push(arr[i]);
  //     } else{
  //       arrBig.push(arr[i]);
  //     }
  //   }

  //   let arrSmallSorted = this.tmpSort(arrSmall);
  //   let arrBigSorted = this.tmpSort(arrBig);

  //   return [...arrSmall, key, ...arrBig];
  // }

  /* handleSortByAmount = () => {
  
    function compare(a,b) {

      let comparison = 0;
      if (a.Amount > b.Amount ) {
        comparison = 1;
      } else if (a.Amount < b.Amount ) {
        comparison = -1;
      } 
      return comparison;
    }

    let sortedData = this.state.data.sort(compare);
    this.setState({data: sortedData});

  } */

  // Read local storage data
  readLocalStorage = () => {
    let storedDataJson = window.localStorage.getItem(this.state.storageKey);

    let storedData = JSON.parse(storedDataJson);
    if (storedData) {
      this.setState({ data: storedData });
      //return { data: storedData };
      //this.state.data = storedData;
    }
  };

  componentDidMount() {
    this.readLocalStorage();
  }

  render() {
    let tbodyContent = this.state.data.map(item => {
      let selectIcon = item.isSelected && (
        <td>
          <FontAwesomeIcon icon={faCheckCircle} />
        </td>
      );
      return (
        <tr onClick={() => this.handleSelected(item.Id)}>
          <td>{item.Date}</td>
          <td>{item.Description}</td>
          <td>{item.Amount}</td>
          <td>{item.Category}</td>
          <td>{item.Comment}</td>
          {selectIcon}
        </tr>
      );
    });

    let mainPage = (
      <div className="container">
        <div className="container my-5">
          <h2>{this.props.title}</h2>
        </div>
        <table className="table table-striped my-2">
          <thead>
            <tr>
              <th onClick={() => this.handleSort("Date")}>
                Date{" "}
                {this.state.sortingColumn === "Date" && (
                  <FontAwesomeIcon icon={faCaretUp} />
                )}
              </th>
              <th onClick={() => this.handleSort("Item")}>
                Item{" "}
                {this.state.sortingColumn === "Item" && (
                  <FontAwesomeIcon icon={faCaretUp} />
                )}
              </th>
              <th onClick={() => this.handleSort("Amount")}>
                Amount{" "}
                {this.state.sortingColumn === "Amount" && (
                  <FontAwesomeIcon icon={faCaretUp} />
                )}
              </th>
              <th onClick={() => this.handleSort("Category")}>
                Category{" "}
                {this.state.sortingColumn === "Category" && (
                  <FontAwesomeIcon icon={faCaretUp} />
                )}
              </th>
              <th onClick={() => this.handleSort("Comment")}>
                Comment{" "}
                {this.state.sortingColumn === "Comment" && (
                  <FontAwesomeIcon icon={faCaretUp} />
                )}
              </th>
              <th className="Table-th"></th>
            </tr>
          </thead>
          <tbody>{tbodyContent}</tbody>
        </table>

        <input
          className="btn btn-primary pr-5 pl-5 mt-3 mx-2"
          onClick={this.handleShowForm}
          value="Add Expense"
        />
        <input
          className="btn btn-danger pr-5 pl-5 mt-3 mx-2"
          onClick={this.handleDelete}
          // ES6 string
          value={`Delete ${this.state.numSelectedRecords} Records`}
          disabled={this.state.numSelectedRecords === 0}
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
