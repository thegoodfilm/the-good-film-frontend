import React from "react";
import "../../styles/Forms.css";

import { Form, Button} from "react-bootstrap";

const ReviewForm = (props) => {
  return (
    <div className="form-container">
  <span>{props.message}</span>
    <Form onSubmit={props.submitReviewForm}>
    <span>Please, type this code {props.match.params.id} in MovieID to confirm this movie</span>
    {/* <Form.Group controlId="formGridAddress2">
        <Form.Label>Movie ID:</Form.Label>
        <Form.Control
         type="text"
          value={props.newReview.movieID}
          name="movieID"
          onChange={(event) => props.changeHandlerReview(event.target)}
          placeholder="Type code"
        />
      </Form.Group> */}
      
      <Form.Group controlId="formGridAddress2">
        <Form.Label>Review:</Form.Label>
        <Form.Control
         type="text"
          value={props.newReview.reviewText}
          name="reviewText"
          onChange={(event) => props.changeHandlerReview(event.target)}
          placeholder="Type code"
        />
      </Form.Group>
    

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
 </div>
  );
};

export default ReviewForm;