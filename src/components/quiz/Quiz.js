import Questions from "../questions/Questions";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CountDown from "../CountDown";
import { UserContext } from "../context/UserContext";
import { useNavigatorOnLine } from "../../hooks/navigatorOnline";
import axios from "axios";
import { QuestionContext } from "../context/QuestionsContext";

function Test() {
  // {
  //   id: 11,
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

  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [testQuestions, setTestQuestions] = useState([]);

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
  const questionContextValue = useContext(QuestionContext);
  const [isLoad, setIsLoad] = useState(false);
  const [question, setQuestion] = useState({});

  const timerPause = () => {
    const newTime = JSON.parse(localStorage.getItem("timer"));
    const newTimeInMs =
      newTime?.hours * MS.HOURS +
      newTime?.minutes * MS.MINUTES +
      newTime?.seconds * MS.SECOND;
    let addDetails = {
      timer: newTimeInMs + NOW_IN_MS,
    };
    contextValue.dispatch({ type: "UPDATE_USER", payload: addDetails });
    questionContextValue.questionDispatch({
      type: "END_TEST",
      payload: {
        candidateId: contextValue.newUser?.candidateId,
        questionAnswer: questionContextValue?.question,
      },
    });
  };

  useEffect(() => {
    setIsLoad(true);
    axios
      .get(`${process.env.REACT_APP_API}/users/question/get`)
      .then((res) => {
        let answers = res.data.map((data) => {
          return { questionId: data._id, ans: [] };
        });

        if (contextValue.newUser?.candidateId) {
          questionContextValue.questionDispatch({
            type: "GET_QUESTION",
            payload: contextValue.newUser?.candidateId,
          });
        }

        if (questionContextValue?.question?.length) {
          let dataaa = res.data.map((data) => {
            return questionContextValue?.question.forEach((element) => {
              if (element.questionId === data?._id && data?.optionType !== "Query") {
                data.options.map((option) => {
                  element.ans.forEach((ele) => {
                    if (option.title === ele) {
                      option.value = true;
                    }
                  });
                });
              } else if(element.questionId === data?._id && data?.optionType === "Query"){
                data.options[0].query = element.ans[0];
                data.options[0].value = true;
              }
            });
          });
        }

        questionContextValue.questionContextValue?.questionDispatch({
          type: "CREATE_QUESTION",
          payload: answers,
        });

        setTestQuestions((testQue) => [...res.data]);
        const que = res.data[parseInt(params.id) - 1];
        if (JSON.stringify(params) === "{}") {
          setQuestion({ ...res.data[0], index: 0 });
        } else {
          setQuestion({
            ...res.data[que ? parseInt(params.id) - 1 : 0],
            index: que ? parseInt(params.id) - 1 : 0,
          });
        }

        setIsLoad(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoad(false);
      });

    return () => {
      timerPause();
    };
  }, [contextValue.newUser?.candidateId]);

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

    if (!contextValue.newUser?.step) {
      navigate("/");
    } else if (contextValue.newUser?.step === "start_test") {
      navigate("/start_test");
    } else if (
      contextValue.newUser?.email &&
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
    let selectedQueIndex = testQuestions.findIndex((data) => data._id === id);
    setQuestion({
      ...testQuestions[selectedQueIndex],
      index: selectedQueIndex,
    });
    navigate(`/quiz/${index + 1}`);
  };

  const handlePreQuestion = (id) => {
    let selectedQueIndex = testQuestions.findIndex((data) => data._id === id);
    setQuestion({
      ...testQuestions[selectedQueIndex - 1],
      index: selectedQueIndex - 1,
    });
    navigate(`/quiz/${selectedQueIndex}`);
  };

  const handleNextQuestion = (id) => {
    let selectedQueIndex = testQuestions.findIndex((data) => data._id === id);
    setQuestion({
      ...testQuestions[selectedQueIndex + 1],
      index: selectedQueIndex + 1,
    });
    navigate(`/quiz/${selectedQueIndex + 2}`);
  };

  const updateQuestion = (que) => {
    setQuestion(que);
    let answers = [];
    que.options.map((data) =>
      data?.value && data?.title
        ? answers?.push(data?.title)
        : data?.query
        ? answers?.push(data?.query)
        : null
    );

    let newTestQuestions = testQuestions.map((obj) => {
      if (obj?._id === question?._id) {
        return { ...obj, options: question?.options };
      }
      return obj;
    });

    questionContextValue.questionDispatch({
      type: "UPDATE_QUESTION",
      payload: { questionId: que._id, ans: [...answers] },
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
        questionContextValue.questionDispatch({
          type: "END_TEST",
          payload: {
            candidateId: contextValue.newUser?.candidateId,
            questionAnswer: questionContextValue.question,
          },
        });
        navigate(`/result`);

        let addDetails = {
          pauseTime: `${hours}:${minutes}:${seconds}`,
          testStatus: "complete",
          timer: 0,
        };
        localStorage.removeItem("timer");
        contextValue.dispatch({ type: "UPDATE_USER", payload: addDetails });
      }
    } else {
      navigate("/result");

      let addDetails = {
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
      {isLoad ? <h1>Load</h1> : null}
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
              onClick={() => handleQuestion(que._id, index)}
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
              disabled={question?._id === testQuestions[0]?._id}
              onClick={() => handlePreQuestion(question?._id)}
              className="btn btn-primary"
            >
              pre
            </button>
            <button
              type="submit"
              disabled={
                question?._id === testQuestions[testQuestions?.length - 1]?._id
              }
              onClick={() => handleNextQuestion(question?._id)}
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
