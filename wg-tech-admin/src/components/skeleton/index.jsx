import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Skeleton,
  Box,
  Avatar,
  Grid,
  Paper,
} from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.black,
    fontWeight: "700",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "& .MuiTableCell-root": {
    border: 0,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

// Add the same tableStyle as custom table
const tableStyle = {
  "&.MuiTableContainer-root .MuiTableHead-root": {
    backgroundColor: "customColor.softGrey",
  },
  "&.MuiTableContainer-root .MuiTableHead-root .MuiTableRow-root .MuiTableCell-root":
    {
      padding: "6px 16px",
      color: "customColor.manateeGrey",
      fontSize: "0.8rem",
      borderBottom: "1px solid",
      borderBottomColor: "customColor.lightGrey",
    },

  "& .MuiTableCell-root .MuiTypography-body1 ": {
    fontSize: "0.875rem",
  },
};

export default function TableSkeleton({
  headerCells,
  displayCells,
  rowsCount = 5,
  tableWidth,
}) {
  const renderSkeletonForCell = (cellItem, cellIndex) => {
    // Special handling for different cell types
    if (cellItem === "role" || cellItem === "description") {
      return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
          <Box sx={{ flex: 1 }}>
            <Skeleton variant="text" width="60%" height={16} />
            <Skeleton variant="text" width="40%" height={14} />
          </Box>
        </Box>
      );
    }

    if (cellItem === "role") {
      return (
        <Skeleton
          variant="rectangular"
          width={42}
          height={22}
          sx={{ borderRadius: 11 }}
        />
      );
    }

    if (cellItem === "description") {
      return (
        <Skeleton
          variant="rectangular"
          width={80}
          height={24}
          sx={{ borderRadius: 12 }}
        />
      );
    }

    // if (cellItem === "user_plan") {
    //   return (
    //     <Skeleton
    //       variant="rectangular"
    //       width={100}
    //       height={28}
    //       sx={{ borderRadius: 14 }}
    //     />
    //   );
    // }

    // if (cellItem === "assigned_pages") {
    //   return (
    //     <Box sx={{ display: "flex", gap: 1 }}>
    //       <Skeleton variant="text" width={40} height={20} />
    //       <Skeleton variant="circular" width={20} height={20} />
    //       <Skeleton variant="circular" width={17} height={17} />
    //     </Box>
    //   );
    // }

    // if (cellItem === "delete") {
    //   return <Skeleton variant="circular" width={24} height={24} />;
    // }

    // if (cellItem === "downloadInvoice") {
    //   return (
    //     <Box sx={{ textAlign: "center" }}>
    //       <Skeleton
    //         variant="rectangular"
    //         width={30}
    //         height={25}
    //         sx={{ mx: "auto", mb: 1 }}
    //       />
    //       <Skeleton variant="text" width={60} height={12} />
    //     </Box>
    //   );
    // }

    // if (cellItem === "formate_date") {
    //   return <Skeleton variant="text" width="70%" height={16} />;
    // }

    // if (cellItem === "user_detail" || cellItem === "user_business_details") {
    //   return (
    //     <Box>
    //       <Skeleton variant="text" width="80%" height={16} />
    //       <Skeleton variant="text" width="60%" height={12} />
    //       <Skeleton variant="text" width="40%" height={12} />
    //     </Box>
    //   );
    // }

    // if (cellItem === "user_authentication_info") {
    //   return (
    //     <Box sx={{ textAlign: "center" }}>
    //       <Skeleton variant="text" width="50%" height={14} />
    //     </Box>
    //   );
    // }

    // if (cellItem === "organizationPlan" || cellItem === "organizationStatus") {
    //   return (
    //     <Skeleton
    //       variant="rectangular"
    //       width={80}
    //       height={24}
    //       sx={{ borderRadius: 6 }}
    //     />
    //   );
    // }

    // if (cellItem === "idDate") {
    //   return (
    //     <Box>
    //       <Skeleton variant="text" width="40%" height={16} />
    //       <Skeleton variant="text" width="60%" height={14} />
    //     </Box>
    //   );
    // }

    // if (cellItem === "invoiceDuration") {
    //   return <Skeleton variant="text" width="80%" height={16} />;
    // }

    // if (cellItem === "invoiceStatus") {
    //   return (
    //     <Skeleton
    //       variant="rectangular"
    //       width={60}
    //       height={20}
    //       sx={{ borderRadius: 4 }}
    //     />
    //   );
    // }

    // Default skeleton for regular text cells
    return (
      <Skeleton
        variant="text"
        width={cellIndex === 0 ? "70%" : "85%"}
        height={16}
      />
    );
  };

  return (
    <TableContainer sx={tableStyle}>
      <Table sx={{ minWidth: tableWidth || 700 }} aria-label="skeleton table">
        <TableHead>
          <TableRow>
            {headerCells.map((cell, index) => (
              <TableCell key={index} sx={{ textAlign: cell.align || "start" }}>
                {cell.title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from({ length: rowsCount }).map((_, rowIndex) => (
            <StyledTableRow key={rowIndex}>
              {displayCells.map((cellItem, cellIndex) => (
                <TableCell
                  key={cellIndex}
                  align={cellItem.align ? cellItem.align : "center"}
                  sx={{ padding: "12px 16px" }}
                >
                  {renderSkeletonForCell(cellItem, cellIndex)}
                </TableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

// Dashboard Skeleton Component
export function DashboardSkeleton() {
  return (
    <Box sx={{ p: 3, backgroundColor: "transparent", minHeight: "100vh" }}>
      {/* Header Section Skeleton */}
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 3,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Skeleton
              variant="text"
              width="300px"
              height={48}
              sx={{
                mb: 1,
                bgcolor: "rgba(255, 255, 255, 0.1)",
              }}
            />
            <Skeleton
              variant="text"
              width="500px"
              height={24}
              sx={{
                bgcolor: "rgba(255, 255, 255, 0.08)",
              }}
            />
          </Box>

          {/* Date Range Filter Skeleton */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Skeleton
              variant="rectangular"
              width={200}
              height={40}
              sx={{
                borderRadius: "12px",
                bgcolor: "rgba(255, 255, 255, 0.1)",
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* Chart Section Skeleton */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item size={{ xs: 12 }}>
          <Paper
            sx={{
              backgroundColor: "#1A1A1A",
              borderRadius: "16px",
              p: 3,
              border: "1px solid #333333",
            }}
          >
            {/* Chart Title Skeleton */}
            <Box sx={{ mb: 3 }}>
              <Skeleton
                variant="text"
                width="200px"
                height={28}
                sx={{
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                }}
              />
            </Box>

            {/* Chart Area Skeleton */}
            <Skeleton
              variant="rectangular"
              width="100%"
              height={400}
              sx={{
                borderRadius: "8px",
                bgcolor: "rgba(255, 255, 255, 0.05)",
              }}
            />
          </Paper>
        </Grid>
      </Grid>

      {/* Tables Section Skeleton */}
      <Grid container spacing={3}>
        {/* Top 5 Proposals Table Skeleton */}
        <Grid item size={{ xs: 12 }}>
          <Paper
            sx={{
              backgroundColor: "#1A1A1A",
              borderRadius: "16px",
              p: 3,
              border: "1px solid #333333",
              height: "100%",
            }}
          >
            {/* Table Header Skeleton */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Skeleton
                variant="text"
                width="150px"
                height={28}
                sx={{
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                }}
              />
              <Skeleton
                variant="rectangular"
                width={100}
                height={32}
                sx={{
                  borderRadius: "8px",
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                }}
              />
            </Box>

            {/* Table Skeleton */}
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    {[1, 2, 3, 4].map((item) => (
                      <TableCell
                        key={item}
                        sx={{
                          borderBottom: "1px solid #333333",
                          padding: "12px 16px",
                        }}
                      >
                        <Skeleton
                          variant="text"
                          width="80%"
                          height={20}
                          sx={{
                            bgcolor: "rgba(255, 255, 255, 0.1)",
                          }}
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[1, 2, 3, 4, 5].map((row) => (
                    <TableRow key={row}>
                      {[1, 2, 3, 4].map((cell) => (
                        <TableCell
                          key={cell}
                          sx={{
                            borderBottom: "1px solid #333333",
                            padding: "12px 16px",
                          }}
                        >
                          <Skeleton
                            variant="text"
                            width={cell === 1 ? "60%" : "80%"}
                            height={16}
                            sx={{
                              bgcolor: "rgba(255, 255, 255, 0.08)",
                            }}
                          />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Top Services Table Skeleton */}
        <Grid item size={{ xs: 12, lg: 6 }}>
          <Paper
            sx={{
              backgroundColor: "#1A1A1A",
              borderRadius: "16px",
              p: 3,
              border: "1px solid #333333",
              height: "100%",
            }}
          >
            {/* Table Header Skeleton */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Skeleton
                variant="text"
                width="120px"
                height={28}
                sx={{
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                }}
              />
              <Skeleton
                variant="rectangular"
                width={100}
                height={32}
                sx={{
                  borderRadius: "8px",
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                }}
              />
            </Box>

            {/* Table Skeleton */}
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    {[1, 2, 3].map((item) => (
                      <TableCell
                        key={item}
                        sx={{
                          borderBottom: "1px solid #333333",
                          padding: "12px 16px",
                        }}
                      >
                        <Skeleton
                          variant="text"
                          width="80%"
                          height={20}
                          sx={{
                            bgcolor: "rgba(255, 255, 255, 0.1)",
                          }}
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[1, 2, 3, 4, 5].map((row) => (
                    <TableRow key={row}>
                      {[1, 2, 3].map((cell) => (
                        <TableCell
                          key={cell}
                          sx={{
                            borderBottom: "1px solid #333333",
                            padding: "12px 16px",
                          }}
                        >
                          <Skeleton
                            variant="text"
                            width={cell === 1 ? "60%" : "80%"}
                            height={16}
                            sx={{
                              bgcolor: "rgba(255, 255, 255, 0.08)",
                            }}
                          />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Upcoming Events Table Skeleton */}
        <Grid item size={{ xs: 12, lg: 6 }}>
          <Paper
            sx={{
              backgroundColor: "#1A1A1A",
              borderRadius: "16px",
              p: 3,
              border: "1px solid #333333",
              height: "100%",
            }}
          >
            {/* Table Header Skeleton */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Skeleton
                variant="text"
                width="150px"
                height={28}
                sx={{
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                }}
              />
              <Skeleton
                variant="rectangular"
                width={100}
                height={32}
                sx={{
                  borderRadius: "8px",
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                }}
              />
            </Box>

            {/* Table Skeleton */}
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    {[1, 2, 3, 4].map((item) => (
                      <TableCell
                        key={item}
                        sx={{
                          borderBottom: "1px solid #333333",
                          padding: "12px 16px",
                        }}
                      >
                        <Skeleton
                          variant="text"
                          width="80%"
                          height={20}
                          sx={{
                            bgcolor: "rgba(255, 255, 255, 0.1)",
                          }}
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[1, 2, 3, 4, 5].map((row) => (
                    <TableRow key={row}>
                      {[1, 2, 3, 4].map((cell) => (
                        <TableCell
                          key={cell}
                          sx={{
                            borderBottom: "1px solid #333333",
                            padding: "12px 16px",
                          }}
                        >
                          <Skeleton
                            variant="text"
                            width={cell === 1 ? "60%" : "80%"}
                            height={16}
                            sx={{
                              bgcolor: "rgba(255, 255, 255, 0.08)",
                            }}
                          />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
