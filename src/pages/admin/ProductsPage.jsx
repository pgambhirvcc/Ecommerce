import { Box, Button } from '@mui/material'
import React, { useState } from 'react'
import AdminProductsTable from '../../components/AdminProductsTable'
import CreateProduct from '../../components/CreateProduct'

export const ProductsPage = () => {

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Box height="100vh" display="grid" gridTemplateRows="20% 80%">
      <Box marginTop="100px" display="flex" justifyContent="flex-end">
        <Button onClick={() => setIsDialogOpen(true)}>Create Product</Button>
      </Box>

      <CreateProduct isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />

      <Box>
        <AdminProductsTable />
      </Box>
    </Box>
  )
}
