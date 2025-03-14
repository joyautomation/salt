import type { Actions } from "@sveltejs/kit";

export const actions: Actions = {
  click: async () => {
    return {
      message: "Hello, world!",
      type: "success"
    }
  }
}
