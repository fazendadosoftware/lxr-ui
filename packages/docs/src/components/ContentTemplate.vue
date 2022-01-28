<template>
  <article class="prose prose-a:text-yellow-300 prose-a:underline prose-a:font-bold prose-h1:text-white prose-h2:text-yellow-300 prose-p:text-white max-w-none -mt-6 sm:mt-0 px-8">
    <h1 class="text-shadow px-4 sm:px-0">
      <slot name="title">
        Title
      </slot>
    </h1>
    <div class="text-yellow text-shadow">
      <slot />
    </div>
  </article>
</template>
