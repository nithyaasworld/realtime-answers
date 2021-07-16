import LinearProgress from "@material-ui/core/LinearProgress";

export default function Loader() {
  return (
    <div
      className="loader-wrapper"
      style={{ display: "flex", justifyContent: "center", gap: '1em', width: "100%", position: "relative", top: "2em",  }}
    >
      <div className="loader" style={{ width: "800px" }}>
        <h1>Loading...</h1>
        <LinearProgress style={{ width: "800px"}} />
      </div>
    </div>
  );
}
