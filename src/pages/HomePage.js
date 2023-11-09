import React from "react";
import RecentLeads from "../components/homepage/RecentLeads";
import RecentQuotations from "../components/homepage/RecentQuotations";

const HomePage = () => {
  return (
    <div className="col-md-12">
      <div className="homePage">
        <RecentLeads />
        <RecentQuotations />
      </div>
    </div>
  );
}

export default HomePage;
