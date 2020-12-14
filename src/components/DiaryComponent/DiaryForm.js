import React from "react";
import "../../styles/Forms.css";

import { Form, Button, Col } from "react-bootstrap";

const DiaryForm = (props) => {

  return (
    <div className="form-container">
      <span>{props.message}</span>
      <Form onSubmit={props.submitDiaryForm}>
      <span>Please, type this code {props.match.params.id} in MovieID to confirm this movie</span>
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
          <Form.Label>People:</Form.Label>
          <Form.Control
            value={props.newDiary.people}
            name="people"
            onChange={(event) => props.changeHandlerDiary(event.target)}
            placeholder="Who was with you? maybe alone?"
          />
        </Form.Group>

        {/* <Form.Row>
          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Mood:</Form.Label>
            <Form.Control
              as="select"
              name="mood"
              value={props.newDiary.mood}
              onChange={(event) => props.changeHandlerDiary(event.target)}
              defaultValue="Choose..."
            >
              <option>Angry</option>
              <option>Excited</option>
              <option>Happy</option>
              <option>Sad</option>
              <option>Tender</option>
              <option>Scared</option>
            </Form.Control>
          </Form.Group>
        </Form.Row> */}

        <Form.Group controlId="formGridAddress2">
          <Form.Label>Notes:</Form.Label>
          <Form.Control
            type="textarea"
            name="notes"
            value={props.newDiary.notes}
            onChange={(event) => props.changeHandlerDiary(event.target)}
            placeholder="Insert some notes here"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default DiaryForm;
