import React from "react";
import { getItems } from "../../helpers/localStorage";
import CommentCard from "../CommentCard/CommentCard";
export default class BlogPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      userId: "",
      isLogged: Boolean(getItems("isLogged")),
      comment: "",
    };
  }

  componentDidMount() {
    const pathname = this.props.location.pathname;
    const parameters = pathname.replace("/blog/:", "").split("&:");
    const [commentId, userId] = [...parameters];

    if (commentId !== null && userId !== "null") {
      const comments = getItems("comments");
      const comment = comments.filter((el) => {
        return el.id === Number(commentId);
      });
      this.setState({ id: commentId, userId: userId, comment: comment[0] });
    }
  }

  render() {
    if (typeof this.state.comment !== "undefined") {
      const comment = this.state.comment;
      if (this.state.isLogged) {
        return (
          <>
            <CommentCard
              key={Math.random()}
              date={comment.createdOnStr}
              title={comment.title}
              comment={comment.comment}
              userId={comment.userId}
              id={comment.id}
              type="edit"
            />
          </>
        );
      }
    }

    return <></>;
  }
}
