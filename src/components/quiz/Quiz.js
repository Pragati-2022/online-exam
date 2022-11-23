import Questions from "../questions/Questions";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useCallback, useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CountDown from "../CountDown";
import { UserContext } from "../context/UserContext";

function Test() {
  const allTestQuestions = [
    // {
    //   id: 1,
    //   title: "one",
    //   options: [
    //     {
    //       title: "A",
    //       value: false,
    //     },
    //     {
    //       title: "B",
    //       value: true,
    //     },
    //     {
    //       title: "C",
    //       value: true,
    //     },
    //     {
    //       title: "D",
    //       value: false,
    //     },
    //   ],
    //   answer: ["A", "B"],
    //   selectedOptions: [],
    //   marks: 5,
    //   review: false,
    //   isMultiAns: true,
    // },
    {
      id: 1,
      title: "one",
      options: [
        {
          title: "A",
          value: false,
        },
        {
          title: "B",
          value: true,
        },
        {
          title: "C",
          value: false,
        },
        {
          title: "D",
          value: false,
        },
      ],
      answer: ["A"],
      selectedOptions: [],
      marks: 5,
      review: false,
    },
    {
      id: 2,
      title: "two",
      options: [
        {
          title: "A",
          value: false,
        },
        {
          title: "B",
          value: false,
        },
        {
          title: "C",
          value: true,
        },
        {
          title: "D",
          value: false,
        },
      ],
      answer: ["C"],
      selectedOptions: [],
      marks: 5,
      review: false,
    },
    {
      id: 3,
      title: "three",
      options: [
        {
          title: "A",
          value: false,
        },
        {
          title: "B",
          value: false,
        },
        {
          title: "C",
          value: true,
        },
        {
          title: "D",
          value: false,
        },
      ],
      answer: ["A"],
      selectedOptions: ["A"],
      marks: 5,
      review: false,
    },
    {
      id: 4,
      title: "four",
      options: [
        {
          title: "A",
          value: false,
        },
        {
          title: "B",
          value: false,
        },
        {
          title: "C",
          value: false,
        },
        {
          title: "D",
          value: false,
        },
      ],
      answer: ["B"],
      selectedOptions: ["A"],
      marks: 5,
      review: false,
    },
    {
      id: 5,
      title: "five",
      options: [
        {
          title: "A",
          value: false,
        },
        {
          title: "B",
          value: false,
        },
        {
          title: "C",
          value: false,
        },
        {
          title: "D",
          value: false,
        },
      ],
      answer: ["B"],
      selectedOptions: ["A"],
      marks: 5,
      review: false,
    },
    {
      id: 6,
      title: "six",
      options: [
        {
          title: "A",
          value: false,
        },
        {
          title: "B",
          value: false,
        },
        {
          title: "C",
          value: true,
        },
        {
          title: "D",
          value: false,
        },
      ],
      answer: ["C"],
      selectedOptions: ["A"],
      marks: 5,
      review: false,
    },
    {
      id: 7,
      title: "seven",
      options: [
        {
          title: "A",
          value: false,
        },
        {
          title: "B",
          value: false,
        },
        {
          title: "C",
          value: false,
        },
        {
          title: "D",
          value: false,
        },
      ],
      answer: ["A"],
      selectedOptions: ["A"],
      marks: 5,
      review: false,
    },
  ];

  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [testQuestions, setTestQuestions] = useState(allTestQuestions);
  const LIMIT_IN_MS = 60 * 60 * 1000;
  const MS = {
    HOURS: 3600000,
    MINUTES: 60000,
    SECOND: 1000,
  };
  const NOW_IN_MS = new Date().getTime();
  const dateTimeAfterLimit = NOW_IN_MS + LIMIT_IN_MS;
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const contextValue = useContext(UserContext);

  const getQuestionWithIndex = () => {
    const que = testQuestions[parseInt(params.id) - 1];
    return que ? parseInt(params.id) - 1 : 0;
  };

  const [question, setQuestion] = useState(
    JSON.stringify(params) === "{}"
      ? { ...testQuestions[0], index: 0 }
      : {
          ...testQuestions[getQuestionWithIndex()],
          index: getQuestionWithIndex(),
        }
  );

  useEffect(() => {
    return () => {
      const newTime = JSON.parse(localStorage.getItem("timer")) || {};
      const newTimeInMs =
        newTime?.hours * MS.HOURS +
        newTime?.minutes * MS.MINUTES +
        newTime?.seconds * MS.SECOND;

      let addDetails = {
        timer: newTimeInMs
      };
      contextValue.dispatch({ type: "UPDATE_USER", payload: addDetails });
    };
  }, []);

  useEffect(() => {
    if (contextValue.newUser?.testStatus?.toLowerCase() === "inprogress") {
      navigate("/quiz");
    }

    if (
      contextValue.newUser?.email &&
      contextValue.newUser?.step === "start_test" &&
      contextValue.newUser?.testStatus?.toLowerCase() === "inprogress"
    ) {
      let addDetails = {
        step: "quiz",
      };
      contextValue.dispatch({ type: "UPDATE_USER", payload: addDetails });
    }

    if (
      !contextValue.newUser?.step ||
      contextValue.newUser?.step === "instruction"
    ) {
      navigate("/");
    } else if (contextValue.newUser?.step === "enter_details") {
      navigate("/register");
    } else if (contextValue.newUser?.step === "start_test") {
      navigate("/start_test");
    } else if (
      contextValue.newUser?.email &&
      contextValue.newUser?.result &&
      contextValue.newUser?.testStatus?.toLowerCase() === "complete"
    ) {
      navigate(`/result`);
    } else if (
      contextValue.newUser?.testStatus?.toLowerCase() === "inprogress"
    ) {
      if (location.pathname.includes("quiz")) {
        navigate(location.pathname);
      } else {
        navigate("/quiz");
      }
    }
  }, [contextValue.newUser, location?.pathname]);

  useEffect(() => {
    if (!hours && !minutes && !seconds) return;
    if (contextValue.newUser?.testStatus?.toLowerCase() === "inprogress") {
      localStorage.setItem(
        "timer",
        JSON.stringify({ hours: hours, minutes: minutes, seconds: seconds })
      );
    }
  }, [hours, minutes, seconds]);

  const handleQuestion = (id, index) => {
    let selectedQueIndex = testQuestions.findIndex((data) => data.id === id);
    setQuestion({
      ...testQuestions[selectedQueIndex],
      index: selectedQueIndex,
    });
    navigate(`/quiz/${index + 1}`);
  };

  const handlePreQuestion = (id) => {
    console.log(id);
    let selectedQueIndex = testQuestions.findIndex((data) => data.id === id);
    console.log(testQuestions[selectedQueIndex]);
    setQuestion({
      ...testQuestions[selectedQueIndex - 1],
      index: selectedQueIndex - 1,
    });
    navigate(`/quiz/${selectedQueIndex}`);
  };

  const handleNextQuestion = (id) => {
    let selectedQueIndex = testQuestions.findIndex((data) => data.id === id);
    setQuestion({
      ...testQuestions[selectedQueIndex + 1],
      index: selectedQueIndex + 1,
    });
    navigate(`/quiz/${selectedQueIndex + 2}`);
  };

  const updateQuestion = (que) => {
    setQuestion(que);
    let newTestQuestions = testQuestions.map((obj) => {
      if (obj?.id === question?.id) {
        return { ...obj, options: question?.options };
      }
      return obj;
    });

    setTestQuestions(newTestQuestions);
    // testQuestions.some((data) => {
    //   return data.options.some((data) => {
    //     return data.value;
    //   });
    // });
  };

  const handleSubmitTest = () => {
    if (hours > 0 || minutes > 0 || seconds > 1) {
      if (window.confirm("Are you sure you want to end the test!")) {
        let marks = 0;
        testQuestions.forEach((data, index) => {
          data?.options.some((ans, index) => {
            if (ans?.value === true && ans?.title === data?.answer[0]) {
              marks = marks + data?.marks;
            }
            return ans?.value;
          });
        });
        navigate(`/result?mark=${marks}`);

        let addDetails = {
          result: marks,
          pauseTime: `${hours}:${minutes}:${seconds}`,
          testStatus: "complete",
          timer: 0,
        };
        localStorage.removeItem("timer");
        contextValue.dispatch({ type: "UPDATE_USER", payload: addDetails });
      }
    } else {
      let marks = 0;
      testQuestions.forEach((data, index) => {
        data?.options.some((ans, index) => {
          if (ans?.value === true && ans?.title === data?.answer[0]) {
            marks = marks + data?.marks;
          }
          return ans?.value;
        });
      });
      navigate(`/result?mark=${marks}`);

      let addDetails = {
        result: marks,
        testStatus: "complete",
        timer: 0,
      };
      localStorage.removeItem("timer");
      contextValue.dispatch({ type: "UPDATE_USER", payload: addDetails });
    }
  };

  const handleEndTest = () => {
    handleSubmitTest();
  };

  return (
    <>
      <div className="countdown">
        <CountDown
          targetTime={dateTimeAfterLimit}
          handleEndTest={handleEndTest}
          updateHours={(e) => setHours(e)}
          updateMinutes={(e) => setMinutes(e)}
          updateSeconds={(e) => setSeconds(e)}
        />
      </div>

      <div className="qno-listmain">
        {testQuestions?.map((que, index) => (
          <div
            key={index}
            className={
              que.options.some((data) => data.value)
                ? "qno-item qno-done"
                : "qno-item"
            }
          >
            <div
              className="qno-no"
              onClick={() => handleQuestion(que.id, index)}
            >
              {index + 1}
            </div>
          </div>
        ))}
      </div>
      <div className="testgroup-main">
        <div className="testgroup-inner">
          {" "}
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => handleSubmitTest()}
          >
            End Test
          </button>
          <Questions question={question} updateQuestion={updateQuestion} />
          <div className="prev-next-group">
            <button
              type="button"
              disabled={parseInt(question?.id) === testQuestions[0]?.id}
              onClick={() => handlePreQuestion(parseInt(question?.id))}
              className="btn btn-primary"
            >
              pre
            </button>
            <button
              type="submit"
              disabled={
                parseInt(question?.id) ===
                testQuestions[testQuestions?.length - 1]?.id
              }
              onClick={() => handleNextQuestion(parseInt(question?.id))}
              className="btn btn-primary"
            >
              next
            </button>
          </div>
        </div>
      </div>
      {/* {parseInt(question.id === testQuestions.length) ||
      testQuestions.every((data) => {
        return data.options.some((data) => {
          return data.value;
        });
      }) ? (
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => handleSubmitTest()}
        >
          submit
        </button>
      ) : null} */}
    </>
  );
}

export default Test;
