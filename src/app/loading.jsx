import { Spinner } from "@/components/ui/spinner";
import React from "react";

const Loading = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
      <Spinner size="large" />

      <div className="text-center">
        <h3 className="font-semibold text-lg">Loading...</h3>

        <p className="text-sm text-muted-foreground">
          Please wait while we fetch your data.
        </p>
      </div>
    </div>
  );
};

export default Loading;
