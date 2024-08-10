import React, { useEffect, useState } from 'react'
import { URL } from '../../constant';
import { useAuth } from '../../hooks/AuthContext';

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const AnnouncementSection = ({ subject, updateTrigger }) => {
  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [replyContent, setReplyContent] = useState('');
  const [activeReplyId, setActiveReplyId] = useState(null);
  const {user} = useAuth();

  const handleReply = async (announcementId) => {
    // console.log(user)
    if (replyContent.trim()) {
      try {
        const response = await fetch(`${URL}/announcement/${announcementId}/reply/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({ content: replyContent, user }),
        });

        if (!response.ok) {
          const errorBody = await response.text();
          console.error(`Failed to post reply: ${response.status} ${response.statusText}`, errorBody);
          throw new Error(`Failed to post reply: ${response.status} ${response.statusText}`);
        }

        setReplyContent('');
        setActiveReplyId(null);
        fetchData();
      } catch (error) {
        console.error('Error posting reply:', error);
      }
    }
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${URL}/announcement/${subject}`);
      if (!response.ok) {
        throw new Error('Failed to fetch announcements');
      }
      const data = await response.json();
      // console.dir(data.announcements[0].createdBy.username);
      setAnnouncements(data.announcements || []); 
    } catch (err) {
      console.error('Error fetching announcements:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [subject, updateTrigger]);

  if (isLoading) return <div>Loading announcements...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-6 p-4">
      {announcements.length === 0 ? (
        <p className="text-center text-gray-500 italic">No announcements yet.</p>
      ) : (
        announcements.map((acemt) => (
          <div key={acemt._id} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-indigo-600 mb-2">{acemt.title}</h3>
            <p className="text-gray-700 mb-4">{acemt.content}</p>
            <div className="text-sm text-gray-500 mb-4">
              Posted on {formatDate(acemt.createdAt)} by {acemt.createdBy.username}
            </div>
            
            <div className="space-y-4">
              {acemt.replies.map((reply, index) => (
                <div key={index} className="bg-gray-50 rounded p-3">
                  <p className="text-gray-700">{reply.content}</p>
                  <div className="text-xs text-gray-500 mt-1">
                    Replied by {reply.user.username} on {formatDate(reply.createdAt)}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4">
              {activeReplyId === acemt._id ? (
                <div className="space-y-2">
                  <textarea
                    className="w-full p-2 border rounded"
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder="Write your reply..."
                    rows="3"
                  />
                  <div className="flex justify-end space-x-2">
                    <button
                      className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                      onClick={() => handleReply(acemt._id)}
                    >
                      Submit
                    </button>
                    <button
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                      onClick={() => setActiveReplyId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  className="text-indigo-600 hover:text-indigo-800"
                  onClick={() => setActiveReplyId(acemt._id)}
                >
                  Reply to this announcement
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AnnouncementSection;