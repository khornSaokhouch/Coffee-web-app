import React, { Suspense } from "react";
import NewOrderPage from "@/app/components/NewOrderPage";

export default function NewOrder() {
  return (
    <div>
      <Suspense fallback={<p>Loading...</p>}>
        <NewOrderPage />
      </Suspense>
    </div>
  );
}
