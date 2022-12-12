import React, { useEffect, useState } from 'react';
import useForm from '../../hooks/form.js';
import { InputGroup, FormGroup, Button, Card, Elevation, Label } from "@blueprintjs/core";

import { v4 as uuid } from 'uuid';

const ToDo = () => {

  const [defaultValues] = useState({
    difficulty: 3,
  });
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

  function addItem(item) {
    item.id = uuid();
    item.complete = false;
    console.log(item);
    setList([...list, item]);
  }

  function deleteItem(id) {
    const items = list.filter(item => item.id !== id);
    setList(items);
  }

  function toggleComplete(id) {

    const items = list.map(item => {
      if (item.id == id) {
        item.complete = !item.complete;
      }
      return item;
    });

    setList(items);

  }

  useEffect(() => {
    let incompleteCount = list.filter(item => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
  }, [list]);

  return (
    <>
      <header>
        <h1>To Do List: {incomplete} items pending</h1>
      </header>

      <form onSubmit={handleSubmit}>

        <h2>Add To Do Item</h2>

        <FormGroup
          label1="Item"
          labelFor1="text-input"
          lableInfo1="(required)"

          label2="Item"
          labelFor2="text-input"
          lableInfo2="(required)"
        >
          <Label>
            <span>Task</span>
            <InputGroup put onChange={handleChange} name="text" type="text" placeholder="Item Details" />
          </Label>

          <Label>
            <span>Assigned</span>
            <InputGroup onChange={handleChange} name="assignee" type="text" placeholder="Assignee Name" />
          </Label>

          <Label>
            <span>Difficulty</span>
            <input onChange={handleChange} defaultValue={defaultValues.difficulty} type="range" min={1} max={5} name="difficulty" />
          </Label>

          <Label>
            <Button icon="add" type="submit" intent="primary" text="add" />
          </Label>
        </FormGroup>
      </form>

      {list.map(item => (
        <div class="listContainer">
          <Card interactive={true} elevation={Elevation.Two} key={item.id}>
            <span>{item.complete ? 'Completed!' : 'Pending'}</span>
            <p><small>Task: {item.text}</small></p>
            <p><small>Assigned to: {item.assignee}</small></p>
            <p><small>Difficulty: {item.difficulty}</small></p>
            <div class="listContainerButtons">
              <Button onClick={() => toggleComplete(item.id)}>{item.complete ? 'Click to Reactivate' : 'Click to Finish'}</Button>
              <Button onClick={() => deleteItem(item.id)}>Delete</Button>
            </div>
          </Card>
        </div>
      ))}

    </>
  );
};

export default ToDo;
