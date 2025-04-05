import React from "react";
import AdminUserTable from "../../components/AdminUserTable";
import { Box, Button } from "@mui/material";

const UsersPage = () => {
  return (
    <Box height="100vh" display="grid" gridTemplateRows="20% 80%">
      <Box marginTop="100px" display="flex" justifyContent="flex-end">
        <Button>Create User</Button>
      </Box>

      <Box>
        <AdminUserTable />
      </Box>
    </Box>
  );
};

export default UsersPage;
