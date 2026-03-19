import { Box, Grid, Stack, Typography } from "@mui/material";
import React, { useMemo, useState } from "react";
import CustomCheckbox from "../../components/checkbox";

const clonePermissions = (permissions = []) =>
  permissions.map((perm) => ({ ...perm }));

const normalizeRoute = (route = {}) => ({
  ...route,
  title: route.title || route.name || "",
  order: route.order ?? route.id ?? 0,
  permissions: clonePermissions(route.permissions),
});

const DesignationPermissions = ({
  routes = [],
  onPermissionsChange,
  initialPermissions = [],
}) => {
  const normalizedRoutes = useMemo(
    () =>
      routes
        .filter((route) => route.isHide !== true && route.isHideMenu !== true)
        .map(normalizeRoute)
        .sort((a, b) => (a.order || 0) - (b.order || 0)),
    [routes]
  );

  const [selectedRoutes, setSelectedRoutes] = useState([]);

  React.useEffect(() => {
    if (!initialPermissions || initialPermissions.length === 0) {
      setSelectedRoutes([]);
      return;
    }

    const merged = initialPermissions.map((selected) => {
      const originalRoute = normalizedRoutes.find(
        (route) => route.path === selected.path
      );

      if (!originalRoute) {
        return selected;
      }

      const syncedPermissions = originalRoute.permissions.map((originalPerm) => {
        const key = Object.keys(originalPerm).find(
          (k) => k !== "label" && k !== "key"
        );
        if (!key) return { ...originalPerm };

        const existing = selected.permissions?.find(
          (perm) => perm.label === originalPerm.label
        );

        if (existing) {
          return { ...existing };
        }

        return {
          ...originalPerm,
          [key]: originalPerm[key] ?? false,
        };
      });

      return {
        title: selected.title || originalRoute.title,
        path: originalRoute.path,
        order: originalRoute.order,
        permissions: syncedPermissions,
      };
    });

    setSelectedRoutes(merged);
  }, [initialPermissions, normalizedRoutes]);

  const handleRouteToggle = (route) => {
    setSelectedRoutes((prev) => {
      const exists = prev.find((r) => r.path === route.path);
      let updated;

      if (exists) {
        updated = prev.filter((r) => r.path !== route.path);
      } else {
        updated = [
          ...prev,
          {
            title: route.title,
            path: route.path,
            order: route.order,
            permissions: clonePermissions(route.permissions),
          },
        ];
      }

      onPermissionsChange?.(updated);
      return updated;
    });
  };

  const togglePermission = (routePath, permIndex) => {
    const updated = selectedRoutes.map((route) => {
      if (route.path !== routePath) return route;

      const permissions = route.permissions.map((perm, index) => {
        if (index !== permIndex) return perm;

        const key = Object.keys(perm).find(
          (k) => k !== "label" && k !== "key"
        );
        if (!key) return perm;

        return {
          ...perm,
          [key]: !perm[key],
        };
      });

      return { ...route, permissions };
    });

    setSelectedRoutes(updated);
    onPermissionsChange?.(updated);
  };

  const isSelected = (path) => selectedRoutes.some((route) => route.path === path);
  const getRoute = (path) => selectedRoutes.find((route) => route.path === path);

  return (
    <Box
      sx={{
        marginBottom: "20px",
        backgroundColor: "#161616",
        border: "1px solid #2A2A2A",
        borderRadius: "16px",
        padding: "20px",
        color: "#E5E5E5",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, color: "#FFFFFF" }}>
          Module Permissions
        </Typography>
        <Typography sx={{ color: "#A5A5A5", fontWeight: 500 }}>
          {selectedRoutes.length} modules selected
        </Typography>
      </Box>

      <Typography
        variant="subtitle2"
        sx={{ mb: 2, color: "#BFBFBF", fontWeight: 500 }}
      >
        Routes select karo aur har route ke permissions toggle karo.
      </Typography>

      <Box sx={{ p: 0 }}>
        {normalizedRoutes.map((route) => {
          const routeSelected = isSelected(route.path);
          const selectedRoute = getRoute(route.path);

          return (
            <Box key={route.path} sx={{ mb: 2 }}>
              <Stack
                direction="row"
                alignItems="center"
                sx={{
                  backgroundColor: "#1F1F1F",
                  borderRadius: "10px",
                  padding: "10px 12px",
                  border: "1px solid #2F2F2F",
                }}
              >
                <CustomCheckbox
                  checked={routeSelected}
                  onChange={() => handleRouteToggle(route)}
                  labelPlacement="end"
                  style={{ marginRight: 0 }}
                  label={
                    <Typography
                      fontSize={"14px"}
                      sx={{ fontWeight: 500, color: "#F5F5F5" }}
                    >
                      {route.title}
                    </Typography>
                  }
                />
              </Stack>

              {routeSelected && (
                <Box
                  sx={{
                    backgroundColor: "#1B1B1B",
                    borderRadius: "10px",
                    padding: "12px",
                    mt: 2,
                    border: "1px solid #2F2F2F",
                  }}
                >
                  {route.permissions && route.permissions.length > 0 ? (
                    <Grid container spacing={2}>
                      {route.permissions.map((permission, permIndex) => {
                        const key = Object.keys(permission).find(
                          (k) => k !== "label" && k !== "key"
                        );

                        return (
                          <Grid item size={{ xs: 12, md: 6 }} key={permIndex}>
                            <CustomCheckbox
                              labelPlacement="end"
                              style={{ marginRight: 0 }}
                              label={
                                <Typography
                                  fontSize={"14px"}
                                  sx={{ fontWeight: 500, color: "#EDEDED" }}
                                >
                                  {permission.label}
                                </Typography>
                              }
                              checked={
                                key
                                  ? selectedRoute?.permissions?.[permIndex]?.[key] ||
                                    false
                                  : false
                              }
                              onChange={() =>
                                togglePermission(route.path, permIndex)
                              }
                            />
                          </Grid>
                        );
                      })}
                    </Grid>
                  ) : (
                    <Box sx={{ p: 2, ml: 1, color: "#9E9E9E" }}>
                      <Typography variant="body2" sx={{ fontStyle: "italic" }}>
                        Iss module ke liye specific permissions defined nahi hain.
                      </Typography>
                    </Box>
                  )}
                </Box>
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default DesignationPermissions;

