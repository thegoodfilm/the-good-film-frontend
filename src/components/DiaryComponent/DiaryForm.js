import React from "react";
import "../../styles/Forms.css";
import { Form, Button, Col } from "react-bootstrap";

const DiaryForm = (props) => {
  return (
    <div className="form-container">
      <div className="info-message">
        <span>{props.message}</span>
      </div>
      <Form onSubmit={props.submitDiaryForm}>
        <p>
          Please, type this code{" "}
          <span className="movieID-code">{props.match.params.id}</span> in
          MovieID to confirm this movie
        </p>
        <Form.Group controlId="formGridAddress2">
          <Form.Label>Movie ID:</Form.Label>
          <Form.Control
            type="text"
            value={props.newDiary.movieID}
            name="movieID"
            onChange={(event) => props.changeHandlerDiary(event.target)}
            placeholder="Type code"
          />
        </Form.Group>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Date:</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={props.newDiary.date}
              onChange={(event) => props.changeHandlerDiary(event.target)}
            />
          </Form.Group>
        </Form.Row>
        <Form.Group controlId="formGridAddress2">
          <Form.Label>Place:</Form.Label>
          <Form.Control
            value={props.newDiary.place}
            name="place"
            onChange={(event) => props.changeHandlerDiary(event.target)}
            placeholder="Where did you see this movie?"
          />
        </Form.Group>
        <Form.Group controlId="formGridAddress2">
          <Form.Label>Watched with:</Form.Label>
          <Form.Control
            value={props.newDiary.people}
            name="people"
            onChange={(event) => props.changeHandlerDiary(event.target)}
            placeholder="Who was with you? maybe alone?"
          />
        </Form.Group>
        <Form.Group controlId="formGridAddress2">
          <Form.Label>Notes:</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            name="notes"
            value={props.newDiary.notes}
            onChange={(event) => props.changeHandlerDiary(event.target)}
            placeholder="Insert some notes here"
          />
        </Form.Group>
        <div className="form-align">
          <span className="info-message-diary">{props.message}</span>
          <Button variant="outline-secondary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default DiaryForm;
