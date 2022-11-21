import "bootstrap/dist/css/bootstrap.min.css";
import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function StartTest() {
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
  const contextValue = useContext(UserContext);
  const location = useLocation();

  useEffect(() => {
    if (contextValue.newUser?.testStatus?.toLowerCase() === "inprogress") {
      navigate("/quiz");
    }

    if (
      contextValue.newUser?.email &&
      contextValue.newUser?.step === "enter_details"
    ) {
      let addDetails = {
        step: "start_test",
      };
      contextValue.dispatch({ type: "UPDATE_USER", payload: addDetails });
    } else if (
      !contextValue.newUser?.email &&
      contextValue.newUser?.step === "enter_details"
    ) {
      navigate("/register");
    }

    if (!contextValue.newUser?.step) {
      navigate("/");
    } else if (contextValue.newUser?.step === "instruction") {
      navigate("/register");
    }
  }, [contextValue.newUser, location?.pathname]);

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
    return shuffleArray(posts);
  };

  const handleStartTest = () => {
    if (
      contextValue.newUser?.email &&
      contextValue.newUser?.testStatus !== "complete"
    ) {
      navigate(`/quiz`);
      const addDetails = {
        testStatus: "inprogress",
      };
      contextValue.dispatch({ type: "UPDATE_USER", payload: addDetails });
    } else if (contextValue.newUser?.testStatus === "complete") {
      navigate(`/result`);
    }
  };

  return (
    <>
      <div className="cng-success-fix">
        <h2>Congratulations! Successfully registered!</h2>
        <button
          type="submit"
          className="btn btn-success"
          onClick={() => handleStartTest()}
        >
          Start Test
        </button>
      </div>
    </>
  );
}

export default StartTest;
