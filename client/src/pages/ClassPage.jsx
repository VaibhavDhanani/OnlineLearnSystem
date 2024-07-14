import React from "react";
import useFetchWithAuth from "../hooks/UseFetchWithAuth.js";
import { clientURL } from "../constant.js";
import Layout from "../components/common/Layout.jsx";
import Navbar from "../components/Navigation/Navbar.jsx";
import { useParams } from "react-router-dom";
import ClassLayout from "../components/common/ClassLatout.jsx";

const Class = () => {
  const subject = useParams().subject;
  const { data, error, loading } = useFetchWithAuth(
    `${clientURL}/home/${subject}`
  );
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <Layout>
        <Navbar />
        <ClassLayout />
      </Layout>
    </div>
  );
};

export default Class;
