"use client";

import Box from "@mui/material/Box";
import { useSearchParams, useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import { CustomDatePicker } from "@/components/custom-date-picker";
import { useDebounce } from "@/hooks/use-debounce";
import { ChevronDownIcon } from "@/icons/chevron-down";
import { dateIsAfter, getDateTime } from "@/utils/date-formatter";

import { MediaFileType } from "./media-file-type";
import { MediaSearchBox } from "./media-search-box";

export const MediaFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [dateError, setDateError] = useState("");
  const [searchText, setSearchText] = useState(
    searchParams.get("search_term") || ""
  );
  const [type, setType] = useState(
    searchParams.get("type")?.split(",") || []
  );

  const fromDate = searchParams.get("fromDate") || "";
  const toDate = searchParams.get("toDate") || "";

  // --- Debounced search ---
  useDebounce(searchText, 500, () => {
    const params = new URLSearchParams(searchParams.toString());
    if (searchText) {
      if (params.get("search_term") !== searchText) {
        params.set("search_term", searchText);
        router.replace(`?${params.toString()}`);
      }
    } else if (params.has("search_term")) {
      params.delete("search_term");
      router.replace(`?${params.toString()}`);
    }
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchText(e.target.value);

  const updateParam = useCallback((key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.replace(`?${params.toString()}`);
  }, [searchParams, router]);

  const handleFromDate = useCallback((newValue: Date) => {
    if (dateIsAfter(newValue, new Date())) {
      setDateError("From date cannot be later than today");
      return false;
    } else if (toDate && dateIsAfter(newValue, toDate)) {
      setDateError("From date must be before to date");
      return false;
    }
    setDateError("");
    updateParam("fromDate", getDateTime(newValue, "YYYY-MM-DD") as string);
    return true;
  }, [toDate, updateParam]);

  const handleToDate = useCallback((newValue: Date) => {
    if (dateIsAfter(newValue, new Date())) {
      setDateError("To date cannot be later than today");
      return false;
    } else if (fromDate && dateIsAfter(newValue, fromDate)) {
      setDateError("To date must be after from date");
      return false;
    }
    setDateError("");
    updateParam("toDate", getDateTime(newValue, "YYYY-MM-DD") as string);
    return true;
  }, [fromDate, updateParam]);


  const handleFilterType = useCallback(
    (newValue: string) => {
      setType((prev) => {
        const newTypes = prev.includes(newValue) ? prev.filter((v) => v !== newValue) : [...prev, newValue];
        updateParam("type", newTypes.join(','));
        return newTypes;
      });
    },
    [updateParam]
  );


  const handleResetType = useCallback(() => {
    setType([]);
    updateParam("type", "");
  }, [updateParam]);

  return (
    <Box p={2} gap={2} display="flex" alignItems="center" justifyContent="space-between">
      <MediaSearchBox searchText={searchText} handleSearch={handleSearch} />

      <Box display="flex" gap={2} alignItems="center">
        <CustomDatePicker
          error={dateError}
          date={fromDate ? new Date(fromDate) : undefined}
          buttonLabel={fromDate || "From Date"}
          onChangeDate={handleFromDate}
          endIcon={<ChevronDownIcon />}
        />
        <CustomDatePicker
          error={dateError}
          date={toDate ? new Date(toDate) : undefined}
          buttonLabel={toDate || "To Date"}
          onChangeDate={handleToDate}
          endIcon={<ChevronDownIcon />}
        />
        <MediaFileType
          types={type}
          handleFilterType={handleFilterType}
          handleResetType={handleResetType}
        />
      </Box>
    </Box>
  );
};
