import React from "react";
import ApplicationsCard from "../UI/ApplicationsCard";

const ApplicationsContainer = ({ applications }) => {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">
        My Applications
      </h1>
      <div className="space-y-4">
        {applications?.length > 0 ? (
          applications.map((app) => (
            <ApplicationsCard key={app._id} application={app} />
          ))
        ) : (
          <p className="text-slate-500">No applications found.</p>
        )}
      </div>
    </div>
  );
};

export default ApplicationsContainer;
