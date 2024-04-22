import useSwr from "swr";

const ValidateToken = () => {
  const token = localStorage.getItem("411ProjectToken");

  const { data, error } = useSwr(
    'http://localhost:6969/validate-token',
    (url: string) => fetch(url, {
      method: "POST", 
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then((res) => res.json())
  );

  if (!token || token == "" || error || (data && data.error)) return false;

  if (data && data.message == "Success") return true;

  return false;
};

export default ValidateToken;
