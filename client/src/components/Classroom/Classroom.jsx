import React, { useEffect, useState } from "react";
import Card from "../common/Card/Card.jsx";
import { useAuth } from "../../hooks/AuthContext.jsx";
import { URL } from "../../constant.js";

const Classroom = () => {
  const { user } = useAuth();
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchClasses = async () => {
      try {
        const response = await fetch(`${URL}/class/student`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ codes: user.classCodes }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch classes");
        }

        const data = await response.json();
        setClasses(data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    if (user && user.classCodes) {
      fetchClasses();
    }
  }, [user]);

//   console.log(user);
//   console.log(classes)
  return (
    <div className="flex">
      {classes.map((classItem) => (
        <Card key={classItem._id} classData={classItem} />
      ))}
    </div>
  );
};

export default Classroom;
