import React from "react";
import LoadingButtonGroup from "../components/Button";
import TableColumnPinning from "../components/Footer";
function Home() {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <LoadingButtonGroup />
      <TableColumnPinning />
    </div>
  );
}

export default Home;
