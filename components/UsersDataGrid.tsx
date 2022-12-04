import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { UserResult } from "../types/User";

interface UsersDataGrid {
  users: UserResult[];
  selectedUserId: string;
  onSelectionChange: (userId: string) => void;
}

const columns: GridColDef[] = [
  { field: "name", headerName: "Name" },
  { field: "username", headerName: "Username" },
];

export default function UsersDataGrid({
  users,
  selectedUserId,
  onSelectionChange,
}: UsersDataGrid) {
  const rows = users.map((user) => ({
    id: user.id,
    username: user.username,
    name: user.name,
  }));

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        checkboxSelection
        disableSelectionOnClick
        pageSize={5}
        rowsPerPageOptions={[5]}
        rows={rows}
        columns={columns}
        selectionModel={[selectedUserId]}
        onSelectionModelChange={(selected) => {
          const next = selected.filter((rowId) => rowId !== selectedUserId);
          onSelectionChange(next[0] as string);
        }}
      />
    </Box>
  );
}
