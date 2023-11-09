import React from "react";

function NeumorphismWrapper(props) {
  return (
    <div className="timeline timeline-one mb-3">
      <div className="timeline-item">
        <div className="card text-left shadow-inset  p-3" >
          <div className="card-body shadow-soft rounded border border-light">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NeumorphismWrapper;
