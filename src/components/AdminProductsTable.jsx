import { DataGrid } from '@mui/x-data-grid';
import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebaseConfig';
import { Box, Typography } from '@mui/material';

const AdminProductsTable = () => {
    const [productsData, setProductsData] = useState([]);

  const getProductsData = async () => {
    const collectionRef = collection(db, "products");
    const dataFromFirebase = await getDocs(collectionRef);

    const extractedData = dataFromFirebase.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    });

    setProductsData(extractedData);
  };

  useEffect(() => {
    getProductsData();
  }, []);

  const columns = [
    { field: "image", headerName: "Image" , resizable: false, flex: 1 , 
        renderCell: (params) => {
           return <Box display="flex" justifyContent="flex-start" alignContent="center" height="100%">
            <img style={{ borderRadius: '50%'}} width={50} src={params.value} />
           </Box>
        }
    },
    { field: "id", headerName: "ID" , resizable: false, flex: 1, editable: true},
    { field: "title", headerName: "Title" , resizable: false, flex: 1},
    { field: "description", headerName: "Description" , resizable: false, flex: 1},
    { field: "category", headerName: "Category", resizable: false, flex: 1},
    { field: "price", headerName: "Price" , resizable: false, flex: 1, 
        renderCell: (params) => {
            return <Box display="flex" justifyContent="flex-start" alignContent="center" height="100%" >
                <Typography variant='span'>$ {params.value}</Typography>
            </Box>
        },
    },
  ];
  
  return (
    <div>
      <DataGrid rows={productsData} columns={columns} />
    </div>
  );
}

export default AdminProductsTable