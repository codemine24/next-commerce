"use client";

import Box from "@mui/material/Box";
import dayjs from "dayjs";
import { useSearchParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

import { CustomDatePicker } from "@/components/custom-date-picker/custom-date-picker";
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
    searchParams.get("searchText") || ""
  );
  const [fromDate, setFromDate] = useState(searchParams.get("fromDate"));
  const [toDate, setToDate] = useState(searchParams.get("toDate"));
  const [types, setTypes] = useState(
    searchParams.get("types")?.split(",") || []
  );
  const debouncedSearchText = useDebounce(searchText, 500);

  // update URL params with debounced search text
  const updateSearchParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams);
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === "") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });
      router.push(`?${params.toString()}`);
    },
    [searchParams, router]
  );

  // Sync debounced search text once it settles
  useEffect(() => {
    updateSearchParams({ searchText: debouncedSearchText });
  }, [debouncedSearchText, updateSearchParams]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  // handle from date
  const handleFromDate = useCallback(
    (newValue: Date): boolean => {
      if (dateIsAfter(newValue, new Date())) {
        setDateError("From date cannot be later than today");
        return false;
      }
      if (toDate && dateIsAfter(newValue, new Date(toDate))) {
        setDateError("From date must be before To date");
        return false;
      }
      const formatted = getDateTime(newValue, "YYYY-MM-DD");
      setFromDate(formatted);
      updateSearchParams({ fromDate: formatted });
      setDateError("");
      return true;
    },
    [toDate, updateSearchParams]
  );

  // handle to date
  const handleToDate = useCallback(
    (newValue: Date): boolean => {
      if (fromDate && dateIsAfter(new Date(fromDate), newValue)) {
        setDateError("To date must be later than From date");
        return false;
      }
      const formatted = getDateTime(newValue, "YYYY-MM-DD");
      setToDate(formatted);
      updateSearchParams({ toDate: formatted });
      setDateError("");
      return true;
    },
    [fromDate, updateSearchParams]
  );

  // handle filter type
  const handleFilterType = useCallback(
    (newValue: string) => {
      setTypes((prev) => {
        const newTypes = prev.includes(newValue)
          ? prev.filter((v) => v !== newValue)
          : [...prev, newValue];
        updateSearchParams({ types: newTypes.join(",") });
        return newTypes;
      });
    },
    [updateSearchParams]
  );

  // handle reset type
  const handleResetType = useCallback(() => {
    setTypes([]);
    updateSearchParams({ types: null });
  }, [updateSearchParams]);

  // memoize date objects
  const fromDateObj = useMemo(
    () => (fromDate ? dayjs(fromDate).toDate() : new Date()),
    [fromDate]
  );
  const toDateObj = useMemo(
    () => (toDate ? dayjs(toDate).toDate() : new Date()),
    [toDate]
  );
  const fromDateLabel = useMemo(
    () => (fromDate ? dayjs(fromDate).format("DD MMM YYYY") : "From Date"),
    [fromDate]
  );
  const toDateLabel = useMemo(
    () => (toDate ? dayjs(toDate).format("DD MMM YYYY") : "To Date"),
    [toDate]
  );

  return (
    <Box display="flex" gap={2} alignItems="center" justifyContent="space-between">
      <MediaSearchBox
        searchText={searchText}
        handleSearch={handleSearch} />

      <Box display="flex" gap={2} alignItems="center">
        <CustomDatePicker
          error={dateError}
          date={fromDateObj}
          buttonLabel={fromDateLabel}
          onChangeDate={handleFromDate}
          endIcon={<ChevronDownIcon />}
        />
        <CustomDatePicker
          error={dateError}
          date={toDateObj}
          buttonLabel={toDateLabel}
          onChangeDate={handleToDate}
          endIcon={<ChevronDownIcon />}
        />
        <MediaFileType
          types={types}
          handleFilterType={handleFilterType}
          handleResetType={handleResetType}
        />
      </Box>
    </Box>
  );
};
