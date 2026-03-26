import { onBeforeUnmount, onMounted, ref, Ref } from "vue";

export interface WindowSize {
  width: number;
  height: number;
}

export const useWindowSize = (): {
  width: Ref<number>;
  height: Ref<number>;
} => {
  const width = ref<WindowSize["width"]>(window.innerWidth);
  const height = ref<WindowSize["height"]>(window.innerHeight);

  const updateWindowSize = () => {
    width.value = window.innerWidth;
    height.value = window.innerHeight;
  };

  onMounted(() => {
    window.addEventListener("resize", updateWindowSize);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("resize", updateWindowSize);
  });

  return { width, height };
};
