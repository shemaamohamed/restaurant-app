import video from "../assets/Restaurant.mp4";

function AdminHomePage() {
  return (
    <video
      style={{ width: "100%", height: "85vh", objectFit: "cover" }}
      controls
      loop
      autoPlay
      src={video}
    />
  );
}

export default AdminHomePage;
