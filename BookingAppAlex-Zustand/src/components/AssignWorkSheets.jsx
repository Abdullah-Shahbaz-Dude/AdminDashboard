import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useStore from "../store/store";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import "./css/Workbooks.css";

const AssignWorkSheets = () => {
  const { selected, setSelected, setLinkVisible, setUsers, user, setUser } =
    useStore();
  const [workbooks, setWorkbooks] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const { userId } = useParams();

  // console.log("Params userId:", userId);
  // console.log(user);

  useEffect(() => {
    if (!userId) return;

    setLoading(true);

    Promise.all([
      fetch("http://localhost:5000/api/workbooks").then((res) => res.json()),
      fetch(`http://localhost:5000/api/user-dashboard/users/${userId}`).then(
        (res) => res.json()
      ),
    ])
      .then(([workbooksData, userData]) => {
        setWorkbooks(workbooksData);
        setUser(userData); // update store
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load data");
        setLoading(false);
      });
  }, [userId, setUser]);

  const handleSelection = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((i) => i !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const assignWorkbooks = async () => {
    if (!user) {
      toast.error("No user found.");
      return;
    }
    if (selected.length === 0) {
      toast.error("Please select at least one workbook.");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:5000/api/user-dashboard/users/${user._id}/assign-workbooks`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ workbookIds: selected }),
        }
      );
      const data = await response.json();
      // console.log("Assign PATCH response:", response.status, data);
      if (data.success) {
        toast.success("Workbooks assigned!");
        setSelected([]);
        // setLinkVisible: (value) => set({ linkVisible: value }),
        setLinkVisible(true);
        // Update users list
        setUsers((prevUsers) =>
          prevUsers.map((u) =>
            u._id === user._id ? { ...u, workbooks: data.user.workbooks } : u
          )
        );

        // Update current user
        setUser(data.user);

        navigate(`/user-link/${data.user._id}`, { replace: true });
      } else {
        toast.error("Failed to assign workbooks.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error assigning workbooks.");
    }
  };

  if (loading) return <ClipLoader color="#007bff" size={50} />;
  if (!user) return <div>User not found</div>;

  return (
    <div className="assign-workbooks-container">
      <h3>Assign Workbooks to {user.name}</h3>
      {workbooks.map((wb) => (
        <div key={wb._id} className="workbook-item">
          <input
            type="checkbox"
            checked={selected.includes(wb._id)}
            onChange={() => handleSelection(wb._id)}
          />
          {wb.title}
        </div>
      ))}
      <button onClick={assignWorkbooks}>Assign Workbooks</button>
    </div>
  );
};

export default AssignWorkSheets;
