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

    profilePicture: "1.jpeg",
    username: "Vivek Dembla",
  },
  {
    id: 2,
    profilePicture: "2.jpeg",
    username: "Harneet Singh",
  },
  {
    id: 3,
    profilePicture: "3.jpeg",
    username: "Avneet Singh Sohi",
  },
  {
    id: 4,
    profilePicture: "4.jpeg",
    username: "Amandeep Singh",
  },
  {
    id: 5,
    profilePicture: "5.jpeg",
    username: "Abhimanyiu Kaushik",
  },
  {
    id: 6,
    profilePicture: "6.jpeg",
    username: "Arpit Saxena",
  },
  {
    id: 7,
    profilePicture: "7.jpeg",
    username: "Karandeep Singh",
  },
  {
    id: 8,
    profilePicture: "8.jpeg",
    username: "Archit Sharma",
  },
  {
    id: 9,
    profilePicture: "9.jpeg",
    username: "Yajat Khanna",
  },
  {
    id: 10,
    profilePicture: "10.jpeg",
    username: "Wasim Akram",
  },

];
