import React, { Component } from 'react';
import './AppHeader.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      listItem: [],
      doneList: [],
      editBtnToggle: [],
      editBtnToggleDone: [],
      inputType: [],
      editName: '',
      editNameDone: '',
      inputTypeDone: []
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
  typeEditDone(e) {
    this.setState({
      editNameDone: e.target.value
    });
  }
  addClickNotDone() {
    const { name, listItem, editBtnToggle, inputType } = this.state;
    if (name) {
      this.setState({
        listItem: [...listItem, name],
        name: '',
        editBtnToggle: [...editBtnToggle, true],
        inputType: [...inputType, false]
      })
    }
  }
  handleUnCheckBoxChangeChk(index) {
    const { listItem, doneList, editBtnToggleDone, inputTypeDone, inputType } = this.state;
    const removeByIndex = [...listItem.slice(0, index), ...listItem.slice(index + 1)];
    const itemToAdd = listItem[index];
    if (!inputType[index]) {
      this.setState({
        doneList: [...doneList, itemToAdd],
        listItem: removeByIndex,
        editBtnToggleDone: [...editBtnToggleDone, true],
        inputTypeDone: [...inputTypeDone, false]
      })
    }
  }
  handleCheckBoxChangeChk(index) {
    const { listItem, doneList, inputTypeDone } = this.state;
    const removeByIndex = [...doneList.slice(0, index), ...doneList.slice(index + 1)];
    const itemToAdd = doneList[index];
    if (!inputTypeDone[index]) {
      this.setState({
        listItem: [...listItem, itemToAdd],
        doneList: removeByIndex
      })
    }
  }
  editBtn(i) {
    const { editBtnToggle, inputType, listItem } = this.state;
    const editArr = editBtnToggle;
    editArr[i] = false;
    const inputTypArr = inputType;
    inputTypArr[i] = true;
    this.setState({
      editName: listItem[i],
      inputType: inputTypArr,
      editBtnToggle: editArr
    })
  }
  saveBtn(i) {
    const { listItem, editName, editBtnToggle, inputType } = this.state;
    const editArr = editBtnToggle;
    editArr[i] = true;
    const inputTypArr = inputType;
    inputTypArr[i] = false;
    if (editName) {
      const listItemCopy = listItem;
      listItemCopy[i] = editName;
      this.setState({
        editName: '',
        listItem: listItemCopy,
        inputType: inputTypArr,
        editBtnToggle: editArr
      })
    }
  }
  editBtnDone(i) {
    const { editBtnToggleDone, inputTypeDone, doneList } = this.state;
    const editArr = editBtnToggleDone;
    editArr[i] = false;
    const inputTypArr = inputTypeDone;
    inputTypArr[i] = true;
    this.setState({
      editNameDone: doneList[i],
      inputTypeDone: inputTypArr,
      editBtnToggleDone: editArr
    })
  }
  saveBtnDone(i) {
    const { doneList, editNameDone, editBtnToggleDone, inputTypeDone } = this.state;
    const editArr = editBtnToggleDone;
    editArr[i] = true;
    const inputTypArr = inputTypeDone;
    inputTypArr[i] = false;
    if (editNameDone) {
      const doneListCopy = doneList;
      doneListCopy[i] = editNameDone;
      this.setState({
        editNameDone: '',
        doneList: doneListCopy,
        inputTypeDone: inputTypArr,
        editBtnToggleDone: editArr
      })
    }
  }
  deleteBtn(i) {
    const { listItem } = this.state;
    const removeByIndex = [...listItem.slice(0, i), ...listItem.slice(i + 1)];
    this.setState({ listItem: removeByIndex });
  }
  deleteBtnDone(i) {
    const { doneList } = this.state;
    const removeByIndex = [...doneList.slice(0, i), ...doneList.slice(i + 1)];
    this.setState({ doneList: removeByIndex });
  }
  render() {
    const { name, listItem, doneList, editBtnToggle, inputType, editName, editNameDone, inputTypeDone, editBtnToggleDone } = this.state;
    return (
      <div className="container">
        <div className="borderBottom">
          ADD ITEM
        </div>
        <div>
          <input type="text" value={name} onChange={e => this.type(e)} />
          <button className="f-right" onClick={() => this.addClickNotDone()}>Add</button>
        </div>
        <div id="todo" className="minHeight">
          <div className="borderBottom">TODO</div>
          {
            listItem.map((item, index) =>
              <div key={index} className="borderBottomList" id={index}>
                <div className="d-inline">
                  <input type="checkbox" checked={false} onChange={() => this.handleUnCheckBoxChangeChk(index)} />
                </div>
                <div className="d-inline">
                  {
                    inputType[index] ?
                      <input style={{ width: '120px' }} type="text" value={editName} onChange={e => this.typeEdit(e)} /> :
                      <div style={{ width: '125px' }}>{item}</div>
                  }
                </div>

                <div className="d-inline delete">
                  {editBtnToggle[index] ?
                    <button onClick={() => this.editBtn(index)}>Edit</button> : <button onClick={() => this.saveBtn(index)}>save</button>

                  }
                </div>
                <div className="d-inline delete">
                  <button onClick={() => this.deleteBtn(index)}>Delete</button>
                </div>

              </div>
            )}
        </div>
        <div className="minHeight">
          <div className="borderBottom"> COMPLETED</div>
          {
            doneList.map((item, index) =>
              <div key={index} className="borderBottomList" id={index}>
                <div className="d-inline">
                  <input type="checkbox" checked={true} onChange={() => this.handleCheckBoxChangeChk(index)} />
                </div>
                <div className="d-inline">
                  {
                    inputTypeDone[index] ?
                      <input style={{ width: '120px' }} type="text" value={editNameDone} onChange={e => this.typeEditDone(e)} /> :
                      <div style={{ width: '125px' }}>{item}</div>
                  }
                </div>

                <div className="d-inline delete">
                  {editBtnToggleDone[index] ?
                    <button onClick={() => this.editBtnDone(index)}>Edit</button> : <button onClick={() => this.saveBtnDone(index)}>save</button>

                  }
                </div>
                <div className="d-inline delete">
                  <button onClick={() => this.deleteBtnDone(index)}>Delete</button>
                </div>
              </div>
            )}
        </div>
      </div>
    );
  }
}

export default App;
