import { useState, useEffect } from "react";

const ArtGallery = ({ selectedDepartment }) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const limit = 100;

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
              breakInside: "avoid",
              marginBottom: "20px",
              border: "1px solid #ccc",
              borderRadius: "10px",
            }}
          >
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
              <p>no picture</p>
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
