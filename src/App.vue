<template>
  <div style="padding: 20px; font-family: Arial, sans-serif">
    <h2>Vue3 Hooks 测试</h2>

    <!-- 设备检测 -->
    <div
      style="
        margin-bottom: 20px;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
      "
    >
      <h3>设备检测 (useDevice)</h3>
      <div>是PC端吗？{{ isPC ? "是" : "不是" }}</div>
      <div>是移动端吗？{{ isMobile ? "是" : "不是" }}</div>
    </div>

    <!-- 平台环境检测 -->
    <div
      style="
        margin-bottom: 20px;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
      "
    >
      <h3>平台环境检测 (usePlatformEnv)</h3>
      <div>是否是企业微信工作环境？{{ isWxWork ? "是" : "不是" }}</div>
      <div>是否是微信工作环境？{{ isWeChat ? "是" : "不是" }}</div>
      <div>是否是浏览器环境？{{ isBrowser ? "是" : "不是" }}</div>
      <div>当前环境类型？{{ envType }}</div>
      <div>当前用户代理：{{ userAgent }}</div>
    </div>

    <!-- Sleep 测试 -->
    <div
      style="
        margin-bottom: 20px;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
      "
    >
      <h3>Sleep 测试</h3>
      <div>{{ str }}</div>
    </div>

    <!-- 防抖测试 -->
    <div
      style="
        margin-bottom: 20px;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
      "
    >
      <h3>防抖测试 (useDebounce)</h3>
      <div>输入值: {{ value }}</div>
      <input
        type="text"
        @input="handleInput"
        placeholder="输入内容测试防抖 (300ms)"
        style="padding: 5px; width: 300px"
      />
      <p style="font-size: 12px; color: #666">
        停止输入300ms后才会更新显示的值
      </p>
    </div>

    <!-- 节流测试 -->
    <div
      style="
        margin-bottom: 20px;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
      "
    >
      <h3>节流测试 (useThrottle)</h3>
      <div>点击次数: {{ clickCount }}</div>
      <div>节流执行次数: {{ throttledCount }}</div>
      <button
        @click="handleThrottledClick"
        style="
          padding: 10px 20px;
          margin: 10px 0;
          background: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        "
      >
        快速点击测试节流 (500ms)
      </button>
      <p style="font-size: 12px; color: #666">
        无论点击多快，500ms内只会执行一次
      </p>
      <button
        @click="resetCounters"
        style="
          padding: 5px 10px;
          background: #6c757d;
          color: white;
          border: none;
          border-radius: 3px;
          cursor: pointer;
        "
      >
        重置计数器
      </button>
    </div>

    <!-- 倒计时测试 -->
    <div
      style="
        margin-bottom: 20px;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
      "
    >
      <h3>倒计时</h3>
      <div>倒计时时间: {{ duration }}秒</div>
      <div>是否可以手动触发倒计时？{{ canManualTrigger ? "是" : "否" }}</div>
      <button
        @click="start"
        :disabled="!canManualTrigger"
        :class="['button', { disabled: !canManualTrigger }]"
        style="margin-right: 10px"
      >
        开始倒计时{{ duration > 0 ? `(${duration}s)` : "" }}
      </button>
    </div>

    <!-- 发送验证码场景 -->
    <div
      style="
        margin-bottom: 20px;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
      "
    >
      <h3>发送验证码场景</h3>
      <div>倒计时时间: {{ sendCodeDuration }}秒</div>
      <div>
        是否可以手动触发倒计时？{{ sendCodeCanManualTrigger ? "是" : "否" }}
      </div>
      <button
        @click="sendCodeStart"
        :disabled="!sendCodeCanManualTrigger"
        :class="['button', { disabled: !sendCodeCanManualTrigger }]"
        style="margin-right: 10px"
      >
        发送验证码{{ sendCodeDuration > 0 ? ` (${sendCodeDuration}s)` : "" }}
      </button>
    </div>

    <!-- 时间差计算测试 -->
    <div
      style="
        margin-bottom: 20px;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
      "
    >
      <h3>毫秒级别，如果有拼夕夕的秒杀场景适用</h3>
      <div style="margin-bottom: 10px">
        <strong>目标时间:</strong> {{ targetDate.toLocaleString() }}
      </div>
      <div
        style="
          font-size: 24px;
          font-weight: bold;
          color: #007bff;
          margin: 15px 0;
        "
      >
        {{ timeDiff.hours.toString().padStart(2, "0") }}:{{
          timeDiff.minutes.toString().padStart(2, "0")
        }}:{{ timeDiff.seconds.toString().padStart(2, "0") }}.{{
          timeDiff.msecs
        }}
      </div>
      <div style="font-size: 14px; color: #666">
        <div>小时: {{ timeDiff.hours }}</div>
        <div>分钟: {{ timeDiff.minutes }}</div>
        <div>秒数: {{ timeDiff.seconds }}</div>
        <div>毫秒: {{ timeDiff.msecs }}</div>
      </div>
      <button class="button" style="margin-right: 10px;" @click="startA">开始</button>
      <button class="button stop" @click="stopA">暂停</button>
      <p style="font-size: 12px; color: #666; margin-top: 10px">
        实时显示到目标时间的倒计时，格式: 时:分:秒.毫秒
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  sleep,
  useDevice,
  usePlatformEnv,
  useDebounce,
  useThrottle,
  useCountDown,
  getDateDiffWithMsec,
  useInterval,
} from "./index";

