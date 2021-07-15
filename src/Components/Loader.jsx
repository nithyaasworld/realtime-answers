import LinearProgress from "@material-ui/core/LinearProgress";

export default function Loader() {
  return (
    <div
      className="loader-wrapper"
      style={{ display: "flex", justifyContent: "center", gap: '1em' }}
    >
      <div className="loader" style={{ width: "100%" }}>
        <h1>Loading...</h1>
        <LinearProgress style={{ width: "100%"}} />
      </div>
    </div>
  );
}
