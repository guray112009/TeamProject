import React, { useEffect } from 'react'
import LostItemCard from '../components/lostFound/LostItemCard'
import { useState } from 'react'
import { Button } from '../components/commonComponents/GradientButton'
import { useNavigate } from "react-router-dom";

export const LostFoundPage = () => {

  const [LostFoundItems, setItems] = useState([]);
  const navigate = useNavigate();

  // ================================
  // FETCH LOST & FOUND ITEMS
  // ================================
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/lostfound`)   // ⭐ UPDATED
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched items lost:", data);
        setItems(data);
      })
      .catch((err) => console.error("Error fetching cards:", err));
  }, []);

  const handleClick = () => {
    console.log("handler clicked");
    navigate("/lostFound/create");
  };

  return (
    <div className="LostFoundPage flex flex-wrap p-12 gap-4 flex-col">

      <div className="flex flex-row justify-between">
        <h2 className="text-5xl font-extrabold text-[#130745] mb-16 w-full max-w-[1150px]">
          Lost&Found
        </h2>

        <Button name={"Create Lost Item"} onClick={handleClick} />
      </div>

      <div className="ListingItems flex flex-wrap gap-4">
        {LostFoundItems.map((item, id) => (
          <LostItemCard key={id} item={item} />
        ))}
      </div>
    </div>
  );
};
