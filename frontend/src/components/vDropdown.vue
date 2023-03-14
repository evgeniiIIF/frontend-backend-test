<template>
  <div class="v-dropdown" :class="menuIsOpen ? 'v-dropdown--menu-open' : ''">
    <label class="v-dropdown__label">
      <span class="v-dropdown__title">title</span>
      <div class="v-dropdown__field" @click="menuIsOpen = !menuIsOpen">
        <input type="text" class="v-dropdown__input" readonly :value="selected">
        <span class="v-dropdown__arrow">&#8964;</span>
      </div>
    </label>
    <ul class="v-dropdown__menu menu-dropdown" v-show="menuIsOpen">
      <li class="menu-dropdown__item"
        v-for="(item, index) in items" :key="index" :class="{ 'menu-dropdown__item--selected': selected === item }"
        @click="selectItem($event, item)">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { computed } from '@vue/reactivity';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  props: {
    items: {
      type: Array as () => string[],
      required: true
    }
  },
  setup(props, { emit }) {
    const menuIsOpen = ref(false);
    const selected = ref<string | null>(null);

    const selectItem = (e: MouseEvent, item: string) => {
      selected.value = item;
      menuIsOpen.value = false;
      const target = e.target as HTMLElement;
      const input = <HTMLInputElement>target.closest('.v-dropdown')?.querySelector('.v-dropdown__input');
      if (input) {
        input.focus();
      }
      emit('on-selected-item', {
        hasSelected,
        selected: selected.value
      });
    };

    const hideOptions = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (menuIsOpen.value && !target.closest('.v-dropdown')) {
        menuIsOpen.value = false;
      }
    };

    const hasSelected = computed(() => {
      return selected.value !== props.items[0];
    });

    const onMounted = () => {
      selected.value = props.items[0];
      document.addEventListener('click', hideOptions, true);
    };

    const onBeforeUnmount = () => {
      document.removeEventListener('click', hideOptions);
    };

    return {
      menuIsOpen,
      selected,
      selectItem,
      hasSelected,
      onMounted,
      onBeforeUnmount
    };
  },
  mounted() {
    this.onMounted();
  },
  beforeUnmount() {
    this.onBeforeUnmount();
  }
});
</script>

<style lang="scss">
.v-dropdown {
  position: relative;

  &__label {
    display: flex;
    flex-direction: column;
  }

  &__title {
    text-transform: uppercase;
    margin-bottom: 4px;
  }

  &__field {
    position: relative;
  }

  &__input {
    width: 100%;
    cursor: pointer;
    padding: 10px 25px 10px 15px;
    box-sizing: border-box;
    border: 1px solid #b8b6b6;
    border-radius: 4px;
    outline: none;
    font-size: 20px;
    color: #b8b6b6;

    &:hover {
      border-color: #9b9b9b;
      color: #9b9b9b;

      &+.v-dropdown__arrow {
        opacity: .7;
      }
    }

    &:focus {
      border-color: #5c5c5c;
      color: #5c5c5c;

      &+.v-dropdown__arrow {
        opacity: 1;
      }
    }
  }

  &__arrow {
    position: absolute;
    top: 79%;
    right: 20px;
    transform: scale(2) translate(0%, -70%);
    transition: all .3s;
    opacity: .4;

  }

  &__menu {
    position: absolute;
    left: 0;
    top: 100%;
    width: 100%;
    list-style: none;
    padding: 0;
    margin: 0;
    border: 1px solid rgb(92, 92, 92);
    border-top: none;
    border-radius: 0 0 4px 4px;
    background: #fff;
  }
}

.v-dropdown--menu-open {
  .v-dropdown__input {
    border-radius: 4px 4px 0 0;
    border-color: #5c5c5c;

  }

  .v-dropdown__arrow {
    transform: scale(2) translate(0%, -43%) rotate(180deg);
    transition: all .3s;
  }
}

.menu-dropdown {
  box-sizing: border-box;
  font-size: 20px;
  box-shadow: 2px 2px 5px #fff;
  color: #a89e9e;



  &__item {
    padding: 10px 15px;
    cursor: pointer;

    &:hover {
      background: #eee;
    }

    &--selected {
      color: #5c5c5c;
      background: #eee;
    }
  }
}
</style>
