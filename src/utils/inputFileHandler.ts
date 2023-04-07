import parseData from "./parseData";

function inputFileHandler(event: any, setFileData: any, setShortestPath: any) {
  // TODO:Handle error
  if (
    event.target.files[0] === null ||
    event.target.files[0] === undefined ||
    event.target.files[0] === "" ||
    event.target.files[0].type !== "text/plain"
  ) {
    return;
  }
  setShortestPath(null);

  const file = event.target.files[0];
  const reader = new FileReader();

  reader.readAsText(file);
  reader.onload = () => {
    setFileData(parseData(reader.result as string));
  };
}

export default inputFileHandler;
