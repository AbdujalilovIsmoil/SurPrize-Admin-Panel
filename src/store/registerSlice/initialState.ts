interface initialStateInterface {
  token: string;
  data: {
    name: string;
    number: string | number;
  };
}

const initialState: initialStateInterface = {
  token: "",
  data: {
    name: "",
    number: "",
  },
};

export default initialState;
