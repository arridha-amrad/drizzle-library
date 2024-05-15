import { ReadonlyURLSearchParams } from "next/navigation";

type Params = {
  title?: string | null;
  author?: string | null;
  categories?: string | null;
  isFilter?: string | null;
  page?: string | null;
};

type Options = keyof Params;

export const getQueryParams = (params: ReadonlyURLSearchParams) => {
  const options: Options[] = [
    "author",
    "categories",
    "isFilter",
    "page",
    "title",
  ];

  const objParams: Params = {};

  options.map((option) => {
    objParams[option] = params.get(option);
  });

  return objParams;
};

export const setQueryParams = (objParams: Params, updateParam?: Params) => {
  const { author, categories, isFilter, page, title } = {
    ...objParams,
    ...updateParam,
  };
  return `/books?isFilter=${isFilter}&title=${title}&author=${author}&categories=${categories}&page=${page}`;
};
