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

  if (error || !data || !data.data || !data.data.user) return false;

  return data.data.user;
};

export default GetProfile;
