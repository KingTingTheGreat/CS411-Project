const HomeContent = () => {
	return (
		<div className="flex flex-col items-center">
			<h1 className="text-4xl p-1 m-1">Welcome to our CS411 Project</h1>
			<a href="http://localhost:6969/auth/google" className="px-4 py-2 m-1 font-medium text-slate-700 bg-sky-200 rounded-lg">
				Login with Google
			</a>
		</div>
	);
};

export default HomeContent;
