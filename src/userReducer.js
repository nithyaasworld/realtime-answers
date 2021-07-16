let initialState = {
  user: {},
  answer_list: { student_list: [] },
};
export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_USER": {
      return { ...state, ...{ user: action.payload } };
    }
    case "DELETE_USER": {
      return { ...state, ...{ user: {} } };
    }
    case "ADD_ALL_STUDENTS": {
          let stateCopy = JSON.parse(JSON.stringify(state));
          console.log("action payload is: ",action.payload);
      stateCopy.answer_list.student_list = action.payload;
      return stateCopy;
    }
    case "ADD_ANSWERS": {
      let stateCopy = JSON.parse(JSON.stringify(state));
      stateCopy.answer_list[action.payload.studentDetails["name"]] =
        action.payload.studentDetails["answer"];
      return stateCopy;
    }
    case "DELETE_ALL_STUDENTS": {
      let stateCopy = JSON.parse(JSON.stringify(state));
      stateCopy.answer_list.student_list = [];
      return stateCopy;
    }
    default:
      return state;
  }
}
