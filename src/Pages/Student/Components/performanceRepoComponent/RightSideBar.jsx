import React from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from '../../../../../firebase';
import { useState, useEffect } from 'react';
import axios from 'axios';

const RightSideBar = ({ uploadedFiles }) => {
  const navigate = useNavigate();
  const savedAuth = JSON.parse(localStorage.getItem("auth"));

  const [urls, setUrls] = useState([]);
  const [homeworks, setHomeworks] = useState([]);

  useEffect(() => {
    const fetchUrls = async () => {
      const fetchedUrls = await Promise.all(
        uploadedFiles.map(async (homeworkId) => {
          const fileRef = ref(storage, `/homeworks/${homeworkId}/${savedAuth.id}`);
          const url = await getDownloadURL(fileRef);
          return { homeworkId, url, fileName: homeworkId.split('/').pop() }; // Extracting fileName from homeworkId
        })
      );
      setUrls(fetchedUrls);
    };
    const fetchHomeworks = async () => {
      let list = [];
      await Promise.all(uploadedFiles.map(async(homeworkId) => {
        const res = await axios.get(`http://localhost:3000/homework/${homeworkId}`);
        list.push(res.data.homework);
      }));
      setHomeworks(list);
    }

    fetchUrls();
    fetchHomeworks();
  }, [uploadedFiles]);

  const redirect = (url) => {
    window.location.href = url;
  }

  return (
    <div className="p-4 bg-gray-100 min-h-screen shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-sky-800">History</h2>
      <ul className="space-y-2">
        {urls.map(({ homeworkId, url, fileName }, index) => (
          <li
            key={index} // You can use index or homeworkId if it's unique
            onClick={() => redirect(url)}
            className="cursor-pointer px-4 py-2 bg-white rounded-lg shadow hover:bg-gray-200"
          >
            {homeworks[index].title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RightSideBar;
