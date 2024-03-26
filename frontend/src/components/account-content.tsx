import useSWR from "swr";
import { useParams } from "react-router-dom";
import Error from "./error";
import { User } from "../types";

const AccountContent = () => {
	const { id } = useParams();
	const { data, error } = useSWR(`http://localhost:6969/user/${id}`, (url) => fetch(url).then((res) => res.json()));

	if (error) return <Error />;
	if (!data) return <div>loading...</div>;

	const user: User = data.data.user;

	console.log(user);

	return (
		<div>
			<h1>Account</h1>
			<p>Username: {user.Username}</p>
			<p>Email: {user.Email}</p>
			<p>First Name: {user.FirstName}</p>
			<p>Last Name: {user.LastName}</p>
			<div>
				{user.FavoriteMountains.map((mountain) => (
					<div key={mountain}>
						<p>{mountain}</p>
						{/* <p>{mountain.height}</p>
                        <p>{mountain.location}</p> */}
					</div>
				))}
			</div>
		</div>
	);
};

export default AccountContent;
