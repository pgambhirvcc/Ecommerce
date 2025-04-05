import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

const AdminUserTable = () => {
  const [usersData, setUsersData] = useState([]);

  const getUsersData = async () => {
    const collectionRef = collection(db, "users");
    const dataFromFirebase = await getDocs(collectionRef);

    const extractedData = dataFromFirebase.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    });

    setUsersData(extractedData);
  };

  useEffect(() => {
    getUsersData();
  }, []);

  const columns = [
    { field: "id", headerName: "ID" , resizable: false, flex: 1},
    { field: "name", headerName: "Full Name" , resizable: false, flex: 1},
    { field: "email", headerName: "Email" , resizable: false, flex: 1},
    { field: "dob", headerName: "Age", resizable: false, flex: 1},
    { field: "admin", headerName: "Admin" , resizable: false, flex: 1},
  ];
  
  return (
    <div>
      <DataGrid rows={usersData} columns={columns} />
    </div>
  );
};

export default AdminUserTable;
