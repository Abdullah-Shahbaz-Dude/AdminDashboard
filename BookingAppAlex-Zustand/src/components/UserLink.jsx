import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useStore from "../store/store";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

const UserLink = () => {
  const navigate = useNavigate();
  const { user, setUser, setLinkVisible } = useStore();
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const { userId } = useParams();

  useEffect(() => {
    if (!userId) return;

    setLoading(true);
    fetch(`http://localhost:5000/api/user-dashboard/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLinkVisible(true); // show the link after user is fetched
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load user");
        setLoading(false);
      });
  }, [userId, setUser, setLinkVisible]);

  const navigateToNewUser = () => navigate("/new-user");

  const copyToClipboard = () => {
    if (!user) return;
    const link = `http://localhost:5173/user-dashboard/${user.accessToken}`;
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true);
      toast.success("Link copied!");
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (loading) return <ClipLoader color="#007bff" size={50} />;
  if (!user) return <div>User not found</div>;

  return (
    <div className="user-link">
      <p>
        User access link:{" "}
        <a
          href={`http://localhost:5173/user-dashboard/${user.accessToken}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Click here
        </a>
      </p>
      <button onClick={copyToClipboard}>
        {copied ? "Copied!" : "Copy link"}
      </button>
      <button onClick={navigateToNewUser}>Create new user</button>
    </div>
  );
};

export default UserLink;
