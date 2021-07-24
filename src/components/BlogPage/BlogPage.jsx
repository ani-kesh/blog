import React from "react";
import { getItems } from "../../helpers/localStorage";
export default class BlogPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      isLogged: false,
    };
  }

  componentDidMount() {
    const userId = 0;
    if (userId != null) {
      const users = getItems("users");
      const user = users.filter((el) => {
        return userId === el.id;
      });

      const isLogged = user[0].isLogin;
      if (isLogged) {
          this.setState({ isLogged: true });
      }
    }
  }

  render() {
    return <>aaaa</>;
  }
}
