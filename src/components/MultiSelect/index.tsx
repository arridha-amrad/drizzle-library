"use client";

import { StylesConfig } from "react-select";
import chroma from "chroma-js";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { CategoriesTable } from "@/drizzle/schema";
import { getQueryParams } from "@/app/utils/booksRouteParams";
import { useEffect } from "react";

const Select = dynamic(() => import("react-select"), { ssr: false });

export default function MultiSelect({
  categories,
}: {
  categories: (typeof CategoriesTable.$inferSelect)[];
}) {
  const params = useSearchParams();
  const { categories: cats } = getQueryParams(params);

  const options = categories.map(({ name }) => ({
    value: name,
    label: name,
  }));

  // const defaultOptions = cats
  //   ? cats
  //       .trim()
  //       .split(",")
  //       .filter((val) => val !== "null")
  //       .map((val) => ({
  //         value: val,
  //         label: val,
  //       }))
  //   : [];

  const styles: StylesConfig<any, true> = {
    placeholder: (styles) => ({
      ...styles,
      color: "#eee",
    }),
    valueContainer: (styles) => ({
      ...styles,
      backgroundColor: "#1D232A",
      color: "red",
    }),
    group: (styles) => ({
      ...styles,
      backgroundColor: "blue",
    }),
    menu: (styles) => ({
      ...styles,
      backgroundColor: "#1D232A",
    }),
    container: (styles) => ({
      ...styles,
      backgroundColor: "#1D232A",
    }),
    input: (styles) => ({
      ...styles,
      color: "#eee",
    }),
    menuList: (styles) => ({
      ...styles,
      backgroundColor: "#191E24",
      borderRadius: "8px",
      border: "2px solid #383F47",
    }),
    control: (styles) => ({
      ...styles,
      backgroundColor: "#1D232A",
      borderRadius: "8px",
      border: "1px solid #383F47",
      outline: "none",
      padding: "7px",
      ":hover": {
        border: "1px solid #383F47",
      },
      ":focus": {
        border: "2px solid #383F47",
      },
    }),
    option: (styles, { isDisabled, isFocused, isSelected }) => {
      const color = chroma("#333");
      return {
        ...styles,
        ":hover": {
          backgroundColor: "#7480FF",
        },
        backgroundColor: isDisabled
          ? undefined
          : isSelected
          ? "green"
          : isFocused
          ? color.alpha(0.1).css()
          : undefined,
        color: isDisabled
          ? "#ccc"
          : isSelected
          ? chroma.contrast(color, "white") > 2
            ? "white"
            : "green"
          : "#eee",
        cursor: isDisabled ? "not-allowed" : "pointer",
        ":active": {
          ...styles[":active"],
          backgroundColor: !isDisabled
            ? isSelected
              ? "green"
              : color.alpha(0.3).css()
            : undefined,
        },
      };
    },
    multiValue: (styles) => {
      return {
        ...styles,
        backgroundColor: "#191E24",
        borderRadius: "5px",
      };
    },
    multiValueLabel: (styles) => ({
      ...styles,
      color: "#eee",
    }),
    multiValueRemove: (styles) => ({
      ...styles,
      color: "#eee",
      ":hover": {
        color: "red",
      },
    }),
  };

  return (
    <Select
      name="categories"
      defaultValue={["docker"]}
      options={options}
      styles={styles}
      placeholder="Select Categories"
      closeMenuOnSelect={false}
      isMulti
    />
  );
}
