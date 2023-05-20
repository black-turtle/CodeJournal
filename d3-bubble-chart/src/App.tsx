import { CSSProperties } from "react";
import BubbleChart from "./graph/BubbleChart";
import { dummyData } from "./graph/data";

const styles: Record<string, CSSProperties> = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    // background: "red",
    margin: "2rem 0",
  },
};

function App() {
  return (
    <div style={styles.container}>
      <h1>Bubble graph</h1>
      <div>
        <BubbleChart data={dummyData} />
      </div>
    </div>
  );
}

export default App;
