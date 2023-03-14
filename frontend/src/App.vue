<template>
  <div class="v-app">
    <div class="v-app__dropdown">
      <vDropdown :items="items" @on-selected-item="selectItem($event)" />
    </div>
    <button class="v-app__button"
      @click="createEntity"
      :disabled="!hasSelected"
      :title="!hasSelected ? 'Выберите сущность' : ''">
      <span v-if="!loading">Создать</span>
      <span v-else class="loading"></span>
    </button>
    <table class="v-app__table">
      <thead>
        <tr>
          <th>Сущность</th>
          <th>id</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in store.createdEntities" :key="item.id">
          <td>{{ item.name }}</td>
          <td>{{ item.id }}</td>
        </tr>
      </tbody>
    </table>
    <button class="v-app__button"
      v-show="store.createdEntities.length"
      @click="store.clearEntities">
      <span>Очистить</span>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, Ref, ref, watch, } from 'vue';
import { useApiStore } from '@/stores/store';
import { createPinia } from 'pinia';
const pinia = createPinia();

import vDropdown from './components/vDropdown.vue';


export default defineComponent({
  name: 'App',
  components: {
    vDropdown,
  },
  setup() {
    const store = useApiStore(pinia);

    const items: string[] = ['He выбрано'].concat(Object.keys(store.entities));
    let hasSelected: Ref<boolean> = ref(false);
    let loading: Ref<boolean> = ref(false)
    let selected: Ref<string> = ref('')

    interface event {
      hasSelected: Ref<boolean>,
      selected: string
    }

    const selectItem = ($event: event): void => {
      hasSelected.value = $event.hasSelected.value;
      selected.value = $event.selected
    }

    const createEntity = () => {
      store.aCreateEntity(selected.value)
    }

    watch(() => store.loading,
      (newValue, oldValue) => {
        loading.value = newValue
      }
    )

    onMounted(() => store.init())

    return {
      store, items, selectItem, createEntity, hasSelected, loading
    };
  },

});
</script>

<style lang="scss">
.v-app {
  width: 90%;
  border: 1px solid #b8b6b6;
  border-radius: 4px;
  margin: 0 auto;
  padding: 20px 30px;

  &>* {
    margin-bottom: 30px;
  }

  &__dropdown {}

  &__button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 120px;
    height: 35px;
    cursor: pointer;
    border-radius: 4px;
    border: none;
    background: #26b6f8;
    color: #fff;

    &:disabled {
      background: #eee;
      color: #cecece;
      cursor: not-allowed;
    }
  }

  &__table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      padding: 10px 20px;
      width: 50%;
      border: 1px solid #b8b6b6;
      text-align: center;
      color: #5c5c5c;
    }

  }
}

.loading {
  display: inline-block;
  width: 17px;
  height: 17px;
  border: 4px solid #fff;
  border-radius: 50%;
  border-left-color: #26b6f8;
  animation: load 1.5s linear infinite;
}

@keyframes load {
  to {
    transform: rotate(360deg);
  }
}
</style>