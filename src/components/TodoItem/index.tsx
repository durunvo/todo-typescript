import React, { FunctionComponent, memo } from 'react';
import Checkbox from 'antd/es/checkbox';
import Row from 'antd/es/row';
import Col from 'antd/es/col';
import Input from 'antd/es/input';
import Button from 'antd/es/button';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  deleted: boolean;
}

export interface Props {
  todo: Todo;
  toggleTodo?: (id: number, checked: boolean) => void;
  editTodo?: (id: number, text: string) => void;
  deleteTodo?: (id: number) => void;
}

const TodoItem: FunctionComponent<Props> = ({ todo, toggleTodo, editTodo, deleteTodo }) => (
  <Row type="flex" gutter={8}>
    <Col>
      <Checkbox
        checked={todo.completed}
        onChange={e => toggleTodo && toggleTodo(todo.id, e.target.checked)}
      />
    </Col>
    <Col>
      <Input
        size="small"
        value={todo.text}
        onChange={e => editTodo && editTodo(todo.id, e.target.value)}
      />
    </Col>
    <Col>
      <Button
        block
        size="small"
        type="danger"
        onClick={() => deleteTodo && deleteTodo(todo.id)}
      >
        Delete
      </Button>
    </Col>
  </Row>
)

export default memo(TodoItem);
