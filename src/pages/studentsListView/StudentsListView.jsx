import axios from "axios";
import React, { useState } from "react";
import "./StudentsListView.css";

function StudentsListView() {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [students, setStudents] = useState([]);
  const [isFetched, setIsFetched] = useState(false);

  const addStudent = (event) => {
    event.preventDefault();

    const student = { firstName: firstName, lastName: lastName, email: email };
    axios
      .post("/students", student)
      .then(() => {
        alert("Student added");
      })
      .catch(() => {
        alert("Failed to add student");
      });
  };

  const onFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const onLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const getStudents = (event) => {
    event.preventDefault();
    axios.get("/students").then((response) => {
      setStudents(response.data);
      setIsFetched(true);
    });
  };

  return (
    <div>
      <form className="studentInputForm" onSubmit={addStudent}>
        <label className="label">
          First Name:
          <input type={"text"} value={firstName} onChange={onFirstNameChange} />
        </label>
        <label className="label">
          Last Name:
          <input type={"text"} value={lastName} onChange={onLastNameChange} />
        </label>
        <label className="label">
          Email:
          <input type={"email"} value={email} onChange={onEmailChange} />
        </label>
        <input type="submit" value={"Add student"} />
      </form>

      <button onClick={getStudents}>Get Students</button>
      <span>
        {isFetched &&
          students.map((student) => (
            <div>
              <p>{student.firstName}</p> <br /> <p>{student.lastName}</p> <br />{" "}
              <p>{student.email}</p> <br />
            </div>
          ))}
      </span>
    </div>
  );
}

export default StudentsListView;
