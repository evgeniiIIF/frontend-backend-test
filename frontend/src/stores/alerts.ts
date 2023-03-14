import { defineStore } from "pinia";

export const useAlertsStore = defineStore("alerts", {
  state: () => ({ count: 0, name: "Eduardo" }),
});
