export default function (state = [], action) {
  switch (action.type) {
    case "FETCH_AIRPORTS":
      return action.payload;
    default:
      return state;
  }
}