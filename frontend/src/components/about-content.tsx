const AboutContent = () => {
	return (
		<div className="flex flex-col items-center">
			<h1 className="text-4xl p-1 m-1">About our CS411 Project</h1>
			<p className="text-xl w-3/5 p-1 m-1">
				This is a project for CS411, which is a class on software engineering at Boston University. This is our
				final project, a full-stack web application. We are using Vite + React on the frontend and Go with Echo
				and MongoDB on the backend. We haven&apos;t decided what this project is going to do yet.
			</p>
		</div>
	);
};

export default AboutContent;
