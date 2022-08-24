import React from 'react';
import {render, screen, within} from '@testing-library/react';
import App from './App';
import userEvent from "@testing-library/user-event";

describe('todo list', () => {
    test('I should be able to mark a task as done', () => {
        render(<App/>);

        const task = within(screen.getByTestId('task-1'));

        userEvent.click(task.getByRole('checkbox'));

        expect(task.getByText('done')).toBeInTheDocument()
    });
});
