import useSwr from "swr";

const GetProfile = () => {
  const token = localStorage.getItem("411ProjectToken");
  const { data, error } = useSwr(
    "http://localhost:6969/profile",
    (url: string) =>
      fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json())
  );

  console.log("GetProfile error: ", error);
  if (error) return false;
  if (!data) return false;

  console.log("logging data form /profile");
  console.log(data);

  return data;
};

export default GetProfile;
