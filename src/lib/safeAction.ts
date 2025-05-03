import {
  createSafeActionClient,
  DEFAULT_SERVER_ERROR_MESSAGE,
} from "next-safe-action";

export class SafeActionError extends Error {}

export const actionClient = createSafeActionClient({
  handleServerError: (e) => {
    if (e instanceof SafeActionError) {
      return e.message;
    }
    return DEFAULT_SERVER_ERROR_MESSAGE;
  },
});
