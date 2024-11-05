import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";



const BranchsPage = () => {
  const [branchs, setBranchs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchBranchs = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/tacgia/getalltacgia", {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          }
        }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch branchs");
        }
        const data = await response.json();
        setBranchs(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching branchs:", error);
      }
    };

    fetchBranchs();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4 mt-4">
      <h1 className="text-3xl font-bold mb-8 mt-4">Tác giả</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
          {/* {randomBranchs.map((author) => ( */}
          {branchs.map((branch) => (
            <div key={branch.id} className="flex flex-col items-center px-4">
              <div className="flex flex-col items-center">
                <a href={`/tac-gia/${branch.id}`}>
                  <img
                    className="flex items-center h-48 w-48 rounded-full ring-2 ring-white object-cover"
                    src={
                      branch.image
                        ? branch.image.includes("/")
                          ? branch.image
                          : `http://localhost:8080/tg_image/${branch.image}`
                        : "https://bizweb.dktcdn.net/100/363/455/articles/blank-author-33728236-0ca7-4f4e-a265-ddcd14036f53.jpg?v=1705287921247"
                    }
                    alt={branch.tenTacGia}
                  />
                </a>
                <a href={`/tac-gia/${branch.id}`}>
                  <h3 className="mt-2 text-base font-medium text-lg text-gray-900">
                    {branch.tenTacGia}
                  </h3>
                </a>
              </div>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BranchsPage;
