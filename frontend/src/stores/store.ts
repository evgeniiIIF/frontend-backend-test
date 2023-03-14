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
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjNkM2VlNTVjNTFmZjQzODNlYmJhNDBjNjA4MTI0MDRmOWM5OTg0NjMyNzY2NWFkNDNhY2MyZDI5YWQ3OTNjNTVlMDQ0ZGViNWQwZmM5ZTdkIn0.eyJhdWQiOiI4NDc5MThmMS00NmE2LTRlOTItYjNhMS1iZTk1NTUwZjdlYzEiLCJqdGkiOiIzZDNlZTU1YzUxZmY0MzgzZWJiYTQwYzYwODEyNDA0ZjljOTk4NDYzMjc2NjVhZDQzYWNjMmQyOWFkNzkzYzU1ZTA0NGRlYjVkMGZjOWU3ZCIsImlhdCI6MTY3ODc3Mzc3MywibmJmIjoxNjc4NzczNzczLCJleHAiOjE2Nzg4NjAxNzMsInN1YiI6IjkzNDQyMjIiLCJhY2NvdW50X2lkIjozMDkyMjg5MCwiYmFzZV9kb21haW4iOiJhbW9jcm0ucnUiLCJzY29wZXMiOlsicHVzaF9ub3RpZmljYXRpb25zIiwiZmlsZXMiLCJjcm0iLCJmaWxlc19kZWxldGUiLCJub3RpZmljYXRpb25zIl19.NfmiBA5j9AHcYyI3PSQWAbm8nB1DNPi5PmyOb2QN4hOQanNcjt9iK2ek1UHU3Aqwv5IY5LiOwGdfmguivoa9EYNixp7u4U8zrnK8PQEb4PCdu4ExhYOJA7aQ2JLQQ2kce4q_tQ8T9PBLG5fKUPAC_2A3LCtxT_wKSsKVXiLkVQWmkd2MPn3uNq6rBx5bymThnY4VEPnOzo9KIDmsXuBtCHT4xIZ_IYqxyXPfbXCjMe2QxIxb9hVQ7asjJStD-pOLfrF_qDYYNOeVDhhpbSaV8uATNXGHpd2rJAgfNZ4K-Z1jUbKAcskQNkdkfy392TXVzR8m8AuKP-Xfw3PKXYGKrw",
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
