"use client";
import CreateFest from "@/app/create/fest/page";

// The CreateFest component now handles edit mode internally
// by detecting the URL path. Just render it directly.
const EditPage = () => {
  return <CreateFest />;
};

export default EditPage;
