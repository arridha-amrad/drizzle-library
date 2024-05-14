"use client";

import { useRouter, useSearchParams } from "next/navigation";
import SubmitButton from "./SubmitBtn";
import { CategoriesTable } from "@/drizzle/schema";
import { StylesConfig } from "react-select";
import chroma from "chroma-js";
import dynamic from "next/dynamic";
import { searchBooks } from "@/actions/bookActions";

const Select = dynamic(() => import("react-select"), { ssr: false });

type Props = {
  categories: (typeof CategoriesTable.$inferSelect)[];
};

export default function BookFilterForm({ categories }: Props) {
  const params = useSearchParams();
  const name = params.get("name");
  const page = params.get("page");
  const author = params.get("author");
  const categoriesFromParams = params.get("categories");
  const router = useRouter();
  const isActive = params.get("isFilter");
  const id = Date.now().toString();
  const options = categories.map(({ name }) => ({
    value: name,
    label: name,
  }));
  const defaultOptions = categoriesFromParams
    ? categoriesFromParams
        .trim()
        .split(",")
        .map((val) => ({
          value: val,
          label: val,
        }))
    : [];

  const styles: StylesConfig<any, true> = {
    placeholder: (styles) => ({
      ...styles,
      color: "#eee",
    }),
    valueContainer: (styles) => ({
      ...styles,
      backgroundColor: "#1D232A",
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
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
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
    multiValue: (styles, { data }) => {
      const color = chroma("white");
      return {
        ...styles,
        backgroundColor: "#191E24",
        borderRadius: "5px",
      };
    },
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      color: "#eee",
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      color: "#eee",
      ":hover": {
        color: "red",
      },
    }),
  };
  if (isActive && isActive === "true") {
    return (
      <form action={searchBooks} className="flex gap-2 items-center ">
        <input
          name="title"
          type="text"
          placeholder="Title"
          className="input input-bordered"
        />
        <input
          name="author"
          type="text"
          placeholder="Author"
          className="input input-bordered"
        />
        <div className="w-full bg-base-content">
          <Select
            name="categories"
            id={id}
            defaultValue={defaultOptions}
            // onChange={(e: any) => {
            //   // @ts-ignore
            //   const data = e.map(({ value }) => value.trim()) as string[];
            //   const str = data.join(",");
            //   console.log(str);

            //   router.push(
            //     `/books?isFilter=true&categories=${str}&author=${author}&page=${page}&name=${name}`
            //   );
            // }}
            styles={styles}
            placeholder="Select Categories"
            closeMenuOnSelect={false}
            isMulti
            options={options}
          />
        </div>
        <SubmitButton />
      </form>
    );
  } else {
    return null;
  }
}
