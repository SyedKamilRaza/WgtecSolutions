import React, { useState, useEffect, useRef } from "react";
import { Box, Autocomplete, CircularProgress, TextField } from "@mui/material";
import { MapPin } from "lucide-react";

const GooglePlacesInput = ({
  value,
  onChange,
  placeholder,
  label,
  error,
  helperText,
  required = false,
  disabled = false,
  fullWidth = true,
  variant = "outlined",
  size = "medium",
  type = "address", // "address", "city", "state"
}) => {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const autocompleteService = useRef(null);
  const placesService = useRef(null);

  useEffect(() => {
    // Initialize Google Places services
    if (window.google && window.google.maps) {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService();
      placesService.current = new window.google.maps.places.PlacesService(
        document.createElement("div")
      );
    }
  }, []);

  const getPlaceDetails = (placeId) => {
    return new Promise((resolve, reject) => {
      if (!placesService.current) {
        reject(new Error("Places service not initialized"));
        return;
      }

      const request = {
        placeId: placeId,
        fields: ["address_components", "formatted_address", "geometry"],
      };

      placesService.current.getDetails(request, (place, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          resolve(place);
        } else {
          reject(new Error(`Place details failed: ${status}`));
        }
      });
    });
  };

  const extractAddressComponents = (place) => {
    const components = place.address_components;
    const result = {
      street_number: "",
      route: "",
      locality: "",
      administrative_area_level_1: "",
      country: "",
      postal_code: "",
    };

    components.forEach((component) => {
      const types = component.types;
      if (types.includes("street_number")) {
        result.street_number = component.long_name;
      } else if (types.includes("route")) {
        result.route = component.long_name;
      } else if (types.includes("locality")) {
        result.locality = component.long_name;
      } else if (types.includes("administrative_area_level_1")) {
        result.administrative_area_level_1 = component.short_name;
      } else if (types.includes("country")) {
        result.country = component.long_name;
      } else if (types.includes("postal_code")) {
        result.postal_code = component.long_name;
      }
    });

    return result;
  };

  const handleInputChange = async (event, newInputValue) => {
    setInputValue(newInputValue);

    if (!newInputValue || newInputValue.length < 3) {
      setOptions([]);
      return;
    }

    if (!autocompleteService.current) {
      return;
    }

    setLoading(true);

    try {
      let types = [];

      // Set types based on input type
      switch (type) {
        case "address":
          types = ["address"];
          break;
        case "city":
          types = ["(cities)"];
          break;
        case "state":
          types = ["administrative_area_level_1"];
          break;
        default:
          types = ["address"];
      }

      const request = {
        input: newInputValue,
        types: types,
        componentRestrictions: { country: "PK" }, // Restrict to Pakistan
      };

      autocompleteService.current.getPlacePredictions(
        request,
        (predictions, status) => {
          if (
            status === window.google.maps.places.PlacesServiceStatus.OK &&
            predictions
          ) {
            setOptions(predictions);
          } else {
            setOptions([]);
          }
          setLoading(false);
        }
      );
    } catch (error) {
      console.error("Autocomplete error:", error);
      setOptions([]);
      setLoading(false);
    }
  };

  const handleOptionSelect = async (event, option) => {
    if (!option) return;

    try {
      const placeDetails = await getPlaceDetails(option.place_id);
      const addressComponents = extractAddressComponents(placeDetails);

      let selectedValue = "";
      let additionalData = {};

      switch (type) {
        case "address":
          selectedValue = option.description;
          additionalData = {
            streetAddress:
              `${addressComponents.street_number} ${addressComponents.route}`.trim(),
            city: addressComponents.locality,
            state: addressComponents.administrative_area_level_1,
            country: addressComponents.country,
            postalCode: addressComponents.postal_code,
            coordinates: {
              lat: placeDetails.geometry?.location?.lat(),
              lng: placeDetails.geometry?.location?.lng(),
            },
          };
          break;
        case "city":
          selectedValue = addressComponents.locality || option.description;
          additionalData = {
            city: addressComponents.locality,
            state: addressComponents.administrative_area_level_1,
            country: addressComponents.country,
          };
          break;
        case "state":
          selectedValue =
            addressComponents.administrative_area_level_1 || option.description;
          additionalData = {
            state: addressComponents.administrative_area_level_1,
            country: addressComponents.country,
          };
          break;
      }

      // Call onChange with both value and additional data
      onChange(selectedValue, additionalData);
      setInputValue(selectedValue);
    } catch (error) {
      console.error("Error getting place details:", error);
      // Fallback to just the description
      onChange(option.description);
      setInputValue(option.description);
    }
  };

  return (
    <Box sx={{ position: "relative" }}>
      <Autocomplete
        value={value}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        onChange={handleOptionSelect}
        options={options}
        getOptionLabel={(option) =>
          typeof option === "string" ? option : option.description
        }
        isOptionEqualToValue={(option, value) =>
          option.place_id === value?.place_id || option === value
        }
        loading={loading}
        disabled={disabled}
        fullWidth={fullWidth}
        freeSolo
        autoComplete
        includeInputInList
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={placeholder}
            error={error}
            helperText={helperText}
            required={required}
            // variant="outlined"
            size="medium"
            fullWidth={fullWidth}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                fontFamily: "Poppins",
                padding: "0px 16px",
                background: "white",
                border: "1px solid #E5E7EB",
                transition: "all 0.2s ease",
                "&:hover": {
                  borderColor: "#1F3C88",
                  borderWidth: "1px",
                },
                "&.Mui-focused": {
                  borderColor: "#1F3C88",
                  borderWidth: "2px",
                  borderRadius: "8px",
                  fontFamily: "Poppins",
                  boxShadow: "0 0 0 2px rgba(31, 60, 136, 0.1)",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#1F3C88",
                "&.Mui-focused": {
                  color: "#1F3C88",
                },
              },
            }}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <>
                  <MapPin
                    size={20}
                    style={{ color: "#1F3C88", marginRight: 8 }}
                  />
                  {params.InputProps.startAdornment}
                </>
              ),
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress size={20} color="primary" />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
        renderOption={(props, option) => (
          <Box component="li" {...props}>
            <Box>
              <Box sx={{ fontWeight: "bold" }}>
                {option.structured_formatting?.main_text || option.description}
              </Box>
              {option.structured_formatting?.secondary_text && (
                <Box sx={{ fontSize: "0.875rem", color: "text.secondary" }}>
                  {option.structured_formatting.secondary_text}
                </Box>
              )}
            </Box>
          </Box>
        )}
      />
    </Box>
  );
};

export default GooglePlacesInput;
