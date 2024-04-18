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
	console.log(user.favorites)

	return (
		<div>
			<h1>Account</h1>
			<p>Username: {user.username}</p>
			<p>Email: {user.email}</p>
			<p>First Name: {user.firstname}</p>
			<p>Last Name: {user.lastname}</p>
			<div>
				{user.favorites.map((mountain) => (
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
