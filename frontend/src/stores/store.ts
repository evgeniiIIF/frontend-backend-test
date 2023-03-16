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
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjIyNGUzMzk3MjA4ZGJhMzBlY2ZkYzY3Nzg3Nzc2YzU1ZjgwNmZiNGU2OGZhMzFkYWI2OWUxZDVhOTQ1NmE5OTdhYjA2MWNhMGFiMTlmNGJhIn0.eyJhdWQiOiI4NDc5MThmMS00NmE2LTRlOTItYjNhMS1iZTk1NTUwZjdlYzEiLCJqdGkiOiIyMjRlMzM5NzIwOGRiYTMwZWNmZGM2Nzc4Nzc3NmM1NWY4MDZmYjRlNjhmYTMxZGFiNjllMWQ1YTk0NTZhOTk3YWIwNjFjYTBhYjE5ZjRiYSIsImlhdCI6MTY3ODk1MTUxOSwibmJmIjoxNjc4OTUxNTE5LCJleHAiOjE2NzkwMzc5MTksInN1YiI6IjkzNDQyMjIiLCJhY2NvdW50X2lkIjozMDkyMjg5MCwiYmFzZV9kb21haW4iOiJhbW9jcm0ucnUiLCJzY29wZXMiOlsicHVzaF9ub3RpZmljYXRpb25zIiwiZmlsZXMiLCJjcm0iLCJmaWxlc19kZWxldGUiLCJub3RpZmljYXRpb25zIl19.oRRLHHeWFyZWhKT9UPbv3aqMGQeRHPVZpQAmWuOTUEwolWiiwO5mEz_nrQ_DottrY4eN_Jb6mdb0uvcKCpG_fsX_GoXILBY29QkE11a3oPSpde-nmOMdxrNFWLGB7i1Y2ThRCF9NUuPEW5ByM17loqfMc7_5E7gV5hVVkBVc9q0i-K12le9fUN6fmT58Uw0RaFRrXYtBPiY89G9cOoVe02mLRQ05F-PyYjhz9o9c74wXd--oQJxHHsYaFc_WVjtn4s4uKps58-0Qs4k7SjM_BqRDgGtlsoI0fz0OrAVQUVubkywuRaXjfHqE1-446rapXdRfPurwq0o7G8WUF3dqag",
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
