function Questions(props) {
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
      <div>
        <div>Question {props.question?.id}</div>
        <div>{props.question?.title}</div>
        <div>Marks: {props.question?.marks}</div>
        <div>
          {props.question?.options?.map((option, index) => {
            return (
              <li key={`${index}-${props.question?.id}`}>
                <div>
                  <div>
                    {props.question?.isMultiAns ? (
                      <input
                        type="checkbox"
                        id={`custom-checkbox-${index}-${props.question?.id}`}
                        name={option?.title}
                        // value={name}
                        // checked={checkedState[index]}
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
                  </div>
                </div>
              </li>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Questions;
