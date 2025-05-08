import { useState, useEffect } from "react";
import { db } from "../pages/firebase";
import { collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { toast } from "react-toastify";


const ArtGallery = ({ selectedDepartment }) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  
  const [loading, setLoading] = useState(false);
  const limit = 100;

  const handleImageClick = async (image_id) => {
    const user = getAuth().currentUser;
  
    if (!user) {
      toast.warn("Please log in to add favorites!", {
        position: "top-right",
        autoClose: 2500,
        style: {
          background: "#fff7ed",
          color: "#b45309",
          fontWeight: "bold",
          border: "1px solid #fdba74",
          borderRadius: "10px",
        },
      });
      return;
    }
  
    try {
      await addDoc(collection(db, "favorites"), {
        uid: user.uid,
        image_id: image_id,
        timestamp: new Date()
      });
  
      toast.success("Image added to favorites!", {
        position: "top-right",
        autoClose: 2500,
        style: {
          background: "#ecfdf5",
          color: "#065f46",
          fontWeight: "bold",
          border: "1px solid #6ee7b7",
          borderRadius: "10px",
        },
      });
    } catch (error) {
      console.error("Saving failed:", error);
      toast.error("Could not save image", {
        position: "top-right",
        autoClose: 3000,
        style: {
          background: "#fef2f2",
          color: "#b91c1c",
          fontWeight: "bold",
          border: "1px solid #fca5a5",
          borderRadius: "10px",
        },
      });
    }
  };
  

  const fetchArtworks = async (reset = false) => {
    setLoading(true);

    if (reset) {
      setPage(1);
      setData([]);
    }

    const allData = [];
    const totalPages = 5;

    for (let currentPage = reset ? 1 : page; currentPage <= totalPages; currentPage++) {
      const response = await fetch(`https://api.artic.edu/api/v1/artworks?page=${currentPage}&limit=${limit}`);
      const result = await response.json();
      allData.push(...result.data);
    }

    const filtered = allData.filter(item => item.department_title === selectedDepartment);

    setData((prevData) => [...prevData, ...filtered]);
    setPage((prevPage) => prevPage + 1);
    setLoading(false);
  };

  useEffect(() => {
    if (selectedDepartment) {
      fetchArtworks(true);
    }
  }, [selectedDepartment]);

  return (
    <div className="data-container" style={{ padding: "20px" }}>
      <h3>{selectedDepartment}</h3>

      <ul
        style={{
          columnCount: 3,
          columnGap: "20px",
          listStyle: "none",
          padding: 0,
          marginTop: "30px",
        }}
      >
        {data.map((item) => (
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
          <span
            onClick={() => handleImageClick(item.image_id)}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              fontSize: "24px",
              cursor: "pointer",
              color: "red",
              background: "white",
              borderRadius: "50%",
              padding: "4px",
              zIndex: 1
            }}
          >
            ❤️
          </span>
        
          {item.image_id ? (
            <img
              src={`https://www.artic.edu/iiif/2/${item.image_id}/full/843,/0/default.jpg`}
              alt={item.title}
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "8px",
                display: "block",
              }}
            />
          ) : (
            <p>No picture</p>
          )}
        </li>
        ))}
      </ul>

      <button id="more" onClick={() => fetchArtworks(false)} disabled={loading}>
        {loading ? "Loading..." : "More"}
      </button>
    </div>
  );
};

export default ArtGallery;
