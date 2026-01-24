import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import {API} from "../config";

function Profile() {
  const { user, setUser } = useAuth();

  const [form, setForm] = useState({
    fullname: user.fullname,
    email: user.email
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(
      `${API}/api/v1/users/update-account`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include", // important for cookies
        body: JSON.stringify(form)
      }
    );

    const data = await res.json();

    setUser(data.data); // update global auth state
    alert("Profile updated");
  };


  const handleAvatarUpload = async (e) => {
  const file = e.target.files[0];
  const data = new FormData();
  data.append("avatar", file);

  const res = await fetch(
    `${API}/api/v1/users/avatar`,
    {
      method: "PATCH",
      credentials: "include",
      body: data
    }
  );

  const result = await res.json();
  setUser(result.data);
};


  return (
    <div className="profile-section text-center">
      <img
        src={user.avatar}
        className="profile-avatar"
        alt="avatar"
      />

      <form onSubmit={handleSubmit}>
        <input
          name="fullname"
          value={form.fullname}
          onChange={handleChange}
        />

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        <input type="file" onChange={handleAvatarUpload} />
        <button className="btn mt-2">Update</button>
      </form>
    </div>
  );
}

export default Profile;


