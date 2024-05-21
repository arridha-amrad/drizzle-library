"use client";

import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { CategoriesTable } from "@/drizzle/schema";
import { useEffect, useState } from "react";
import { styles } from "./styles";

const Select = dynamic(() => import("react-select"), { ssr: false });

export default function MultiSelect({
  categories,
}: {
  categories: (typeof CategoriesTable.$inferSelect)[];
}) {
  const params = useSearchParams();
  const categoriesFromParams = params.get("categories");

  const options = categories.map(({ name }) => ({
    value: name,
    label: name,
  }));

  const [defaultValue, setDefaultValue] = useState<
    { value: string; label: string }[]
  >([]);

  useEffect(() => {
    const value = categoriesFromParams
      ? categoriesFromParams
          .trim()
          .split(",")
          .filter((val) => val !== "null")
          .map((val) => ({
            value: val,
            label: val,
          }))
      : [];
    setDefaultValue(value);
  }, [categoriesFromParams]);

  return (
    <Select
      name="categories"
      defaultValue={defaultValue}
      value={defaultValue}
      // @ts-ignore
      onChange={setDefaultValue}
      options={options}
      styles={styles}
      placeholder="Select Categories"
      closeMenuOnSelect={false}
      isMulti
    />
  );
}
