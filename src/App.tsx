import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { useAuthenticator } from '@aws-amplify/ui-react';
import { generateClient } from "aws-amplify/data";


const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  const { signOut } = useAuthenticator();

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }

    
  function deleteTodo(id: string) {
    client.models.Todo.delete({ id })

  }

  return (
    <main>
      <h1>Checklist</h1>
      <p>Add new items below.</p>
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <li          
          onClick={() => deleteTodo(todo.id)} 
          key={todo.id}>{todo.content}</li>
        ))}
      </ul>
      <p>Click item to remove them.</p> 

      
      

          
      <button onClick={signOut}>Sign out</button>
    </main>
  );
}

export default App;
