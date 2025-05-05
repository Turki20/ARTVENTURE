import { useState, useEffect } from "react";
import Header from "../components/Header";
import ArtGallery from "../components/ArtGallery";

function ArtsPage() {
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");

  useEffect(() => {
    const fetchDepartments = async () => {
      const allData = [];
      const totalPages = 5;

      for (let page = 1; page <= totalPages; page++) {
        const response = await fetch(`https://api.artic.edu/api/v1/artworks?page=${page}&limit=100`);
        const result = await response.json();
        allData.push(...result.data);
      }

      const uniqueDepartments = [...new Set(allData.map(item => item.department_title).filter(Boolean))];
      setDepartments(uniqueDepartments);
    };

    fetchDepartments();
  }, []);

  return (
    <>
      <Header />

      <div style={{ padding: "20px" }}>
        <h2>select department: </h2>
        <select
          onChange={(e) => setSelectedDepartment(e.target.value)}
          defaultValue=""
        >
          <option value="">-- select department --</option>
          {departments.map((dept, index) => (
            <option key={index} value={dept}>{dept}</option>
          ))}
        </select>
      </div>

      {selectedDepartment && <ArtGallery selectedDepartment={selectedDepartment} />}
    </>
  );
}

export default ArtsPage;
