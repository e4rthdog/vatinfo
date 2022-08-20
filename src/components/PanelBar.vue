<template>
  <q-card-section class="bg-primary text-white q-ma-none q-pa-sm">
    <div class="row items-center q-ma-none q-pa-none">
      <div class="column col-12 col-lg-3 items-center items-lg-start">
        <slot name="title"></slot>
      </div>
      <div class="column col-12 col-lg-8 items-center items-lg-end">
        <slot name="content"></slot>
      </div>
      <div class="column col-12 col-lg-1 items-center items-lg-end">
        <slot name="window-control"></slot>
      </div>
    </div>
  </q-card-section>
</template>
