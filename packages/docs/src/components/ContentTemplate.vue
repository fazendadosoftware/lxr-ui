<template>
  <article class="flex-1 flex flex-col prose prose-a:text-yellow-300 prose-a:underline prose-a:font-bold prose-h1:text-white prose-h2:text-yellow-300 prose-p:text-white max-w-none -mt-6 sm:mt-0 px-6 sm:px-0 py-0 overflow-hidden">
    <h1 class="text-shadow px-4 sm:px-0 sm:mt-8">
      <slot name="title">
        Title
      </slot>
    </h1>
    <slot />
  </article>
</template>
