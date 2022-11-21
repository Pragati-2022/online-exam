import { useParams } from "react-router-dom";

function Questions(props) {
  const params = useParams();

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

  return (
    <>

<div className="question-list-main">
        <div className="q-id">  Question {JSON.stringify(params) === "{}" ? 1 : [params["id"]]}</div>
        <div  className="q-title">{props.question?.title}</div>
        <div className="q-marks">Marks: {props.question?.marks}</div>
        <ul className="question-list">
          {props.question?.options?.map((option, index) => {
            return (
              <li key={`${index}-${props.question?.id}`}>
              
                    {props.question?.isMultiAns ? (
                      <input
                        type="checkbox"
                        id={`custom-checkbox-${index}-${props.question?.id}`}
                        name={option?.title}
                        checked={option?.value}
                        onChange={(e) => handleOnChangeCheckbox(index, e)}
                      />
                    ) : (
                      <input
                        type="radio"
                        value={option?.title}
                        id={`custom-checkbox-${index}-${props.question?.id}`}
                        name="gender"
                        checked={option?.value}
                        onChange={(e) => handleOnChangeRadio(index, e)}
                      />
                    )}

                    <label
                      htmlFor={`custom-checkbox-${index}-${props.question?.id}`}
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
