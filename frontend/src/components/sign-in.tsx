const SignIn = () => {
  return (
    <div className="flex flex-col items-center p-4 h-96">
      <h1 className="text-5xl p-1 m-1 text-center">
        Welcome to our CS411 Project
      </h1>
      <div className="flex justify-center items-center w-[80%] h-[80%]">
        <a
          href="http://localhost:6969/auth/google"
          className="px-5 py-3 text-xl m-1 font-medium text-slate-700 bg-sky-200 rounded-lg"
        >
          Login with Google
        </a>
      </div>
    </div>
  );
};

export default SignIn;
