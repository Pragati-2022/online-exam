import Questions from "../questions/Questions";
import { useLocation, useNavigate } from "react-router-dom";
import { useCallback, useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CountDown from "../CountDown";
import { UserContext } from "../context/UserContext";

function Test() {
  let allTestQuestions = [
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
  const [testQuestions, setTestQuestions] = useState(allTestQuestions);
  const [question, setQuestion] = useState(testQuestions[0]);
  const LIMIT_IN_MS = 60 * 1000;
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

  useEffect(() => {
    return () => {
      const newTime = JSON.parse(localStorage.getItem("timer")) || {};
      const newTimeInMs =
        newTime?.hours * MS.HOURS +
        newTime?.minutes * MS.MINUTES +
        newTime?.seconds * MS.SECOND;

      let addDetails = {
        timer: newTimeInMs + NOW_IN_MS,
      };
      contextValue.dispatch({ type: "UPDATE_USER", payload: addDetails });
    };
  }, []);

  useEffect(() => {
    if (contextValue.newUser?.testStatus?.toLowerCase() === "inprogress") {
      navigate("/test");
    }

    if (
      contextValue.newUser?.email &&
      contextValue.newUser?.step === "start_test"
    ) {
      let addDetails = {
        step: "quiz",
      };
      contextValue.dispatch({ type: "UPDATE_USER", payload: addDetails });
    }

    if (!contextValue.newUser?.step) {
      navigate("/");
    } else if (contextValue.newUser?.step === "instruction") {
      navigate("/register");
    } else if (contextValue.newUser?.step === "enter_details") {
      navigate("/success");
    } else if (
      contextValue.newUser?.email &&
      contextValue.newUser?.result &&
      contextValue.newUser?.testStatus?.toLowerCase() === "complete"
    ) {
      navigate(`/result`);
    } else if (
      contextValue.newUser?.testStatus?.toLowerCase() === "inprogress"
    ) {
      if (location.pathname.includes("test")) {
        navigate(location.pathname);
      } else {
        navigate("/test");
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

  const handleQuestion = (id) => {
    setQuestion(testQuestions[id - 1]);
    navigate(`/test/${id}`);
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
    testQuestions.some((data) => {
      return data.options.some((data) => {
        return data.value;
      });
    });
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

  const shuffleArray = (array) => {
    let i = array.length - 1;
    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  const RecommendedPosts = (posts) => {
    if (!localStorage.getItem("timer")) {
      localStorage.setItem("que", JSON.stringify(shuffleArray(posts)));
    }

    return JSON.parse(localStorage.getItem("que")) || {};
  };

  return (
    <>
      <CountDown
        targetTime={dateTimeAfterLimit}
        handleEndTest={handleEndTest}
        updateHours={(e) => setHours(e)}
        updateMinutes={(e) => setMinutes(e)}
        updateSeconds={(e) => setSeconds(e)}
      />

      {RecommendedPosts(testQuestions)?.map((que, index) => (
        <div
          key={index}
          style={{
            backgroundColor: que.options.some((data) => data.value)
              ? "green"
              : "none",
          }}
        >
          <div onClick={() => handleQuestion(que?.id)}>{que?.id}</div>
        </div>
      ))}
      <button
        type="button"
        className="btn btn-danger"
        onClick={() => handleSubmitTest()}
      >
        End Test
      </button>
      <Questions question={question} updateQuestion={updateQuestion} />

      <button
        type="button"
        disabled={parseInt(question.id) === 1}
        onClick={() => handleQuestion(parseInt(question.id) - 1)}
        className="btn btn-primary"
      >
        pre
      </button>
      <button
        type="submit"
        disabled={parseInt(question.id) === testQuestions.length}
        onClick={() => handleQuestion(parseInt(question.id) + 1)}
        className="btn btn-primary"
      >
        next
      </button>
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
