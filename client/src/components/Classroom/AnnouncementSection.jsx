import React, { useEffect, useState } from "react";
import { URL } from "../../constant";
import { useAuth } from "../../hooks/AuthContext";

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const AnnouncementSection = ({ subject, updateTrigger }) => {
  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const [activeReplyId, setActiveReplyId] = useState(null);
  const { user } = useAuth();

  const handleReply = async (announcementId) => {
    // console.log(user)
    if (replyContent.trim()) {
      try {
        const response = await fetch(
          `${URL}/announcement/${announcementId}/reply/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ content: replyContent, user }),
          }
        );

        if (!response.ok) {
          const errorBody = await response.text();
          console.error(
            `Failed to post reply: ${response.status} ${response.statusText}`,
            errorBody
          );
          throw new Error(
            `Failed to post reply: ${response.status} ${response.statusText}`
          );
        }

        setReplyContent("");
        setActiveReplyId(null);
        fetchData();
        window.location.reload();
      } catch (error) {
        console.error("Error posting reply:", error);
      }
    }
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${URL}/announcement/${subject}`);
      if (!response.ok) {
        throw new Error("Failed to fetch announcements");
      }
      const data = await response.json();
      // console.dir(data.announcements[0].createdBy.username);
      setAnnouncements(data.announcements || []);
    } catch (err) {
      console.error("Error fetching announcements:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [subject, updateTrigger]);

  if (isLoading) return <div>Loading announcements...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-8 p-6 rounded-xl">
      {announcements.length === 0 ? (
        <p className="text-center text-gray-500 italic text-lg">
          No announcements yet.
        </p>
      ) : (
        announcements.map((acemt) => (
          <div
            key={acemt._id}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 p-4">
              <h3 className="text-2xl font-bold text-white">{acemt.title}</h3>
              <div className="text-sm text-indigo-200 mt-1">
                Posted on {formatDate(acemt.createdAt)} by{" "}
                {acemt.createdBy.username}
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-700 text-lg mb-6">{acemt.content}</p>

              <div className="space-y-4 mb-6">
                {acemt.replies.map((reply, index) => (
                  <div
                    key={index}
                    className={`rounded-lg p-4 ${reply.user.type === "teacher" ? "bg-blue-100 border-l-4 border-blue-500" : "bg-gray-50"}`}
                  >
                    <p className="text-gray-700">{reply.content}</p>
                    <div className="text-xs text-gray-500 mt-2 flex items-center">
                      <span
                        className={`inline-block w-2 h-2 rounded-full mr-2 ${reply.user.type === "teacher" ? "bg-blue-500" : "bg-gray-500"}`}
                      ></span>
                      Replied by {reply.user.username}
                      {reply.user.type === "teacher" && (
                        <span className="ml-1 text-blue-600 font-semibold">
                          ( Teacher )
                        </span>
                      )}
                      on {formatDate(reply.createdAt)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                {activeReplyId === acemt._id ? (
                  <div className="space-y-3">
                    <textarea
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder="Write your reply..."
                      rows="3"
                    />
                    <div className="flex justify-end space-x-3">
                      <button
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out"
                        onClick={() => handleReply(acemt._id)}
                      >
                        Submit
                      </button>
                      <button
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-300 ease-in-out"
                        onClick={() => setActiveReplyId(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    className="text-indigo-600 hover:text-indigo-800 font-semibold transition duration-300 ease-in-out"
                    onClick={() => setActiveReplyId(acemt._id)}
                  >
                    Reply to this announcement
                  </button>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AnnouncementSection;
