import Questions from "../questions/Questions";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CountDown from "../CountDown";
import { UserContext } from "../context/UserContext";

function Test(props) {
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
  const params = useParams();
  const location = useLocation();
  const [testQuestions, setTestQuestions] = useState(allTestQuestions);
  const [question, setQuestion] = useState(testQuestions[0]);
  const LIMIT_IN_MS = 20 * 1000;
  const NOW_IN_MS = new Date().getTime();
  let dateTimeAfterLimit = NOW_IN_MS + LIMIT_IN_MS;
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [user, setUser] = useContext(UserContext);

  useEffect(() => {
    if (params.id) {
      let que = testQuestions.find((data) => data.id === parseInt(params.id));
      setQuestion(que);
    }
  }, [params?.id]);

  useEffect(() => {
    console.log(user);
    if (user?.email && user?.result && user?.testStatus?.toLowerCase() === "complete") {
      navigate(`/result`);
    } else if (!user?.email) {
      navigate(`/register`);
    } else if (user?.testStatus?.toLowerCase() === "inprogress") {
      navigate(location.pathname);
    } else if (user?.testStatus?.toLowerCase() === "onhold") {
      navigate("/success");
    }
  }, [user]);

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
    // console.log(hours, minutes, seconds);
    if (hours > 0 || minutes > 0 || seconds > 1) {
      if (window.confirm("Are you sure you want to end the test!")) {
        let marks = 0;
        testQuestions.forEach((data, index) => {
          data?.options.some((ans, index) => {
            // console.log("some", index);
            if (ans?.value === true && ans?.title === data?.answer[0]) {
              marks = marks + data?.marks;
            }
            return ans?.value;
          });
        });
        navigate(`/result?mark=${marks}`);

        let newUser = {
          ...user,
          result: marks,
          pauseTime: `${hours}:${minutes}:${seconds}`,
          testStatus: "complete",
        };

        localStorage.setItem("userDetails", JSON.stringify(newUser));
        setUser(newUser);
      }
    } else {
      let marks = 0;
      testQuestions.forEach((data, index) => {
        data?.options.some((ans, index) => {
          console.log("some", index);
          if (ans?.value === true && ans?.title === data?.answer[0]) {
            marks = marks + data?.marks;
          }
          return ans?.value;
        });
      });
      navigate(`/result?mark=${marks}`);

      let newUser = {
        ...user,
        result: marks,
        testStatus: "complete",
      };

      localStorage.setItem("userDetails", JSON.stringify(newUser));
      setUser(newUser);
    }
  };

  const handleEndTest = () => {
    dateTimeAfterLimit = 0;
    handleSubmitTest();
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

      {testQuestions.map((que, index) => (
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
