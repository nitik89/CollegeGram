//Suggested Friends/People You May Know

import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { axiosIntance } from "./config";
export default function Dummy() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const username = useParams().username;
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axiosIntance.get(`/users?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);
}
export const Users = [
  {
    id: 1,

    profilePicture: "1.jpg",
    username: "Vivek Dembla",
  },
  {
    id: 2,
    profilePicture: "2.jpg",
    username: "Harneet Singh",
  },
  {
    id: 3,
    profilePicture: "3.jpg",
    username: "Avneet Singh Sohi",
  },
  {
    id: 4,
    profilePicture: "4.jpg",
    username: "Amandeep Singh",
  },
  {
    id: 5,
    profilePicture: "5.jpg",
    username: "Abhimanyiu Kaushik",
  },
  {
    id: 6,
    profilePicture: "6.jpg",
    username: "Arpit Saxena",
  },
  {
    id: 7,
    profilePicture: "7.jpg",
    username: "Karandeep Singh",
  },
  {
    id: 8,
    profilePicture: "8.jpg",
    username: "Archit Sharma",
  },
  {
    id: 9,
    profilePicture: "9.jpg",
    username: "Yajat Khanna",
  },
  {
    id: 10,
    profilePicture: "10.jpg",
    username: "Wasim Akram",
  },
  {
    id: 11,
    profilePicture: "11.jpg",
    username: "Harshdeep Singh",
  },
];
