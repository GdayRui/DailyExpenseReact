import React, { Component } from "react";
import Form from "./Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faCaretUp } from "@fortawesome/free-solid-svg-icons";

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ascending: true,
      isMainPage: true,
      data: [],
      dataFiltered: [],
      storageKey: "expenseList",
      numSelectedRecords: 0,
      sortingColumn: ""
    };
  }

  handleShowForm = () => {
    this.setState({ isMainPage: false });
  };

  handleShowMainPage = () => {
    this.setState({ isMainPage: true });
  };

  handleSelected = id => {
    let numSelectedRecords = this.state.numSelectedRecords;

    for (let i = 0; i < this.state.data.length; i++) {
      if (id === this.state.data[i].Id) {
        let tmpData = this.state.data;

        tmpData[i].isSelected = !tmpData[i].isSelected;
        tmpData[i].isSelected ? numSelectedRecords++ : numSelectedRecords--;

        this.setState({
          numSelectedRecords: numSelectedRecords,
          data: tmpData
        });
        return;
      }
    }

    for (let i = 0; i < this.state.dataFiltered.length; i++) {
      if (id === this.state.dataFiltered[i].Id) {
        let tmpDataFiltered = this.state.dataFiltered;
        tmpDataFiltered[i].isSelected = !tmpDataFiltered[i].isSelected;
        tmpDataFiltered[i].isSelected
          ? numSelectedRecords++
          : numSelectedRecords--;
        this.setState({
          numSelectedRecords: numSelectedRecords,
          dataFiltered: tmpDataFiltered
        });
        return;
      }
    }
  };

  // Delete selected records
  handleDelete = () => {
    let resultList = this.state.data.filter(item => !item.isSelected);
    this.setState({
      data: resultList,
      dataFiltered: resultList,
      numSelectedRecords: 0
    });
    // **
    window.localStorage.setItem(
      this.state.storageKey,
      JSON.stringify(resultList)
    );
  };

  // ***
  handleAddNewRecord = newRecord => {
    newRecord.Id = this.state.data.length + 1;
    let currentData = this.state.data;
    currentData.push(newRecord);

    window.localStorage.setItem(
      this.state.storageKey,
      JSON.stringify(currentData)
    );

    this.setState({
      data: currentData,
      dataFiltered: currentData,
      numSelectedRecords: 0
    });
  };

  // Sort the data
  handleSort = type => {
    const compareItem = (a, b) => {
      const itemA = a.Description.toUpperCase();
      const itemB = b.Description.toUpperCase();
      // ** cannot compare 2 strings. this compare fn only return 0, 1, -1.
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
    // if (type === "Amount") {
    //   sortedData = this.state.data.sort(compareAmount);
    // } else if (type === "Item") {
    //   sortedData = this.state.data.sort(compareItem);
    // } else if (type === "Comment") {
    //   sortedData = this.state.data.sort(compareComment);
    // } else if (type === "Category") {
    //   sortedData = this.state.data.sort(compareCategory);
    // } else if (type === "Date") {
    //   sortedData = this.state.data.sort(compareDate);
    // }

    switch (type) {
      case "Amount":
        sortedData = this.state.data.sort(compareAmount);
        break;
      case "Item":
        sortedData = this.state.data.sort(compareItem);
        break;
      case "Comment":
        sortedData = this.state.data.sort(compareComment);
        break;
      case "Category":
        sortedData = this.state.data.sort(compareCategory);
        break;
      case "Date":
        sortedData = this.state.data.sort(compareDate);
        break;
      default:
        break;
    }
    this.state.ascending = !this.state.ascending;

    this.setState({
      data: sortedData,
      sortingColumn: type,
      ascending: this.state.ascending
    });
  };

  // Quick search
  handleQuickSearch = e => {
    debugger;
    var userInput = e.target.value;
    const filterFn = item =>
      item.Description.indexOf(userInput) >= 0 ||
      item.Amount.indexOf(userInput) >= 0 ||
      item.Description.indexOf(userInput) >= 0 ||
      item.Category.indexOf(userInput) >= 0;

    let filteredResult = this.state.data.filter(filterFn);

    this.setState({ dataFiltered: filteredResult });
  };

  // Read local storage data when loading the page.

  readLocalStorage = () => {
    let storedDataJson = window.localStorage.getItem(this.state.storageKey);

    let storedData = JSON.parse(storedDataJson);
    if (storedData) {
      this.setState({ data: storedData, dataFiltered: storedData });
    }
  };

  // After render
  componentDidMount() {
    this.readLocalStorage();
  }

  render() {
    // Filtered data. Always use 'filteredData' as Tbody, but assign it 'data' whenever 'data' change.
    let tbodyFilteredData = this.state.dataFiltered.map(item => {
      return (
        <tr onClick={() => this.handleSelected(item.Id)}>
          <td>{item.Date}</td>
          <td>{item.Description}</td>
          <td>{item.Amount}</td>
          <td>{item.Category}</td>
          <td>{item.Comment}</td>
          {item.isSelected ? (
            <td>
              <FontAwesomeIcon icon={faCheckCircle} />
            </td>
          ) : (
            <td></td>
          )}
        </tr>
      );
    });

    let mainPage = (
      <div className="container">
        <div className="container my-5">
          <h2>{this.props.title}</h2>
        </div>
        <input type="text" onChange={this.handleQuickSearch} />
        <table className="table table-striped my-2">
          <thead>
            <tr>
              <th onClick={() => this.handleSort("Date")}>
                Date{" "}
                {this.state.sortingColumn === "Date" &&
                  (this.state.ascending ? (
                    <FontAwesomeIcon icon={faCaretUp} />
                  ) : (
                    <FontAwesomeIcon className="faCaretDown" icon={faCaretUp} />
                  ))}
              </th>
              <th onClick={() => this.handleSort("Item")}>
                Item{" "}
                {this.state.sortingColumn === "Item" &&
                  (this.state.ascending ? (
                    <FontAwesomeIcon icon={faCaretUp} />
                  ) : (
                    <FontAwesomeIcon className="faCaretDown" icon={faCaretUp} />
                  ))}
              </th>
              <th onClick={() => this.handleSort("Amount")}>
                Amount{" "}
                {this.state.sortingColumn === "Amount" &&
                  (this.state.ascending ? (
                    <FontAwesomeIcon icon={faCaretUp} />
                  ) : (
                    <FontAwesomeIcon className="faCaretDown" icon={faCaretUp} />
                  ))}
              </th>
              <th onClick={() => this.handleSort("Category")}>
                Category{" "}
                {this.state.sortingColumn === "Category" &&
                  (this.state.ascending ? (
                    <FontAwesomeIcon icon={faCaretUp} />
                  ) : (
                    <FontAwesomeIcon className="faCaretDown" icon={faCaretUp} />
                  ))}
              </th>
              <th onClick={() => this.handleSort("Comment")}>
                Comment{" "}
                {this.state.sortingColumn === "Comment" &&
                  (this.state.ascending ? (
                    <FontAwesomeIcon icon={faCaretUp} />
                  ) : (
                    <FontAwesomeIcon className="faCaretDown" icon={faCaretUp} />
                  ))}
              </th>
              <th className="Table-th"></th>
            </tr>
          </thead>
          <tbody>{tbodyFilteredData}</tbody>
        </table>

        <input
          className="btn btn-primary pr-5 pl-5 mt-3 mx-2"
          onClick={this.handleShowForm}
          value="Add Expense"
          readOnly
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
