import React, { FunctionComponent, useState } from 'react';
import TodoItem, { Todo } from '../../components/TodoItem';
import Button from 'antd/es/button';
import Input from 'antd/es/input';
import List from 'antd/es/list';
import Radio from 'antd/es/radio';
import Row from 'antd/es/row';
import Col from 'antd/es/col';
import Progress from 'antd/es/progress';

enum Filter {
  SHOW_ALL,
  SHOW_COMPLETED,
  SHOW_ACTIVE,
}

const App: FunctionComponent = () => {

  const [textInput, setTextInput] = useState<string>('');
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const [visibility, setVisibility] = useState<Filter>(Filter.SHOW_ALL);

  const getVisibleTodos = (todos: Array<Todo>, filter: Filter): Array<Todo> => {
    switch (filter) {
      case Filter.SHOW_ALL:
        return todos.filter((t: Todo) => !t.deleted);
      case Filter.SHOW_COMPLETED:
        return todos.filter((t: Todo) => t.completed && !t.deleted);
      case Filter.SHOW_ACTIVE:
        return todos.filter((t: Todo) => !t.completed && !t.deleted);
      default:
        throw new Error('Unknown filter: ' + filter);
    }
  }

  const newTodo = (): Todo => {
    const todo: Todo = {
      id: todos.length + 1,
      text: textInput,
      completed: false,
      deleted: false,
    }
    return todo;
  }

  const progressTodo = (): number => {
    const todoWithOutDeletion = todos.filter((t: Todo) => !t.deleted);
    const completed: number = getVisibleTodos(todoWithOutDeletion, Filter.SHOW_COMPLETED).length * 100
    const total: number = getVisibleTodos(todoWithOutDeletion, Filter.SHOW_ALL).length
    return Math.ceil(completed / total);
  };

  const toggleTodo = (id: number, checked: boolean): void => {
    setTodos(todos.map((todo: Todo) => {
      return todo.id === id ? { ...todo, completed: checked } : todo;
    }))
  };

  const deleteTodo = (id: number): void => {
    setTodos(todos.map((todo: Todo) => {
      return todo.id === id ? { ...todo, deleted: true } : todo;
    }))
  };

  const editTodo = (id: number, text: string): void => {
    setTodos(todos.map((todo: Todo) => {
      return todo.id === id ? { ...todo, text } : todo;
    }))
  };

  return (
    <div style={{ minHeight: '100vh', padding: 20 }}>
      <Row type="flex" justify="center">
        <Col xs={24} md={18}>
          <form onSubmit={e => {
            e.preventDefault()
            if (!textInput.trim()) {
              return;
            }
            setTodos([newTodo(), ...todos]);
            setTextInput('');
          }}>
            <Row type="flex" justify="start" gutter={8}>
              <Col><Input value={textInput} onChange={e => setTextInput(e.target.value)}/></Col>
              <Col><Button htmlType="submit">Add Todo</Button></Col>
            </Row>
          </form>
          <Row type="flex" justify="start" align="middle" gutter={8} style={{ margin: '10px 0' }}>
            <Col>Filter:</Col>
            <Col>
              <Radio.Group onChange={e => setVisibility(e.target.value)} value={visibility}>
                <Radio.Button value={Filter.SHOW_ALL}>All</Radio.Button>
                <Radio.Button value={Filter.SHOW_COMPLETED}>Completed</Radio.Button>
                <Radio.Button value={Filter.SHOW_ACTIVE}>Active</Radio.Button>
              </Radio.Group>
            </Col>
          </Row>
          <Progress strokeLinecap="square" percent={progressTodo()} />
          <List
            bordered
            dataSource={getVisibleTodos(todos, visibility)}
            renderItem={(item: Todo) => (
              <List.Item style={{ width: '100%' }}>
                <TodoItem
                  todo={item}
                  toggleTodo={toggleTodo}
                  deleteTodo={deleteTodo}
                  editTodo={editTodo}
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </div>
  );
}

export default App;