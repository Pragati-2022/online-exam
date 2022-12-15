import Questions from "../questions/Questions";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import CountDown from "../CountDown";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { QuestionContext } from "../context/QuestionsContext";
import QuizHeader from "../common/quiz-header/QuizHeader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Quiz() {
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
          res.data.map((data) => {
            return questionContextValue?.question.forEach((element) => {
              if (
                element.questionId === data?._id &&
                data?.optionType !== "Query"
              ) {
                data.options.map((option) => {
                  element.ans.forEach((ele) => {
                    if (option.title === ele) {
                      option.value = true;
                    }
                  });
                });
              } else if (
                element.questionId === data?._id &&
                data?.optionType === "Query"
              ) {
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
    if (localStorage.getItem("userEmail") === "quiz") {
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
      localStorage.getItem("userEmail") === "complete"
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
  }, [contextValue.newUser, location.pathname]);

  useEffect(() => {
    if (!hours && !minutes && !seconds) return;
    if (localStorage.getItem("userEmail") === "quiz") {
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
        toast.success("Test Submited  successful!");
        questionContextValue.questionDispatch({
          type: "END_TEST",
          payload: {
            candidateId: contextValue.newUser?.candidateId,
            questionAnswer: questionContextValue.question,
          },
        });
        localStorage.setItem("userEmail", "complete");
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
      toast.success("Test Submited  successful!");
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
      <QuizHeader>
        <div className="countdown">
          <CountDown
            targetTime={dateTimeAfterLimit}
            handleEndTest={handleEndTest}
            updateHours={(e) => setHours(e)}
            updateMinutes={(e) => setMinutes(e)}
            updateSeconds={(e) => setSeconds(e)}
          />
        </div>
      </QuizHeader>
      <main className="main-wrap">
        <div className="container">
          <div className="question-box">
            <Questions question={question} updateQuestion={updateQuestion} />
            <div className="pt-10 flex que-actions">
              <div className="flex flex-1">
                <button
                  type="button"
                  disabled={question?._id === testQuestions[0]?._id}
                  onClick={() => handlePreQuestion(question?._id)}
                  className="!px-[15px] md:!px-[30px] !py-[14px] md:!py-[18px] btn btn-dark"
                >
                  <span className="btn-icon !mr-0">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 24L13.575 22.3875L4.3125 13.125H24V10.875H4.3125L13.575 1.6125L12 0L0 12L12 24Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </span>
                  <span className="btn-text hidden md:inline-flex ml-3">
                    pre
                  </span>
                </button>
                <button
                  type="submit"
                  disabled={
                    question?._id ===
                    testQuestions[testQuestions?.length - 1]?._id
                  }
                  onClick={() => handleNextQuestion(question?._id)}
                  className="!px-[15px] md:!px-[30px] !py-[14px] md:!py-[18px] btn btn-dark ml-3"
                >
                  <span className="btn-text hidden md:inline-flex mr-3">
                    next
                  </span>
                  <span className="btn-icon !mr-0 !ml-0">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 12L5.2125 11.1937L9.84375 6.5625H0V5.4375H9.84375L5.2125 0.80625L6 0L12 6L6 12Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </span>
                </button>
              </div>
              <div className="ml-auto">
                <button
                  type="button"
                  className="!px-[15px] md:!px-[30px] !py-[14px] md:!py-[18px] btn btn-primary"
                  onClick={() => handleSubmitTest()}
                >
                  <span className="btn-text">End Test</span>
                  <span className="btn-icon">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 12L5.2125 11.1937L9.84375 6.5625H0V5.4375H9.84375L5.2125 0.80625L6 0L12 6L6 12Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="question-wrap">
          {testQuestions?.map((que, index) => (
            <div
              key={index}
              onClick={() => handleQuestion(que._id, index)}
              className={
                question?._id === que._id
                  ? "que-menu active"
                  : que.options.some((data) => data.value)
                  ? "que-menu done"
                  : "que-menu"
              }
            >
              <span className="qno-no">{index + 1}</span>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export default Quiz;
