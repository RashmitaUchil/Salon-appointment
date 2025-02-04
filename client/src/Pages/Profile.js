import { useState } from 'react';
import { useUser } from '../Context/UserContext';
import toast from 'react-hot-toast';
import '../Styles/Profile.css';
function Profile() {
    const { setUserName, setUserEmail, setUserPhone, userId, userName, userEmail, userPhone } = useUser();
    const [formData, setFormData] = useState({ name: userName, email: userEmail, phone: userPhone });
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);  // New loading state

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (!formData.name || !formData.email ) {
            toast.error("Please fill in the name and email field.");
            return;
        }

        setIsLoading(true);  // Start loading state

        try {
            const response = await fetch('http://localhost:5056/user', {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: userId,
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || "Update failed");
            } else {
                setUserName(formData.name);
                setUserEmail(formData.email);
                setUserPhone(formData.phone);
                toast.success("Details updated!");
                setIsEditing(false);  // Stop editing after successful update
            }
        } catch (err) {
            toast.error(err.message);
        } finally {
            setIsLoading(false);  // End loading state
        }
    };

    return (
        <div className="container mx-auto p-4 ">
          
            <h2 className="text-2xl font-semibold mb-4 text-center">Profile</h2>

            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                    Name:
                </label>
                <input 
                    className="border border-[#B76E79] rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                />
            </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="email">Email:</label>
                <input 
                    className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={!isEditing}
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="phone">Phone:</label>
                <input 
                    className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={!isEditing}
                    />
                </div>
                <br/>
                <button
                className={`bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                    onClick={() => {
                        if (isEditing) {
                            handleSubmit();
                        } else {
                            setIsEditing(true);
                        }
                    }}
                    disabled={isLoading}  // Disable button when loading
                >
                    {isEditing ? (isLoading ? "Updating..." : "Update") : "Edit Profile"}
                </button>
       
        </div>
    );
}

export default Profile;
