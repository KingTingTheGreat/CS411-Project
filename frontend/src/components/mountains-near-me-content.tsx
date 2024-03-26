import { useState } from "react";

const MountainsNearMeContent = () => {
	const [location, setLocation] = useState("");
	return (
		<div>
			<h1>Mountains Near Me</h1>
			<input
				type="text"
				value={location}
				onChange={(e) => setLocation(e.target.value)}
				className="text-black"
				placeholder="Enter your city or zip code"
			/>
			<p>data on mountains near {location.length > 0 ? location : "you"}</p>
			<p>location: {location}</p>
		</div>
	);
};

export default MountainsNearMeContent;
