import React, { Component } from 'react';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      listItem: [],
      doneList: []
    };
  }
  type(e) {
    this.setState({
      name: e.target.value
    });
  }
  addClickNotDone() {
    const { name, listItem } = this.state;
    if(name) {
      this.setState({
        listItem: [...listItem, name],
        name: '',
      })
    }
  }
  handleUnCheckBoxChangeChk(index) {
    const { listItem, doneList } = this.state;
    const removeByIndex = [...listItem.slice(0, index), ...listItem.slice(index + 1)];
    const itemToAdd = listItem[index];
    this.setState({
      doneList: [...doneList, itemToAdd],
      listItem: removeByIndex
    })
  }
  handleCheckBoxChangeChk(index) {
    const { listItem, doneList } = this.state;
    const removeByIndex = [...doneList.slice(0, index), ...doneList.slice(index + 1)];
    const itemToAdd = doneList[index];
    this.setState({
      listItem: [...listItem, itemToAdd],
      doneList: removeByIndex
    })
  }
  render() {
    const { name, listItem, doneList } = this.state;
    return (
      <div>
        <div>
          <input type="text" value={name} onChange={e => this.type(e)} />
          <button onClick={() => this.addClickNotDone()}>Add</button>
        </div>
        {
          listItem.map((item, index) =>
            <div key={index} id={index}>
              <input type="checkbox" checked={false} onChange={() => this.handleUnCheckBoxChangeChk(index)} />
              {item}
            </div>
          )}
        <div> Done Items</div>
        {
          doneList.map((item, i) =>
            <div key={i} id={i}>
              <input type="checkbox" checked={true} onChange={() => this.handleCheckBoxChangeChk(i)} />
              {item}
            </div>
          )}

      </div>
    );
  }
}

export default App;
