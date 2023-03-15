import { defineStore } from "pinia";

interface EntityType {
  [key: string]: string;
}

export const useApiStore = defineStore("apiStore", {
  state: () => ({
    entities: {
      Сделка: "leads",
      Контакт: "contacts",
      Компания: "companies",
    } as EntityType,

    loading: false,
    createdEntities: [] as Array<{ name: string; id: number }>,
    entity_id: null as number | null,
    token:
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6Ijc5YjQ2ODg2M2RmZTM5YWM1NzFhMTQyZDI5OWE1NWViYjMyMzhlNmY0MThlNGJiZjVkNWI4MmNlOWQ0NzBjNTFkMWYzN2UzOGQ1YmZiNTk4In0.eyJhdWQiOiI4NDc5MThmMS00NmE2LTRlOTItYjNhMS1iZTk1NTUwZjdlYzEiLCJqdGkiOiI3OWI0Njg4NjNkZmUzOWFjNTcxYTE0MmQyOTlhNTVlYmIzMjM4ZTZmNDE4ZTRiYmY1ZDViODJjZTlkNDcwYzUxZDFmMzdlMzhkNWJmYjU5OCIsImlhdCI6MTY3ODg2MTY5OSwibmJmIjoxNjc4ODYxNjk5LCJleHAiOjE2Nzg5NDgwOTksInN1YiI6IjkzNDQyMjIiLCJhY2NvdW50X2lkIjozMDkyMjg5MCwiYmFzZV9kb21haW4iOiJhbW9jcm0ucnUiLCJzY29wZXMiOlsicHVzaF9ub3RpZmljYXRpb25zIiwiZmlsZXMiLCJjcm0iLCJmaWxlc19kZWxldGUiLCJub3RpZmljYXRpb25zIl19.BS8LNSVQwdctsofW9BsAEaKITuM2YlPnOaV6bKYKNUBIuwE_yZbk7b_L0p23ub9wnrv6saMTWjIB4BVChd32-eDfzUHEGem8QXwRO_dnASkvpDAWk3Hvqw0ew-cJQNDiVqP1smYcs3OdWGKK5WXmfXkx2QMNJ1YCUu01bi-7R3q4wB1bLpQeu_Jl3bQ-9zeBioWctMlPtCuv7J_RPOw-OG-C2wTGUBhfTllPUr8RVQgtHbCgW2k5ZNZnhMDlBuV8TvLMCUVAcAh5KB0mvMyGNstXbwVHib8zq34IvXcGyG-5P6RXXPuMF_Vo00sXvCuhA959LLEkufaWFboG7wmzwg",
  }),
  getters: {},
  actions: {
    startLoading(): void {
      this.loading = true;
    },
    endLoading(): void {
      this.loading = false;
    },
    async aCreateEntity(selected: string) {
      this.startLoading();
      const creatableEntity: string = this.entities[selected];
      const url = `http://localhost:3000/api`;
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify([{ name: selected }]),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.token,
          creatableEntity,
        },
      });
      const data = await response.json();
      const id = data._embedded[creatableEntity][0].id;
      this.createdEntities.push({ name: selected, id });
      this.saveEntity();
      this.endLoading();
    },
    init() {
      const entitiesJson = localStorage.getItem("entities");
      if (entitiesJson) {
        this.createdEntities = JSON.parse(entitiesJson);
      }
    },
    saveEntity() {
      const entities = JSON.stringify(this.createdEntities);
      localStorage.setItem("entities", entities);
    },
    clearEntities() {
      const entitiesJson = localStorage.getItem("entities");
      if (entitiesJson) {
        this.createdEntities = [];
        localStorage.removeItem("entities");
      }
    },
  },
});
