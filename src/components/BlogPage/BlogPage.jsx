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
      const commentId = this.props.match.params.blogId;
    
      if (commentId !== null) {
        const comments = getItems("comments");
        const comment = comments.filter((el) => {
          return el.id === commentId;
        });
        this.setState({ ...comment, id: commentId, comment: comment[0] });
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
