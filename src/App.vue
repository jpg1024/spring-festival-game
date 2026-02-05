<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  // 设置页面视口
  const metaViewport = document.querySelector('meta[name="viewport"]')
  if (!metaViewport) {
    const meta = document.createElement('meta')
    meta.name = 'viewport'
    meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover'
    document.head.appendChild(meta)
  }
})
</script>

<template>
  <div id="app" class="theme-spring">
    <!-- 中国结装饰1（左上） -->
    <div class="decoration chinese-knot" style="top: -10px; left: -15px; transform: rotate(-15deg);">
      <svg viewBox="0 0 100 100" width="70" height="70">
        <circle cx="50" cy="50" r="45" fill="none" stroke="#c41e3a" stroke-width="3"/>
        <circle cx="50" cy="50" r="35" fill="none" stroke="#c41e3a" stroke-width="2"/>
        <circle cx="50" cy="50" r="25" fill="none" stroke="#c41e3a" stroke-width="2"/>
        <line x1="50" y1="5" x2="50" y2="95" stroke="#c41e3a" stroke-width="2"/>
        <line x1="5" y1="50" x2="95" y2="50" stroke="#c41e3a" stroke-width="2"/>
        <line x1="15" y1="15" x2="85" y2="85" stroke="#c41e3a" stroke-width="2"/>
        <line x1="85" y1="15" x2="15" y2="85" stroke="#c41e3a" stroke-width="2"/>
        <circle cx="50" cy="50" r="15" fill="#c41e3a"/>
      </svg>
    </div>

    <!-- 中国结装饰2（右上） -->
    <div class="decoration chinese-knot" style="top: -5px; right: -10px; transform: rotate(20deg);">
      <svg viewBox="0 0 100 100" width="65" height="65">
        <circle cx="50" cy="50" r="45" fill="none" stroke="#c41e3a" stroke-width="3"/>
        <circle cx="50" cy="50" r="35" fill="none" stroke="#c41e3a" stroke-width="2"/>
        <circle cx="50" cy="50" r="25" fill="none" stroke="#c41e3a" stroke-width="2"/>
        <line x1="50" y1="5" x2="50" y2="95" stroke="#c41e3a" stroke-width="2"/>
        <line x1="5" y1="50" x2="95" y2="50" stroke="#c41e3a" stroke-width="2"/>
        <line x1="15" y1="15" x2="85" y2="85" stroke="#c41e3a" stroke-width="2"/>
        <line x1="85" y1="15" x2="15" y2="85" stroke="#c41e3a" stroke-width="2"/>
        <circle cx="50" cy="50" r="15" fill="#c41e3a"/>
      </svg>
    </div>

    <!-- 灯笼装饰1（左上偏下） -->
    <div class="decoration lantern" style="top: 18%; left: 3%; transform: rotate(-8deg);">
      <svg viewBox="0 0 60 100" width="45" height="75">
        <ellipse cx="30" cy="30" rx="25" ry="35" fill="#ff0000" stroke="#ffd700" stroke-width="2"/>
        <ellipse cx="30" cy="30" rx="20" ry="30" fill="none" stroke="#ffd700" stroke-width="1"/>
        <line x1="30" y1="-5" x2="30" y2="5" stroke="#ffd700" stroke-width="2"/>
        <line x1="30" y1="65" x2="30" y2="75" stroke="#ffd700" stroke-width="2"/>
        <circle cx="30" cy="78" r="5" fill="#ffd700"/>
        <circle cx="30" cy="30" r="8" fill="#ffd700" opacity="0.8"/>
      </svg>
    </div>

    <!-- 灯笼装饰2（右上偏下） -->
    <div class="decoration lantern" style="top: 22%; right: 5%; transform: rotate(12deg);">
      <svg viewBox="0 0 60 100" width="40" height="65">
        <ellipse cx="30" cy="30" rx="25" ry="35" fill="#ff0000" stroke="#ffd700" stroke-width="2"/>
        <ellipse cx="30" cy="30" rx="20" ry="30" fill="none" stroke="#ffd700" stroke-width="1"/>
        <line x1="30" y1="-5" x2="30" y2="5" stroke="#ffd700" stroke-width="2"/>
        <line x1="30" y1="65" x2="30" y2="75" stroke="#ffd700" stroke-width="2"/>
        <circle cx="30" cy="78" r="5" fill="#ffd700"/>
        <circle cx="30" cy="30" r="8" fill="#ffd700" opacity="0.8"/>
      </svg>
    </div>

    <!-- 灯笼装饰3（左中偏上） -->
    <div class="decoration lantern" style="top: 35%; left: -5px; transform: rotate(25deg);">
      <svg viewBox="0 0 60 100" width="35" height="55">
        <ellipse cx="30" cy="30" rx="25" ry="35" fill="#ff0000" stroke="#ffd700" stroke-width="2"/>
        <ellipse cx="30" cy="30" rx="20" ry="30" fill="none" stroke="#ffd700" stroke-width="1"/>
        <line x1="30" y1="-5" x2="30" y2="5" stroke="#ffd700" stroke-width="2"/>
        <line x1="30" y1="65" x2="30" y2="75" stroke="#ffd700" stroke-width="2"/>
        <circle cx="30" cy="78" r="5" fill="#ffd700"/>
        <circle cx="30" cy="30" r="8" fill="#ffd700" opacity="0.8"/>
      </svg>
    </div>

    <!-- 灯笼装饰4（右中偏上） -->
    <div class="decoration lantern" style="top: 40%; right: -8px; transform: rotate(-18deg);">
      <svg viewBox="0 0 60 100" width="38" height="60">
        <ellipse cx="30" cy="30" rx="25" ry="35" fill="#ff0000" stroke="#ffd700" stroke-width="2"/>
        <ellipse cx="30" cy="30" rx="20" ry="30" fill="none" stroke="#ffd700" stroke-width="1"/>
        <line x1="30" y1="-5" x2="30" y2="5" stroke="#ffd700" stroke-width="2"/>
        <line x1="30" y1="65" x2="30" y2="75" stroke="#ffd700" stroke-width="2"/>
        <circle cx="30" cy="78" r="5" fill="#ffd700"/>
        <circle cx="30" cy="30" r="8" fill="#ffd700" opacity="0.8"/>
      </svg>
    </div>

    <!-- 烟花装饰1 -->
    <div class="decoration firework" style="top: 12%; left: 20%; transform: rotate(30deg);">
      <svg viewBox="0 0 100 100" width="55" height="55">
        <circle cx="50" cy="50" r="4" fill="#ffd700"/>
        <line x1="50" y1="50" x2="50" y2="10" stroke="#ff69b4" stroke-width="2" class="firework-line"/>
        <line x1="50" y1="50" x2="50" y2="90" stroke="#ff69b4" stroke-width="2" class="firework-line"/>
        <line x1="50" y1="50" x2="10" y2="50" stroke="#ff69b4" stroke-width="2" class="firework-line"/>
        <line x1="50" y1="50" x2="90" y2="50" stroke="#ff69b4" stroke-width="2" class="firework-line"/>
        <line x1="50" y1="50" x2="22" y2="22" stroke="#ff69b4" stroke-width="2" class="firework-line"/>
        <line x1="50" y1="50" x2="78" y2="22" stroke="#ff69b4" stroke-width="2" class="firework-line"/>
        <line x1="50" y1="50" x2="22" y2="78" stroke="#ff69b4" stroke-width="2" class="firework-line"/>
        <line x1="50" y1="50" x2="78" y2="78" stroke="#ff69b4" stroke-width="2" class="firework-line"/>
      </svg>
    </div>

    <!-- 烟花装饰2 -->
    <div class="decoration firework" style="top: 8%; right: 22%; transform: rotate(-25deg);">
      <svg viewBox="0 0 100 100" width="48" height="48">
        <circle cx="50" cy="50" r="4" fill="#00ffff"/>
        <line x1="50" y1="50" x2="50" y2="15" stroke="#ff0000" stroke-width="2" class="firework-line"/>
        <line x1="50" y1="50" x2="50" y2="85" stroke="#ff0000" stroke-width="2" class="firework-line"/>
        <line x1="50" y1="50" x2="15" y2="50" stroke="#ff0000" stroke-width="2" class="firework-line"/>
        <line x1="50" y1="50" x2="85" y2="50" stroke="#ff0000" stroke-width="2" class="firework-line"/>
        <line x1="50" y1="50" x2="25" y2="25" stroke="#ff0000" stroke-width="2" class="firework-line"/>
        <line x1="50" y1="50" x2="75" y2="25" stroke="#ff0000" stroke-width="2" class="firework-line"/>
        <line x1="50" y1="50" x2="25" y2="75" stroke="#ff0000" stroke-width="2" class="firework-line"/>
        <line x1="50" y1="50" x2="75" y2="75" stroke="#ff0000" stroke-width="2" class="firework-line"/>
      </svg>
    </div>

    <!-- 烟花装饰3 -->
    <div class="decoration firework" style="top: 30%; left: 8%; transform: rotate(45deg);">
      <svg viewBox="0 0 100 100" width="42" height="42">
        <circle cx="50" cy="50" r="3" fill="#ffff00"/>
        <line x1="50" y1="50" x2="50" y2="20" stroke="#00ff00" stroke-width="1.5" class="firework-line"/>
        <line x1="50" y1="50" x2="50" y2="80" stroke="#00ff00" stroke-width="1.5" class="firework-line"/>
        <line x1="50" y1="50" x2="20" y2="50" stroke="#00ff00" stroke-width="1.5" class="firework-line"/>
        <line x1="50" y1="50" x2="80" y2="50" stroke="#00ff00" stroke-width="1.5" class="firework-line"/>
        <line x1="50" y1="50" x2="29" y2="29" stroke="#00ff00" stroke-width="1.5" class="firework-line"/>
        <line x1="50" y1="50" x2="71" y2="29" stroke="#00ff00" stroke-width="1.5" class="firework-line"/>
        <line x1="50" y1="50" x2="29" y2="71" stroke="#00ff00" stroke-width="1.5" class="firework-line"/>
        <line x1="50" y1="50" x2="71" y2="71" stroke="#00ff00" stroke-width="1.5" class="firework-line"/>
      </svg>
    </div>

    <!-- 烟花装饰4 -->
    <div class="decoration firework" style="top: 25%; right: 8%; transform: rotate(-40deg);">
      <svg viewBox="0 0 100 100" width="38" height="38">
        <circle cx="50" cy="50" r="3" fill="#ff00ff"/>
        <line x1="50" y1="50" x2="50" y2="18" stroke="#ffa500" stroke-width="1.5" class="firework-line"/>
        <line x1="50" y1="50" x2="50" y2="82" stroke="#ffa500" stroke-width="1.5" class="firework-line"/>
        <line x1="50" y1="50" x2="18" y2="50" stroke="#ffa500" stroke-width="1.5" class="firework-line"/>
        <line x1="50" y1="50" x2="82" y2="50" stroke="#ffa500" stroke-width="1.5" class="firework-line"/>
        <line x1="50" y1="50" x2="27" y2="27" stroke="#ffa500" stroke-width="1.5" class="firework-line"/>
        <line x1="50" y1="50" x2="73" y2="27" stroke="#ffa500" stroke-width="1.5" class="firework-line"/>
        <line x1="50" y1="50" x2="27" y2="73" stroke="#ffa500" stroke-width="1.5" class="firework-line"/>
        <line x1="50" y1="50" x2="73" y2="73" stroke="#ffa500" stroke-width="1.5" class="firework-line"/>
      </svg>
    </div>

    <!-- 烟花装饰5 -->
    <div class="decoration firework" style="top: 55%; left: 15%; transform: rotate(60deg);">
      <svg viewBox="0 0 100 100" width="32" height="32">
        <circle cx="50" cy="50" r="2.5" fill="#00ffff"/>
        <line x1="50" y1="50" x2="50" y2="22" stroke="#ff1493" stroke-width="1.2" class="firework-line"/>
        <line x1="50" y1="50" x2="50" y2="78" stroke="#ff1493" stroke-width="1.2" class="firework-line"/>
        <line x1="50" y1="50" x2="22" y2="50" stroke="#ff1493" stroke-width="1.2" class="firework-line"/>
        <line x1="50" y1="50" x2="78" y2="50" stroke="#ff1493" stroke-width="1.2" class="firework-line"/>
        <line x1="50" y1="50" x2="29" y2="29" stroke="#ff1493" stroke-width="1.2" class="firework-line"/>
        <line x1="50" y1="50" x2="71" y2="29" stroke="#ff1493" stroke-width="1.2" class="firework-line"/>
        <line x1="50" y1="50" x2="29" y2="71" stroke="#ff1493" stroke-width="1.2" class="firework-line"/>
        <line x1="50" y1="50" x2="71" y2="71" stroke="#ff1493" stroke-width="1.2" class="firework-line"/>
      </svg>
    </div>

    <!-- 烟花装饰6 -->
    <div class="decoration firework" style="top: 60%; right: 12%; transform: rotate(-55deg);">
      <svg viewBox="0 0 100 100" width="35" height="35">
        <circle cx="50" cy="50" r="2.5" fill="#ffff00"/>
        <line x1="50" y1="50" x2="50" y2="20" stroke="#00ff00" stroke-width="1.2" class="firework-line"/>
        <line x1="50" y1="50" x2="50" y2="80" stroke="#00ff00" stroke-width="1.2" class="firework-line"/>
        <line x1="50" y1="50" x2="20" y2="50" stroke="#00ff00" stroke-width="1.2" class="firework-line"/>
        <line x1="50" y1="50" x2="80" y2="50" stroke="#00ff00" stroke-width="1.2" class="firework-line"/>
        <line x1="50" y1="50" x2="27" y2="27" stroke="#00ff00" stroke-width="1.2" class="firework-line"/>
        <line x1="50" y1="50" x2="73" y2="27" stroke="#00ff00" stroke-width="1.2" class="firework-line"/>
        <line x1="50" y1="50" x2="27" y2="73" stroke="#00ff00" stroke-width="1.2" class="firework-line"/>
        <line x1="50" y1="50" x2="73" y2="73" stroke="#00ff00" stroke-width="1.2" class="firework-line"/>
      </svg>
    </div>

    <!-- 福字装饰1（左上偏中） -->
    <div class="decoration fu-character" style="top: 42%; left: -8px; transform: translateY(-50%) rotate(-10deg);">
      <svg viewBox="0 0 100 100" width="55" height="55">
        <rect x="0" y="0" width="100" height="100" fill="#c41e3a" rx="10"/>
        <text x="50" y="75" font-size="70" font-weight="bold" fill="#ffd700" text-anchor="middle" font-family="serif">福</text>
        <circle cx="50" cy="10" r="5" fill="#ffd700"/>
        <circle cx="10" cy="50" r="3" fill="#ffd700"/>
        <circle cx="90" cy="50" r="3" fill="#ffd700"/>
      </svg>
    </div>

    <!-- 福字装饰2（右上偏中） -->
    <div class="decoration fu-character" style="top: 48%; right: -10px; transform: translateY(-50%) rotate(15deg);">
      <svg viewBox="0 0 100 100" width="50" height="50">
        <rect x="0" y="0" width="100" height="100" fill="#c41e3a" rx="10"/>
        <text x="50" y="75" font-size="70" font-weight="bold" fill="#ffd700" text-anchor="middle" font-family="serif">福</text>
        <circle cx="50" cy="10" r="5" fill="#ffd700"/>
        <circle cx="10" cy="50" r="3" fill="#ffd700"/>
        <circle cx="90" cy="50" r="3" fill="#ffd700"/>
      </svg>
    </div>

    <!-- 福字装饰3（左下） -->
    <div class="decoration fu-character" style="top: 75%; left: 2%; transform: translateY(-50%) rotate(8deg);">
      <svg viewBox="0 0 100 100" width="40" height="40">
        <rect x="0" y="0" width="100" height="100" fill="#c41e3a" rx="10"/>
        <text x="50" y="75" font-size="70" font-weight="bold" fill="#ffd700" text-anchor="middle" font-family="serif">福</text>
        <circle cx="50" cy="10" r="5" fill="#ffd700"/>
        <circle cx="10" cy="50" r="3" fill="#ffd700"/>
        <circle cx="90" cy="50" r="3" fill="#ffd700"/>
      </svg>
    </div>

    <!-- 福字装饰4（右下） -->
    <div class="decoration fu-character" style="top: 70%; right: 3%; transform: translateY(-50%) rotate(-12deg);">
      <svg viewBox="0 0 100 100" width="45" height="45">
        <rect x="0" y="0" width="100" height="100" fill="#c41e3a" rx="10"/>
        <text x="50" y="75" font-size="70" font-weight="bold" fill="#ffd700" text-anchor="middle" font-family="serif">福</text>
        <circle cx="50" cy="10" r="5" fill="#ffd700"/>
        <circle cx="10" cy="50" r="3" fill="#ffd700"/>
        <circle cx="90" cy="50" r="3" fill="#ffd700"/>
      </svg>
    </div>

    <!-- 路由视图 -->
    <div class="page-container safe-area-inset-bottom">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
#app {
  width: 100%;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}

.decoration {
  position: fixed;
  z-index: 1;
  pointer-events: none;
}

.chinese-knot {
  animation: swing 3s ease-in-out infinite;
}

.lantern {
  animation: swing 2s ease-in-out infinite;
}

.firework {
  animation: twinkle 2s ease-in-out infinite;
}

.fu-character {
  animation: float 3s ease-in-out infinite;
}

@keyframes swing {
  0%, 100% { transform: rotate(-5deg); }
  50% { transform: rotate(5deg); }
}

@keyframes twinkle {
  0%, 100% { opacity: 0.7; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.1); }
}

@keyframes float {
  0%, 100% { transform: translateY(-50%) translateY(0); }
  50% { transform: translateY(-50%) translateY(-10px); }
}

.firework-line {
  animation: burst 1.5s ease-out infinite;
}

@keyframes burst {
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
}
</style>
