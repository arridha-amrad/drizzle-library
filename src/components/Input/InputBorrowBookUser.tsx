"use client";

import {
  Dispatch,
  Fragment,
  Ref,
  RefObject,
  SetStateAction,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useDebounce } from "use-debounce";

type Props = {
  setUserId: Dispatch<SetStateAction<string>>;
};

type User = {
  id: number;
  name: string;
  email: string;
};

export default function InputBorrowBookUser({ setUserId }: Props) {
  const [searchKey, setSearchKey] = useState("");

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [users, setUsers] = useState<User[]>([]);

  const [val] = useDebounce(searchKey, 1000);

  const [isLoading, setIsLoading] = useState(false);

  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const searchUser = async (name: string) => {
      setHasSearched(true);
      setIsLoading(true);
      try {
        const response = await fetch(`/api/users?name=${name}`);
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const data = await response.json();
        setUsers(data.users);
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    };

    if (val) {
      searchUser(val);
    }
  }, [val]);

  const selectUser = (user: User) => {
    setSelectedUser(user);
    setUserId(user.id.toString());
  };

  if (selectedUser) {
    return (
      <fieldset className="fieldset w-full">
        <legend className="fieldset-legend">User</legend>
        <input
          type="text"
          hidden
          name="userId"
          defaultValue={selectedUser.id}
        />
        <div className="flex items-center gap-2">
          <input
            readOnly
            defaultValue={selectedUser.name}
            name="name"
            type="text"
            className="input w-full input-neutral"
            placeholder="Type here"
          />

          <button
            title="Delete"
            onClick={() => {
              setSelectedUser(null);
              setUserId("");
            }}
            className="btn aspect-square rounded-full shrink-0 btn-sm btn-soft btn-error w-fit"
          >
            X
          </button>
        </div>
      </fieldset>
    );
  }

  return (
    <div className="w-full h-max relative">
      <fieldset className="fieldset w-full">
        <legend className="fieldset-legend">User</legend>
        <input
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
          type="text"
          name="searchKey"
          className="input w-full input-neutral"
          placeholder="Type here"
        />
      </fieldset>

      {hasSearched && (
        <div>
          <div className="pt-4 py-2">
            <h1 className="text-sm font-semibold text-white/50">
              Search result
            </h1>
          </div>
          <div className="w-full relative flex flex-col min-h-[100px] max-h-[200px] border-2 border-neutral rounded-xl overflow-y-auto">
            {users.length > 0 && hasSearched
              ? users.map((user, i) => (
                  <Fragment key={i}>
                    <div
                      onClick={() => selectUser(user)}
                      className="text-sm p-2 cursor-pointer hover:bg-neutral/50"
                    >
                      <h1>{user.name}</h1>
                      <p className="text-white/50">{user.email}</p>
                    </div>
                    {i !== users.length - 1 && (
                      <hr className="border-neutral" />
                    )}
                  </Fragment>
                ))
              : !isLoading && (
                  <div className="flex text-white/50 text-sm pt-4 items-center justify-center">
                    <p>user not found</p>
                  </div>
                )}
            {isLoading && (
              <div className="absolute inset-0 bg-neutral/50 flex items-center justify-center">
                <span className="loading loading-spinner loading-md"></span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
