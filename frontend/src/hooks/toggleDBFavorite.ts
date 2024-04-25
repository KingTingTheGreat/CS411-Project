import useSwr from "swr";

const ToggleDBFavorite = ({
  id,
  token,
  status,
}: {
  id: string;
  token: string;
  status: boolean;
}) => {
  const { data, error } = useSwr(
    "http://localhost:6969/validate-token",
    (url: string) =>
      fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json())
  );

  if (!token || token == "" || error || (data && data.error)) return false;

  if (data && data.message !== "Success") return false;

  console.log(`${token} trying to change status of ${id} to ${status}`);
  return status;
};

export default ToggleDBFavorite;
