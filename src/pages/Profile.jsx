import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase";
import Header from "../components/Header";
import { toast } from "react-toastify";


function Profile() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      const user = getAuth().currentUser;
      if (!user) return;

      const q = query(collection(db, "favorites"), where("uid", "==", user.uid));
      const querySnapshot = await getDocs(q);

      // نأخذ كل من id و image_id
      const userImages = querySnapshot.docs.map(doc => ({
        id: doc.id,
        image_id: doc.data().image_id
      }));

      setImages(userImages);
      setLoading(false);
    };

    fetchFavorites();
  }, []);

  const handleDelete = async (docId) => {
    try {
      await deleteDoc(doc(db, "favorites", docId));
      setImages((prev) => prev.filter((img) => img.id !== docId));
      toast.success("Image removed from favorites!", {
        position: "top-right",
        autoClose: 2500,
        style: {
          background: "#fef2f2",
          color: "#b91c1c",
          fontWeight: "bold",
          border: "1px solid #fca5a5",
          borderRadius: "10px",
        },
      });
    } catch (error) {
      console.error("Failed to delete image:", error);
      toast.error("⚠️ Something went wrong!", {
        position: "top-right",
        autoClose: 3000,
        style: {
          background: "#fef9c3",
          color: "#a16207",
          fontWeight: "bold",
          border: "1px solid #fde68a",
          borderRadius: "10px",
        },
      });
    }
  };
  

  return (
    <>
      <Header />
      <div className="profile" style={{ padding: "20px" }}>
        <h1>Profile</h1>
        <p>Favorite Images</p>

        {loading ? (
          <p>Loading...</p>
        ) : images.length === 0 ? (
          <p>No favorite images yet.</p>
        ) : (
          <ul
            style={{
              columnCount: 3,
              columnGap: "20px",
              listStyle: "none",
              padding: 0,
              marginTop: "30px",
            }}
          >
            {images.map((item) => (
              <li
                key={item.id}
                style={{
                  position: "relative",
                  breakInside: "avoid",
                  marginBottom: "20px",
                  border: "1px solid #ccc",
                  borderRadius: "10px",
                }}
              >
                {/* زر الحذف */}
                <span
                  onClick={() => handleDelete(item.id)}
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    fontSize: "18px",
                    color: "red",
                    background: "white",
                    borderRadius: "50%",
                    padding: "5px",
                    cursor: "pointer",
                    zIndex: 2,
                  }}
                >
                  🗑️
                </span>

                <img
                  src={`https://www.artic.edu/iiif/2/${item.image_id}/full/843,/0/default.jpg`}
                  alt="Favorite artwork"
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "8px",
                    display: "block",
                  }}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default Profile;
