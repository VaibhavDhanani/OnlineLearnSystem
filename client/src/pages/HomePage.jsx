import React from "react";
import useFetchWithAuth from "../hooks/UseFetchWithAuth.js";
import { clientURL } from "../constant.js";
import Layout from "../components/common/Layout.jsx";
import Navbar from "../components/Navigation/Navbar.jsx";

const Home = () => {
  const { data, error, loading } = useFetchWithAuth(`${clientURL}/home`);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <Layout>
        <Navbar />
        <h1>Main Content</h1>
        <p>This is where your page content will appear.</p>
      </Layout>
    </div>
  );
};

export default Home;
