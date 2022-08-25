import React, {ReactNode, useEffect, useState} from 'react';
import {List, ListItem, ListItemText, ListSubheader, Switch} from "@mui/material";

type Task = {
    id: number;
    label: ReactNode;
    done: boolean;
}

const findAllTasks = () => {
    return new Promise((resolve, reject) => {
        setTimeout(
            () => resolve([
                {id: 1, label: 'task 1', done: true},
                {id: 2, label: 'task 2', done: true},
                {id: 3, label: 'task 3', done: false},
                {id: 4, label: 'task 4', done: true},
                {id: 5, label: 'task 5', done: true},
            ]),
            5000
        );
    });
}

function App() {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        (async () => await findAllTasks())();
    }, []);

    const onTaskDoneButtonClick = (taskId: number) => () => {
        setTasks(tasks.map((todo: Task) => {
            if (todo.id === taskId) {
                return {...todo,
                    label: <>
                        <del>{todo.label}</del>
                        done</>,
                    done: false
                }
            }
            return todo;
        }))
    };

  return (
      <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', margin: 'auto' }}
          subheader={<ListSubheader>Todo list</ListSubheader>}
      >
        {
          tasks.map((todo: Task) => <ListItem key={todo.id} data-testid={`task-${todo.id}`}>
            <ListItemText primary={todo.label} />
            <Switch
                edge="end"
                data-testid={todo.label}
                onChange={onTaskDoneButtonClick(todo.id)}
                checked={todo.done}
            />
          </ListItem>
          )
        }
      </List>
  );
}

export default App;
