import React from "react";
import VideoPlayer from "./VideoPlayer";

const App = () => {
  return (
    <div style={styles.container}>
      <VideoPlayer />
    </div>
  );
};

const styles = {
  container: {
    width: "100vw",
    height: "100vh",
    margin: 0,
    padding: 0,
    backgroundColor: "black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default App;
