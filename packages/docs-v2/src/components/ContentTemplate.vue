<template>
  <article class="prose prose-a:text-leanix-blue-dark prose-a:font-bold prose-a:no-underline max-w-none">
    <h1 class="text-white text-shadow">
      <slot name="title">
        Title
      </slot>
    </h1>
    <div class="bg-white px-8 rounded-md shadow overflow-auto pb-6">
      <slot />
    </div>
  </article>
</template>
