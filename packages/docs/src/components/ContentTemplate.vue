<template>
  <article class="flex-1 flex flex-col prose prose-a:text-yellow-300 prose-a:underline prose-a:font-bold prose-h1:text-white prose-h2:text-yellow-300 prose-p:text-white max-w-none -mt-6 sm:mt-0 px-6 sm:px-0 py-0 overflow-hidden">
    <div class="max-w-[960px] mx-auto pt-8 pb-0 sm:pt-16 w-full">
      <h1 class="text-shadow tracking-wider">
        <slot name="title">
          Title
        </slot>
      </h1>
    </div>
    <div class="overflow-auto pb-8">
       <div class="flex-1 px-4 container max-w-[960px] mx-auto">
         <slot />
       </div>
    </div>
  </article>
</template>
