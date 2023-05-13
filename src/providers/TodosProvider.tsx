import { useReducer } from "react";
import { Todo } from "../types";
import { TodosContext } from "../context/TodosContext";

type Action =
  | { type: "ADD_TODO"; payload: Todo }
  | { type: "TOGGLE_TODO"; payload: number }
  | { type: "DELETE_TODO"; payload: number };

export default function TodosProvider(
  { children }: { children: React.ReactNode },
) {
  const [todos, dispatch] = useReducer((state: Todo[], action: Action) => {
    switch (action.type) {
      case "ADD_TODO":
        return [...state, action.payload];
      case "TOGGLE_TODO":
        return state.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        );
      case "DELETE_TODO":
        return state.filter((todo) => todo.id !== action.payload);
      default:
        return state;
    }
  }, []);

  const addTodo = (name: string, priority: number) => {
    dispatch({
      type: "ADD_TODO",
      payload: {
        id: Date.now(),
        name,
        completed: false,
        priority,
      },
    });
  };

  const toggleTodo = (id: number) => {
    dispatch({
      type: "TOGGLE_TODO",
      payload: id,
    });
  };

  const deleteTodo = (id: number) => {
    dispatch({
      type: "DELETE_TODO",
      payload: id,
    });
  };

  return (
    <TodosContext.Provider
      value={{ state: { todos }, addTodo, toggleTodo, deleteTodo }}
    >
      {children}
    </TodosContext.Provider>
  );
}
