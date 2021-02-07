export function log(message) {
  if (process.env.REACT_APP_STAGE !== "production") {
    console.log(message);
  }
}
