import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const ShowInforamtion = ({ postId }: { postId: string }) => {
  // 📥 Fetch file
  const { data, isLoading, error } = useQuery({
    queryKey: ["file", postId],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5000/api/upload/file/${postId}`
      );
      return res.data;
    },
    enabled: !!postId,
  });

  const fileUrl = data?.file?.url || data?.url;

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading file</p>;

  if (!fileUrl) {
    return <p>No file available</p>;
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">File Information</h2>

      {fileUrl.includes(".pdf") ? (
        <iframe
          src={`https://docs.google.com/gview?url=${fileUrl}&embedded=true`}
          className="w-full h-[400px] rounded-lg border"
        />
      ) : (
        <img
          src={fileUrl}
          alt="uploaded"
          className="w-fit h-40 object-contain rounded-lg border"
        />
      )}

      <div className="mt-3 text-sm break-all">
        <span className="font-medium">URL: </span>
        <a
          href={fileUrl}
          target="_blank"
          className="text-blue-500 underline"
        >
          {fileUrl}
        </a>
      </div>
    </div>
  );
};

export default ShowInforamtion;