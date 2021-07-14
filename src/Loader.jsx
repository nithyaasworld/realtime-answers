import LinearProgress from "@material-ui/core/LinearProgress";

export default function Loader() {
  return (
    <div
      className="loader-wrapper"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <div className="loader" style={{ width: "60%" }}>
        <h1>Loading...</h1>
        <LinearProgress />
      </div>
    </div>
  );
}
