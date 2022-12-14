import logo from "../header/atharva-brand-logo-dark.png";
import "../common.css";

function QuizHeader(props) {
  return (
    <>
      <header className="header-scn">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <div className="header-inner">
              <h1>
                <a href="/">
                  <img src={logo} alt="Atharva System" />
                </a>
              </h1>
              {props.children}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
export default QuizHeader;
