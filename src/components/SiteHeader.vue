<template>
  <header class="bg-black antialiased pb-32">
    <div class="mx-auto max-w-md px-4">
      <div class="flex justify-between items-center py-4 border-b border-grey-darkest">
        <div>
          <div class="inline-block">
            <svg
              class="text-black bg-teal-dark rounded-full h-10 w-10 pt-3"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M1 10h3v10H1V10zM6 0h3v20H6V0zm5 8h3v12h-3V8zm5-4h3v16h-3V4z" />
            </svg>
          </div>
          <h1
            class="inline-block font-semibold tracking-wide text-xl text-grey-light antialiased pl-4 pt-3"
          >
            2020 Youth Camp
            <br />
            <span class="text-sm font-medium">Covenant Fellowship</span>
          </h1>
        </div>
        <div>
          <DropdownMenu></DropdownMenu>
        </div>
      </div>
      <nav v-if="isAdmin" class="flex py-2 font-semibold">
        <router-link
          class="text-grey-darker no-underline mr-2 px-2 py-2 rounded hover:bg-black-20 hover:text-white"
          to="/"
        >Points</router-link>
        <router-link
          class="text-grey-darker no-underline mr-2 px-2 py-2 rounded hover:bg-black-20 hover:text-white"
          to="/weights"
        >Weights</router-link>
        <router-link
          class="text-grey-darker no-underline mr-2 px-2 py-2 rounded hover:bg-black-20 hover:text-white"
          to="/users"
        >Users</router-link>
      </nav>
    </div>
  </header>
</template>

<script>
import DropdownMenu from "@/components/DropdownMenu.vue";

export default {
  components: { DropdownMenu },
  computed: {
    isAdmin() {
      return this.$store.getters.isAdmin;
    },
  },
};
</script>
