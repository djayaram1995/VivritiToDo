import React, { Component } from 'react';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      listItem: [],
      doneList: [],
      editBtnToggle: [],
      inputType: [],
      editName: ''
    };
  }
  type(e) {
    this.setState({
      name: e.target.value
    });
  }
  typeEdit(e) {
    this.setState({
      editName: e.target.value
    });
  }
  addClickNotDone() {
    const { name, listItem, editBtnToggle, inputType } = this.state;
    if(name) {
      this.setState({
        listItem: [...listItem, name],
        name: '',
        editBtnToggle: [...editBtnToggle, true],
        inputType: [...inputType, false]
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
  editBtn(i) {
    const { editBtnToggle, inputType } = this.state;
    const editArr =  editBtnToggle;
    editArr[i] = false;
    const inputTypArr =  inputType;
    inputTypArr[i] = true;
    this.setState({
      inputType: inputTypArr,
      editBtnToggle: editArr
    })
  }
  saveBtn(i) {
    const { listItem, editName, editBtnToggle, inputType } = this.state;
    const editArr =  editBtnToggle;
    editArr[i] = true;
    const inputTypArr =  inputType;
    inputTypArr[i] = false;
    if(editName) {
    const listItemCopy = listItem;
    listItemCopy[i] = editName;
    this.setState({
      editName: '',
      listItem: listItemCopy,
      inputType: inputTypArr,
      editBtnToggle: editArr
    }) }
  }
  deleteBtn(i) {
    const { listItem } = this.state;
    const removeByIndex = [...listItem.slice(0, i), ...listItem.slice(i + 1)];
    this.setState({listItem: removeByIndex});
  }
  render() {
    const { name, listItem, doneList, editBtnToggle, inputType, editName } = this.state;
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
              {
                inputType[index] ?
                  <input type="text" value={editName} onChange={e => this.typeEdit(e)} /> :
                  item
              }
              {editBtnToggle[index] ?
                <button onClick={() => this.editBtn(index)}>edit</button>: <button onClick={() => this.saveBtn(index)}>save</button>

              }
              <button onClick={() => this.deleteBtn(index)}>delete</button>
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
