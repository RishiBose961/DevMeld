export const getAllPosts = async () => {
  const res = await fetch("http://localhost:5000/api/post/all", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch developer recommendations");
  }

  return res.json();
};