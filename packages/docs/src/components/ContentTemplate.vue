<template>
  <article class="prose prose-a:text-leanix-blue-dark prose-a:font-bold prose-a:no-underline max-w-none -mt-6 sm:mt-0">
    <h1 class="text-white text-shadow px-4 sm:px-0">
      <slot name="title">
        Title
      </slot>
    </h1>
    <div class="bg-white px-8 sm:rounded-md shadow overflow-auto pb-6">
      <slot />
    </div>
  </article>
</template>
