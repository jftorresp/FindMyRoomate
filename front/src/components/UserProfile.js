import React from "react";
import "./UserProfile.css";

function UserProfile(props) {
  return (
      <div>
<div class="card-container">

<div class="upper-container">
    <div class="image-container">
        <img src="profile.jpg" />
    </div>
</div>

<div class="lower-container">
    <div>
        <h3>Alaina Wick</h3>
        <h4>Front-end Developer</h4>
    </div>
    <div>
        <p>sodales accumsan ligula. Aenean sed diam tristique, fermentum mi nec, ornare arcu.</p>
    </div>
    <div>
        <a href="#" class="btn">View profile</a>
    </div>
</div>

</div>
</div>

);
}

export default UserProfile;