import React from "react";
import useAuth from "./hooks/useAuth";

const App = () => {
  const { user } = useAuth();

  console.log(user);

  return (
    <div>
      <h1 className="text-5xl"> App {user}</h1>
    </div>
  );
};

export default App;