// 设备检测
const { isPC, isMobile } = useDevice();

// 平台环境检测
const { isWxWork, isWeChat, isBrowser, userAgent, envType } = usePlatformEnv();

// Sleep 测试
const str = ref("hello world");

// 防抖测试
const value = ref("");

// 节流测试
const clickCount = ref(0);
const throttledCount = ref(0);

// 倒计时测试 - 默认可以手动触发
const { duration, canManualTrigger, start } = useCountDown(5, false);
// 发送验证码场景 - 初始不可触发，需要先停止才能重新开始
const {
  duration: sendCodeDuration,
  canManualTrigger: sendCodeCanManualTrigger,
  start: sendCodeStart,
} = useCountDown(60);

// 时间差计算测试
const timeDiff = ref({ hours: 0, minutes: 0, seconds: 0, msecs: 0 });
const targetDate = ref(
  new Date(Date.now() + 2 * 60 * 60 * 1000 + 30 * 60 * 1000 + 45 * 1000)
); // 2小时30分45秒后

// 更新时间差的函数
const updateTimeDiff = () => {
  timeDiff.value = getDateDiffWithMsec(targetDate.value);
};
const { start: startA, stop: stopA } = useInterval(updateTimeDiff, 100); // 每100ms更新一次，实现毫秒级精度

onMounted(() => {
  sleep(3000).then(() => {
    str.value = "hello abc (3秒后更新)";
  });
  start();

  // 初始化时间差
  updateTimeDiff();

  // 每1s更新一次时间差，实现实时倒计时效果
  startA();
});

// 防抖处理函数
const handleInput = useDebounce((e: Event) => {
  const target = e.target as HTMLInputElement;
  value.value = target.value;
}, 300);

// 节流处理函数
const throttledFunction = useThrottle(() => {
  throttledCount.value++;
}, 500);

// 点击处理函数
const handleThrottledClick = () => {
  clickCount.value++;
  throttledFunction();
};

// 重置计数器
const resetCounters = () => {
  clickCount.value = 0;
  throttledCount.value = 0;
};
</script>

<style scoped>
.button {
  font-size: 14px;
  height: 32px;
  padding: 4px 15px;
  border-radius: 6px;
  background: #1677ff;
  box-shadow: 0 2px 0 rgba(5, 145, 255, 0.1);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.button.stop {
    background: #e6a23c;
}

.button.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.button2 {
  font-size: 14px;
  height: 32px;
  padding: 4px 15px;
  border-radius: 6px;
  background: #1677ff;
  box-shadow: 0 2px 0 rgba(5, 145, 255, 0.1);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.button2.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
