import React, { useEffect } from "react";
import NeumorphismWrapper from "../UI/Layouts/NeumorphismWrapper";
import { useNavigate } from "react-router-dom";

function Shortcuts() {
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("keydown", function (event) {
      if (event.altKey && event.key === "c") {
        navigate("/companies");
      }
      if (event.altKey && event.key === "q") {
        navigate("/quotes");
      }
      if (event.altKey && event.key === "s") {
        navigate("/sites");
      }
      if (event.altKey && event.key === "n") {
        navigate("/notes");
      }
    });
  }, []);

  return (
    <div className="col-md-12">
      <NeumorphismWrapper>
        <h4>Shortcuts</h4>
        <div className="row">
          <div className="col-md-4">
            <p>Alt + c : All Company</p>
          </div>
          <div className="col-md-4">
            <p>Alt + s : All Sites</p>
          </div>
          <div className="col-md-4">
            <p>Alt + q : All Qutoes</p>
          </div>
          <div className="col-md-4">
            <p>Alt + n : All Notes</p>
          </div>
        </div>
      </NeumorphismWrapper>
    </div>
  );
}

export default Shortcuts;
