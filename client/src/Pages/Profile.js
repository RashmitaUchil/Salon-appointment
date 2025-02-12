import { useState } from "react";
import { useUser } from "../Context/UserContext";
import toast from "react-hot-toast";
import "../Styles/Profile.css";
import userservice from "../Services/UserService";

function Profile() {
  const {
    setUserName,
    setUserEmail,
    setUserPhone,
    userId,
    userName,
    userEmail,
    userPhone,
  } = useUser();
  const [formData, setFormData] = useState({
    name: userName,
    email: userEmail,
    phone: userPhone,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // New loading state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email) {
      toast.error("Please fill in the name and email field.");
      return;
      }
      if (formData.phone) {
          if (formData.phone.length !== 10) {
              toast.error("Enter correct phone number");
              return;
          }
      }
      

    setIsLoading(true); // Start loading state

    try {
        const response = await userservice.put(`/update`, {
        id: userId,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      });
      if (response) {
        setUserName(formData.name);
        setUserEmail(formData.email);
          setUserPhone(formData.phone);
          toast.dismiss();
        toast.success(response.message);
      }
      setIsEditing(false);
    } catch (err) {
       toast.dismiss();
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container profile mx-auto p-4 ">
      <h2 className=" profile-title">Profile</h2>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
          Name:
        </label>
        <input
          className="input-book-prof"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          disabled={!isEditing}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
          Email:
        </label>
        <input
          className="input-book-prof"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          disabled={!isEditing}
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="phone">
          Phone:
        </label>
        <input
          className="input-book-prof"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          disabled={!isEditing}
        />
      </div>
      <br />
      <button
        className="button-update"
        onClick={() => {
          if (isEditing) {
            handleSubmit();
          } else {
            setIsEditing(true);
          }
        }}
        disabled={isLoading}
      >
        {isEditing ? (isLoading ? "Updating..." : "Update") : "Edit Profile"}
      </button>
    </div>
  );
}

export default Profile;
