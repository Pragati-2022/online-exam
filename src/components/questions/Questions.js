import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { QuestionContext } from "../context/QuestionsContext";

function Questions(props) {
  const params = useParams();
  const navigate = useNavigate();
  const questionContextValue = useContext(QuestionContext);

  useEffect(() => {
    if (
      JSON.stringify(params) !== "{}" &&
      params["id"] !== props.question?.index
    ) {
      navigate("/test/1");
    }
  }, [params["id"]]);

  const handleOnChangeCheckbox = (selectedIndex, e) => {
    let options = props.question.options;
    options[selectedIndex].value = e.target.checked;

    let question = {
      ...props.question,
      options: options,
    };
    props.updateQuestion(question);
  };

  const handleOnChangeRadio = (selectedIndex, e) => {
    let options = props.question.options;
    options.map(
      (data) => (data.value = data.title === e.target.value ? true : false)
    );

    let question = {
      ...props.question,
      options: options,
    };
    props.updateQuestion(question);
  };

  const handleOnChangeQuery = (index, e, id) => {
    console.log(e);
    let options = props.question.options;
    options.map((data) => {
      data.query = e.target.value;
      return (data.value = data.query ? true : false);
    });

    let question = {
      ...props.question,
      options: options,
    };
    props.updateQuestion(question);
  };

  return (
    <>
      {/* {console.log(props.question)} */}
      <div className="question-list-main">
        <div className="q-id"> Question {props.question?.index + 1}</div>
        <div className="q-title">{props.question?.question}</div>
        {props.question?.marks ? (
          <div className="q-marks">Marks: {props.question?.marks}</div>
        ) : null}
        <ul className="question-list">
          {props.question?.options?.map((option, index) => {
            return (
              <li key={`${index}-${props.question?._id}`}>
                {props.question?.optionType === "Multiple" ? (
                  <input
                    type="checkbox"
                    id={`custom-checkbox-${index}-${props.question?._id}`}
                    name={option?.title}
                    checked={option?.value}
                    onChange={(e) => handleOnChangeCheckbox(index, e)}
                  />
                ) : props.question?.optionType === "Query" 
                ? (
                  <textarea
                    id={`custom-checkbox-${index}-${props.question?._id}`}
                    name={option?._id}
                    defaultValue={option?.query}
                    onChange={(e) => handleOnChangeQuery(index, e, option._id)}
                  ></textarea>
                ) : (
                  <input
                    type="radio"
                    value={option?.title}
                    id={`custom-checkbox-${index}-${props.question?._id}`}
                    name={option?.title}
                    checked={option?.value}
                    onChange={(e) => handleOnChangeRadio(index, e)}
                  />
                )}

                <label
                  htmlFor={`custom-checkbox-${index}-${props.question?._id}`}
                >
                  {option?.title}
                </label>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default Questions;
